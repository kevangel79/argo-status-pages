const getCurrentDate = (): string => {
  return new Date().toISOString().substring(0, 10);
}

const getDayBeforeCurrentDate = (daysnum: number): string => {
  var d = new Date();
  d.setDate(d.getDate() - daysnum);
  return d.toISOString().substring(0, 10);
}

export { getCurrentDate, getDayBeforeCurrentDate };