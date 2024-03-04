function extractDate(dateString) {
    const timestamp = new Date(dateString);
    const year = timestamp.getFullYear();
    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
    const day = timestamp.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  export default extractDate