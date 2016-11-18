import React,{Component} from 'react'
import Likert from './Likert'

class QuestionContainer extends Component{
    render(){
        if(this.props.isActive)
            this.props.onActive(this)
        return(
            <li className={`learner-survey__question-list__item
                            ${this.props.question.required && "learner-survey__question-list__item--required"}
                            ${this.props.isActive && "learner-survey__question-list__item--active"}`} >
                <div className="learner-survey__question-list__item__wrapper">
                    <div className="large learner-survey__question-list__item__statement learner-survey__question-list__item__statement--active" >
                        {this.props.question.statement}
                    </div>
                    <Likert
                        onAnswer={this.onAnswer}
                        onAnswerHandler={this.props.onAnswerHandler}
                        questionIndex={this.props.questionIndex}
                        commentRequired={this.props.question.comment_required}>
                    </Likert>
                </div>
            </li>
        )
    }
}

export default QuestionContainer