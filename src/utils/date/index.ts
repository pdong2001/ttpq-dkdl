import moment from 'moment';
import { CustomDate } from '~/dtos/Date/CustomDate';

export const convertDateStringToObject = (dateString): CustomDate => {
  const date = new Date(dateString);

  //@ts-ignore
  if (date && !isNaN(date)) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatedDate = day < 10 ? `0${day}` : day;
    const formatedMonth = month < 10 ? `0${month}` : month;

    return { date: formatedDate, month: formatedMonth, year };
  }
  return { date: '', month: '', year: '' };
};

export const convertToAppDateTime = (dateTime) => {
  if (!dateTime) return null;
  return moment(dateTime).format('HH:mm DD-MM-YYYY');
};
