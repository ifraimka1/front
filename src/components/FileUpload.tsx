import { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";
import IFile from "../types/File";

const FileUpload: React.FC = () => {
    const FileUpload: React.FC = () => {
    const [currentFile, setCurrentFile] = useState<File>();
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
        setProgress(0);
        };
  
    return (
        
    );
};

export default FileUpload;