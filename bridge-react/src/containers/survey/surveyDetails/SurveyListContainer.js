import React,{Component,PropTypes} from 'react'
import SurveyListItemContainer from './SurveyListItemContainer'
class SurveyListContainer extends Component{	
    render(){
    	return(
			<ul className="survey-list bordered">
    		{
                this.props.surveysData && this.props.surveysData.map(function(survey, index) {	               
                    let surveyListItemKey = 'surveyListItem-'+survey.surveyId 
                    return <SurveyListItemContainer key={surveyListItemKey} 
                                                    onDeleteSurvey={this.props.onDeleteSurvey}
                                                    survey={survey}/>
                }.bind(this))                           
            }
            {
                (!this.props.surveysData || (
                this.props.surveysData.length === 0))&&
                 <li key="no-survey" className="bold dark-grey padding-tb-m text-center">
                    There are no surveys matching this filter
                </li>
            }
            </ul>
    	)
    }
}

SurveyListContainer.propTypes = {
	surveysData : PropTypes.array,
    deleteSurvey : PropTypes.func
}
export default SurveyListContainer