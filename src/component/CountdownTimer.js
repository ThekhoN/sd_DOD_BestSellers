import {h, Component, defaultProps, PropTypes} from 'preact';
import {isFunction, isValidDate, getRemainingTime, checkAndRunCallback} from '../module/countDownTimerUtils';

const defaultTimeRemaining = {
  total: '',
  days: '',
  hours: '',
  minutes: '',
  seconds: ''
};

const CountdownTimerComponent = ({timerState}) => {
  const {timeRemaining} = timerState;
  return (
    <div id={timerState.id} className='countdown-timer'>
        <p className='countdown-timer__title'>Ends in:</p>
        {/* <p><span>{timeRemaining.days}</span> days:</p> */}
        <p className='countdown-timer__time'><span className='countdown-timer--bold'>{timeRemaining.hours}</span> hr:</p>
        <p className='countdown-timer__time'><span className='countdown-timer--bold'>{timeRemaining.minutes}</span> min:</p>
        <p className='countdown-timer__time'><span className='countdown-timer--bold'>{timeRemaining.seconds}</span> sec</p>
    </div>);
};

export default class CountdownTimer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // id: this.props.id ? this.props.id : '',
      // offsetGMT: this.props.offsetGMT ? this.props.offsetGMT : '',
      // startTime: this.props.startTime ? this.props.startTime : '',
      // endTime: this.props.endTime ? this.props.endTime : '',
      // callback: this.props.callback ? this.props.callback : '',
      showTimer: false,
      timeRemaining: defaultTimeRemaining
    };
    this.init = this.init.bind(this);
  }
  init () {
    const {callback, offsetGMT, id} = this.props;
    let endTime = this.props.endTime;
    let startTime = this.props.startTime;

    // validate date
    if (!isValidDate(endTime)) {
      console.log(`invalid endTime date format, must be MM/DD/YYYY HH:MM:SS for ${this.state.id}`);
      return;
    }
    if (!isValidDate(startTime)) {
      console.log(`invalid startTime date format, must be MM/DD/YYYY HH:MM:SS for ${this.state.id}`);
      return;
    }

    // some mutations ~ converting time formates
    endTime = endTime + ` ${offsetGMT}`;
    startTime = startTime + ` ${offsetGMT}`;

    const startTimeMs = new Date(startTime);
    const endTimeMs = new Date(endTime);
    const currentTimeMs = new Date();

    if (endTimeMs > currentTimeMs && currentTimeMs >= startTimeMs) {
      // start timer
      const updateTimer = endTime => {
        const t = getRemainingTime(endTime);
        const totalTimeRemaining = t.total;
        const daysRemaining = ('0' + t.days).slice(-2);
        const hoursRemaining = ('0' + t.hours).slice(-2);
        const minutesRemaining = ('0' + t.minutes).slice(-2);
        const secondsRemaining = ('0' + t.seconds).slice(-2);
        this.setState({
          showTimer: true,
          timeRemaining: {
            total: totalTimeRemaining,
            days: daysRemaining,
            hours: hoursRemaining,
            minutes: minutesRemaining,
            seconds: secondsRemaining
          }
        });
        // terminate timer
        if (!t.total > 0) {
          console.log(`terminate timer ${id}`);
          clearInterval(timerInterval);
          this.setState({
            timeRemaining: defaultTimeRemaining,
            showTimer: false
          });
          // reload window
          window.location.reload(true);
        }
      };
      updateTimer(endTime);
      const timerInterval = setInterval(() => {
        updateTimer(endTime);
      }, 1000);
      if (callback) {
        checkAndRunCallback(callback);
      }
    } else {
      if (endTimeMs < currentTimeMs) {
        console.log(`endTime is less than currentTime for ${id}`);
      }
      if (startTimeMs > endTimeMs) {
        console.log(`startTime is greater than endTime for ${id}`);
      }
      console.log(`endTime has expired for ${id}, so disabled. . .`);
      return;
    }
  }
  componentDidMount () {
    this.init();
  }
  render () {
    return (
      <div className='countdown-timer__wrapper'>
        <CountdownTimerComponent timerState={this.state} />
      </div>
    );
  }
}

// CountdownTimer.propTypes = {
//   startTime: PropTypes.string,
//   endTime: PropTypes.string,
//   callback: PropTypes.func,
//   offsetGMT: PropTypes.string,
//   id: PropTypes.string
// };
CountdownTimer.defaultProps = {
  offsetGMT: 'GMT+0530',
  startTime: '01/13/2016 00:00:00'
};
