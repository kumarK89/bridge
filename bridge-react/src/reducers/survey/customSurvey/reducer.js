import * as types from '../../../constants/survey/customSurvey/actionTypes'

const initialState = {
	survey:{},
    isLoading: false,
    selectedObjIndex: 0,
    error: false,
    answerTypes:[],
    showTogglePreviewTooltip : false
}

const customSurveyReducer = (state = initialState,action = null) => {
	switch(action.type) {
        case types.REQUEST_SURVEY_DATA:
        	return Object.assign({},state,{isLoading: true,error:false})
        case types.RECEIVE_SURVEY_DATA:
        	return Object.assign({},state,{isLoading: false,survey:action.data,selectedObjIndex:action.index,error:false})
        case types.RECEIVE_SURVEY_ERROR:
        	return Object.assign({},state,{isLoading: false,error:true})
        case types.REQUEST_SURVEY_TEMPLATE_DATA:
            return Object.assign({},state,{isLoading: true,error:false})
        case types.RECEIVE_SURVEY_TEMPLATE_DATA:
            return Object.assign({},state,{isLoading: false,survey:action.data,selectedObjIndex:action.index,error:false})
        case types.RECEIVE_SURVEY_TEMPLATE_ERROR:
            return Object.assign({},state,{isLoading: false,error:true})
        case types.REQUEST_ANSWER_TYPES_DATA:
        	return Object.assign({},state,{isLoading: true,error:false})
        case types.RECEIVE_ANSWER_TYPES_DATA:
        	return Object.assign({},state,{isLoading: false,answerTypes:action.data,error:false})
        case types.RECEIVE_ANSWER_TYPES_ERROR:
        	return Object.assign({},state,{isLoading: false,error:true})
		case types.REQUEST_DELETE_SURVEY_QUESTION:
        	return Object.assign({},state,{isLoading: true,error:false})
        case types.RECEIVE_DELETE_SURVEY_QUESTION:
        	return Object.assign({},state,{isLoading: false,survey:action.data,selectedObjIndex:action.index,error:false})
        case types.RECEIVE_DELETE_SURVEY_QUESTION_ERROR:
        	return Object.assign({},state,{isLoading: false,error:true})        	
        case types.HIDE_TOGGLE_PREVIEW_TOOLTIP:
            return Object.assign({},state,{showTogglePreviewTooltip: false}) 
        case types.SHOW_TOGGLE_PREVIEW_TOOLTIP:
            return Object.assign({},state,{showTogglePreviewTooltip: true}) 
        case types.SHOW_QUESTION_DETAILS:
            return Object.assign({},state,{isLoading: false,error: false,selectedObjIndex:action.index}) 
        case types.MODIFY_QUESTION_DETAIL:
            return Object.assign({},state,{isLoading:false,error:false,survey:action.data})
        default:
        	return state
    }
}

export default customSurveyReducer