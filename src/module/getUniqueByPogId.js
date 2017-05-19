const getUniqueByPogId = d => {
  let pogIdValues = [];
  let uniquePogIdValues = [];
  let posA = [];
  let nonPogIdPosA = [];
  let pogIdPosA = [];
  let result = [];

  // get pogIdPosA && pogIdValues
  d.forEach((e, pos) => {
    posA.push(e.pogId);
    if (e.pogId !== '') {
      pogIdPosA.push(pos);
      pogIdValues.push(e.pogId);
    }
  });

  // get uniquePogIdValues
  uniquePogIdValues = pogIdValues.filter((e, pos) => pogIdValues.indexOf(e) === pos);
  let pogIdItemsArr = [];
  uniquePogIdValues.forEach((e) => {
    pogIdItemsArr.push([]);
  });
  uniquePogIdValues.forEach((e, pos) => {
    d.forEach((de, i) => {
      if (de.pogId === e) {
        pogIdItemsArr[pos].push(de);
      }
    });
  });
  let uniquePogIdObjectsArr = [];
  pogIdItemsArr.forEach((e, i) => {
    uniquePogIdObjectsArr.push(pogIdItemsArr[i][0]);
  });
  posA.forEach((e, pos) => {
    if (e === '') {
      nonPogIdPosA.push(pos);
    }
  });
  // set nonPogId items
  nonPogIdPosA.forEach((e, i) => {
    result[nonPogIdPosA[i]] = d[nonPogIdPosA[i]];
  });
  // combine pogId items & non-pogId items
  // remove empty items ~ undefined items in array
  const finalResult = uniquePogIdObjectsArr.concat(result).filter(e => e !== undefined);
  return finalResult;
};

export default getUniqueByPogId;
