function formatDateToUTC(inputDate) {
    // Parse the input date
    const parsedDate = new Date(inputDate);
  
    // Get the year, month, and day components
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1 and pad with zeros if necessary
    const day = String(parsedDate.getDate()).padStart(2, '0');
  
    // Create the formatted date string in "YYYY-MM-DDTHH:mm:ss.sssZ" format
    const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;
  
    return formattedDate;
  }

  export default formatDateToUTC;