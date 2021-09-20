import React, { useState } from "react";

import styles from "./UploadPhoto.module.scss";

const Upload = () => {
  const [url, setUrl] = useState(null);
  const [uploadImage, setUploadImage] = useState(false);

  const changeFileHandler = (e) => {
    setUploadImage(!uploadImage);
    const tmppath = URL.createObjectURL(e.target.files[0]);
    setUrl(tmppath);
  };

  return (
    <div className={styles.userImage}>
      <label
        onClick={() => {
          setUploadImage(!uploadImage);
        }}
        className={styles.userImage__label}
        htmlFor="12pro"
      >
        <input
          id="12pro"
          type="file"
          onChange={changeFileHandler}
          className={styles.userImage__label__inp}
        />
      </label>
      {!uploadImage ? null : (
        <img className={styles.userImage__image} src={url} alt="" />
      )}
      {uploadImage ? null : (
        <p className={styles.userImage__text}>Upload Image</p>
      )}
    </div>
  );
};

export default Upload;
