import axios from 'axios';
import logCustomMessage from '../logCustomMessage';

var _BASE_URL = "http://localhost:8090";
var surveyHelpers = {
	getSurveys : function(surveyName,sortParam,isUnpublished){
		return axios.get(_BASE_URL+'/survey/getSurveys?srvyName='
			  		+surveyName+'&sortParameters='
			  		+sortParam+'&isPublished='
			  		+isUnpublished)
		.then(function(response){
			return response.data.surveys;
		})
		.catch(function(error){
			return logCustomMessage(error , {
               surveyName : surveyName,
               sortParam : sortParam,
               isUnpublished : isUnpublished,
               error :error
            });
		});

	},
	deleteSurvey : function(deleteSurveyId){
		console.log("in helper"+ deleteSurveyId);
		return axios.delete(_BASE_URL+'/survey/deleteSurvey?surveyId='
			         +deleteSurveyId)
		.then(function(response){
			return 'SUCCESS';
		})
		.catch(function(error){
			return logCustomMessage(error , {
               deleteSurveyId : deleteSurveyId,
               error :error
            });
		});
	}
}

export default surveyHelpers;