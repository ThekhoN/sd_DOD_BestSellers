//Promises polyfill
require('es6-promise').polyfill();

//developer & performance tools
require('preact/devtools');

import {h, Component} from 'preact';
import MaxWidthContainer from '../component/MaxWidthContainer';
import queryUrl from '../module/queryUrl';

//required components
import OfferUnitLi from '../component/OfferUnitLi';
import SectionX from   '../component/SectionX';
import InnerCardSectionXWrap from '../component/InnerCardSectionXWrap';
import CaptionWrapper from '../component/CaptionWrapper';
import CaptionWrapperWithButton from '../component/CaptionWrapperWithButton';
import ButtonModalTrigger from '../component/ButtonModalTrigger';
import OfferContainerWrapperNormal from '../component/OfferContainerWrapperNormal';
import OfferContainerWrapperDoD  from '../component/OfferContainerWrapperDoD';
import OfferUnitListBannerX from '../bannerComponent/OfferUnitListBannerX';
import SocialShareComponent from '../component/SocialShareComponent';
import FilterMainDOD from '../component/FilterMainDOD';
import ModalOverlay from '../component/ModalOverlay';
import Loader from '../component/Loader';
import DealNotFound from '../component/DealNotFound';
import { ShortlistConfirm } from '../component/WishlistIconComponents';

//placeholder components
import {OfferUnitLiPlaceholderGroup2x2} from '../component/OfferUnitLiPlaceholder';
import {PlaceholderSuperDealOfferUnitGroup2x2} from '../component/PlaceholderSuperDealOfferUnit';

//plugins & utils
import axios from 'axios';
import XHR_req from '../module/XHR_req';
import initSocialShareModule from '../module/initSocialShareModule';
import {debouncer} from '../module/debounce';
import scrollToY from '../module/scrollToY';
import getOffset from '../module/getOffset';

// live
const preUrl = queryUrl();
// console.log('preUrl: ', preUrl);


const landingPageQueryStr = 'landingPage=';
const landingPageName = preUrl.slice((preUrl.indexOf(landingPageQueryStr)) + landingPageQueryStr.length);

// console.log('landingPageName: ', landingPageName);
const eventIds=['superDod', 'DealofDayOffers'];

// live
const countlimit = 300; //510 max
const scrollInfLoadThreshold = 55; //prev 45
const firstStart = 0;
const count = 50;
let nextStart = count;
let firstReqUrl = `${preUrl}&start=${firstStart}&count=${count}`;
const getNextReqUrl = () => {
  const nextUrl = `${preUrl}&start=${nextStart}&count=${count}`;
  nextStart = nextStart + count; //prev nextStart + count + 1;
  return nextUrl;
};
const getRemainingReqUrl = (countlimit, nextStart) => {
  const remainingCount = countlimit - nextStart;
  const remainingUrl =  `${preUrl}&start=${nextStart}&count=${remainingCount}`;
  return remainingUrl;
};

// +++++ /getNextReqUrl +++++ //
const forceLoadAllOffersURL = `https://mobileapi.snapdeal.com/service/generic/get/getGenericOffer?landingPage=${landingPageName}&start=0&count=${countlimit}`;


// test
class LoadingComponent extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.isLoading !== this.props.isLoading;
  }
  render(){
    const {isLoading} = this.props;
    return (
      <div className={`loader__container--fixed ${isLoading}`}><Loader/></div>
    )
  }
}

