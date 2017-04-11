import {h, Component} from 'preact'
import filterData from '../module/filterData';
import Loader from './Loader';


function updateCurrent(value, current){
  //incase we are passing '' or null
  if(value === '' || null){
    return current
  }
  else if(current.indexOf(value) < 0){
    //not preset then add
    return [...current, value]
  }
  else {
    //present so remove
    return [
      ...current.slice(0, current.indexOf(value)),
      ...current.slice(current.indexOf(value)+1)
    ]
  }
}


class FilterMainDOD extends Component {
  constructor(props){
    super(props)
    this.state = {
      filter:[],
      mountCheckboxes: true
    }
    this.onOnSubmit = this.onOnSubmit.bind(this)
    this.onOnReset = this.onOnReset.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleMountUnmountCheckboxes = this.handleMountUnmountCheckboxes.bind(this)
    //
    //this.handleOnChangeCheckbox = this.handleOnChangeCheckbox.bind(this)
  }
  componentDidMount(){
    const {activeFilters} = this.props
    if(activeFilters.length > 0){
      this.setState({
        filter: activeFilters
      })
    }
  }
  handleMountUnmountCheckboxes(){
    this.setState({
      mountCheckboxes: false
    }, ()=>{
      this.setState({
        mountCheckboxes: true
      })
    })
  }
  onOnSubmit(){
    const {dispatchSubmitFiltersToMain} = this.props
    dispatchSubmitFiltersToMain(this.state.filter)
    //console.log('dispatching on Submit. . .', this.state.filter);
  }
  onOnReset(){
      this.setState({
        filter: []
      })
      //force unmount
      this.handleMountUnmountCheckboxes()
      this.props.handleResetFilters()
  }
  handleOnChange(value){
    //console.log('value on handleOnChange: ', value);
    //const {filter} = this.state
    let current = this.state.filter;
    //console.log('preupdate current: ', current);
    current = updateCurrent(value, current)
    //console.log('updated current: ', current);
    this.setState({
      filter: current
    })

  }
  render(){
    const {filter, mountCheckboxes} = this.state
    const {activeFilters} = this.props
    // <div className={`relWrapper filterMainDODContainer`}>
    //   {this.props.visibility && this.props.forceLoading && <div className='loader-x99_wrapper'><Loader/></div>}
    const {visibility} = this.props
    return (<div className={`relWrapper filterMainDODContainer`}>

      {this.props.visibility && this.props.forceLoading && <div className='loader-x99_wrapper'><Loader/></div>}
      <div className={`filterMainDOD ${visibility}`}>
      <form
        onSubmit={(e)=>{
        e.preventDefault()
        this.onOnSubmit()
        //console.log('handling FilterMainDOD submit. . .');
      }}>
      <div className='filterMainHeader filterRowElem'>
        <h4>Filter by:</h4>
        <span className='filterClose'
          onClick={()=>{
            //console.log('close filter clicked. . .');
            this.props.handleModalClose()
          }}>&times;</span>
      </div>
      <div className='filterMainFiltersContainer filterRowElem'>
        <div className='leftColumnFilterMain '>
          <div className='filterRowElem wrapPadding categoryTitleWrapper'>
            Category <span className='filterTypeArrow'>&#9658;</span>
          </div>
        </div>
        <div className='rightColumnFilterMain'>
          <fieldset>
            {
              this.state.mountCheckboxes &&
              filterData.map(data => (<CheckboxUnit
                key={data.id}
                value={data.value}
                label={data.value}
                handleOnChange={this.handleOnChange}
                currentFilter={activeFilters}
               />))
            }
          </fieldset>
        </div>
      </div>
      <div className='filterMainSubmitWrapper'>
        <span className='filterMainResetContainer'>
          <button onClick={(e)=>{
            e.preventDefault()
            this.onOnReset()
          }} >Clear Filters</button>
        </span>
        <span className='filterMainSubmitContainer'>
          <button type='submit' >Apply Filters</button>
        </span>
      </div>
      </form>
    </div>
  </div>)
  }
}


export default FilterMainDOD

function handleChecked (active, value){
  let checkedStatus = false;
  if(active.indexOf(value) > -1){
    checkedStatus = true;
    return checkedStatus;
  }
  else {
    return checkedStatus;
  }
}

class CheckboxUnit extends Component {
  constructor(props){
    super(props)
    this.state = {
      isChecked: false
    }
    this.onOnChange = this.onOnChange.bind(this)
  }
  componentDidMount(){
    const {currentFilter, value} = this.props
    const isChecked = handleChecked(currentFilter, value)
    this.setState({
      isChecked
    })
  }
  onOnChange(){
    const {value, handleOnChange} = this.props
    handleOnChange(value)
    this.setState({
      isChecked: !this.state.isChecked
    })
  }
  render(){
    const {value, label} = this.props
    return (<div className='checkboxUnitContainer filterRowElem wrapPadding filterRowBorderBottom'>
      <label>
        <input
          onChange={this.onOnChange}
          type='checkbox'
          checked={this.state.isChecked}
          value={value}
          name={label}/>
              <span className='filterLabel'>{label}</span>
      </label>
    </div>)
  }
}
