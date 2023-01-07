import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => createStyles({
  row: {
    display: 'flex',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // minHeight: "calc(100vh - 130px)",
  },
  balanceLine: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
  },
  greeting: {
    fontWeight: 600,
    fontSize: "140%",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#ffd52e",
    borderRadius: "25px",
    border: "none",
    boxSizing: "border-box",
    cursor: "pointer",
    // fontFamily: 'inherit',
    fontWeight: 600,
    display: "inline-block",
    height: 40,
    width: 150,
    marginTop: 30,
    maxWidth: "100%",
    overflow: "hidden",
    outline: "none",
    position: "relative",
    textAlign: "center",
    textOverflow: "ellipsis",
    transition: "background-color 0.2s, opacity 0.2s",
    whiteSpace: "nowrap",
    '&:hover': {
      backgroundColor: '#e6c029',
    },
  },
}));
