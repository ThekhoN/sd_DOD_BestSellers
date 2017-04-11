import axios from 'axios';
import createHTML_by_categoryNames from './createHTML_by_categoryNames_singleReq';
import XHR_req from './XHR_req';

function updated_dataForRender_firstResponse(data, O_O) {
  const {firstResponseData} = O_O;
  const {dom_categoryNames} = O_O;
  const {dataForRender} = O_O;

  updated_ResponseData(data, firstResponseData).forEach((item)=> {
    dom_categoryNames.forEach((this_categoryName, index)=>{
      if(item.categoryName == this_categoryName){
        dataForRender[index].push(item);
      }
    });
  });

  return dataForRender;
}

const Use_firstResponseData = (response, O_O) => {
    const data = response.genericOfferItems;
    //console.log('firstResponseData: ', data);

    //const {pogIdList_arr} = O_O;
    const {firstUrl} = O_O;
    const {nonPromise} = O_O;
    const {dataForRender} = O_O;
    //const {secondResponseData} = O_O;
    const {dom_categoryNames} = O_O;

    let {dataLen} = O_O;
    dataLen = data.length;

    //console.log('dataLen: ', dataLen);
    //console.log('dom_categoryNames: ', dom_categoryNames);

    //update dataForRender
    data.forEach(function (offer) {
      dom_categoryNames.forEach((this_categoryName, index)=>{
          //console.log('offer.eventId: ', offer.eventId);
        if(offer.eventId == this_categoryName){

          dataForRender[index].push(offer);
        }
      });
    });
    //console.log('updated dataForRender: ', dataForRender);
    //console.log('single req n render');
    createHTML_by_categoryNames(O_O, dataForRender);


    //createHTML_by_categoryNames(O_O, updated_dataForRender_firstResponse(data, O_O));

};

export default Use_firstResponseData;
