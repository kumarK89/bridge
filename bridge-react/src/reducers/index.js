import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import surveyReducer from './survey/surveyDetails/reducer'
import createSurveyReducer from './survey/createSurvey/reducer'
import customSurveyReducer from './survey/customSurvey/reducer'
import editableTitleReducer from './survey/customSurvey/editableTitleReducer'

const rootReducer = combineReducers({    
    surveyReducer: surveyReducer,
    createSurveyReducer: createSurveyReducer,
	customSurveyReducer : customSurveyReducer,
	editableTitleReducer : editableTitleReducer,
    routing
});

export default rootReducer