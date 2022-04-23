import React, { useState, useEffect } from "react";
import "./slider.css";
import axios from "axios";

export default function Slider() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(1);

  const api =
    "https://api.unsplash.com/photos/?client_id=oxCMDqKLvexYEzu98rIRCCaKpXlRTTtDq-WekE-ZAI4";

  useEffect(() => {
    async function fetchingIMages() {
      const response = await axios.get(api);
      const data = await response.data;

      const images = [];
      for (const object of data) {
        images.push(object.urls.full);
      }

      setImages(images);
    }

    fetchingIMages();
  }, []);

  
 

  function nextImage() {
    if (index === images.length - 1) setIndex(0);
    else setIndex(index + 1);
  }

  function prevImage() {
    if (index === 0) setIndex(images.length - 1);
    else setIndex(index - 1);
  }
  return (
    <div className="slider">
      <button className="prev" onClick={prevImage}>
        &laquo; Previous
      </button>
      <button className="next" onClick={nextImage}>
        Next &raquo;
      </button>

      <div className="slides" style={{ marginLeft: `-${index * 100}%` }}>
        {images.map((imgUrl, i) => (
          <div key={i} className="image-container">
            <img key={i} src={imgUrl} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
