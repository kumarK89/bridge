import React,{Component} from 'react'
import QuestionContainer from './QuestionContainer'

class QuestionsContainer extends Component{
    render()
    {
        let questionsList= this.props.questions.map(
            (question,index)=> (
                <QuestionContainer
                    key={`question${question.id}`}
                    isActive={this.props.currentQuestion===index}
                    onActive={this.props.onActive}
                    question={question}
                    onAnswerHandler={this.props.onAnswerHandler}
                    questionIndex={index}>
                </QuestionContainer>
            )
        )
        return (
            <ol className="learner-survey__question-list">
                {questionsList}
            </ol>
        )
    }
}

export default QuestionsContainer