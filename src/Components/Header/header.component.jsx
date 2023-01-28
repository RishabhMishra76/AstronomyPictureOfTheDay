import React from "react";
import nasaIcon from "../../Assets/Icons/nasaIcon.svg";
import classes from "./header.module.css";

function Header() {
  return (
    <>
      <div className={classes.headerContainer}>
        <div>
          <img src={nasaIcon} alt="NASA logo" className={classes.headerIcon} />
        </div>
        <div>
          <div className={classes.rightSideText}>
            <div>Astronomy picture</div>
            <div> of the day</div>
          </div>
          <p className={classes.copyRight}>Copyright &#169; 2023 Rishabh Mishra</p>
        </div>
      </div>
      <div className={classes.stars}></div>
      <div className={classes.twinkling}></div> 
    </>
  );
}

export default Header;
