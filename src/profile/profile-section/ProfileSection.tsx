import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useStyles } from './styles';
import { TextField } from "../../general/text-field/TextField";
import { axiosInstance } from '../../axiosConfig';
import {
  isName, validatePassword, validateName, validateLastName,
} from '../../utils/validate';
import { SignUpState } from '../../../pages/sign-up';
import { ToggleButton } from '../ToggleButton';

interface State extends Omit<SignUpState, 'email'> {}

const ProfileSection : React.FC<{toggle: number;
  handleToggle: (val: number) => void}> = (props) => {
  const classes = useStyles();
  const [state, setState] = useState<State>({
    password: '',
    firstName: '',
    lastName: '',
    firstNameError: null,
    lastNameError: null,
    emailError: null,
    passwordError: null,
  });

  useEffect(() => {
    const get = async () => {
      try {
        const res = await axiosInstance.get('/user');
        setState({ ...state, ...res.data });
      } catch (err) {
        console.error(err);
      }
    };
    get();
  }, []);

  const handleChangePassword = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setState({
      ...state,
      password: target.value,
      passwordError: null,
    });
  };

  const handleChangeName = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    if (isName(target.value)) {
      setState({
        ...state,
        firstName: target.value,
        firstNameError: null,
      });
    }
  };

  const handleChangeLastName = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    if (isName(target.value)) {
      setState({
        ...state,
        lastName: target.value,
        lastNameError: null,
      });
    }
  };

  const getRegisterFirstName = () => state.firstName;

  const getRegisterLastName = () => state.lastName;

  const getRegisterPassword = () => state.password;

  const getRegisterParams = () => ({
    firstName: getRegisterFirstName(),
    lastName: getRegisterLastName(),
    password: getRegisterPassword() ? getRegisterPassword() : undefined,
  });

  const formIsNotValid = () => !!validateName(state.firstName)
  || !!validateLastName(state.lastName);

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setState({
      ...state,
      firstNameError: validateName(state.firstName),
      lastNameError: validateLastName(state.lastName),
    });
    const params = getRegisterParams();
    if (!formIsNotValid()) {
      try {
        if (state.password ? !!validatePassword(state.password) : false) {
          setState({
            ...state,
            passwordError: validatePassword(state.password),
          });
          return;
        }
        await axiosInstance.patch("/user", params);
        toast("ویرایش موفقیت آمیز", { type: "success" });
      } catch (err: any) {
        toast("ویرایش ناموفق", { type: "error" });
      }
    }
  };

  return (
    <div className={classes.main}>
      <ToggleButton
        labels={['رسیدها', 'پروفایل'].reverse()}
        value={props.toggle}
        onChange={props.handleToggle}
      />
      <div>
        <div className={classes.row}>
          <TextField error={state.firstNameError} onChange={handleChangeName} width={200} label="نام" value={state.firstName} />
          <TextField error={state.lastNameError} onChange={handleChangeLastName} width={200} label="نام خانوادگی" value={state.lastName} />
        </div>
        <div className={classes.row}>
          <TextField error={state.passwordError} onChange={handleChangePassword} width={530} label="رمزعبور" value={state.password} type="password" />
        </div>
      </div>
      <button onClick={handleSubmit} type="submit" className={classes.button}> ویرایش اطلاعات </button>
    </div>
  );
};

export default ProfileSection;
