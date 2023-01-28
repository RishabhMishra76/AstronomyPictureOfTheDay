import React, { useState } from "react";
import Header from "./Header/header.component";
import Spotlight from "./Spotlight/spotlight.component";
import InfiniteScroll from "./Infinitescroll/infiniteScroll.component";
import classes from "./mainComp.module.css"

function MainComp() {
  const [data, setData] = useState([]);
  return (
    <div className={classes.mainCont}>
      <Header />
      <Spotlight />
      <InfiniteScroll data={data} setData={setData}/>
    </div>
  );
}

export default MainComp;
