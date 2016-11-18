import React,{Component} from 'react';
import MenuContainer from '../menu/MenuContainer';
import SurveyDetailsContainer from '../survey/SurveyDetailsContainer';


class ParentSurveyContainer extends Component{
	render(){
		return(
			<div className="content-wrapper full-min-height layout--with-sidebar">
				<MenuContainer/>
				<SurveyDetailsContainer/>
			</div>
		);
	}
}
export default ParentSurveyContainer;