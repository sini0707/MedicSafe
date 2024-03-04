function checkForClash(arrayOfObjects, fromState, toState) {
    // Convert the from and to states to time strings (HH:mm format)
    const fromTime = fromState;
    const toTime = toState;
  
    // Iterate through the array of objects
    for (const obj of arrayOfObjects) {
      // Convert the object's fromTime and toTime to time strings (HH:mm format)
      const objFromTime = obj.fromTime;
      const objToTime = obj.toTime;
  
      // Check for clash
      if (
        (fromTime >= objFromTime && fromTime <= objToTime) || // Check if fromState is within the object's time range
        (toTime >= objFromTime && toTime <= objToTime) ||     // Check if toState is within the object's time range
        (fromTime <= objFromTime && toTime >= objToTime)      // Check if the object's time range is within fromState and toState
      ) {
        console.log("Clashed");
        return true;
      }
    }
  
    console.log("Not Clashed");
    return false;
  }
export default checkForClash