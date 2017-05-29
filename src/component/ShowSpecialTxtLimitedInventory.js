import {h, Component} from 'preact';

export default class ShowSpecialTxtLimitedInventory extends Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     unitsTxt: 'unit'
  //   };
  // }
  // componentDidMount () {
  //   const {buyableInventory} = this.props;
  //   if (buyableInventory > 1) {
  //     this.setState({
  //       unitsTxt: 'units'
  //     });
  //   } else {
  //     this.setState({
  //       unitsTxt: 'unit'
  //     });
  //   }
  // }
  // shouldComponentUpdate (nextProps, nextState) {
  //   const shouldUpdate = nextState.unitsTxt !== this.state.unitsTxt || nextProps.buyableInventory !== this.props.buyableInventory || nextProps.specialTxt !== this.props.specialTxt;
  //   return shouldUpdate;
  // }
  render () {
    // const {unitsTxt} = this.state;
    const {specialTxt, buyableInventory, unitsTxt, inventoryLimitMax, inventoryLimitMin} = this.props;
    if (specialTxt) {
      return (
        <span className='show-special-txt-limited-inventory'>{specialTxt}</span>
      );
    } else if (!buyableInventory) {
      return null;
    } else if (buyableInventory <= inventoryLimitMin) {
      return (
        <span className='show-special-txt-limited-inventory'>{`${buyableInventory} ${unitsTxt} left`}</span>
      );
    } else if (buyableInventory <= inventoryLimitMax) {
      return (
        <span className='show-special-txt-limited-inventory'>Limited Stock</span>
      );
    } else {
      return null;
    }
  }
}

/*
const ShowSpecialTxtLimitedInventory = ({specialTxt, buyableInventory}) => {
  // const buyableInventory = parseInt(buyableInventory, 10);
  if (specialTxt) {
    return (
      <span className='show-special-txt-limited-inventory'>{specialTxt}</span>
    );
  } else if (!buyableInventory) {
    return null;
  } else if (buyableInventory <= inventoryLimitMin) {
    if (inventoryLimitMin === 1) {
      unitsTxt = 'unit';
    }
    return (
      <span className='show-special-txt-limited-inventory'>{`${buyableInventory} ${unitsTxt} left`}</span>
    );
  } else if (buyableInventory <= inventoryLimitMax) {
    return (
      <span className='show-special-txt-limited-inventory'>Limited Stock</span>
    );
  } else {
    return null;
  }
};

export default ShowSpecialTxtLimitedInventory;
*/
