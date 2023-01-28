import React, { useEffect, useState } from "react";
import classes from "./spotlight.module.css";
import moment from "moment/moment";
import CircularProgress from "@mui/material/CircularProgress";
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

function Spotlight() {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const today = new Date();
  let initialDate = moment(today).format("YYYY-MM-DD");
  let finalDate;
  async function getResponse() {
    setIsFetching(true);
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=" +
        initialDate +
        "&end_date=" +
        initialDate +
        "&thumbs=true"
    );
    const tempData = await response.json();
    setData(tempData);
    initialDate = finalDate;
    setIsFetching(false);
  }
  useEffect(() => {
    getResponse(); // eslint-disable-next-line
  }, []);
  return (
    <>
      {isFetching ? (
        <div className={`${classes["linkingBg"]}`}>
          <CircularProgress style={{'color': 'yellow', 'backgroundColor': '#041226'}} size={50} />
        </div>
      ) : (
        <div className={classes.spotlightContainer}>
          <div className={classes.leftPart}>
            <div>
              <span className={classes.sectionHeading}>Title:</span>{" "}
              {data?.[0]?.title}
            </div>
            <div
              className={
                data?.[0]?.explanation?.length > 100 && classes.ellipsis
              }
            >
              <span className={classes.sectionHeading}>Description:</span>{" "}
              <BootstrapTooltip title={data?.[0]?.explanation}>
                <span>{data?.[0]?.explanation}</span>
              </BootstrapTooltip>
            </div>
            <div>
              <span className={classes.sectionHeading}>Author:</span>{" "}
              {data?.[0]?.copyright || "N/A"}
            </div>
            <div>
              <span className={classes.sectionHeading}>Date:</span>{" "}
              {data?.[0]?.date || "N/A"}
            </div>
          </div>
          <div className={classes.rightPart}>
            <img
              src={
                data?.[0]?.media_type === "video"
                  ? data?.[0]?.thumbnail_url
                  : data?.[0]?.url
              }
              alt="new"
              className={classes.thumbnail}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Spotlight;
