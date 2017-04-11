import {h} from 'preact';

const DealNotFound = ({failedFilter}) => (
  <div className='deal-not-found'>
    <h4>{failedFilter.join(', ')} deals not found {`:(`}
      <br/> please try another filter. .
    </h4>
  </div>);

export default DealNotFound;
