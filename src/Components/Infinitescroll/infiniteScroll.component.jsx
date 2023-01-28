import React, { useEffect, useRef, useState } from "react";
import classes from "./infiniteScroll.module.css";
import moment from "moment/moment";
import CircularProgress from "@mui/material/CircularProgress";
import SpotlightPopup from "./Component/spotlightPopup.component";
import Modal from 'react-modal';
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow placement="top" classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    maxWidth: "50rem",
    fontSize: theme.typography.pxToRem(14),
  },
}));


const useThrottledEffect = (callback, delay, deps = []) => {
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(function () {
      if (Date.now() - lastRan.current >= delay) {
        callback();
        lastRan.current = Date.now();
      }
    }, delay - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line
  }, [delay, ...deps]);
};

function InfiniteScroll() {
  const [isFetching, setIsFetching] = useState(true);
  const [openPreviewPopup, setOpenPreviewPopup] = useState(false);
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(1);
  const [modalData, setModalData] = useState({})
  const today = new Date();
  const initialDate = useRef(moment(today).subtract(1, "d").format("YYYY-MM-DD"));
  const getResponse = async (currentDate, finalDate) => {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=" +
        finalDate +
        "&end_date=" +
        currentDate +
        "&thumbs=true"
    );
    const tempData = await response.json();
    setData((val) => {
      return [...new Set([...val, ...tempData.reverse()])];
    });
    setIsFetching(false);
    setRowCount(rowCount+1);
  }

  function handleScroll(e) {
    if (window?.innerHeight + e?.target?.documentElement?.scrollTop >= e?.target?.documentElement?.offsetHeight) return;
    setIsFetching(true);
  }


  useThrottledEffect(() => {
    window.addEventListener("scroll", (e) => handleScroll(e));
    return () => window.removeEventListener("scroll", (e) => handleScroll(e));
  }, 1000);

  useEffect(() => {
    if (!isFetching) return 
    else {
      let currentDate = initialDate?.current
      let finalDate = moment(currentDate).subtract((6), "d").format("YYYY-MM-DD");
      initialDate.current = moment(finalDate).subtract((1), "d").format("YYYY-MM-DD");
      getResponse(currentDate, finalDate);
     } // eslint-disable-next-line
  }, [isFetching]); 

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
    }
};

  const handleOpenPopup = (e, itm) => {
    setOpenPreviewPopup(true)
    e.preventDefault();
    setModalData(itm)
  }

  return (
    <>
      <div className={classes.infiniteContainer}>
        {data?.map((itm) => (
          <>
            <div key={itm?.title} className={classes.tileData} onClick={((e)=>{handleOpenPopup(e, itm)})}>
              <img
                src={
                  itm?.media_type === "video" ? itm?.thumbnail_url : itm?.url
                }
                alt={itm?.title}
                className={classes.thumbnail}
                loading="lazy"
              />
              <BootstrapTooltip title={itm?.title}>
                <div className={`${classes.tileText} ${classes.ellipsis}`}>{itm?.title}</div>
              </BootstrapTooltip>
              <div className={classes.tileText}>{itm?.date}</div>
            </div>
          </>
        ))}
      </div>
      {isFetching && (
        <div className={`${classes["linkingBg"]}`}>
          <CircularProgress style={{'color': 'yellow', 'backgroundColor': '#041226'}} size={50} />
        </div>
      )}
      <Modal isOpen={openPreviewPopup} style={customStyles} ariaHideApp={false} overlayClassName={classes.overlay}>
        <SpotlightPopup modalData={modalData} setOpenPreviewPopup={setOpenPreviewPopup}/>
      </Modal>
    </>
  );
}

export default InfiniteScroll;
