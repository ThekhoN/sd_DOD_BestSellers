import {h, Component} from 'preact';

export const ShowLimitedStock = () => (<span className='show-special-txt-limited-inventory'>Limited Stock</span>);
export const ShowSpecialTxt = ({specialTxt}) => (<span className='show-special-txt-limited-inventory'>{specialTxt}</span>);
export const ShowMultipleUnitsLeft = ({buyableInventory}) => (<span className='show-special-txt-limited-inventory'>{`${buyableInventory} units left`}</span>);
export const ShowSingleUnitLeft = () => (<span className='show-special-txt-limited-inventory'>1 unit left</span>);
