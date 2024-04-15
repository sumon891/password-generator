import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  //use reff hook

  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "~!#^%&*jk$";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  //Copy to clipboard 

  const copytoClipboard = useCallback(()=>{
    passwordRef.current.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  //Use effect

  useEffect(()=>{
    passwordgenerator();
  }, 
  [length, numberAllowed, charAllowed, passwordgenerator])






  return (
    <>
      <div className="w-full h-56 max-w-md mx-auto shadow-md text-orange bg-gray-800 rounded px-4 my-8 ">
        <div className="">
          <h1 className="text-white">Password Generator</h1>
          <input
            type="text"
            value={Password}
            className=""
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button className="text-white px-5" onClick={copytoClipboard}>Copy</button>
        </div>
        <div>
          <input
            type="range"
            min={8}
            max={12}
            value={length}
            className=" cursor-pointer"
            onChange={(event) => {
              setLength(event.target.value);
            }}
          />
          <label htmlFor="" className="text-white">
            Length: {length}
          </label>
        </div>
        <div className="">
          <input
            type="checkbox"
            value={numberAllowed}
            className=" cursor-pointer"
            onChange={()=>{
              setNumberAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="" className="text-white">
            Number Allowed?
          </label>
          <input
            type="checkbox"
            value={charAllowed}
            className=" cursor-pointer"
            onChange={()=>{
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="" className="text-white">
            Char Allowed?
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
