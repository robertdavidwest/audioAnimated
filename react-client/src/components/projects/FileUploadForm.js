import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@mui/material";

import { addFileAsync, writeFileAsync, getFileAsync } from "../../features";

const FileUploadForm = (props) => {
  const { projectId, userId, handleClose } = props;

  const [name, setName] = useState("");
  const [file, setFile] = useState({});

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      filePath: file.name,
      type: file.name.slice(-3),
      userId,
      projectId,
    };

    dispatch(addFileAsync(formData));
    dispatch(writeFileAsync({ projectId, filePath: file.name, file }));
    dispatch(getFileAsync({ fileLabel: name, projectId, filePath: file.name }));

    const fileInput = document.querySelector("#fileInput");
    fileInput.value = "";
    setName("");
    setFile({});
    handleClose();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">File Label: </label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="filePath">File: </label>
        <input
          id="fileInput"
          type="file"
          accept=".ogg, .mp3"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default FileUploadForm;
