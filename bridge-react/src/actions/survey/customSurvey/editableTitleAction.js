import * as types from '../../../constants/survey/customSurvey/editableTitleActionTypes'

let startEdit = () => ({type: types.START_EDITING})
let stopEdit = () => ({type: types.STOP_EDITING})

export function onStartEdit(){
	console.log('in onStartEdit')
	return function(dispatch){
		dispatch(startEdit())
	}
}

export function onStopEdit(){
	return function(dispatch){
		dispatch(stopEdit())
	}
}