import axios from 'axios';
import logCustomMessage from '../logCustomMessage';
const _BASE_URL = "http://172.16.202.30:8090";

let newSurveyHelpers = {
	saveSurvey : function(surveyId, surveyName){			
        let questionsArray =  [{
            id : 0,
            text : '',
            required : true,
            allowPreText : true,
            answerTypeId : 1,
            idealAnswerOptionId : 1,
            surveyId : 1,
            preTextMessage : ''
        }];
        return axios({
            method: 'POST',
            url: _BASE_URL +'/survey/saveSurveyQuestions?surveyId='+surveyId+'&surveyName='+surveyName,
            data: questionsArray
        });
    },
	deleteSurvey : function(deleteSurveyId){
		return axios.delete(_BASE_URL +'survey/deleteSurvey?surveyId='
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

export default newSurveyHelpers;