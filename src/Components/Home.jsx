import { useState } from "react";
import styles from "../css/Home.module.css";
import Dimension from "./Dimension";
import Drag from "./Drag";
function Home() {
  const [imageData, setimageData] = useState({});
  const handleimageData = (data) => {
    setimageData(data);
  };
  const handleDimensionUpdate = (width, height) => {
    setimageData({ imagewidth: width, imageheight: height });
  };
  //   console.log(imageData);
  return (
    <>
      <main className={styles.homebody}>
        <Drag onimageupload={handleimageData} />
        <Dimension
          imagedimension={imageData}
          onUpdateDimension={handleDimensionUpdate}
        />
      </main>
    </>
  );
}

export default Home;
