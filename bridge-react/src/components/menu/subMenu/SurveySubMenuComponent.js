import React,{PropTypes} from 'react'

const SurveySubMenuComponent = (props) => (
	<div className={props.surveyPanelClassName} id="surveys">
	    <header className="sidebar__panel_header">
	        <h1>Surveys</h1>
	    </header>
	    <nav className="sidebar__panel_menu">
	        <ul>
	            <li className="sidebar__panel_primary_item">
	                <i aria-hidden="true" className="gs-surveys" />
	                Surveys
	            </li>
	            <li className="sidebar__panel_secondary_header" key="recent-surveys-header">
	                <h2>Recently Closed:</h2>
	            </li>
	        </ul>
	    </nav>
	</div>
);

SurveySubMenuComponent.propTypes = {
	surveyPanelClassName: PropTypes.string.isRequired
}

export default SurveySubMenuComponent;