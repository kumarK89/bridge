import React,{PropTypes} from 'react'

const SurveySubMenuComponent = (props) => (
	<div className={props.surveyPanelClassName} id="surveys">
	    <header className="sidebar__panel_header">
	        <h1>Surveys</h1>
	    </header>
	    <nav className="sidebar__panel_menu">
	        <ul>
	            <li className="sidebar__panel_primary_item" onClick={props.boundClick}>
	            	<button className="sidebar__main_menu_link btn--reset">
	                	<i aria-hidden="true" className="gs-surveys" />
	                	Surveys
	                </button>
	            </li>	            
	        </ul>
	    </nav>
	</div>
)

SurveySubMenuComponent.propTypes = {
	surveyPanelClassName: PropTypes.string.isRequired,
	boundClick: PropTypes.func.isRequired
}

export default SurveySubMenuComponent