import * as types from '../../../constants/survey/customSurvey/actionTypes'
import customSurveyApi from '../../../middleware/survey/customSurvey/api'

let requestSurveyData = () => ({type: types.REQUEST_SURVEY_DATA})
let receiveSurveyError = (json) => (
  {
    type: types.RECEIVE_SURVEY_ERROR,
    data: json
  }
)
let receiveSurveyData = (survey,index) => (
  {
      type : types.RECEIVE_SURVEY_DATA,
      data : survey,
      index : index
  }
)

let requestAnswerTypesData = () => ({type: types.REQUEST_ANSWER_TYPES_DATA})
let receiveAnswerTypesError = (json) => (
  {
    type: types.RECEIVE_ANSWER_TYPES_ERROR,
    data: json
  }
)
let receiveAnswerTypesData = (answerTypes) => (
  {
      type : types.RECEIVE_ANSWER_TYPES_DATA,
      data : answerTypes
  }
)

let requestDeleteSurveyQuestion = () => ({type: types.REQUEST_DELETE_SURVEY_QUESTION})
let receiveDeleteSurveyQuestionError = (json) => (
  {
    type: types.RECEIVE_DELETE_SURVEY_QUESTION_ERROR,
    data: json
  }
)
let receiveDeleteSurveyQuestionData = (survey,selectedIndex) => (
  {
      type : types.RECEIVE_DELETE_SURVEY_QUESTION,
      data : survey,
      index : selectedIndex
  }
)

let showPreviewToolTip = () => ({type: types.SHOW_TOGGLE_PREVIEW_TOOLTIP})
let hidePreviewToolTip = () => ({type: types.HIDE_TOGGLE_PREVIEW_TOOLTIP})
let showQuestionDetails = (index) => ({
    type: types.SHOW_QUESTION_DETAILS,
    index: index
})
let changeQuestionDetail = (survey) => ({
  type: types.MODIFY_QUESTION_DETAIL,
  data : survey
})

let getIndexAndSetActive = (dataObj) =>{
    let questionsLen = dataObj.surveyQuestions.length
    if(questionsLen > 0){
        dataObj.surveyQuestions[questionsLen-1].activeItem = true;
    }
    return {
        survey: dataObj,
        index: questionsLen-1
    }
}

let requestSurveyTemplateData = () => ({type: types.REQUEST_SURVEY_TEMPLATE_DATA})
let receiveSurveyTemplateError = (json) => (
  {
    type: types.RECEIVE_SURVEY_TEMPLATE_ERROR,
    data: json
  }
)
let receiveSurveyTemplateData = (survey,index) => (
  {
      type : types.RECEIVE_SURVEY_TEMPLATE_DATA,
      data : survey,
      index : index
  }
)

export function saveSurvey(surveyId,surveyName,surveyQuestions){
	return function(dispatch){
		dispatch(requestSurveyData())
		return customSurveyApi.saveSurvey(surveyId,surveyName,surveyQuestions)
                        .then((response) => {
                          let dataObj = getIndexAndSetActive(response)
                          dispatch(receiveSurveyData(dataObj.survey,dataObj.index))
                        })
                        .catch((error) => dispatch(receiveSurveyError({error:error})))
	}
}

export function saveSurveyFromTemplate(surveyTemplateId){
  return function(dispatch){
    dispatch(requestSurveyTemplateData())
    return customSurveyApi.saveSurveyFromTemplate(surveyTemplateId)
                          .then((response) => {
                            let dataObj = getIndexAndSetActive(response)
                            dispatch(receiveSurveyTemplateData(dataObj.survey,dataObj.index))
                          })
                          .catch((error) => dispatch(receiveSurveyTemplateError({error:error})))
  }
}

export function getAnswerTypes(){
	return function(dispatch){
		dispatch(requestAnswerTypesData())
		return customSurveyApi.getAnswerTypesWithOptions()
                        .then((response) => {                          
                          dispatch(receiveAnswerTypesData(response))
                        })
                        .catch((error) => dispatch(receiveAnswerTypesError({error:error})))
	}
}

export function deleteSurveyQuestion(surveyId,surveyName,surveyQuestionId){
	return function(dispatch){
		dispatch(requestDeleteSurveyQuestion())
		return customSurveyApi.deleteSurveyQuestion(surveyId,surveyName,surveyQuestionId)
                        .then((response) => {
                          let dataObj = getIndexAndSetActive(response)
                          dispatch(receiveDeleteSurveyQuestionData(dataObj.survey,dataObj.index))
                        })
                        .catch((error) => dispatch(receiveDeleteSurveyQuestionError({error:error})))
	}
}


export function onShowPreviewTooTip(showToolTip){
  return function(dispatch){
    if(showToolTip){
      dispatch(showPreviewToolTip())
    }else{
      dispatch(hidePreviewToolTip())
    }
  }
}

export function onSelectedQuestion(index){
  return function(dispatch){
    dispatch(showQuestionDetails(index))
  }
}

export function onChangeSurveyQuestion(survey){
  return function(dispatch){
    dispatch(changeQuestionDetail(survey))
  }
}