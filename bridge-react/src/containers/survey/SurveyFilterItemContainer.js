import React,{Component,PropTypes} from 'react';
import classnames from 'classnames';

class SurveyFilterItemContainer extends Component{
	constructor(){
		super();
		this.state = {
			checked : false,
			focused : false,
			disabled : false,
			value : ''
		}
		this.markFocused = this.markFocused.bind(this);
		this.unmarkFocused = this.unmarkFocused.bind(this);
		this.onSelectOfFilterItem = this.onSelectOfFilterItem.bind(this);
	}
	markFocused() {
    	this.setState({ focused: true });
  	}
  	unmarkFocused() {
    	this.setState({ focused: false });
  	}
  	onSelectOfFilterItem(){
  		this.props.onFilterItemSelect(!this.state.checked);
  		this.setState({
  			checked : !this.state.checked
  		});
  	}
	render(){
		let labelClassName = classnames({
	      "checkbox": true,
	      "checkbox--checked": this.state.checked,
	      "checkbox--disabled": this.state.disabled,
	      "checkbox--focused": this.state.focused
	    });
	    let spanClassName = classnames({
	    	"checkbox__display-checkbox": true,
		    "checkbox__display-checkbox--checked": this.state.checked,
		    "checkbox__display-checkbox--disabled": this.state.disabled
	    });
	    let wrapperClassName = classnames({
      		"checkbox__label-wrapper": true,
      		"checkbox__label-wrapper--checked brand-color": this.state.checked
    	});
		return(
			<div className="filter-selector">
                <ul className="unstyled">
                     <li key="unpublished" >
                        <label tabIndex='0' onFocus={this.markFocused} 
                        					onBlur={this.unmarkFocused}                        					
                        					role='checkbox'
                        					aria-checked={this.state.checked}
                        				    className={labelClassName}>
                            <span className={spanClassName}></span>
                            <input type="checkbox" tabIndex='-1' 
                            					   checked={this.state.checked}
										           value={this.state.value}
										           onClick={this.onSelectOfFilterItem}
										           disabled={this.state.disabled}
                            				       className="screenreader-only"/>
                            <span className={wrapperClassName}>
                                Unpublished
                            </span>
                        </label>
                     </li>
                </ul>
            </div>
		);
	}
}

SurveyFilterItemContainer.propTypes = {
	checked : PropTypes.bool,
	focused : PropTypes.bool,
	disabled : PropTypes.bool,
	value : PropTypes.string
}

export default SurveyFilterItemContainer;