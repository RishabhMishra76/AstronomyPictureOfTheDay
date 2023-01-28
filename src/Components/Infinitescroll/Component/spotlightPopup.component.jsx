import React from "react";
import classes from "./spotlightPopup.module.css";
import closeIcon from "../../../Assets/Icons/closeIcon.svg"
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

function SpotlightPopup({modalData, setOpenPreviewPopup}) {
    const handleClosePopup = (e) => {
        e.preventDefault();
        setOpenPreviewPopup(false)
    }

    console.log(modalData)

  return (
    <>
        <div className={classes.modalContent}>
            <img src={closeIcon} alt="close-icon" className={classes.closeIcon} onClick={(e)=>handleClosePopup(e)}/>
            <a target="_blank" href={modalData.url} rel="noreferrer">
                <img
                src={
                    modalData?.media_type === "video"
                    ? modalData?.thumbnail_url
                    : modalData?.url
                }
                alt="new"
                className={classes.thumbnail}
                loading="lazy"
                />
            </a>
            <div className={classes.title}><strong>{modalData.title}</strong></div>
            <div className={classes.extraInfo}>
                <div className={classes.date}><strong>Date:</strong> {modalData.date}</div>
                <div className={classes.date}><strong>Author:</strong> {modalData.copyright ? <em>{modalData.copyright}</em> : "N/A"}</div>
            </div>
            <BootstrapTooltip title={modalData?.explanation}>
            <div className={classes.desc}>{modalData?.explanation}</div>
            </BootstrapTooltip>
        </div>
    </>
  );
}

export default SpotlightPopup;
