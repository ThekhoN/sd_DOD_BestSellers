import { h, Component } from 'preact';

//import OfferContainer from './container/OfferContainer'


import MainOfferContainerInfiniteScroller from './container/MainOfferContainerInfiniteScroller'

//const eventIds=['bankOfferBannerX99', 'superDod', 'DealofDayOffers', 'BlockbusterDeals', 'NGOFooterBannerX99'];
const eventIds=['bankOfferBannerX99', 'superDod', 'DealofDayOffers', 'NGOFooterBannerX99'];
//const captions = {superDod: 'Super Deals', DealofDayOffers: 'Deals of the Day',BlockbusterDeals: 'Blockbuster Deals'};
const captions = {superDod: 'Super Deals', DealofDayOffers: 'Deals of the Day', BlockbusterDeals: 'Blockbuster Deals'};


export default class App extends Component {
	render() {
		return (
			<div id="preact-app-dod">
				<MainOfferContainerInfiniteScroller eventIds={eventIds} captions={captions}/>
			</div>
		);
	}
}
