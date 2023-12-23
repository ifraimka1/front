import logo from './logo.png';
import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import FileUpload from "./components/FilesUpload";

const App: React.FC = () => {
  return (
    <div className="container" style={{ width: "600px" }}>
      <header className='header'>
        <img className="logo" src={logo} alt=""></img>
        <h1>DOC DEFENDER</h1>
      </header>
      <div className="work-area">
        <FileUpload />
      </div>
      <footer className='footer'>
        © Doc Defender 2023 - Фантасты
      </footer>
    </div>
  );
}

export default App;
