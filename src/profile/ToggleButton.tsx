import { useStyles } from "./style";

interface Props {
  value: number;
  onChange: (val: number) => void;
  labels: string[]
}

export const ToggleButton: React.FC<Props> = (props) => {
  const classes = useStyles();

  const handleChange = (value: number) => () => props.onChange(value);
  return (
    <div style={{ margin: "15px 0" }}>
      {props.labels.map((label, index) => (
        <button
          type="submit"
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={handleChange(index)}
          className={`${index === props.labels.length - 1 && classes.leftestButton} 
          ${index === 0 && classes.rightestButton}
            ${classes.button} ${props.value === index && classes.selected} `}
        >
          {label}
        </button>
      ))}
      {/* <button onClick={handleChange(1)}
        className={`${classes.button}
         ${props.value === 1 && classes.selected} `}> رسیدها </button> */}
    </div>
  );
};
