import {h, Component} from 'preact'
import {Lazy} from 'react-lazy'

const style = {
  'opacity': '0.6',
  'background-image': 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzAgMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiNERUREREQiIGQ9Ik02LjgsMjcuNGMwLjMsMC41LDAuNiwwLjcsMS4yLDAuN2gxMS4xYzAuNiwwLDAuOS0wLjIsMS4zLTAuN2w4LjQtMTAuOGMwLjItMC4yLDAtMC42LTAuMy0wLjZIMTUuMWMtMC42LDAtMC45LTAuMi0xLjItMC43TDcuMSwzLjVDNi45LDMuMiw2LjUsMy4zLDYuNCwzLjZMMS4yLDE2LjJjLTAuMiwwLjYtMC4yLDAuOSwwLjEsMS41TDYuOCwyNy40eiBNMjAuOCwxMy40YzAuMywwLjUsMC42LDAuNywxLjIsMC43aDYuNWMwLjMsMCwwLjYtMC40LDAuNC0wLjdMMjIuNywyLjZjLTAuMy0wLjUtMC42LTAuNy0xLjItMC43SDkuMWMtMC4zLDAtMC42LDAuNC0wLjQsMC43bDMuMiw1LjZjMC4zLDAuNSwwLjYsMC43LDEuMiwwLjdoNS4xTDIwLjgsMTMuNHoiLz48L3N2Zz4=)',
  'background-size': '36% 36%',
  'background-repeat': 'no-repeat',
  'background-color': 'transparent',
  'background-position': 'center'
}

/*
const style = {
  'opacity': '0.6',
  'background-color': '#f2f2f2'
}
*/


class LazyLoadedImgUnit extends Component {
  constructor(props){
    super(props)
    this.state = {
      style: style
    }
    this.onLoaded = this.onLoaded.bind(this)
  }
  onLoaded () {
      this.setState(
        { style: {
        'opacity': '1',
        'background-color': 'transparent'
      }}
    )
  }
  render () {
    const {offerImageUrl, offerName } = this.props
      return (<span
        className='lazyLoadSpan-wrapper-transition img--constrain-size'
        style={this.state.style}>
        <Lazy
        cushion={200}
        onLoad={this.onLoaded}
        nodeName="span"
        className='img--constrain-size'>
            <img
              className='img--constrain-size'
              src={offerImageUrl}
              alt={offerName} />
        </Lazy>
      </span>
    )
  }
}

export default LazyLoadedImgUnit