class MainOfferContainerInfiniteScroller extends Component {
  constructor(props){
    super(props);

    const captions = this.props.captions;
    const _captions = captions ? captions: {};
    const _eventIds = eventIds? eventIds: [];
    this.state = {
      showPlaceholder: true,
      filterOn: true,
      showingShortlistConfim: false,
      dodOffersOffsetTopRelVwport: 0,
      //
      forceLoading: false,
      remainingLoading: false,
      //forceLoaded: false,
      modalOpen: false,
      activeFilters: [],
      loadComplete: false,
      //
      isLoading: false,
      isUCBrowser: false,
      eventIds:_eventIds,
      captions: _captions,
      data: [],
      firstLoadComplete: false,
      secondLoadComplete: false,

      offsetTop: {
        detectorInfLoadStart:0,
        dodOffers: 0,
        dodOffersEnd: 0,
      },
      vwPortSize: {
        width: 0,
        height: 0
      },
      scrollY: {
        direction: '',
        lastValue: 0
      },
      elemInVwPort: '',
      mobileView: false,
      mobileSite: false,
      filterControl: 'hideFilterControl',//'hideFilterControl' //showFilterControl
    }

    this.checkIfMobileSite = this.checkIfMobileSite.bind(this);
    this.loadMoreInfiniteContent = this.loadMoreInfiniteContent.bind(this);
    this.renderInfiniteContent = this.renderInfiniteContent.bind(this);
    this.updateShowingShortlistConfim = this.updateShowingShortlistConfim.bind(this);

    //new filter modal handlers
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    // this.forceLoadAllOffers = this.forceLoadAllOffers.bind(this)
    this.loadRemainingContent = this.loadRemainingContent.bind(this);
    this.handleSubmitFilters = this.handleSubmitFilters.bind(this);
    this.handleResetFilters = this.handleResetFilters.bind(this);

    this.hideFilterControl = this.hideFilterControl.bind(this);
    this.showFilterControl = this.showFilterControl.bind(this);

    //window size
    this.updateStateMobileView = this.updateStateMobileView.bind(this);

    this.scrollToDodOffers = this.scrollToDodOffers.bind(this);
    this.jumpToDodOffers = this.jumpToDodOffers.bind(this);

    this.getDodOffsetTop = this.getDodOffsetTop.bind(this);
    this.getvwPortSize = this.getvwPortSize.bind(this);
    this.onResizeRunEvents = this.onResizeRunEvents.bind(this);
    this.onScrollRunEvents = this.onScrollRunEvents.bind(this);
    this.updateScrollY = this.updateScrollY.bind(this);
    this.getOffsetTopOfdetectorInfLoadStart = this.getOffsetTopOfdetectorInfLoadStart.bind(this);
    this.handleInfiniteLoadOnScroll = this.handleInfiniteLoadOnScroll.bind(this);
    this.detectElemInVwPort = this.detectElemInVwPort.bind(this);
    this.handleDisplayFilterControlOnScroll = this.handleDisplayFilterControlOnScroll.bind(this);
    this.checkSecondLoadComplete = this.checkSecondLoadComplete.bind(this);
    this.getdodOffersOffsetTopRelVwport = this.getdodOffersOffsetTopRelVwport.bind(this);
  }
  updateShowingShortlistConfim(){
    this.setState({
      showingShortlistConfim: true
    }, ()=>{
      setTimeout(()=> {
        this.setState({
          showingShortlistConfim: false //force set to false
        });
      }, 2000);
    });

    // setTimeout(()=> {
    //   this.setState({
    //     showingShortlistConfim: false //force set to false
    //   });
    // }, 2000);
  }
  getdodOffersOffsetTopRelVwport(){
    let dodOffersOffsetTopRelVwport = 0;
    if(this.dodOffers){
      const dodOffersOffsetRelVwport = this.dodOffers.getBoundingClientRect();
      const dodOffersOffsetTopRelVwport = dodOffersOffsetRelVwport.top;
    }

    this.setState({
      dodOffersOffsetTopRelVwport
    });
  }
  updateScrollY(){
    const currentScrollYValue = document.body.scrollTop || document.documentElement.scrollTop;
    const { scrollY } = this.state;
    const lastScrollYValue = scrollY.lastValue;

    if(lastScrollYValue > currentScrollYValue) {
      this.setState({
        scrollY: {
          direction: 'top',
          lastValue: currentScrollYValue
        }
      });
    } else if(lastScrollYValue < currentScrollYValue) {
      this.setState({
        scrollY: {
          direction: 'bottom',
          lastValue: currentScrollYValue
        }
      });
    }
  }
  getDodOffsetTop(){
    // const dodOffersOffsetTopStart = this.dodOffers.offsetTop;
    // console.log('run getDodOffsetTop. . .');
    const dodOffersOffsetTopStart = getOffset(this.dodOffers).top;
    const dodOffersOffsetTopEnd = dodOffersOffsetTopStart + this.dodOffers.offsetHeight;
    this.setState({
      offsetTop: {
        ...this.state.offsetTop,
        dodOffers:  dodOffersOffsetTopStart,
        dodOffersEnd: dodOffersOffsetTopEnd
      }
    });
  }
  detectElemInVwPort(){
    const { scrollY, vWDetectors, vWSize } = this.state;

    const lastScroll = scrollY.lastValue;
    // adjustment
    const vWHeightAdjustment = vWSize.height/2;

    if( (vWDetectors.first.end - vWHeightAdjustment) >= lastScroll){
      this.setState({
        elemInVw: 'first'
      })
    }
    else if((vWDetectors.second.start - vWHeightAdjustment) <= lastScroll && vWDetectors.second.end >= lastScroll){
      this.setState({
        elemInVw: 'second'
      })
    }
  }
  getvwPortSize(){
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.setState({
      vwPortSize: {
        width,
        height
      }
    });
  }
  scrollToDodOffers(callback){
    const dodOffersOffsetTop = this.state.offsetTop.dodOffers
    // scrollToY accepts 4 args - offsetValue, speed, 'easing', callback ~ check '../module/scrollToY.js'
    scrollToY(dodOffersOffsetTop - 70, 1000, 'easeInOutSine', ()=>{
      if(callback){
        callback();
      }
    });
  }
  jumpToDodOffers(){
    const dodOffersOffsetTop = this.state.offsetTop.dodOffers
    const { mobileView } = this.state;
    const offsetScroll = mobileView ? 55 : 70;
    window.scrollTo(0, dodOffersOffsetTop - offsetScroll);
  }
  showFilterControl(){
    const {filterControl} = this.state
    if(filterControl === 'hideFilterControl'){
      this.setState({
        filterControl:'showFilterControl'
      })
    }
  }
  hideFilterControl(){
    const {filterControl} = this.state
    if(filterControl === 'showFilterControl'){
      this.setState({
        filterControl:'hideFilterControl',
        modalOpen: false
      })
    }
  }
  checkIfMobileSite(){
    // check if msite
    if(window.location.href.indexOf('m.snapdeal.com') > -1){
      this.setState({
          mobileSite: true
      });
    }
    else {
      this.setState({
        mobileSite: false
      });
    }

  }
  updateStateMobileView(){
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(w < 640){
      this.setState({
        mobileView: true
      })
    }
    else {
      if(this.state.mobileView){
        this.setState({
          mobileView: false
        })
      }
    }
  }
  handleModalOpen(){
    const {loadComplete, mobileView} = this.state;
    // if not mobile
    if(!mobileView ){
      this.scrollToDodOffers(()=>{
        if(!this.state.loadComplete){
          this.loadRemainingContent();
        }
        this.setState({
          modalOpen: true
        });
      });
    }
    // if mobile
    else {
      if(!loadComplete) {
        this.loadRemainingContent();
      }
      this.setState({
        modalOpen: true,
      });
    }
  }
  handleModalClose(){
    const {loadComplete} = this.state
    this.getDodOffsetTop();
    if(loadComplete){
      this.setState({
        modalOpen: false
      })
    }
  }
  handleSubmitFilters(values){
    const {mobileView} = this.state;
    const goToDoDOffers = mobileView ? this.jumpToDodOffers : this.scrollToDodOffers;
    this.setState({
      activeFilters: values
    }, ()=>{
      // console.log('updatedState on submit: ', this.state.activeFilters);
      this.handleModalClose()
      goToDoDOffers();
    })

  }
  handleResetFilters(){
    const {activeFilters} = this.state
    if(activeFilters.length > 0){
      this.setState({
        activeFilters: []
      })
    }
  }
  loadMoreInfiniteContent(){
    if(this.state.isLoading){
      // console.log('already loading. . .wait');
      return ;
    }
    this.checkSecondLoadComplete();
    if(nextStart > countlimit){
      this.setState({
        loadComplete: true,
        secondLoadComplete: true
      }, () => {
        // console.log('loadCompleted, run getDodOffsetTop');
        this.getDodOffsetTop();
        // console.log('infiniteLoad complete all offers. . .')
        // console.log('No. of Offers: ', this.state.data.length);
      })
      return;
    }
    this.setState({
      isLoading: true
    })
    let nextUrl = getNextReqUrl();
    // console.log('nextStart in loadMoreInfiniteContent: ', nextStart);
    axios.get(nextUrl)
      .then(response => {
        const responseData = response.data;
        const _data = responseData.genericOfferItems;
        let _nextData = this.state.data;
        _nextData = [...this.state.data, ..._data]
        this.setState({
          data: _nextData,
          isLoading: false
        }, () => {
          this.getDodOffsetTop();
        })
      })
      .catch( err => {
        console.log('fetch error', err);
      });
  }
  loadRemainingContent(){
    this.checkSecondLoadComplete();
    if(this.state.loadComplete){
      // console.log('loadCompleted, run getDodOffsetTop');
      this.getDodOffsetTop();
      return;
    }
    else {
      if(this.state.firstLoadComplete){
        // console.log('running loadRemainingContent. . .');
        this.setState({
          forceLoading: true
        })
        const remainingReqUrl = getRemainingReqUrl(countlimit, nextStart);
        // console.log('remainingReqUrl: ', remainingReqUrl);
        axios.get(remainingReqUrl)
        .then(response => {
          const responseData = response.data
          const _data = responseData.genericOfferItems
          this.setState({
            data: [...this.state.data, ..._data],
            showPlaceholder: false,
            loadComplete: true,
            forceLoading: false
          }, () =>{
            this.getDodOffsetTop();
          })
        })
        .catch(err => {
          console.log('axios error: ', err);
        })
      }
      else {
        return;
      }
    }
  }
  renderInfiniteContent(mobileSite){
    const {data, activeFilters} = this.state

    let activeOffersList; //array
    const dealofDayOffers = data.filter(offer => offer.eventId === 'DealofDayOffers')
    activeOffersList = dealofDayOffers.map((thisOffer, i) => (<OfferUnitLi dispatchToMainShowingShortlistConfirm={this.updateShowingShortlistConfim} showingShortlistConfim={this.state.showingShortlistConfim} mobileSite={this.state.mobileSite} item={thisOffer} i={i}/>));

    if(activeFilters.length > 0) {
      const activeData = getActiveItems(activeFilters, dealofDayOffers)
      if(activeData.length > 0) {
        activeOffersList = activeData.map((thisOffer, i) => (<OfferUnitLi dispatchToMainShowingShortlistConfirm={this.updateShowingShortlistConfim} showingShortlistConfim={this.state.showingShortlistConfim} mobileSite={this.state.mobileSite} item={thisOffer} i={i}/>))
      }
      else {
        activeOffersList = <DealNotFound failedFilter={this.state.activeFilters}/>
      }
    }

    function getActiveItems(activeFilters, data){
      let activeItems = [];
      activeFilters.forEach(activeFilter => {
        data.forEach(item => {
          if(item.filters.indexOf(activeFilter) > -1 ){
            activeItems.push(item);
          }
        })
      })
      return activeItems;
    }
    return (
      <span className='offer-unit-container-span' >
      {activeOffersList}
    </span>
    )

  }
  getOffsetTopOfdetectorInfLoadStart(){
    if(this.detectorInfLoadStart){
      const offsetTop = this.detectorInfLoadStart.offsetTop;
      this.setState({
        offsetTop: {
          ...this.state.offsetTop,
          detectorInfLoadStart: offsetTop
        }
      });
    }
  }
  checkSecondLoadComplete(){
    const { loadComplete, secondLoadComplete } = this.state;
    if( secondLoadComplete ){
      return;
    }
    if(nextStart >= count || this.state.loadComplete){
      this.setState({
        secondLoadComplete: true
      })
    }
  }
  handleDisplayFilterControlOnScroll(){
    // console.group('handleDisplayFilterControlOnScroll');
    // console.log('running handleDisplayFilterControlOnScroll. . .');
    const { vwPortSize, offsetTop, scrollY, loadComplete, isLoading, forceLoading, secondLoadComplete, firstLoadComplete, mobileView } = this.state;
    const vwPortSizeHeight = vwPortSize.height;
    const lastScrollYValue = scrollY.lastValue;
    const scrollDirection = scrollY.direction;
    const dodOffersOffsetTopStart = offsetTop.dodOffers;
    const dodOffersOffsetTopEnd = offsetTop.dodOffersEnd;
    // console.log(this.state);
    // console.log('lastScrollYValue: ', lastScrollYValue);
    // console.log('dodOffersOffsetTopStart: ', dodOffersOffsetTopStart);
    const adjustedScrollThreshold = dodOffersOffsetTopStart - (vwPortSizeHeight/2);

    if( !mobileView ){
      return;
    }

    if(!firstLoadComplete){
      return;
    }

    if(secondLoadComplete){
      if(!loadComplete){
        if(lastScrollYValue > adjustedScrollThreshold){
          if(scrollDirection === 'top' && !isLoading ){
            this.showFilterControl();
          }
          else {
            this.hideFilterControl();
          }
        }
        else {
          this.hideFilterControl();
        }
      }
      else {
        if( lastScrollYValue < adjustedScrollThreshold || lastScrollYValue > (dodOffersOffsetTopEnd - vwPortSizeHeight) ){
          this.hideFilterControl();
        }
        else {
          if(scrollDirection === 'top' && !isLoading || scrollDirection === 'top' && !forceLoading){
            this.showFilterControl();
          }
          else {
            this.hideFilterControl();
          }
        }
      }
    }
    else {
      if(lastScrollYValue > adjustedScrollThreshold){
        this.showFilterControl();
      }
      else {
        this.hideFilterControl();
      }
    }
  }
  handleInfiniteLoadOnScroll(){
    const { loadComplete } = this.state;
    if(loadComplete){
      // console.log('loadCompleted return from handleInfiniteLoadOnScroll');
      return ;
    }

    const { scrollY, offsetTop, firstLoadComplete } = this.state;
    const scrollYLastValue = scrollY.lastValue;
    const detectorInfLoadStartOffsetTop = offsetTop.detectorInfLoadStart;
    const relScroll = (scrollYLastValue/detectorInfLoadStartOffsetTop * 100);

    if(firstLoadComplete){
      //run loadMoreInfiniteContent
      if(relScroll > scrollInfLoadThreshold){
        // console.log('run loadMoreInfiniteContent when scroll exceeds more than half of vwPort height. . .');
        this.loadMoreInfiniteContent();
      }
      if( relScroll > (scrollInfLoadThreshold * 2 ) || relScroll > 95 ){
        // console.log('forceLoadAllOffersURL. . .');
        this.loadRemainingContent();
      }
    }
  }
  runAfterEachLoad(){
    this.getDodOffsetTop();
  }
  onResizeRunEvents(){
    this.getvwPortSize();
    this.getDodOffsetTop();

    this.updateStateMobileView();
    this.getOffsetTopOfdetectorInfLoadStart();


  }
  onScrollRunEvents(){
    this.getdodOffersOffsetTopRelVwport();
    const { loadComplete } = this.state;
    if(!loadComplete){
      this.getOffsetTopOfdetectorInfLoadStart(); //recalc after every next load and not on every scroll
    }
    this.updateScrollY();
    this.handleInfiniteLoadOnScroll();
    this.handleDisplayFilterControlOnScroll();

  }
  componentDidMount(){
    /*******************************************/
      //  PREBUILD CHECKLIST
    /*******************************************/
    /*
    alert(`Ensure the following before build: \n
      // 1. queryUrl default liveURLx is set correctly DOD/BestSellers \n
      // 2. Ensure Header is correctly set - Best Sellers used for Best Sellers && Deals of the Day for DOD \n
      // 3. if DOD, superDod is uncommented in render \n
      // 4. all console messages have been disabled \n
      // 5. correct html is being used \n
      // 6. this alert is disabled \n
      `);
    */

    this.checkIfMobileSite();
    this.getvwPortSize();
    this.getDodOffsetTop();
    this.updateStateMobileView()

    window.addEventListener('resize', debouncer(this.onResizeRunEvents, 250));
    window.addEventListener('scroll', debouncer(this.onScrollRunEvents, 30));

    //if is UCBrowser force load all using XHR
    const isUCBrowser = navigator.userAgent.indexOf('UCBrowser') > -1;
    if(isUCBrowser){
      this.setState({
        isUCBrowser: true
      })
      firstReqUrl = forceLoadAllOffersURL;
      XHR_req(firstReqUrl, function (response) {
          // console.log('firstReqUrl UC: ', firstReqUrl);
          // console.log('response: ', response);
          const _data = response.genericOfferItems;
          // console.log('UCBrowser _data: ', _data);
          this.setState({
              data: _data,
              showPlaceholder: false
            }
          );
      }.bind(this))
    }
      else {
        axios.get(firstReqUrl)
          .then( response => {
          const responseData = response.data;
          const _data = responseData.genericOfferItems;
          if(_data.length < 1){
            console.log(`no data found, update csv " -_- ?`);
            return;
          }
          this.setState(
            {
              data: _data,
              showPlaceholder: false,

            },
          ()=>{
            this.getDodOffsetTop();
            setTimeout(()=>{
              this.setState({
                firstLoadComplete: true,
              }, () => {
                this.getdodOffersOffsetTopRelVwport();
              })
            }, 300)
          });
        })
        .catch((err) => {
          console.log('fetch error', err);
        });
      }
    //initSocialShareModule
    setTimeout(function () {
      initSocialShareModule();
    }, 1000)
  }
  onEnterDealOfDayOffers(){
    this.showFilterControl()
  }
  onLeaveDealOfDayOffers(){
    this.hideFilterControl()
  }
  render(){
    const {eventIds, captions} = this.props;
    const {data, forceLoading, isLoading} = this.state;
    const modalDisableClass = forceLoading || isLoading ? 'disableModal' : 'enableModal';
    return (<div className='preact-inner-app-container'>
      {!this.state.mobileSite && <ShortlistConfirm visibilityClassName={this.state.showingShortlistConfim}/>}
      {/* {<div className='disable-overflow'></div>} */}
      {/* {this.state.firstLoadComplete && this.renderFixedLoader()} */}
      <LoadingComponent isLoading={isLoading}/>
      <ModalOverlay active={this.state.modalOpen}
        handleModalClose={
          this.handleModalClose
        }/>
      <MaxWidthContainer>
            <div className="main-offer-container" >
            {eventIds.map(eventId=>{
              /*
              Disable DOD incase BestSellers
              */
              if(eventId.indexOf('superDod') > -1){
                return (
                  <SectionX id={eventId}>
                    {!this.state.mobileView && <SectionX/>}
                    <InnerCardSectionXWrap>
                    <CaptionWrapper caption={captions[eventId]} eventId={eventId} stylingClass="bg--gradient-orange-to-red"/>
                    <OfferContainerWrapperDoD>
                      <ul className='responsive-font-size--reset-0 responsive-layout--centered'>
                        {this.state.showPlaceholder && <PlaceholderSuperDealOfferUnitGroup2x2/>}
                        {data.filter(offer=>(
                          offer.eventId === eventId))
                          .map((thisOffer, i) => (<OfferUnitLi dispatchToMainShowingShortlistConfirm={this.updateShowingShortlistConfim} showingShortlistConfim={this.state.showingShortlistConfim} mobileSite={this.state.mobileSite} item={thisOffer} i={i}/>))
                        }
                      </ul>
                    </OfferContainerWrapperDoD>
                    </InnerCardSectionXWrap>
                  </SectionX>
                )
              }
              if(eventId.indexOf('DealofDayOffers') > -1){
                return (
                  <div className='preact-ref-div-dod-offers' ref={node=>{this.dodOffers = node}}>
                  <SectionX id="DealofDayOffers" eventId="DealofDayOffers">
                    <CaptionWrapperWithButton caption='Deals of the Day' eventId={eventId} stylingClass="bg--gradient-green-to-blue">
                      {this.state.filterOn && <div className={` filterMainModalContainer ${this.state.modalOpen} ${this.state.filterControl} ${modalDisableClass} `}>
                        {this.state.modalOpen && <FilterMainDOD
                          visibility={this.state.modalOpen}
                          handleResetFilters={this.handleResetFilters}
                          activeFilters={this.state.activeFilters}
                          dispatchSubmitFiltersToMain={this.handleSubmitFilters}
                          handleModalClose={this.handleModalClose}
                          forceLoading={this.state.forceLoading}/>}
                          {!this.state.modalOpen && !this.state.forceLoading && !this.state.isLoading && <ButtonModalTrigger
                            text='filter'
                            handleModalOpen={this.handleModalOpen}/>}
                    </div>}
                    </CaptionWrapperWithButton>
                    <InnerCardSectionXWrap>
                      <OfferContainerWrapperNormal>
                        <div className='infinite-content__container'  >
                          <ul className='min-height--480px'>
                            {this.state.showPlaceholder && <OfferUnitLiPlaceholderGroup2x2/>}
                            {this.renderInfiniteContent()}
                          </ul>
                          <div className='infiniteContent_waypoint'>
                          </div>
                          <div className='detectorInfLoadStart' ref={node => { this.detectorInfLoadStart = node }}>
                          </div>
                        </div>
                      </OfferContainerWrapperNormal>
                    </InnerCardSectionXWrap>
                    <SocialShareComponent/>
                  </SectionX>
                  </div>
                )
              }
            }
              )}
        </div>
      </MaxWidthContainer>
      </div>)
  }

}


export default MainOfferContainerInfiniteScroller;
