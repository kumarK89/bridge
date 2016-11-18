import React,{Component,PropTypes} from 'react'
import IconComponent from '../../../../src/components/IconComponent'
import ComboBoxContainer from './ComboBoxContainer'
import AnswersContainer from './AnswersContainer'
import ComboBoxItemContainer from './ComboBoxItemContainer'

class QuestionDetailContainer extends Component{
    constructor(){
        super()
        this.state ={}
        this.getAnswerTypeId = this.getAnswerTypeId.bind(this)
        this.focus = this.focus.bind(this)
        this.updateStatement = this.updateStatement.bind(this)
        this.updateIdealAnswer = this.updateIdealAnswer.bind(this)
        this.previewAnswerTypeId = this.previewAnswerTypeId.bind(this)
        this.updateAnswerTypeId = this.updateAnswerTypeId.bind(this)
        this.updateIsRequired = this.updateIsRequired.bind(this)
        this.answers = this.answers.bind(this)
        this.updateAllowTextResponse = this.updateAllowTextResponse.bind(this)
        this.surveyAnswerTypes = this.surveyAnswerTypes.bind(this)				
    }
    componentDidMount(){
      this.focus()
    }
    componentWillReceiveProps(){
        this.focus()
    }
    getAnswerTypeId() {
      return this.props.answerTypeId || this.props.answerTypesArray[0].answerTypeId
    }
    focus() {
      this.refs.statement.focus()
    }
    updateStatement(event) {
      this.props.onChange(this.props.questionIndex, {text: event.target.value})
    }
    updateIdealAnswer(event) {
      this.props.onChange(this.props.questionIndex, {
        idealAnswerOptionId: event.target.value
      })
    }
    previewAnswerTypeId(id) {
      this.setState({previewAnswerType: id})
    }
    updateAnswerTypeId(id) {
      this.setState({previewAnswerType: 0})
      this.props.onChange(this.props.questionIndex, {answerTypeId: id})
    }
    updateIsRequired(event) {
      this.props.onChange(this.props.questionIndex, {required: event.target.checked})
    }
    updateAllowTextResponse(event){
      this.props.onChange(this.props.questionIndex, {allowPreText: event.target.checked})
    }
    getSelectedIndex(){
      let answerTypeId = this.state.previewAnswerType || this.getAnswerTypeId()
      let answerOptionId = this.props.surveyQuestions[this.props.questionIndex].idealAnswerOptionId
      let idealAnswerOptionId = typeof  answerOptionId === 'string' ? parseInt(answerOptionId,10) : answerOptionId
      let answerOptions = this.props.answerTypesArray.filter(
                                (type) => type.id === answerTypeId
                                )[0].answerOptions            
      let index =  -1
      answerOptions.map((option,i) =>{
        if(option.id === idealAnswerOptionId){
          index = i
        }
      })
      return index
    }
    answers() {
      let answerTypeId = this.state.previewAnswerType || this.getAnswerTypeId()
      return this.props.answerTypesArray.filter(
            (type) => type.id === answerTypeId
            )[0].answerOptions
      this.focus()
    }
    surveyAnswerTypes() {
		  let selected = []
		  let others = []
		  this.props.answerTypesArray.map((type) => {						
		    if (type.answerTypeId === this.getAnswerTypeId()) {
			   selected.push(type)
		    } else {
			   others.push(type)
		    }
		  })
		  return selected.concat(others)
	  }
    renderAnswersSection() {
      return <section>
                <label className="survey-question__answer-type-label">
                  {"Answer Type:"}
                </label>
                <ComboBoxContainer
                  selectedValue={this.getAnswerTypeId()}
        				  onSelect={this.previewAnswerTypeId}
                  onChange={this.updateAnswerTypeId}
                  className="combo-box--compact survey-question__answer-type"
                >
                  {this.surveyAnswerTypes().map((type) => {
                    return (
                      <ComboBoxItemContainer
                        key={type.text}
                        value={type.id}
                        className="medium base indigo text-center upcase"
                        label={type.text}
          	  
                      />
                    )
                  })}
                </ComboBoxContainer>
              </section>
    }
    render(){
      return(
          <section className="padding-t-xs">
            <div className="survey-question shadow border-dark-grey padding-trbl-xl margin-trbl-xl">
                <div className="survey-question__heading border-b border-med-grey margin-t-xs">
                    <div className="survey-question__icon left margin-r-xs margin-t-xxs">
                        <IconComponent iconClassName="gs-survey-likert gs-3-4" />
                    </div>
                    <div className="right dark-grey small padding-t-s">
                        <label>
                            <input className="margin-r-xs" type="checkbox" checked={this.props.surveyQuestions[this.props.questionIndex].required} onChange={this.updateIsRequired} />
                            <span>Required</span>
                        </label>
                    </div>
                    <div className="bold padding-t-s">
                        <span>Likert Question</span>
                    </div>
                </div>
                <textarea 
    	               ref="statement" 
    	               className="x-large survey-question__text margin-tb-l padding-tb-xs padding-rl-s" 
    	               value={this.props.surveyQuestions[this.props.questionIndex].text}
    	               placeholder="Sample statement: I rarely think about looking for a job at another company" 
    	               onChange={this.updateStatement} />
                <div className="left">
                    {this.renderAnswersSection()}
                </div>
                <div className="right">
                    <AnswersContainer answers={this.answers()}  onChange={this.updateIdealAnswer} selectedIndex={this.getSelectedIndex()} />
                    <div className="small dark-grey padding-t-s">
                        <br/>
                        <label>
                            <input className="margin-r-xs" type="checkbox" checked={this.props.surveyQuestions[this.props.questionIndex].allowPreText} onChange={this.updateAllowTextResponse} />
                            <span>Allow text response</span>
                        </label>
                    </div>
                </div>
                <div className="clear padding-tb-xs" />
            </div>
          </section>
      )
    }
}

QuestionDetailContainer.propTypes = {
    surveyQuestions: PropTypes.array.isRequired,
    questionIndex: PropTypes.number,
    onChange: PropTypes.func,
  	statement:PropTypes.string,
  	surveyAnswerTypes: PropTypes.func,
  	selectedAnswerType: PropTypes.func,
  	answerTypeId: PropTypes.number
}

export default QuestionDetailContainer