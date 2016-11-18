import * as types from '../../../constants/survey/surveyDetails/actionTypes'
import surveyApi from '../../../middleware/survey/surveyDetails/api'

let requestData = () => ({type: types.REQUEST_SURVEYS_DATA})
let receiveError = (json) => (
  {
    type: types.RECEIVE_SURVEYS_ERROR,
    data: json
  }
)
let receiveSurveyData = (surveys,searchTerm,sortParam,isUnpublished) => (
  {
      type : types.RECEIVE_SURVEYS_DATA,
      data : surveys,
      searchTerm : searchTerm,
      sortParam : sortParam,
      isUnPublished : isUnpublished
  }
)
let requestDeleteSurvey = () => ({type: types.REQUEST_DELETE_SURVEY})
let receiveDeleteSurveyError = (json) => (
  {
    type: types.RECEIVE_DELETE_SURVEY_ERROR,
    data: json
  }
)
let receiveDeleteSurvey = () => ({type: types.RECEIVE_DELETE_SURVEY})

let searchFieldFocus = () => ({type:types.SURVEY_SEARCH_FIELD_FOCUS})
let searchFieldBlur = () => ({type:types.SURVEY_SEARCH_FIELD_BLUR})
let clearSeachField = () => ({type:types.CLEAR_SURVEY_SEARCH_FIELD})
let clearSortFields = () => ({type:types.CLEAR_SORT_FIELDS})
let setSortParam = (sortParam) => ({type:types.SET_SORT_PARAM,sortParam:sortParam})
let setFilterParam = (filterParam) => ({type:types.SET_FILTER_PARAM,filterParam:filterParam})
let setSearchParam = (searchParam) => ({type:types.SET_SEARCH_PARAM,searchParam:searchParam})

export function searchSurvey(searchTerm,sortParam,isUnPublished){
  return function(dispatch){
    dispatch(requestData())
    return surveyApi.getSurveys(searchTerm,sortParam,isUnPublished)
                        .then((response) => dispatch(receiveSurveyData(response,searchTerm,sortParam,isUnPublished)))
                        .catch((error) => dispatch(receiveError({error:error})))
  }
}

export function deleteSurvey(surveyId){
  return function(dispatch){
    dispatch(requestDeleteSurvey())
    return surveyApi.deleteSurvey(surveyId)
                        .then(() => dispatch(receiveDeleteSurvey()))
                        .catch((error) => dispatch(receiveDeleteSurveyError({error:error})))
  }
}

export function onSearchFieldFocus(){
  return function(dispatch){
    return dispatch(searchFieldFocus())
  }
}

export function onSearchFieldBlur(){
  return function(dispatch){
    return dispatch(searchFieldBlur())
  }
}

export function onClearSearchField(){
  return function(dispatch){
    return dispatch(clearSeachField())
  }
}

export function onClearSortFields(){
  return function(dispatch){
    return dispatch(clearSortFields())
  }
}

export function onSetSortParam(sortParam){
  return function(dispatch){
    return dispatch(setSortParam(sortParam))
  }
}

export function onSetFilterParam(filterParam){
  return function(dispatch){
    return dispatch(setFilterParam(filterParam))
  }
}

export function onSetSearchParam(searchParam){
  return function(dispatch){
    return dispatch(setSearchParam(searchParam))
  }
}