import React,{Component,PropTypes} from 'react';
import SurveyListItemContainer from './SurveyListItemContainer';
class SurveyListContainer extends Component{
	constructor(){
        super();
        this.state = {
        	surveysData : []            
        };
    }
    render(){
    	return(
    		<div>
    			<ul className="survey-list bordered">
	    		{
	                this.props.surveysData && this.props.surveysData.map(function(survey) {
	                    let surveyListItemKey = 'surveyListItem-'+survey.surveyId; 
	                    return <SurveyListItemContainer key={surveyListItemKey} 
                                                        deleteSurvey={this.props.deleteSurvey}
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
            </div>
    	);
    }
}

SurveyListContainer.propTypes = {
	surveysData : PropTypes.array,
    deleteSurvey : PropTypes.func
}
export default SurveyListContainer;