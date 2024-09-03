import { forwardRef, useEffect } from "react";
import useSpeechRecognition from "./useSpeechRecognition";

interface TranscriberProps {
  value: string;
  onValueChange: (value: string) => void;
  micOnIcon?: JSX.Element;
  micOffIcon?: JSX.Element;
  continuous?: boolean;
  language?: string;
  setListening: (value: boolean) => void;
  recordButtonContainerStyle?: React.CSSProperties;
}
export const Transcriber = forwardRef<any, TranscriberProps>(
  (
    {
      value,
      onValueChange,
      continuous,
      language,
      setListening,
    }: TranscriberProps,
    ref: any
  ) => {
    const {
      transcript,
      listening,
      startListening,
      stopListening,
      resetTranscript,
      supportsSpeechRecognition,
    } = useSpeechRecognition({
      initialValue: value,
      continuous,
      language,
    });

    // reset transcript when component unmount
    useEffect(() => {
      return () => {
        resetTranscript();
      };
    }, []);

    useEffect(() => {
      setListening(listening);
    }, [listening]);

    useEffect(() => {
      if (transcript) {
        onValueChange(transcript);
      }
    }, [transcript]);

    if (!supportsSpeechRecognition) {
      console.log(
        "Web Speech API is not supported in this browser. Try Chrome or Firefox."
      );
      return null;
    }

    const handleMicClick = () => {
      ref.current?.focus();
      listening ? stopListening() : startListening();
    };

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <a href="#" onClick={handleMicClick}>
          {listening ? "on" : "off"}
        </a>
      </div>
    );
  }
);
