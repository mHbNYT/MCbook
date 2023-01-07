/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState, useContext } from 'react';

// import Link from 'next/link';
import { useStyles } from "./styles";
import { InfoContext } from "../../contexts/InfoContext";
import { removeToken } from "../../axiosConfig";

export const Header: React.FC = () => {
  const classes = useStyles();

  const [bookLink, setBookLink] = useState('./');

  const user = useContext(InfoContext).info;
  const handleUser = useContext(InfoContext).setInfo;

  useEffect(() => {
    setBookLink(window.location.pathname === "/" ? "#books" : "./");
  });

  const logout = () => {
    removeToken();
    handleUser(undefined);
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.headerList}>
        <img
          src="/assets/images/book-shop.png"
          alt="logo"
          width={60}
          height={50}
        />
        <a href="./">خانه</a>
        <a href={bookLink}>کتاب‌ها</a>
        <a href="/admin-profile">پنل ادمین</a>
      </div>
      {user ? (
        <div className={classes.dropdown}>
          <button type="button" className={classes.dropbtn}>
            <ExpandMoreIcon />
            {user.firstName}
          </button>
          <div className={classes.dropdownContent}>
            <a href="./profile">پروفایل</a>
            <div onClick={logout}>خروج از حساب</div>
          </div>
        </div>
      ) : (
        <a href="./login">
          <button type="button" className={classes.loginbtn}>
            ورود
          </button>
        </a>
      ) }
    </div>
  );
};
