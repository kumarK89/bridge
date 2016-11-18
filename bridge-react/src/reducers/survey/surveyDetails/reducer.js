import * as types from '../../../constants/survey/surveyDetails/actionTypes'

const initialState = {
    surveys : [],
    searchTerm: '',
    isUnPublished : false,
    sortParam : '',
    isLoading: false,
    error: false,
    focused:false
}

const surveyReducer = (state =initialState, action = null) => {
    switch(action.type) {
        case types.RECEIVE_SURVEYS_ERROR:
            return Object.assign({},state,{isLoading: false,surveys: [],error: true})
        case types.RECEIVE_SURVEYS_DATA:
            return Object.assign({},state,{isLoading: false,surveys : action.data,searchTerm : action.searchTerm,sortParam : action.sortParam,isUnPublished : action.isUnPublished,error:false})
        case types.REQUEST_SURVEYS_DATA:
            return Object.assign({},state,{isLoading: true,error: false})
        case types.SURVEY_SEARCH_FIELD_FOCUS:
            return Object.assign({},state,{focused:true})
        case types.SURVEY_SEARCH_FIELD_BLUR:
            return Object.assign({},state,{focused:false})
        case types.CLEAR_SURVEY_SEARCH_FIELD:
            return Object.assign({},state,{searchTerm:''})
        case types.CLEAR_SORT_FIELDS:
            return Object.assign({},state,{sortParam:'',isUnPublished:false})
        case types.SET_SORT_PARAM:
            return Object.assign({},state,{sortParam:action.sortParam})
        case types.SET_FILTER_PARAM:
            return Object.assign({},state,{isUnPublished : action.filterParam})
        case types.SET_SEARCH_PARAM:
            return Object.assign({},state,{searchTerm:action.searchParam})
        default:
            return state
    }
}

export default surveyReducer