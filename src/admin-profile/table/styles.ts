import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => createStyles({
  container: {
    backgroundColor: 'white',
    padding: "20px 50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "#aaa",
  },
  createBookButton: {
    backgroundColor: "#02c3d9",
    borderRadius: "25px",
    border: "none",
    color: "#fff",
    boxSizing: "border-box",
    cursor: "pointer",
    // fontFamily: "inherit",
    fontWeight: 600,
    display: "inline-block",
    height: 40,
    width: 180,
    margin: 20,
    maxWidth: "100%",
    overflow: "hidden",
    outline: "none",
    position: "relative",
    textAlign: "center",
    textOverflow: "ellipsis",
    transition: "background-color 0.2s, opacity 0.2s",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: "#02aabd",
    },
  },
  categoryOperation: {
    cursor: 'pointer',
    '&:hover': {
      color: '#02c3d9',
    },
  },
  row: {
    display: 'flex',
    padding: 10,
    fontSize: 13,
    borderBottom: "1px solid #ddd",
    width: "100%",
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& p': {
      minWidth: 150,
    },
    '& button': {
      margin: "0 10px",
      minWidth: 75,
    },
  },
}));
