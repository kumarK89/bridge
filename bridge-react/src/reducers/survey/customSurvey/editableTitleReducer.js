import * as types from '../../../constants/survey/customSurvey/editableTitleActionTypes'
import {PropTypes} from 'react'

const initialState = {
	editing : false,	
	fitToContent:true,
	fitToContentStrategy:PropTypes.oneOf(['Standard','autoSizeInput']),			
	autoFocus:false,
	growInPlace:false
}

const editableTitleReducer = (state = initialState,action = null) => {
	switch(action.type) {
        case types.START_EDITING:
        	return Object.assign({},state,{editing:true})
        case types.STOP_EDITING:
        	return Object.assign({},state,{editing:false})
        default:
        	return state
    }
}

export default editableTitleReducer