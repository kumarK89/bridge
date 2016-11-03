import React,{Component,PropTypes} from 'react';
import classnames from 'classnames';
import IconComponent from '../../components/IconComponent';

class SurveyListItemContainer extends Component{
	constructor(){
		super();
		this.state = {
	      title: "",
	      distributionsCount: 0,
	      removable: false,
	      highlight: '',
	      survey : {},
	      isConfirmingRemoval : false
	      
	    };
	    this.getTitle = this.getTitle.bind(this);
	    this.removeSurvey = this.removeSurvey.bind(this);
	}
	getTitle(){
		var title = this.props.title || "";
    	return title.length > 0 ? title : 'Untitled Survey';
	}
	getIsDistributed(){
		return this.props.distributionsCount > 0;
	}
	confirmRemoval(){
		this.setState({
			removable:true,
			isConfirmingRemoval :true
		});
	}
	cancelRemoval(){
		this.setState({
			removable:false,
			isConfirmingRemoval : false
		});
	}
	removeSurvey(deleteSurveyId){
		this.props.deleteSurvey(deleteSurveyId);
	}
	render(){
		let className = classnames({
	      'removable-item': true,
	      'removable-item--focused': this.state.isConfirmingRemoval
	    });
	    let h2ClassName = classnames({
	      'h3': true,
	      'margin-none': true,
	      'unpublished': !this.getIsDistributed()
	    });
	    let linkClassName = classnames({
	      'indigo': (this.props.title || '').length > 0,
	      'dark-grey': (this.props.title || '').length === 0
	    });
	    let bindCancelRemoval = this.cancelRemoval.bind(this);
	    let bindConfirmRemoval = this.confirmRemoval.bind(this);
	    let bindRemoveSurvey = this.removeSurvey.bind(this,this.props.survey.surveyId);
	    return(
	    	<li>
	    		<div className={className}>
	    			<div className="removable-item__title--large">
	    				<h2 className={h2ClassName}>
	    					<a href="#" className={linkClassName}>
	                            <span>{this.props.survey.surveyName}</span>
	                        </a>
	    				</h2>
	    				<ul className="dark-grey light margin-none list--slashed">
              				<li>
              					{this.getIsDistributed() &&
				                  "Distribution"
				                }
				                {!this.getIsDistributed() &&
				                  <i>Draft; this survey has not been distributed yet</i>
				                }
              				</li>
              			</ul>
	    			</div>
	    			{this.state.removable && [
	    				<div key="text" className="removable-item__confirm">
			              Delete Survey?
			            </div>,
			            <div key="btns" className="removable-item__buttons">
			            	<button
				                type="button"
				                className="btn--reset dark-grey upcase small padding-rl-s text-center"
				                onClick={bindCancelRemoval}
				                children={'Cancel'} />
				            <button
				                type="button"
				                className="btn--reset pink upcase small padding-rl-s text-center"
				                onClick={bindRemoveSurvey}
				                children={'Delete'} />
				        </div>
				    ]}
				    {!this.state.removable &&
				    	<div className="removable-item__remove">
					    	<button
				                type="button"
				                onClick={bindConfirmRemoval}
				                className="btn--reset dark-grey small">
				                <IconComponent iconClassName="gs-x gs-1x dark-grey" />
				            </button>
				        </div>
				    }
	    		</div>
	    	</li>
	    );
	}
}

SurveyListItemContainer.propTypes = {
	id: PropTypes.string,
	survey: PropTypes.object,
    title: PropTypes.string,
    distributionsCount: PropTypes.number,
    removable: PropTypes.bool,
    highlight: PropTypes.string,
    onRemove: PropTypes.func,
    surveysData:PropTypes.array,
    deleteSurvey:PropTypes.func
};

module.exports = SurveyListItemContainer;