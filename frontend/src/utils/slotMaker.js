function slotMaker(check,oldSlots) {
    // Initialize a variable to keep track of the total combined time in minutes
    let totalMinutes = 0;
  
    // Iterate through the array of objects
    for (const obj of check) {
      // Split the fromTime and toTime into hours and minutes
      const fromTimeParts = obj.fromTime.split(":");
      const toTimeParts = obj.toTime.split(":");
  
      // Calculate the total minutes for the fromTime and toTime
      const fromMinutes = parseInt(fromTimeParts[0]) * 60 + parseInt(fromTimeParts[1]);
      const toMinutes = parseInt(toTimeParts[0]) * 60 + parseInt(toTimeParts[1]);
  
      // Add the time interval for this object to the total
      totalMinutes += toMinutes - fromMinutes;
    }
  
    // Calculate the count of half-hour intervals
    const halfHourIntervals = Math.floor(totalMinutes / 30)-oldSlots;
  
    return halfHourIntervals;
  }

  export default slotMaker;