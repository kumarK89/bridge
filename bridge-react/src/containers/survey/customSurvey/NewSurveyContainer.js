import React,{Component} from 'react'
import HeaderContainer from './HeaderContainer'
import QuestionDetailContainer from './QuestionDetailContainer'
import QuestionsListContainer from './QuestionsListContainer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../../actions/survey/customSurvey/actions'

class NewSurveyContainer extends Component{
    constructor(){
        super()
        this.onAddQuestion = this.onAddQuestion.bind(this)
        this.getSelectedQuestionDetails = this.getSelectedQuestionDetails.bind(this)
        this.onDeleteQuestion = this.onDeleteQuestion.bind(this)
        this.onDuplicateQuestion = this.onDuplicateQuestion.bind(this)
        this.changeSurveyQuestion = this.changeSurveyQuestion.bind(this)
    }
    componentWillMount(){
        this.props.getAnswerTypes()
        if(this.props.params && this.props.params.surveyTemplateId){
            this.props.saveSurveyFromTemplate(this.props.params.surveyTemplateId)
        }else{
            this.props.saveSurvey(0,'Untitled Survey',[])
        }        
    }
    onAddQuestion(){
        let question =  {
            id : 0,
            text : '',
            required : false,
            allowPreText : false,
            answerTypeId : 1,
            idealAnswerOptionId : 5,
            surveyId : this.props.survey.surveyId,
            preTextMessage : ''
        }
        this.props.survey.surveyQuestions.push(question)
        this.props.saveSurvey(this.props.survey.surveyId,
                              this.props.survey.surveyName,
                              this.props.survey.surveyQuestions)
    }
    getSelectedQuestionDetails(questionId){
        let questionIndex = 0
        this.props.survey.surveyQuestions.map((question,index) =>{
            if (question.id === questionId) {
                question.activeItem = true
                questionIndex = index
            }else{
                question.activeItem = false
            }
        })
        this.props.onSelectedQuestion(questionIndex)            
    }
    onDeleteQuestion(){
        let selectedObjIndex = this.props.selectedObjIndex
        let surveyQuestionId = this.props.survey.surveyQuestions[selectedObjIndex].id
        this.props.deleteSurveyQuestion(this.props.survey.surveyId,
                                        this.props.survey.surveyName,
                                        surveyQuestionId)
    }
    onDuplicateQuestion(){
        let questionsArray = this.props.survey.surveyQuestions
        let selectedObjIndex = this.props.selectedObjIndex
        let questionObj = questionsArray[selectedObjIndex]
        questionsArray.push(this.getDuplicateQuestion(questionObj))
        this.props.saveSurvey(this.props.survey.surveyId,
                              this.props.survey.surveyName,
                              questionsArray)
    }
    getDuplicateQuestion(surveyQuestion){
        return {
            allowPreText:surveyQuestion.allowPreText,
            answerTypeId:surveyQuestion.answerTypeId,
            id:0,
            idealAnswerOptionId:surveyQuestion.idealAnswerOptionId,
            preTextMessage:surveyQuestion.preTextMessage,
            required:surveyQuestion.required,
            surveyId:surveyQuestion.surveyId,
            text:surveyQuestion.text
        }
    }
    changeSurveyQuestion(index,attrObj){
        let key = Object.keys(attrObj)
        let questionsArray = this.props.survey.surveyQuestions
        questionsArray[index][key[0]] = attrObj[key[0]]
        let survey = {}
        survey.surveyId = this.props.survey.surveyId
        survey.surveyName = this.props.survey.surveyName
        survey.surveyQuestions = questionsArray
        this.props.onChangeSurveyQuestion(survey)
    }
    render(){
        return(
            <main className="grey-gradient-bg full-width full-min-height">
                <HeaderContainer survey={this.props.survey}
                                 isLoading={this.props.isLoading}
                                 error={this.props.error}
                                 saveSurvey={this.props.saveSurvey}
                                 showTogglePreviewTooltip={this.props.showTogglePreviewTooltip}
                                 onShowPreviewTooTip={this.props.onShowPreviewTooTip}/>                
                {
                    this.props.survey && this.props.survey.surveyQuestions && this.props.survey.surveyQuestions.length>0 &&
                    <QuestionsListContainer survey={this.props.survey} 
                                            isLoading={this.props.isLoading}
                                            addQuestion={this.onAddQuestion} 
                                            selectedQuestion={this.getSelectedQuestionDetails} 
                                            onDeleteSelected={this.onDeleteQuestion} 
                                            onDuplicateSelected={this.onDuplicateQuestion} />
                }
                <section className="authoring-pane padding-tb-m">
                    {
                        this.props.survey.surveyQuestions && this.props.survey.surveyQuestions.length>0 &&
                        <QuestionDetailContainer 
                            surveyQuestions={this.props.survey.surveyQuestions}
                            answerTypeId={this.props.survey.surveyQuestions[this.props.selectedObjIndex].answerTypeId}
                            questionIndex={this.props.selectedObjIndex} 
                            onChange={this.changeSurveyQuestion}
                            answerTypesArray={this.props.answerTypes}/>
                    }
                </section>
            </main>
        )
    }
}

let mapStateToProps = (state) => (
    {
        survey: state.customSurveyReducer.survey,
        selectedObjIndex : state.customSurveyReducer.selectedObjIndex,
        answerTypes : state.customSurveyReducer.answerTypes,
        isLoading : state.customSurveyReducer.isLoading,
        error : state.customSurveyReducer.error,
        showTogglePreviewTooltip : state.customSurveyReducer.showTogglePreviewTooltip
    }
)
let mapDispatchToProps = (dispatch) => 
    bindActionCreators(actionCreators,dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewSurveyContainer)