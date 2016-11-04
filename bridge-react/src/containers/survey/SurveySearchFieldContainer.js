import React,{Component,PropTypes} from 'react';
import classnames from 'classnames';
import IconComponent from '../../components/IconComponent';

class SurveySearchFieldContainer extends Component{
  constructor(){
    super();
    this.state = {
      searchTerm: '',
      onChange: Function.prototype,
      onSearch: Function.prototype,
      urlDriven: true,
      debounceRate: 200,
      focused: false,
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.clearSearchTerm = this.clearSearchTerm.bind(this);
  }
  getPlaceholderText(){
    return this.state.focused ? 'Type here to search' : '';
  }
  getClassName(){
    return classnames({
      'search-field': true,
      'search-field--focused': this.state.focused,
      'search-field--no-label': this.shouldHideLabel()
    });
  }
  getInputClassName(){
    return classnames({
      'search-field__input': true,
      'search-field__input--populated': this.isPopulated()
    });
  }
  getSpanClassName(){
    return classnames({
      'search-field__label--no-label': this.shouldHideLabel(),
      'search-field__label': !this.shouldHideLabel()
    });
  }
  isPopulated(){
    return this.state.searchTerm !== ''
  }
  shouldHideLabel(){
    return (this.state.focused || this.isPopulated());
  }
  handleInputChange(event){
    this.setSearchTerm(event.target.value);
  }
  handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.target.value = '';
      this.handleInputChange(event);
    } else if (event.key === 'Enter' && this.state.searchTerm && this.state.searchTerm.replace(/ /g, '') !== '') {
        this.props.onCarriageReturn && this.props.onCarriageReturn(this.state.searchTerm);
    }
  }
  handleFocus(){
    this.setState({ focused: true });
  }
  handleBlur(){
    this.setState({ focused: false });
  }
  setSearchTerm(searchTerm){
    this.setState({ searchTerm: searchTerm });
    this.props.onSearch(searchTerm);    
  }
  clearSearchTerm(){
    this.setSearchTerm('');
  }
  renderClearButton(){
    return (
      <span onClick={this.clearSearchTerm} className="search-field__clear">
        <IconComponent iconClassName="gs-x margin-l-s gs-3-4" />
      </span>
    )
  }
  render(){
    var bindFocus = this.handleFocus.bind(this);
    var bindBlur = this.handleBlur.bind(this);
    var bindGetClassName = this.getClassName.bind(this);
    var bindHandleKeyDown = this.handleKeyDown.bind(this);
    var bindHandleInputChange = this.handleInputChange.bind(this);
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
          value={this.state.searchTerm}
        />
        {this.isPopulated() && this.renderClearButton()}
      </label>
    );
  }

}

SurveySearchFieldContainer.propTypes = {
    label: PropTypes.string,
    placeholderText: PropTypes.string,
    onChange: PropTypes.func,
    onCarriageReturn: PropTypes.func,
    urlDriven: PropTypes.bool,
    onSearch : PropTypes.func,
    debounceRate: PropTypes.number,
    searchTerm: PropTypes.string
};

module.exports = SurveySearchFieldContainer;
