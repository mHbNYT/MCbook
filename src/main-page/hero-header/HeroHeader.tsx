import React from 'react';
import { useStyles } from './styles';

export const HeroHeader: React.FC<{handleSearch: (val: string) => void}> = (props) => {
  const classes = useStyles();

  const handleChange = (e: any) => {
    props.handleSearch(e.target.value);
  };

  return (
    <div className={classes.main}>
      <div
        style={{ backgroundColor: "#ff692e" }}
        className={classes.orangeBox}
      />
      <div className={classes.container}>
        <div className={classes.text}> در کتاب‌ها سایت جستجو کنید.. </div>

        <input onChange={handleChange} placeholder="نام کتاب خود را وارد کنید..." className={classes.input} />
        <button type="submit" style={{ marginBottom: 100 }} className={classes.button}>
          جستجو کنید
        </button>
      </div>
    </div>
  );
};
