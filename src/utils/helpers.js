export const capitalizeString = (string) => {
  const capStr = string.charAt(0).toUpperCase() + string.slice(1);
  console.log("capStr :>> ", capStr);
  return capStr;
};
