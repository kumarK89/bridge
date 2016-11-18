import React,{Component,PropTypes} from 'react'
import IconComponent from '../../../../src/components/IconComponent'
import { Link } from 'react-router'
import classnames from 'classnames'

class QuestionListItemContainer extends Component{
    constructor(){
        super()
        this.selectedQuestion = this.selectedQuestion.bind(this)
    }
    selectedQuestion(){
         this.props.selectedQuestion(this.props.id)
    }
    render() {
        let classes = classnames({
          "survey-question-preview": true,
          "indigo": this.props.statement,
          "dark-grey": !this.props.statement,
          "survey-question-preview--active": this.props.activeItem
        })
        return (
          <Link className={classes} onClick={this.selectedQuestion} >
            <span className="survey-question-preview__statement">
              {this.props.statement || "New Likert Question"}
            </span>

            <IconComponent iconClassName="survey-question-preview__icon gs-survey-likert gs-1x indigo" />
          </Link>
        )
    }
}

QuestionListItemContainer.propTypes = {
    id: PropTypes.number,
    surveyId: PropTypes.number,
    statement: PropTypes.string,
    selectedQuestion: PropTypes.func,
    activeItem: PropTypes.bool
}

export default QuestionListItemContainer