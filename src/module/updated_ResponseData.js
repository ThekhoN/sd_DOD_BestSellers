const updated_ResponseData = ( data, mutateResponseData, O_O ) => {
  mutateResponseData = mutateResponseData? mutateResponseData:O_O.mutateResponseData;
  mutateResponseData = [...data];
  return mutateResponseData;
};

export default updated_ResponseData;
