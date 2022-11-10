export const convertDateStringToObject = (dateString) => {
  const date = new Date(dateString);
  console.log('date', date);

  if (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { day, month, year };
  }
};
