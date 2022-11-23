import React, { useEffect, useState } from "react";
import { RiToggleLine, RiToggleFill, RiHome4Line } from "react-icons/ri";
import "./Utils.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Utils = () => {
  // UseState Hook for dark/Light Mode
  const [mode, setMode] = useState(false);

  // state changing behahvior for ttoggle icon
  const [toggle, setToggle] = useState(false);

  // state change for real-time typing or changing preview
  const [typing, setTyping] = useState("");

 const [upperCase, setUpperCase] = useState();
  const [copy, setCopy] = useState(true);
  const [countWords, setCountWords] = useState(0);
  const [countChars, setCountChars] = useState(0);
  const theme = {
    darkMode: {
      backgroundColor: "black",
      color: "white",
      transition: "900ms",
    },
    lightMode: {
      backgroundColor: "white",
      color: "black",
      transition: "900ms",
    },
  };
 
  function toggler() {
    setToggle((prevMode) => !prevMode);
    setMode((prevMode) => !prevMode);
  }

  const StateTyping = (e) => {
    let typed = e.target.value;
    setTyping(typed);
    counterForChars();
    counterForWords();
  };

 
  const UpperCaseFun = () => {
   
    let caseChange = typing.toUpperCase();
    if (caseChange === "") {
      alert("Enter text 1st to Test!!");
    } else {
      setUpperCase(caseChange);
      setTyping(caseChange);
    }
 
  };

 
  const LowerCase = () => {
    let caseChange = typing.toLowerCase();
    if (caseChange === "") {
      alert("Enter text to Test!!");
    } else {
      setUpperCase(caseChange);
      setTyping(caseChange);
    }
   
  };

 
  const removeWhiteSpc = () => {
    const arr = typing.split(" ");
    const str = arr.join("");
    setTyping(str);
   
  };
  const ClearAll = () => {
   
    setTyping("");
    counterForWords();
    counterForChars();
    CopyToClipboard();
  
  };

  useEffect(() => {
    changeCopyBtnTxt();
    setCopy((prevMode) => !prevMode);
   
  }, []);
  const changeCopyBtnTxt = () => {
    setCopy();
  };
 
  const counterForWords = () => {
    const wordsArr = typing.split(" ");
    setCountWords(wordsArr.length);

  
    if (wordsArr.length === 1) {
      setCountWords(0);
    }
  };

  const counterForChars = () => {
    const charsArr = typing.split(" ");
    for (let i = 0; i < charsArr.length; i++) {
      setCountChars(typing.length);
    }
  };

  return (
    <div className="Main" style={mode ? theme.darkMode : theme.lightMode}>
      <div className="Nav">
        <span className="toggle">TextUtils</span>
        <a href="#">
          <RiHome4Line className="toggle" />
        </a>
        <span className="toggle">
          {toggle ? (
            <RiToggleFill onClick={toggler} />
          ) : (
            <RiToggleLine
              onClick={toggler}
              
            />
          )}
          <span> DarkMode</span>
        </span>
      </div>
      <div className="Sub-Main">
        <div className="Body-Container">
          <h1>Enter the text to analyze below</h1>
        
          <CopyToClipboard text={typing}>
            <textarea
              value={typing}
              placeholder="Start Typing..."
              onChange={StateTyping}
             
              cols="30"
              rows="10"
              className="input-area"
            />
          </CopyToClipboard>

          

          
          <button onClick={UpperCaseFun}>Convert to Uppercase</button>
         
          <button onClick={LowerCase}>Convert to Lowercase</button>
        
          <button onClick={removeWhiteSpc}>Remove Extra space</button>
          
          <button
            
            onClick={changeCopyBtnTxt}
            
          >
            {copy}
            {copy ? "Text Copy" : "Copied📋"}
          </button>

         
          <button onClick={ClearAll}>Clear Text</button>
          <h2>Your text summary</h2>
          <h5>
            {" "}
            {countWords} words and {countChars} characters
          </h5>
          <p>0.008 Minutes read</p>
          <h2>Preview</h2>
          <p>Enter something in the textbox above to preview it here</p>
          {/* <p value={{ upperCase }}></p> */}
          <p>{typing}</p>
        </div>
      </div>
    </div>
  );
};

export default Utils;


