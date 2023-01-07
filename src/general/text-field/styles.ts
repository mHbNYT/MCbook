import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    padding: 5,
    marginBottom: 20,
  },
  labelContainer: {
    backgroundColor: "#02c3d9",
    padding: 5,
    minWidth: 100,
    textAlign: 'center',
    color: "#fff",
  },
  err: {
    color: "red",
    fontSize: "60%",
    marginRight: 5,
    position: 'absolute',
  },
  input: {
    outline: 'none',
    border: 0,
    padding: "5px 10px",
    '&::placeholder': {
      color: "#bbb",
    },
  },
}));
