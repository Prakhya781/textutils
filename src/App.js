import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
// import About from './components/About';
import Alert from './components/Alert';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [themeColor, setThemeColor] = useState('white');

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const changeTheme = (colorName, colorValue) => {
    setMode('dark');
    document.body.style.backgroundColor = colorValue;
    setThemeColor(colorValue);
    showAlert(`${colorName} mode has been enabled`, "success");
    document.title = 'textutils - dark mode';
  };

  const enableLightMode = () => {
    setMode('light');
    document.body.style.backgroundColor = 'white';
    setThemeColor('white');
    showAlert("Light mode has been enabled", "success");
    document.title = 'textutils - light mode';
  };

  return (
    <>
      {/* <Router> */}
        <Navbar
          title="TextUtils"
          about="About"
          mode={mode}
          themeColor={themeColor}
          toggleMode={mode === 'light' ? changeTheme : enableLightMode}
        />
        <Alert alert={alert} />
        <div className="container my-3">
          <div className="mb-3">
            <button className="btn btn-secondary mx-1" onClick={enableLightMode}>Light Mode</button>
            <button className="btn btn-primary mx-1" onClick={() => changeTheme('Dark Blue', '#042743')}>Dark Blue</button>
            <button className="btn btn-dark mx-1" onClick={() => changeTheme('Dark Gray', '#2c2c2c')}>Dark Gray</button>
            <button className="btn btn-success mx-1" onClick={() => changeTheme('Dark Green', '#0b3d0b')}>Dark Green</button>
            <button className="btn btn-danger mx-1" onClick={() => changeTheme('Dark Red', '#400000')}>Dark Red</button>
          </div>

          {/* <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Textform showAlert={showAlert} heading="Enter the text to analyze" mode={mode} />} />
          </Routes> */}

          {/* Directly rendered Textform (without routing) */}
          <Textform showAlert={showAlert} heading="Enter the text to analyze" mode={mode} />
        </div>
      {/* </Router> */}
    </>
  );
}

export default App;


