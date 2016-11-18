import axios from 'axios';
import logCustomMessage from '../../../utils/logCustomMessage';

const _BASE_URL = "http://localhost:8090";

let surveyApi = {
	getSurveys : (surveyName,sortParam,isUnpublished) =>
		axios.get(_BASE_URL +'/survey/getSurveys?surveyName='
			  		+surveyName+'&sortParameters='
			  		+sortParam+'&isPublished='
			  		+isUnpublished)
		.then((response) => response.data.surveys)
		.catch((error) => logCustomMessage(error,{
            surveyName : surveyName,
            sortParam : sortParam,
            isUnpublished : isUnpublished,
            error :error
        })),
	deleteSurvey : (deleteSurveyId) =>
        axios.delete(_BASE_URL +'/survey/deleteSurvey?surveyId='
                     +deleteSurveyId)
        .then(() => 'SUCCESS')
        .catch((error) => logCustomMessage(error,{
            deleteSurveyId : deleteSurveyId,
            error :error
        }))
}

export default surveyApi;