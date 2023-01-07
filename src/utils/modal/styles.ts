import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => createStyles({
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: 100,
    background: "rgba(0, 0, 0, 0.6)",
  },
  modalMain: {
    position: "fixed",
    background: "white",
    zIndex: 100,
    width: 450,
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButton: {
    margin: 10,
    alignSelf: 'flex-start',
    // position: 'absolute',
    // right: 0,
  },

  show: {
    display: "block",
  },
  hide: {
    display: "none",
  },
}));
