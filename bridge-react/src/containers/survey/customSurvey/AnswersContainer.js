import React,{Component,PropTypes} from 'react'
import classnames from 'classnames'
let uniqueElementId = 0
let selectedIndexValue = 0
class AnswersContainer extends Component{
   constructor(){
       super()
       this.state = {
            answersFocused: false
       }
       this.focusSelected = this.focusSelected.bind(this)
       this.focus = this.focus.bind(this)
       this.blur = this.blur.bind(this)
       this.isSelectable = this.isSelectable.bind(this)
   }
  componentWillMount() {
    this.answerRadioId = `survey-ideal-answer-${++uniqueElementId}`
  }
  focus() {
    this.setState({answersFocused: true})
  }
  focusSelected() {
    this.refs["idealAnswer" + selectedIndexValue].focus()
  }
  blur() {
    this.setState({answersFocused: false})
  }
  renderAnswer(answer,id, i) {
    let isSelected = false    
    if(i === this.props.selectedIndex){
        isSelected = true
    }else if(this.props.selectedIndex === -1 && i===4){
        isSelected = true
    }
    let isDisabled = !this.isSelectable(i)
    let answerClasses = classnames({
      "survey-answers__option": true,
      "survey-answers__option--selected": isSelected,
      "survey-answers__option--disabled": isDisabled
    })
    return (
      <label
        className={answerClasses}
        key={id}
        onClick={isDisabled && this.focusSelected}
      >
        <input
          className="screenreader-only"
          type="radio"
          name={this.answerRadioId}
          onChange={this.props.onChange}
          onFocus={this.focus}
          onBlur={this.blur}
          value={id}
          checked={isSelected}
          disabled={isDisabled}
          ref={"idealAnswer" + i}
        />
        {answer}
        {isSelected &&
          <span className="survey-answers__selected-text" aria-hidden="true">
            <span>Marked as ideal response</span>
          </span>
        }
      </label>
    )
  }
  isSelectable(index) {
    return index === 0 || index === this.props.answers.length - 1
  }
  render() {
    let classes = classnames({
      "survey-answers": true,
      "survey-answers--focused": this.state.answersFocused
    })
    return (
      <section className={classes}>
        {this.props.answers.map((answer, i) => {
          return this.renderAnswer(answer.text,answer.id, i)
        })}
      </section>
    )
  }
}

AnswersContainer.propTypes = {
	onChange : PropTypes.func,
	answers : PropTypes.array
}

export default AnswersContainer
