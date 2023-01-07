// eslint-disable-next-line import/no-cycle
import { Invoice } from "../../../pages/profile";
import { useStyles } from "./styles";

interface Props {
  tableHeaders: string[],
  data: Invoice[],
}

export const Table: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={`${classes.row} ${classes.header}`}>
        {props.tableHeaders.map((header) => (
          <p>
            {header}
          </p>
        ))}
      </div>
      {props.data.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={classes.row} key={index}>
          <p>
            {item.traceNumber}
          </p>
          <p>
            {item.book.name}
          </p>
          <p>
            {new Intl.DateTimeFormat('fa-IR').format(new Date(item.dateCreated))}
          </p>
          <p>
            {new Intl.DateTimeFormat('fa-IR').format(new Date(item.dueDate)) }
          </p>
        </div>
      ))}
    </div>
  );
};
