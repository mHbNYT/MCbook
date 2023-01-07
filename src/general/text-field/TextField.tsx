import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { validationType } from "../../utils/validate";
import { useStyles } from "./styles";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  error?: validationType;
  width?: number | string;
  height?: number | string;
}

export const TextField: React.FC<Props> = (props) => {
  const {
    label, width, height, ...rest
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.container}>

      <div className={classes.labelContainer}>
        {props.label}
      </div>
      <div>
        <input
          {...rest}
          className={classes.input}
          style={{
            height: props.height || "100%",
            width: props.width || "initial",
            border: props.error ? "1px solid #f00" : undefined,
          }}
        />
        {!!props.error && (
          <p className={classes.err}>
            {props.error}
          </p>
        )}
      </div>
    </div>
  );
};
