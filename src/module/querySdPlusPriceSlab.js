import {isLegit_vendorDTO_item} from './ValidateData'

const querySdPlusPriceSlab = (item) => {

    ////console.log('item: ', item.pogId);

    const userDefined_priceSlab = parseInt(item.extraField2);
    const userDefined_sdPlus = item.extraField3;

    if(isLegit_vendorDTO_item(item)){
      const price = item.commonMinProductDetailsDTO.priceInfo.finalPrice;
      const sdPlus = item.commonMinProductDetailsDTO.vendorDTO.sdPlus;
      if(userDefined_priceSlab && userDefined_sdPlus){
        if(!sdPlus || price > userDefined_priceSlab){
          //console.log('dont show item case1: ', item.pogId);
          return true;
        }
        else {
          return false;
        }
      }
      else if(userDefined_priceSlab){
        if(price > userDefined_priceSlab){
          //console.log('dont show item case2: ', item.pogId);
          return true;
        }
      }
      else if(userDefined_sdPlus){
          //console.log('item pogId:', item.pogId);
        if(!sdPlus){
          //console.log('dont show item case3: ', item.pogId);
          return true;
        }
      }
      else {
        return false;
      }
    }
  }

export default querySdPlusPriceSlab
