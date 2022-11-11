export const convertDateStringToObject = (dateString) => {
  const date = new Date(dateString);

  if (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { day, month, year };
  }
};
