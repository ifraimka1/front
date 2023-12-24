import http from "../http-common";

const idArray: number[] = [];
const fileLinks: string[] = [];

const upload = (file: File, onUploadProgress: (progressEvent: any) => void): Promise<any> => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/api/file_upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getLink = (id: number): Promise<any> => {
  const url = "/api/file_upload/?id=" + id;
  return http.get(url, {
    responseType: 'blob',
    headers: {
      "ngrok-skip-browser-warning": "69420",
    }
  });
}

const getIdArray = () : number[] => {
  return idArray;
};

const getFileLinks = () : string[] => {
  return fileLinks;
}

const FileUploadService = {
  upload,
  getLink,
  getFileLinks,
  getIdArray,
};

export default FileUploadService;