/* eslint-disable react/button-has-type */
import { useStyles } from "./styles";

export enum SortBy {
  HighRents,
  LowRents,
}

interface Props {
  value: SortBy;
  onChange: (val: SortBy) => void;
}
export const SortByComp: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <p> مرتب سازی بر اساس: </p>
      <button
        onClick={() => props.onChange(SortBy.HighRents)}
        className={`${classes.button} ${props.value === SortBy.HighRents && classes.selectedButton}`}
      >
        پرطرفدارترین
      </button>
      <button
        onClick={() => props.onChange(SortBy.LowRents)}
        className={`${classes.button} ${props.value === SortBy.LowRents && classes.selectedButton}`}
      >
        کم‌طرفدارترین
      </button>
    </div>
  );
};
