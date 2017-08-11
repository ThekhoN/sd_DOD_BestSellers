// DOD
  // const liveURLx = 'deal-of-the-day';
  const liveURLx = 'id2017sale';

  // local
  // var local_testURL = (window.admin && window.admin == 'true' ? '/admin' : '') + "csvData_mobileapi7.json";
  // live
  const preOfferUrl = 'https://mobileapi.snapdeal.com/service/generic/get/getGenericOffer?landingPage=';
  let postOfferUrl = '';
  const predefinedOfferUrl = preOfferUrl + liveURLx + postOfferUrl;
  // final url to be consumed
  let useFinaOfferlUrl = '';
  // * * * pass local_testURL as get_use_finalURLx(local_testURL) for LOCAL TESTS * * *//
  const url = getCompleteUrl();

  function getCompleteUrl (localTestUrl) {
    if (localTestUrl) {
      useFinaOfferlUrl = localTestUrl;
    } else if (!localTestUrl && window.location.href.indexOf('/offers/') < 0) {
      useFinaOfferlUrl = predefinedOfferUrl;
    } else {
      const offerPageName = getOfferPageName();
      useFinaOfferlUrl = preOfferUrl + offerPageName + postOfferUrl;
    }
    return useFinaOfferlUrl;
  }

  function getOfferPageName (passedUrl) {
    let url = '';
    let offerName = '';
    if (passedUrl) {
      url = passedUrl;
    } else {
      url = document.URL || document.location || window.location.href;
    }
    const checkStart = '/offers/';
    var checkStartPos = url.indexOf(checkStart) + checkStart.length;
    const indexOfSpecialChars = (/[?!@#$%^&*()+|]/.exec(url));
    if (indexOfSpecialChars) {
      offerName = url.substring(checkStartPos, indexOfSpecialChars.index);
    } else {
      offerName = url.substr(checkStartPos);
    }
    return offerName;
  }

  const queryUrl = () => {
    return url;
  };

  export default queryUrl;
