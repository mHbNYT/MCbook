import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => createStyles({
  container: {
    // minHeight: "100vh",
    // padding: "0",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "flex-start",
    // backgroundColor: "#f7f7f7",
    // alignItems: "center",
    // maxWidth: "100%",
    // // fontFamily: "IranSANS",
    // direction: "rtl",
    // width: "100%",
    backgroundColor: 'white',
    padding: "20px 50px",
  },
  header: {
    color: "#aaa",
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
      // margin: 'auto',
      minWidth: 200,
      // textAlign: 'right',
      // marginLeft: 100,
    },
  },
}));
