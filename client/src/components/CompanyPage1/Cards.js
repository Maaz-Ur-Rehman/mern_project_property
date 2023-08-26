import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CompanyPage.css";
import house from "../../images/house.png";
import bath from "../../images/bath.png";
import bed from "../../images/bed.png";

function Cards(props) {

  // Load properties of project
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetch(`https://mefa-backend.herokuapp.com/project/${props.projectID}/properties`)
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.log(error));
  }, []) 

  return (
    <div className="company-featured">
      <div className="featured-cards">
        <button style={{'boxShadow': `0 0 20px ${props.textShadow ? "black" : props.color}`}} >
          <Link to={`/${props.companySlug}/${props.projectSlug}`} >
            <div className="Building-preview">
              <img src={props.image}></img>
            </div>
            <div 
              className="Building-name" 
              style={{'backgroundColor': props.color, 'color': props.textShadow ? 'black' : 'white'}}
              >
              {/* <p className="heading">{props.name}</p> */}
              <img src={house} style={{'filter': props.textShadow ? "invert(1)" : ""}} ></img>
              <p className="details">{properties.length ? properties.length : "Loading..."}</p>
            </div>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Cards;
