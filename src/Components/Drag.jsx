import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../css/Drag.module.css"; // Ensure the correct path to your CSS module

function Drag({ onimageupload }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [imgHeight, setHeight] = useState(0);
  const [imgWidth, setWidth] = useState(0);
  const [resizedImageURL, setResizedImageURL] = useState("");

  // Function to resize the image

  const resizeImage = (width, height) => {
    if (!selectedImage || width === 0 || height === 0) return;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      const resizedURL = canvas.toDataURL(selectedImage.type);
      setResizedImageURL(resizedURL);
    };
    img.src = URL.createObjectURL(selectedImage);
  };

  // Function to handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageURL(URL.createObjectURL(file));
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        console.log(`Uploaded image dimensions: ${width} x ${height}`);
        setHeight(height);
        setWidth(width);
        onimageupload({ imageheight: height, imagewidth: width });
      };
      img.src = URL.createObjectURL(file);
    }
  };

  // Effect to resize the image when dimensions change
  useEffect(() => {
    if (selectedImage) {
      resizeImage(imgWidth, imgHeight);
    }
  }, [imgWidth, imgHeight, selectedImage]);

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setImageURL("");
    setResizedImageURL("");
  };

  // Function to download the resized image
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resizedImageURL;
    link.download = "resized_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {imageURL ? (
          <div className={styles.imagePreview}>
            <img src={imageURL} alt="Selected" className={styles.image} />
            <svg
              onClick={handleDeleteImage}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.deleteIcon}
            >
              <path
                d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                stroke="#000000"
                strokeWidth="2"
              ></path>
              <path
                d="M19.5 5H4.5"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
              <path
                d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                stroke="#000000"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
            <p>Browse File to upload!</p>
          </>
        )}
      </div>
      <label htmlFor="file" className={styles.footer}>
        <svg
          fill="#000000"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
            <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
          </g>
        </svg>
        <p>{selectedImage ? "File selected" : "No file selected"}</p>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
              stroke="#000000"
              strokeWidth="2"
            ></path>
            <path
              d="M19.5 5H4.5"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
            <path
              d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
              stroke="#000000"
              strokeWidth="2"
            ></path>
          </g>
        </svg>
      </label>
      <input
        id="file"
        type="file"
        className={styles.file}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {resizedImageURL && (
        <button onClick={handleDownload}>Download Resized Image</button>
      )}
    </div>
  );
}

Drag.propTypes = {
  onimageupload: PropTypes.func.isRequired, // Add prop validation
};

export default Drag;
