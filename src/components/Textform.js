import React, { useState } from 'react';

export default function Textform(props) {
  const [text, setText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  const showAlert = props.showAlert || (() => {});

  const handleUpClick = () => {
    setText(text.toUpperCase());
    showAlert("Converted to upper case", "success");
  };

  const handleloClick = () => {
    setText(text.toLowerCase());
    showAlert("Converted to lower case", "success");
  };

  const handlecopy = () => {
    const textarea = document.getElementById("myBox");
    textarea.select();
    textarea.setSelectionRange(0, 9999);
    navigator.clipboard.writeText(textarea.value);
    showAlert("Text has been copied", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/\s+/).join(" ");
    setText(newText.trim());
    showAlert("Extra spaces have been removed", "success");
  };

  const handlectClick = () => {
    setText('');
    showAlert("Text has been cleared", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleReplaceClick = () => {
    if (!findText) return;
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapeRegExp(findText), 'g');
    let newText = text.replace(regex, replaceText);
    setText(newText);
    showAlert("Text has been replaced", "success");
  };

  const headingColor = props.mode === 'dark' ? 'white' : 'black';

  return (
    <>
      <div className="container" style={{ color: headingColor }}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === 'dark' ? 'grey' : 'white',
              color: props.mode === 'dark' ? 'white' : 'black'
            }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>Uppercase</button>
        <button className="btn btn-primary mx-1" onClick={handleloClick}>Lowercase</button>
        <button className="btn btn-primary mx-1" onClick={handlectClick}>Clear Text</button>
        <button className="btn btn-primary mx-1" onClick={handlecopy}>Copy Text</button>
        <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove Spaces</button>

        <div className="my-3">
          <input
            type="text"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            placeholder="Find text"
            className="form-control my-1"
          />
          <input
            type="text"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            placeholder="Replace with"
            className="form-control my-1"
          />
          <button className="btn btn-success" onClick={handleReplaceClick}>Replace</button>
        </div>
      </div>

      <div className="container my-3" style={{ color: headingColor }}>
        <h1>Your text summary</h1>
        <p>{text.trim().split(/\s+/).filter(word => word.length !== 0).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(/\s+/).filter(word => word.length !== 0).length} minutes read</p>
        <h3>Preview</h3>
        <p>{text.length > 0 ? text : "Enter something above to preview it here."}</p>
      </div>
    </>
  );
}

