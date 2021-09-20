const minuteChangeHours = (number, hour, minute) => {
  let hours = Math.floor(number / 60);
  let minutes = number % 60;

  if (hours / 60 === hours) {
    return hours + `${hour} 0${minute}`;
  } else {
    return `${hours}${hour} ${minutes}${minute}`;
  }
};
export default minuteChangeHours;
