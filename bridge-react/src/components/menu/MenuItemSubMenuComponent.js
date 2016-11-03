import React,{PropTypes} from 'react';
import SurveyPanelComponent from './subMenu/SurveySubMenuComponent';

const MenuItemSubMenuComponent = (props) => (
	<div className="sidebar__panel_wrapper">
		<SurveyPanelComponent surveyPanelClassName={props.subMenuPanelClassName}/>
	</div>
);

MenuItemSubMenuComponent.propTypes = {
	subMenuPanelClassName: PropTypes.string.isRequired
}

export default MenuItemSubMenuComponent;