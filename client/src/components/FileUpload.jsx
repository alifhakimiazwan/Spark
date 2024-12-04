import React, { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const FileUpload = ({ account, provider, contract }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `a542424cba3f9ab221f8`,
            pinata_secret_api_key: `cbf38414bf678d3dfe48726213f55f56920b9324e9ea878be81b046493626a33`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        alert(`Image Uploaded to IPFS`);
        setFileName("No file chosen");
        setFile(null);
      } catch (e) {
        alert(e);
      }
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFile(file);
    };
    console.log(file.name);
    setFileName(file.name);
  }, []);
  return (
    <form
      className="top flex flex-col justify-center items-center form bg-white p-6 rounded-lg shadow-lg space-y-6 w-full py-7 mb-10"
      onSubmit={handleSubmit}
    >
      <p className="text-navy font-medium">Please upload image</p>

      <div className="bg-base-100 p-6 rounded-lg shadow-inner w-full max-w-md">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps({
                className: `choose w-full text-center border-2 border-dashed border-teal text-gray-300 font-semibold py-8 px-4 rounded-lg cursor-pointer hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  isDragActive ? "border-solid border-indigo-700" : ""
                }`,
                onDrop: (event) => event.stopPropagation(),
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p className="font-light text-navy">
                  Drag 'n' drop some files here,<br></br> or click to select
                  files
                </p>
              )}
            </div>
          )}
        </Dropzone>
      </div>

      {fileName && <p className="text-gray-500">{fileName}</p>}
      <button
        type="submit"
        className="btn bg-teal text-white font-light py-2 px-7 rounded-lg"
      >
        Upload
      </button>
    </form>
  );
};
export default FileUpload;
