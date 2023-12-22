import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import FileUpload from "./components/FilesUpload";

const App: React.FC = () => {
  return (
    <div className="container" style={{ width: "600px" }}>
      <div className="my-3">
        <h1>Doc Defender</h1>
      </div>

      <FileUpload />
    </div>
  );
}

export default App;
