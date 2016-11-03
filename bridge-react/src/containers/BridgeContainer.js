import React,{Component} from 'react';
import MenuContainer from './menu/MenuContainer';
import SurveyContainer from './survey/SurveyContainer';


class BridgeContainer extends Component{
	render(){
		return(
			<div className="content-wrapper full-min-height layout--with-sidebar">
				<MenuContainer/>
				<SurveyContainer/>
			</div>
		);
	}
}
export default BridgeContainer;