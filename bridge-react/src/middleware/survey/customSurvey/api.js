import axios from 'axios'
import logCustomMessage from '../../../utils/logCustomMessage'

const _BASE_URL = "http://172.16.202.30:8090"

let customSurveyApi = {
    saveSurveyFromTemplate : (surveyTemplateId) =>
        axios({
            method: 'post',
            url: _BASE_URL + '/survey/saveSurveyFromTemplate?surveyTemplateId='+surveyTemplateId
        })
        .then((response) => response.data.surveys[0])
        .catch((error) => logCustomMessage(error,{
            surveyTemplateId : surveyTemplateId,
            error:error
        })),
	saveSurvey : (surveyId,surveyName,surveyQuestions) =>
		axios({
            method: 'post',
            url: _BASE_URL + '/survey/saveSurveyQuestions?surveyId='+surveyId+'&surveyName='+surveyName,
            data: surveyQuestions
        })
        .then((response) => response.data.surveys[0])
        .catch((error) => logCustomMessage(error,{
        	surveyId : surveyId,
        	surveyName : surveyName,
        	surveyQuestions : surveyQuestions,
            error:error
        })),
    getAnswerTypesWithOptions : () =>
    	axios({
            method: 'get',
            url: _BASE_URL + '/survey/getAllAnswerTypeWithOptions'
        })
    	.then((response) => response.data.answerTypes)
        .catch((error) => logCustomMessage(error,{
        	error:error
        })),
    deleteSurveyQuestion : (surveyId,surveyName,surveyQuestionId) =>
    	axios({
            method: 'delete',
            url: _BASE_URL + '/survey/deleteSurveyQuestion?surveyId='+surveyId+'&surveyName='+surveyName+'&surveyQuestionId='+surveyQuestionId
        })
        .then((response) => response.data.surveys[0])
        .catch((error) => logCustomMessage(error,{
        	surveyId : surveyId,
        	surveyName : surveyName,
        	surveyQuestionId : surveyQuestionId,
            error:error
        })),
}

export default customSurveyApi