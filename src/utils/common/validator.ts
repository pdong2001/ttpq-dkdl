type Date = {
  year: any;
  month: any;
  day: any;
};

const validateCalenderDate = ({ year, month, day }: Date) => {
  if (day == 31 && (month == 4 || month == 6 || month == 9 || month == 11)) {
    return false; // 31st of a month with 30 days
  } else if (day >= 30 && month == 2) {
    return false; // February 30th or 31st
  } else
    return !(month == 2 && day == 29 && !(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)));
};
const Validator = {
  validateCalenderDate,
};

export default Validator;
