import React,{Component} from 'react'
import classnames from 'classnames'
import {Link} from 'react-router'
import IconComponent from '../../../components/IconComponent'
import EditableTitleContainer from './EditableTitleContainer'

class HeaderContainer extends Component{
	constructor()
	{
		super()		
		this.handleChangeTitle = this.handleChangeTitle.bind(this)
		this.statusState = this.statusState.bind(this)
		this.showToolTip = this.showToolTip.bind(this)
		this.hideToolTip = this.hideToolTip.bind(this)
		this.saveQuestions = this.saveQuestions.bind(this)
	}
	showToolTip(){
		this.props.onShowPreviewTooTip(true)
	}
	hideToolTip(){
		this.props.onShowPreviewTooTip(false)
	}
	saveQuestions(){
		this.props.saveSurvey(this.props.survey.surveyId,
			                  this.props.survey.surveyName,
			                  this.props.survey.surveyQuestions)
	}
	statusState(){
		if(this.props.isLoading )
		{
			return "Saving"
		}
		else{
			return "All Changes Saved"
		}		
	}
	headerTitleClass() {
		let title = (this.props.survey && this.props.survey.surveyName) || ""
		let classes = { 'authoring-heading__title': true }
		if (title.length < 25) {
			classes['authoring-heading__title--short'] = true
		} else if (title.length < 40) {
			classes['authoring-heading__title--medium'] = true
		}
		return classnames(classes)
	}	
	handleChangeTitle(newTitle) {
		this.props.saveSurvey(this.props.survey.surveyId,
			                  newTitle,
			                  this.props.survey.surveyQuestions)
	}	
	render(){		
		let toggleReviewButtonClassName = classnames({
		  'btn': true,
		  'btn--round': true,
		  'dark': true,
		  'secondary': true,
		  'btn--active': false,
		})		
		let toolTipContentClassName = classnames({
		  "tooltip__content": true,
		  "shadow": true,
		  "rounded-corners-default": true,
		  "tooltip__content--dark": true,
		  "tooltip__content--visible": this.props.showTogglePreviewTooltip,
		  "tooltip__content--right-align": false
		})		
		let statusClass = classnames({
			"authoring-heading__save-status": true
		})		
		return(
			<header className="authoring-heading white padding-t-s padding-l-m">
				<Link to="/" className="right large padding-r-m" onMouseOver={this.saveQuestions}>
					<IconComponent iconClassName="gs-x gs-half white"/>
				</Link>					
				<EditableTitleContainer 
					classname={this.headerTitleClass()}
					value={this.props.survey.surveyName}
					inputClassName="authoring-heading__title-input"
					readOnly={false}
					maxLength="255"
					defaultValue="Untitled Survey"
					onChange={this.handleChangeTitle}
					>
					{this.props.survey.surveyName || "Untitled Survey"}
				</EditableTitleContainer>				
				<span className={statusClass}>
					{ this.props.error ? "NO CONNECTION. NOT SAVING": this.statusState()}
				</span>					
				<span className="authoring-heading__preview-button">
					<div className="tooltip">
						<div className="tooltip__trigger">
						     <Link to="/previewSurvey">
                                <button className={toggleReviewButtonClassName} 
                                        onMouseOver={this.showToolTip}
                                        onMouseOut={this.hideToolTip}>
                                    <IconComponent iconClassName="gs-preview "/>
                                </button>
                             </Link>
						</div>
						<div className={toolTipContentClassName}>
                            <p className="semi-bold x-small">
                                Toggle Preview
                            </p>
						</div>
					</div>								
				</span>
			</header>
		)
	}
}

export default HeaderContainer