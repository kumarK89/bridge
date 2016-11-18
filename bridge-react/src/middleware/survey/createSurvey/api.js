import axios from 'axios';
import logCustomMessage from '../../../utils/logCustomMessage';

const _BASE_URL = "http://localhost:8090";

let createSurveyApi = {
	getSurveyTemplates : () =>
		axios.get(_BASE_URL +'/survey/templates')
        .then((response) => response.data.surveyTemplates)
        .catch((error) => logCustomMessage(error,{
            error:error
        }))
}
export default createSurveyApi;