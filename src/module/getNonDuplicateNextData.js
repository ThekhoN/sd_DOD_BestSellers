const getNonDuplicateNextData = (previousData, newData) => {
  let duplicate = [];
  let myUniqueResult = [];
  if (newData.length < 1) {
    // if newData not available return empty array
    return myUniqueResult;
  }
  previousData.forEach(ogDi => {
    newData.forEach(nextDi => {
      if (nextDi.pogId !== '') {
        // check duplicates only for pogId items
        if (nextDi.pogId === ogDi.pogId) {
          duplicate.push(nextDi);
        }
      }
    });
  });
  if (duplicate.length < 1) {
    // if no duplicates found return newData as it is
    return newData;
  }
  for (let i = 0; i < duplicate.length; i++) {
    newData.forEach(nextDi => {
      // if not pogId then ignore and push
      if (nextDi.pogId === '') {
        myUniqueResult.push(nextDi);
      } else {
        if (nextDi.pogId !== duplicate[i].pogId) {
          myUniqueResult.push(nextDi);
        }
      }
    });
  }
  return myUniqueResult;
};

export default getNonDuplicateNextData;
