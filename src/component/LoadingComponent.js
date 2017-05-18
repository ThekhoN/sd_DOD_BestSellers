import {h, Component} from 'preact';
import Loader from './Loader';

export default class LoadingComponent extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.isLoading !== this.props.isLoading;
  }
  render () {
    const {isLoading} = this.props;
    return (
      <div className={`loader__container--fixed ${isLoading}`}><Loader /></div>
    );
  }
}
