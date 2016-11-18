import * as types from '../../../constants/survey/createSurvey/actionTypes'

const initialState = {
	surveyTemplates : [],
	isLoading: false,
    error: false
}

const createSurveyReducer = (state = initialState,action = null) => {
	switch(action.type){
		case types.REQUEST_SURVEY_TEMPLATES_DATA:
			return Object.assign({},state,{isLoading: true, error: false})
		case types.RECEIVE_SURVEY_TEMPLATES_DATA:
			return Object.assign({},state,{isLoading:false,error:false,surveyTemplates:action.data})
		case types.RECEIVE_SURVEY_TEMPLATES_ERROR:
			return Object.assign({},state,{isLoading:false,error:true,surveyTemplates:[]})
		default:
			return state
	}
}

export default createSurveyReducer