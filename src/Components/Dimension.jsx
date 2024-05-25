import { useState, useEffect } from "react";
import styles from "../css/Dimension.module.css";
import PropTypes from "prop-types";

function Dimension({ imagedimension, onUpdateDimension }) {
  //   console.log(imagedimension);
  const [newWidth, setNewWidth] = useState(imagedimension.imagewidth);
  const [newHeight, setNewHeight] = useState(imagedimension.imageheight);
  useEffect(() => {
    setNewWidth(imagedimension.imagewidth);
    setNewHeight(imagedimension.imageheight);
  }, [imagedimension]);

  const handleWidthChange = (e) => {
    const newWidthValue = parseInt(e.target.value);
    setNewWidth(newWidthValue);
    onUpdateDimension(newWidthValue, newHeight);
  };

  const handleHeightChange = (e) => {
    const newHeightValue = parseInt(e.target.value);
    setNewHeight(newHeightValue);
    onUpdateDimension(newWidth, newHeightValue);
  };
  const handleResize = () => {
    onUpdateDimension(newWidth, newHeight);
  };
  return (
    <>
      <div className={styles["form-container"]}>
        <p className={styles["signup-link"]}>
          Here is the dimension of your image , resize the image by filling the
          required dimension of your choice
        </p>
        <form className={styles.form}>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Width</label>
            <input
              type="text"
              id="email"
              name="email"
              value={newWidth}
              onChange={handleWidthChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Height</label>
            <input
              type="text"
              id="email"
              name="email"
              value={newHeight}
              onChange={handleHeightChange}
              required
              className={styles.input}
            />
          </div>
          <button
            className={styles["form-submit-btn"]}
            type="button"
            onClick={handleResize}
          >
            RESIZE
          </button>
        </form>
      </div>
    </>
  );
}
Dimension.propTypes = {
  imagedimension: PropTypes.object.isRequired,
  onUpdateDimension: PropTypes.func.isRequired,
};
export default Dimension;
