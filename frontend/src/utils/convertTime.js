function convertTo12HourFormat(timeString) {
    const [hours, minutes] = timeString.split(':');
    const parsedTime = new Date(0, 0, 0, hours, minutes); // Create a Date object with the given time
  
    let ampm = 'AM';
    let formattedHours = parsedTime.getHours();
    if (formattedHours >= 12) {
      ampm = 'PM';
      if (formattedHours > 12) {
        formattedHours -= 12;
      }
    }
    formattedHours = formattedHours.toString().padStart(2, '0'); // Ensure two-digit format for hours
    const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two-digit format for minutes
  
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

export default convertTo12HourFormat;