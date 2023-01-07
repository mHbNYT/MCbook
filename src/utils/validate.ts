// eslint-disable-next-line @typescript-eslint/naming-convention
export type validationType = string | null;

// eslint-disable-next-line no-useless-escape
export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const charCodeZero = '0'.charCodeAt(0);
const charCodeNine = '9'.charCodeAt(0);
const charCodeZeroPersian = '۰'.charCodeAt(0);
const charCodeNinePersian = '۹'.charCodeAt(0);
const charCodeZeroArabic = '٠'.charCodeAt(0);
const charCodeNineArabic = '٩'.charCodeAt(0);
const isCharacterPersianNumber = (ch: string) => ch.charCodeAt(0) >= charCodeZeroPersian
&& ch.charCodeAt(0) <= charCodeNinePersian;
const isCharacterArabicNumber = (ch: string) => ch.charCodeAt(0) >= charCodeZeroArabic
&& ch.charCodeAt(0) <= charCodeNineArabic;
const isCharacterEnglishNumber = (ch: string) => ch.charCodeAt(0) >= charCodeZero
&& ch.charCodeAt(0) <= charCodeNine;
const convertPersianToEnglish = (ch: string) => String.fromCharCode(ch.charCodeAt(0) - 1728);
const convertArabicToEnglish = (ch: string) => String.fromCharCode(ch.charCodeAt(0) - 1584);
const convertCharToEnglish = (ch: string) => {
  if (isCharacterPersianNumber(ch)) { return convertPersianToEnglish(ch); }
  if (isCharacterArabicNumber(ch)) { return convertArabicToEnglish(ch); }
  if (isCharacterEnglishNumber(ch)) { return ch; }
  return ch;
};

const phoneNumberLength = 11;
export const FaAndArNumbersToEn = (value: string) => value.split('').map((ch) => convertCharToEnglish(ch)).join('');

export const isPhoneNumber = (phone: string) => (phone.length === phoneNumberLength) && (!(phone.split('').filter((char) => !isCharacterEnglishNumber(char))));
export const isNumber = (input: string) => !(input.split('').find((c) => (c.charCodeAt(0) < charCodeZero || c.charCodeAt(0) > charCodeNine)
        && (c.charCodeAt(0) < charCodeZeroPersian || c.charCodeAt(0) > charCodeNinePersian)));

export const isName = (input: string) => !(input.split('').find((c) => (c.charCodeAt(0) >= charCodeZero && c.charCodeAt(0) <= charCodeNine)
        || (c.charCodeAt(0) >= charCodeZeroPersian && c.charCodeAt(0) <= charCodeNinePersian)));

// TODO: investigate the necessity of isEmail in the codebase and remove it
// export const isEmail = (email : string) => true && email;

const validationConditions = {
  password: {
    minLength: 8,
    required: true,
    maxLength: 255,
  },
  // passwordConfirm: {
  //   minLength: 6,
  //   required: true,
  // },
  phoneNumber: {
    maxLength: 255,
    minLength: 7,
    required: true,
  },
  // dateOfBirth: {
  //   required: true,
  // },
  name: {
    required: false,
    maxLength: 255,
  },
  lastName: {
    required: false,
    maxLength: 255,
  },
  email: {
    required: true,
    maxLength: 255,
  },
  // date: {
  //   required: true,
  // },
};

const errors = {
  phoneNumber_empty_err: 'شماره تلفن نمی تواند خالی باشد',
  phoneNumber_length_err: `شماره تلفن باید حداقل ${validationConditions.phoneNumber.minLength.toString()} رقم باشد`,
  password_empty_err: 'رمز عبور نمی تواند خالی باشد',
  password_short_err: `رمز عبور باید حداقل ${validationConditions.password.minLength.toString()} کاراکتر باشد`,
  password_dontMatch_err: 'رمز عبورها مطابقت ندارند',
  name_empty_err: 'نام نمی تواند خالی باشد',
  lastName_empty_err: 'نام خانوادگی نمی تواند خالی باشد',
  email_empty_err: 'ایمیل نمی تواند خالی باشد',
  email_notValid_err: 'ایمیل معتبر نیست',
  dateOfBirth_empty_err: 'تاریخ نمی تواند خالی باشد',
  date_empty_err: 'تاریخ تحویل نمیتواند خالی باشد',
};

export const validatePhoneNumber = (phoneNumber: string): validationType => {
  if (!phoneNumber) {
    if (validationConditions.phoneNumber.required) { return errors.phoneNumber_empty_err; }
  } else if (phoneNumber.length < validationConditions.phoneNumber.minLength
    || phoneNumber.length > validationConditions.phoneNumber.maxLength) {
    return errors.phoneNumber_length_err;
  }
  return null;
};

export const validatePassword = (password: string): validationType => {
  if (!password) {
    if (validationConditions.password.required) { return errors.password_empty_err; }
  } else if (password.length < validationConditions.password.minLength
    || password.length > validationConditions.password.maxLength) {
    return errors.password_short_err;
  } else if (/\d/.test(password) && /[a-zA-Z]/g.test(password)) {
    return null;
  }
  return "رمز عبور باید شامل عدد و حروف باشد";
};

// export const validateConfirmPassword =
//  (password: string) => (passwordConfirm: string): validationType => {
//   if (!passwordConfirm) {
//     if (validationConditions.passwordConfirm.required) { return errors.password_empty_err; }
//   } else if (passwordConfirm.length < validationConditions.password.minLength) {
//     return errors.password_short_err;
//   } else if (password !== passwordConfirm) {
//     return errors.password_dontMatch_err;
//   }
//   return null;
// };

export const validateName = (name: string): validationType => {
  if (!name) {
    if (validationConditions.name.required) { return errors.name_empty_err; }
  } else if (name.length > validationConditions.name.maxLength) { return "اندازه اسم نامعتبر است"; }
  return null;
};

export const validateLastName = (lastName: string): validationType => {
  if (!lastName) {
    if (validationConditions.lastName.required) { return errors.lastName_empty_err; }
  } else if (lastName.length > validationConditions.lastName.maxLength) { return "اندازه اسم نامعتبر است"; }
  return null;
};

export const validateEmail = (email: string, required: boolean = true): validationType => {
  if (!email) {
    if (required && validationConditions.email.required) {
      return errors.email_empty_err;
    }
  } else if (email.length > validationConditions.email.maxLength) { return "اندازه ایمیل نامعتبر است"; } else if (!emailRegex.test(String(email).toLowerCase())) {
    return errors.email_notValid_err;
  }
  return null;
};

// export const validateDate = (
//   date: MaterialUiPickersDate,
// ): validationType => {
//   if (!date) {
//     if (validationConditions.date.required) { return errors.date_empty_err; }
//   }
//   return null;
// };
