const getUrl_secondRequest = (firstUrl, pogIdList_arr) => {
    if (firstUrl.indexOf('.json') < 0) {
      //push an extry empty string to ensure last pogId is ALWAYS rendered
      //console.log('live');
      //pogIdList_arr.push(' ');
  }
  const all_pogIds = pogIdList_arr.join(',');
  let url;
  // if not local
  if (firstUrl.indexOf('.json') < 0) {
      //old
      //url = (window.admin && window.admin == 'true' ? '/admin' : '') + '/json/getProductById?pogIds=' + all_pogIds;
      url = (window.admin && window.admin == 'true' ? '/admin' : '') + '/acors/json/getProductById?pogIds=' + all_pogIds;
  }
  //if local
  else {
      var preventCache = Date.now();
      url = "../csvData_2_" + pogIdList_arr + ".json" + '?queryTime=' + preventCache;
  }
  return url;
};

export default getUrl_secondRequest;
