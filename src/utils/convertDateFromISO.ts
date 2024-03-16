/* ISO -> dd/mm/yyyy hh:mm */
export const convertDateFromISO = (iso: string) => {
  const date = iso.slice(0, 10);
  const time = iso.slice(11, 16);
  return { full: date + " " + time, date, time };
};
