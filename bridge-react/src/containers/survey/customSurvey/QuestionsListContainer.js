import React,{Component} from 'react'
import QuestionListItemContainer from './QuestionListItemContainer'
import classnames from 'classnames'
import IconComponent from '../../../../src/components/IconComponent'

class QuestionsListContainer extends Component{
    constructor(){
        super()
        this.addQuestion = this.addQuestion.bind(this)
        this.duplicateQuestion = this.duplicateQuestion.bind(this)
        this.deleteQuestion = this.deleteQuestion.bind(this)
    }
    addQuestion(){
        this.props.addQuestion(this.props.survey.surveyId, this.props.survey.surveyName)
    }
    duplicateQuestion(){
        this.props.onDuplicateSelected(this.props.survey.surveyId, this.props.survey.surveyName)
    }
    deleteQuestion(){
        this.props.onDeleteSelected(this.props.survey.surveyId, this.props.survey.surveyName)
    }
    renderQuestionPreview(question) {
        return (
            <li
                key={question.id}
                ref={`question${question.id}`}
                onFocus={this.scrollToQuestion}
            >
                <QuestionListItemContainer
                  id={question.id}
                  surveyId={question.surveyId}
                  statement={question.text}
                  activeItem={question.activeItem}
                  selectedQuestion={this.props.selectedQuestion}
                />
            </li>
        )
    }
    render(){
        let questionActionClasses = classnames({
            "btn btn--round secondary": true,
            "disabled": this.props.isLoading
        })
        return(
            <section className="authoring-sidebar">
                <section className="authoring-sidebar__actions padding-rl-s flex-vertical-center">
                    <button className="btn filled" onClick={this.addQuestion}>
                        <span>Add Question</span>
                    </button>
                    <button className={questionActionClasses} onClick={this.duplicateQuestion}>
                        <IconComponent iconClassName="gs-duplicate gs-1x" />
                    </button>
                    <button className={questionActionClasses} onClick={this.deleteQuestion}>
                        <IconComponent iconClassName="gs-trash gs-1x" />
                    </button>
                </section>
                <section>
                    <ol className="authoring-sidebar__content survey-questions" ref="questions">
                        {this.props.survey.surveyQuestions.map((question) => {
                            return this.renderQuestionPreview(question)
                        })}
                    </ol>
                </section>
            </section>

        )
    }
}

export default QuestionsListContainer