import axios from 'axios';
import createHTML_by_categoryNames from './createHTML_by_categoryNames';
import XHR_req from './XHR_req';
import getUrl_secondRequest from './getUrl_secondRequest';
import updated_ResponseData from './updated_ResponseData';
import update_dataForRender from './update_dataForRender';


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

function _update_pogIdList_arr(item, pogIdList_arr) {
  if(item.pogId){
    pogIdList_arr.push(item.pogId);
  }
}

const Use_firstResponseData = (data, O_O) => {

    console.log('data: ', data);
    const {pogIdList_arr} = O_O;
    const {firstUrl} = O_O;
    const {nonPromise} = O_O;
    const {secondResponseData} = O_O;
    const {dom_categoryNames} = O_O;

    let {dataLen} = O_O;

    dataLen = data.length;
    //console.log('updated dataLen: ', dataLen);
    data.forEach((item) => { if(item.pogId) { pogIdList_arr.push(item.pogId); }});

    O_O.firstResponseData = updated_ResponseData(data, O_O);
    O_O.secondResponseData =  [...O_O.firstResponseData];

    console.log('single req n render');
    createHTML_by_categoryNames(O_O, updated_dataForRender_firstResponse(data, O_O));

    /*
    if(pogIdList_arr.length < 1){
      console.log('single req n render');
      createHTML_by_categoryNames(O_O, updated_dataForRender_firstResponse(data, O_O));
    }
    else {
      //console.log('multi req n render');
      const Url_secondReq = getUrl_secondRequest(firstUrl, pogIdList_arr);

      // +++++ second request +++++ //
      if(nonPromise){
        XHR_req(Url_secondReq, function (data) {
          console.log('O_O inside second req: ', O_O);
          const {dataForRender} = O_O;
          update_dataForRender (data, O_O);
          createHTML_by_categoryNames(O_O, dataForRender);
        });
      }
      else {
        //console.log('second req not done');
        const {dataForRender} = O_O;
        update_dataForRender (data, O_O);
        createHTML_by_categoryNames(O_O, dataForRender);
        return ;
      }
    }
    */

};

export default Use_firstResponseData;
