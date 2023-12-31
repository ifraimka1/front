import './FilesUpload.css';
import { useState, useEffect, useRef } from "react";
import '@react-pdf-viewer/core/lib/styles/index.css';
import UploadService from "../services/FileUploadService";
import IFile from "../types/File";

interface ProgressInfo {
  fileName: string;
  percentage: number;
}

const FilesUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [progressInfos, setProgressInfos] = useState<Array<ProgressInfo>>([]);
  const [message, setMessage] = useState<Array<string>>([]);
  const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);
  const [links, setLinks] = useState<Map<number, string>>(new Map());
  const progressInfosRef = useRef<any>(null);

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
    setProgressInfos([]);
    setMessage([]);
  };

  const upload = (idx: number, file: File) => {
    let _progressInfos = [...progressInfosRef.current];
    return UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos(_progressInfos);
    })
      .then((response) => {
        const newFileInfo: IFile = {
          id: response.data.id,
          name: file.name,
        }
        const newFileInfos = fileInfos;
        newFileInfos.push(newFileInfo);
        setFileInfos(newFileInfos);

        getLink(response.data.id);

        setMessage((prevMessage) => [
          ...prevMessage,
          file.name + ": Successful!"
        ]);
      })
      .catch((err: any) => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos(_progressInfos);

        let msg = file.name + ": Failed!";
        if (err.response && err.response.data && err.response.data.message) {
          msg += " " + err.response.data.message;
        }

        setMessage((prevMessage) => [
          ...prevMessage,
          msg
        ]);
      });
  };

  const uploadFiles = () => {
    if (selectedFiles != null) {
      const files = Array.from(selectedFiles);

      let _progressInfos = files.map((file) => ({
        percentage: 0,
        fileName: file.name
      }));

      progressInfosRef.current = _progressInfos;

      const uploadPromises = files.map((file, i) => upload(i, file));

      Promise.all(uploadPromises)
        .then(() => {
          //setFileLinks(UploadService.getFileLinks());
        });
      //   .then((files) => {
      //     setFileInfos(files.data);
      //   });

      // setMessage([]);
    }
  };

  const getLink = async (id: number) => {
    let href = "";
    await UploadService.getLink(id)
      .then((response) => {
        href = URL.createObjectURL(response.data);
        console.log(href);
        const newLinks = links;
        newLinks.set(id, href);
        setLinks(new Map(links).set(id, href));
        console.log(links);
      });
  }

  const calculateSize = (size: number) => {
    let bytes = [
      ' bytes',
      ' KB',
      ' MB'
    ];
    let index = 0;

    while (size > 1024) {
      size /= 1024;
      index++;
    }

    const result = Math.round(size) + bytes[index];

    return result;
  };

  const Preview: React.FC = () => {
    if (selectedFiles) {
      const files: File[] = Array.from(selectedFiles);
      console.log(files);
      return (
        <div className='card'>
          <div className='card-header'>
            Выбранные файлы
          </div>
          <ul className="list-group list-group-flush selected-list">
            {files &&
              files.map((file, index) => (
                <li className="list-group-item selected-item" key={index}>
                  <div>{file.name}</div>
                  <div>{calculateSize(file.size)}</div>
                </li>
              ))}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  };

  const FilesUploadDefault: React.FC = () => {
    return (
      <div >
        <h1>Обезличить документ</h1>
        <h2>Очистите ваш документ от персональных данных.</h2>
        <label className="btn btn-default file-select" >
          Выбрать файл
          <input type="file" accept=".xlsx,.docx,.pdf,.jpeg,.jpg,.png" multiple onChange={selectFiles} />
        </label>
      </div>
    );
  };

  const FilesUploadSelected: React.FC = () => {
    return (
      <div>
        <div className='preview'>
          {progressInfos &&
            progressInfos.length === 0 && (
              <Preview />
            )}
        </div>
        <button
          className="btn btn-success btn-sm file-upload"
          onClick={uploadFiles}
        >
          Обезличить
        </button>
      </div>
    );
  };

  return (
    <div>
      {progressInfos &&
        progressInfos.length > 0 && (
          <div className='card'>
            <div className='card-header'>
              Процесс загрузки
            </div>
            {progressInfos.map((progressInfo: ProgressInfo, index: number) => (
              <div className="mb-2" key={index}>
                <span>{progressInfo.fileName}</span>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-info"
                    role="progressbar"
                    aria-valuenow={progressInfo.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: progressInfo.percentage + "%" }}
                  >
                    {progressInfo.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      <div className="row my-3">
        {!selectedFiles && (
          <FilesUploadDefault />
        )}


        {selectedFiles && (
          <FilesUploadSelected />
        )}
      </div>

      {message.length > 0 && (
        <div className="alert alert-secondary" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          {fileInfos && fileInfos.length === 0 ? (
            <p>Загруженные файлы отобразятся здесь</p>
          ) : (
            <p>Загруженные файлы</p>
          )}
        </div>
        <ul className="list-group list-group-flush">
          {fileInfos &&
            fileInfos.map((file) => (
              <li className="list-group-item" key={file.id}>
                {links.has(file.id) ? (
                  <a target="_blank" rel='noreferrer' href={links.get(file.id)}>{file.name}</a>
                ) : (
                  <span>{file.name} (ссылка еще не доступна)</span>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FilesUpload;