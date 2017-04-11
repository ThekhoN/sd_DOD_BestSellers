////console.log('live...24 Jan 2017 v1');
  //predefining url because app does not support window.location.href

  var liveURLx = 'deal-of-the-day';
  //var liveURLx = 'test-preact';
  //var testOfferName = 'test-z666';
  //local
  //var local_testURL = (window.admin && window.admin == 'true' ? '/admin' : '') + "csvData_mobileapi7.json";
  //live
  var preOfferUrl = 'https://mobileapi.snapdeal.com/service/generic/get/getGenericOffer?landingPage=';
  var postOfferUrl = '';
  var predefinedOfferUrl = preOfferUrl + liveURLx + postOfferUrl;
  var testOfferUrl = preOfferUrl + liveURLx + postOfferUrl;

  //final url to be consumed
  var useFinaOfferlUrl = '';
  // * * * pass local_testURL as get_use_finalURLx(local_testURL) for LOCAL TESTS * * *//
  var url = getCompleteUrl();

  function getCompleteUrl(localTestUrl) {
    if(localTestUrl){
      //console.log('running on local, using localTestUrl: ', localTestUrl)
      useFinaOfferlUrl = localTestUrl
    }
    else if(!localTestUrl && window.location.href.indexOf('/offers/') < 0){
      //console.log('running on panel/local, using predefined url. . .');
      useFinaOfferlUrl = predefinedOfferUrl;
    }
    else {
       var offerPageName = getOfferPageName()
       useFinaOfferlUrl = preOfferUrl + offerPageName + postOfferUrl
    }
    //console.log('userFinalUrl: ', useFinaOfferlUrl);
    return useFinaOfferlUrl
  }

 function getOfferPageName(passedUrl){
  var url, offerName;
  if(passedUrl){
    url = passedUrl;
  }
  else {
    url = document.URL || document.location || window.location.href;
  }
  var checkStart = '/offers/';
  var checkStartPos = url.indexOf(checkStart) + checkStart.length;
  var indexOfSpecialChars = (/[?!@#$%^&*()+|]/.exec(url));
  if(indexOfSpecialChars){
    offerName = url.substring(checkStartPos, indexOfSpecialChars.index)
  }
  else {
    offerName = url.substr(checkStartPos)
  }
  return offerName;
}


  const queryUrl = () => {
    return url;
  };

export default queryUrl;
