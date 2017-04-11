import {h} from 'preact';

const CenterContentWrapper = ({children}) => (<div className="align-center__container--vertical">
<div className="align-center__container-inner--vertical">{children}</div>
</div>)

export default CenterContentWrapper;
