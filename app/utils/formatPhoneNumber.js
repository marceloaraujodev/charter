export default function formatPhoneNumber(number) {
  // If the number is empty, return it as is, meaning it will return the value of number. stopping the function
  if (!number) return number;
  const phoneNumber = number.replace(/[^\d]/g, ''); // Remove all non-numeric characters

  if (phoneNumber.length <= 3) {
    return phoneNumber;
  }
   else if (phoneNumber.length < 7) {
    return `${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3)}`;
  } else if(phoneNumber.length < 10) {
    return `${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, 10)}`;
  }
  else {
    return phoneNumber
  }
}
