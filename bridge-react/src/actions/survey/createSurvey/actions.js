import * as types from '../../../constants/survey/createSurvey/actionTypes'
import createSurveyApi from '../../../middleware/survey/createSurvey/api'

let requestSurveyTemplatesData = () => ({type: types.REQUEST_SURVEY_TEMPLATES_DATA})
let receiveSurveyTemplatesError = () => ({type: types.RECEIVE_SURVEY_TEMPLATES_ERROR})
let receiveSurveyTemplatesData = (templates) => (
	{
		type : types.RECEIVE_SURVEY_TEMPLATES_DATA,
		data : templates
	}	
)

export function getSurveyTemplates(){
	return function(dispatch){
		dispatch(requestSurveyTemplatesData())
		return createSurveyApi.getSurveyTemplates()
		                          .then((templates) => dispatch(receiveSurveyTemplatesData(templates)))
		                          .catch((error) => dispatch(receiveSurveyTemplatesError({error:error})))
	}
}