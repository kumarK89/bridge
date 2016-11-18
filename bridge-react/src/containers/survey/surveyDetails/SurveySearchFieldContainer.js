import React,{Component} from 'react'
import classnames from 'classnames'
import IconComponent from '../../../components/IconComponent'

class SurveySearchFieldContainer extends Component{
  getPlaceholderText(){
    return this.props.focused ? 'Type here to search' : ''
  }
  getClassName(){
    return classnames({
      'search-field': true,
      'search-field--focused': this.props.focused,
      'search-field--no-label': this.shouldHideLabel()
    })
  }
  getInputClassName(){
    return classnames({
      'search-field__input': true,
      'search-field__input--populated': this.isPopulated()
    })
  }
  getSpanClassName(){
    return classnames({
      'search-field__label--no-label': this.shouldHideLabel(),
      'search-field__label': !this.shouldHideLabel()
    })
  }
  isPopulated(){
    return this.props.searchTerm && this.props.searchTerm !== ''
  }
  shouldHideLabel(){
    return (this.props.focused || this.isPopulated())
  }
  handleInputChange(event){
    this.props.onSearch(event.target.value)
  }
  handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.target.value = ''
      this.handleInputChange(event)
    } 
  }
  handleFocus(){
    this.props.searchFieldFocus();
  }
  handleBlur(){
    this.props.searchFieldBlur();
  }
  renderClearButton(){
    return (
      <span onClick={this.props.clearSearchField} className="search-field__clear">
        <IconComponent iconClassName="gs-x margin-l-s gs-3-4" />
      </span>
    )
  }
  render(){
    let bindFocus = this.handleFocus.bind(this)
    let bindBlur = this.handleBlur.bind(this)
    let bindGetClassName = this.getClassName.bind(this)
    let bindHandleKeyDown = this.handleKeyDown.bind(this)
    let bindHandleInputChange = this.handleInputChange.bind(this)
    return(
      <label
        onFocus={bindFocus}
        onBlur={bindBlur}
        className={bindGetClassName}
      >
        <IconComponent iconClassName='gs-search gs-1x padding-r-xs'/>
        {' '}
        <span className={this.getSpanClassName()}>
          {this.props.label || 'Search'}
        </span>
        <input
          data-capybara='search-field-input'
          placeholder={this.getPlaceholderText()}
          onKeyDown={bindHandleKeyDown}
          onChange={bindHandleInputChange}
          className={this.getInputClassName()}
          value={this.props.searchTerm}
        />
        {this.isPopulated() && this.renderClearButton()}
      </label>
    )
  }

}

module.exports = SurveySearchFieldContainer