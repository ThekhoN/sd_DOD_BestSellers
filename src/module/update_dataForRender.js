const update_dataForRender = (data, O_O) => {

  const {secondResponseData} = O_O;


  data.forEach((item) => {
    secondResponseData.forEach((_item)=> {
        if(item.id == _item.pogId){
          _item.displayPrice = item.displayPrice;
          _item.price = item.price;
          _item.avgRating = item.avgRating;
          _item.noOfRatings = item.noOfRatings;
          _item.discount = item.discount;
          _item.labelUrl = item.labelUrl;
          _item.sdGold = item.sdGold;
          _item.soldOut = item.soldOut;
        }
    });
  });

  const {dom_categoryNames} = O_O;
  const {dataForRender} = O_O;

  secondResponseData.forEach((item) =>{
    dom_categoryNames.forEach((dom_categoryName, i) =>{
      if(item.categoryName == dom_categoryName){
        dataForRender[i].push(item);
      }
    });
  });

};

export default  update_dataForRender;
