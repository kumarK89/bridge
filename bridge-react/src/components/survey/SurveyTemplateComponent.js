import React from 'react'
import IconComponent from '../../components/IconComponent'
import { Link } from 'react-router'

const SurveyTemplateComponent = (props) => (
    <nav className="surveytile surveytile-tile-curved">
        <Link to={props.redirectUrl} className="btnLink-style">
            <h4 className="align-left ">{props.surveyQuestionSetName}</h4>
            <IconComponent iconClassName="align-right gs-plus blue"></IconComponent>
        </Link>
    </nav>
 )

 export default SurveyTemplateComponent