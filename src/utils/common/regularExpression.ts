// regex phone
export const REGEX_PHONE = new RegExp(/^0*(9|3|8|7|5)+([0-9]{8})$/);
export const REGEX_YEAR = new RegExp(/^(19|20)+([0-9]{2})$/);
export const REGEX_YEAR_MONTH_DAY = new RegExp(
  /^(0*[1-9]|[12][0-9]|3[01])[- /.](0*[1-9]|1[012])[- /.](19|20)\d\d$/, // ex: 1997-03-19
);
