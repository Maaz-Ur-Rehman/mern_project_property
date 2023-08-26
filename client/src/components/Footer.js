import React from "react";
import footer from "../images/footer_logo.png";
import "../css/footer.css";

function Footer(props) {
  const {dynamicData} = props;

  return (
    <footer 
      className={`footer ${props.pageType}`} 
      style={{
        "backgroundColor": dynamicData.color,
        "color": dynamicData.textShadow ? "black" : "white"
      }}
    >
      <div className="container">
        <span>
          <a href="/" alt="">
            <img src={footer} alt="" style={{'filter': dynamicData.textShadow ? 'invert(1)' : ''}} ></img>
          </a>
        </span>
        <span>
          <h4>TITLE</h4>
          <p>
            MEFA-MEFA MEFA-MEFA MEFA-MEFA MEFA-MEFA MEFA-MEFA MEFA-MEFA
            MEFA-MEFA
          </p>
        </span>

        <span>
          <h4>TITLE</h4>
          <p>
            MEFA-MEFA MEFA-MEFA MEFA-MEFA MEFA-MEFA MEFA-MEFA MEFA-MEFA
            MEFA-MEFA
          </p>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
