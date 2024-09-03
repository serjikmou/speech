import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Transcriber } from "./Transcriber";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(inputValue);
  return (
    <div>
      <Transcriber
        ref={inputRef}
        value={inputValue}
        onValueChange={setInputValue}
        continuous={false}
        language={"fa"}
        setListening={setListening}
      />
      <span>{inputValue}</span>
    </div>
  );
}

export default App;
