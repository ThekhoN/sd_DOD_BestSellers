export const isISObject = (obj) => {
  return obj && obj !== 'null' && obj !== 'undefined';
};

export const isLegit_pogId_item = item => {
  if(isISObject(item.commonMinProductDetailsDTO) && isISObject(item.commonMinProductDetailsDTO.priceInfo)){
    return true;
  }
  else {
    return false;
  }
};

export const isLegit_vendorDTO_item = item => {
  if(isLegit_pogId_item(item) && isISObject(item.commonMinProductDetailsDTO.vendorDTO)){
      return true;
  }
  else {
    return false;
  }
};
