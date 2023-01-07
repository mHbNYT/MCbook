import { useStyles } from "./styles";

interface Props {
  title: string;
  img: string;
  categoryTitle: string;
  numOfSales: number;
}

export const PanelBook : React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.salesCircle}>
        {props.numOfSales}
      </div>
      <img width={150} height={150} src={props.img} alt={props.title} />
      <p>
        {props.title}
      </p>
      <p style={{ marginTop: "-10px" }}>
        {props.categoryTitle}
      </p>
    </div>
  );
};
