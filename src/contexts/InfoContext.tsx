import React, { useEffect } from 'react';
import { axiosInstance } from '../axiosConfig';

interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  balance: number;
  address: string;
  isAdmin: boolean;
}

export const InfoContext = React.createContext<{
  info: User | undefined;
  isAdmin: boolean,
  isLoggedin: boolean,
  setInfo:(user: User | undefined) => void;
}>({
      info: undefined,
      isAdmin: false,
      isLoggedin: false,
      // eslint-disable-next-line no-console
      setInfo: (user) => { console.log(user); },
    });

type ProviderProps = {children: React.ReactNode};

export const InfoProvider = ({ children }: ProviderProps) => {
  const [info, setInfo] = React.useState<User>();
  const [isLoggedin, setIsLoggedIn] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(true);

  const handleInfo = (user : User | undefined) => {
    setInfo(user);
    setIsLoggedIn(user ? !!user?.email : false);
    setIsAdmin(user ? !!user?.isAdmin : false);

    console.log(user);
    console.log(user ? !!user?.email : false);
    console.log(user ? !!user?.isAdmin : false);
  };

  useEffect(() => {
    const get = async () => {
      try {
        const user = (await axiosInstance.get('user/check/auth')).data;
        setInfo(user);
        setIsLoggedIn(!!user?.email);
        setIsAdmin(!!user?.isAdmin);
      } catch (err) {
        setInfo(undefined);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };
    get();
  }, []);

  return (
    <InfoContext.Provider value={{
      info,
      isLoggedin,
      isAdmin,
      setInfo: handleInfo,
    }}
    >
      {children}
    </InfoContext.Provider>
  );
};
