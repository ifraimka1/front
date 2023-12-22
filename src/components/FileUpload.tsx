import { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";
import IFile from "../types/File";

const FileUpload: React.FC = () => {
    const FileUpload: React.FC = () => {
        const [currentFile, setCurrentFile] = useState<File>();
        const [progress, setProgress] = useState<number>(0);
        const [message, setMessage] = useState<string>("");
        const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);
  
    return (
        
    );
};

export default FileUpload;