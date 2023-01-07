import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => createStyles({
  container: {

  },
  toggle: {
  },
  leftestButton: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightestButton: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    color: "#777",
    outline: 0,
    padding: 15,
    border: "1px solid #eee",
  },
  selected: {
    backgroundColor: "#bbb",
    color: "#000",
  },
}));
