import React, { useState } from "react";
import location from "../../images/locationBlack.png";
import "./ImageSlider.css";

function ImageSlider(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + props.images.length) % props.images.length
    );
  };

  return (
    <div className="results">
      <div className="image-slider">
        <img
          src={props.images[currentImageIndex]}
          alt="Slider"
          className="slider-image"
        />

        <button
          className="slider-button slider-button-left"
          onClick={prevImage}
        >
          &lt;
        </button>
        <button
          className="slider-button slider-button-right"
          onClick={nextImage}
        >
          &gt;
        </button>
      </div>

      <div className="info">
        <h2 className={"flat-info-box-title" + (props.textShadow ? " text-shadow-s" : "")} style={{"color": props.color}}>Spacious Apartment</h2>
        <p className="flat-info-box-description">
          {props.description}
        </p>
        <div className={"values" + (props.textShadow ? " text-shadow-s" : "")} style={{"color": props.color}}>
          <h4>{props.price}</h4>
          <h4>{props.space}</h4>
          <h4>{props.rooms}</h4>
          <h4>{props.totalSpace}</h4>
        </div>

        <div className="inputs">
          <p>Preis</p>
          <p>Wohnfläche</p>
          <p>Räume</p>
          <p>Grundstück</p>
        </div>
        <HeroLine color={props.color}/>

        <div className="bottom">
          <img src={location}></img> {/* TODO EITHER USE SVG OR CANVAS TO FIT COLOUR SCHEME */}
          <p className={props.textShadow ? "text-shadow-s" : ""} style={{"color": props.color}}>{props.Location}</p>
          <button className={props.textShadow ? "text-shadow-s" : ""} style={{"backgroundColor": props.color}}>KONTAKTIEREN</button>
        </div>
      </div>
    </div>
  );

  function HeroLine(props) {
    return (
      <div className="line">
        <span style={{"backgroundColor": props.color}} />
      </div>
    );
  }
}

export default ImageSlider;
