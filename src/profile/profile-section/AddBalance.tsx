import React from 'react';
import { useStyles } from './styles';

interface Props {
  balance: number;
  name: string;
  onSubmit: () => void;
}

export const AddBalance: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.balanceLine}>
      <p className={classes.greeting}>
        {`${props.name} عزیز، خوش آمدید`}
      </p>
    </div>
  );
};
