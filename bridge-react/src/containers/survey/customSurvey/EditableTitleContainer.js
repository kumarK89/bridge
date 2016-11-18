import React,{PropTypes, Component} from 'react'
import $ from 'jquery'
import classnames from 'classnames'
import autoSizeInput from 'autosize-input'
import ReactDOM from 'react-dom'
import * as constants from '../../../../src/constants/constants'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../../actions/survey/customSurvey/editableTitleAction'

class EditableTitleContainer extends Component{
	constructor()
	{
		super()		
		this.state={
			validEditRegex: /.*/
		}
		this.removeAutosizeDOMCrap  =this.removeAutosizeDOMCrap.bind(this)
		this.adjustSizeToFitContent =this.adjustSizeToFitContent.bind(this)
		this.renderContent          =this.renderContent.bind(this)
		this.handleBlur             =this.handleBlur.bind(this)
		this.renderEditor			=this.renderEditor.bind(this)
		this.initKeymap				=this.initKeymap.bind(this)
		this.handleEnterKeyup		=this.handleEnterKeyup.bind(this)
		this.handleEscapeKeyup		=this.handleEscapeKeyup.bind(this)
		this.getKeyHandler			=this.getKeyHandler.bind(this)
		this.handleControlKeys		=this.handleControlKeys.bind(this)		
	}
	componentWillMount() {
		this.keymap = this.initKeymap()
	}	
	initKeymap () {
		var keymap = {}
		keymap[constants.KC_RETURN] = this.handleEnterKeyup
		keymap[constants.KC_ESCAPE] = this.handleEscapeKeyup
		return keymap
  	}
	handleEnterKeyup () {
		if (this.props.editing) {
      		var { value } = this.refs.editingWidget
      		if (value && this.isValidEdit(value)) {
        		this.saveAndStopEditing()
      		} else {
        		this.restoreOriginalValue()
        		this.props.onStopEdit()
      		}
    	} else {
      		this.props.onStartEdit()
    	}
  	}
  	handleEscapeKeyup () {
    	this.restoreOriginalValue()
    	this.props.onStopEdit()
  	}	
	componentDidMount() {
		if (this.props.fitToContent) {
		  this.adjustSizeToFitContent()
		}
		if (this.props.autoFocus) {
		  this.props.onStartEdit()
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.fitToContent) {
		  this.adjustSizeToFitContent()
		}
		console.log('prevState',prevState);
		if (prevState && prevState.editing === false && this.props.editing) {
		  this.refs.editingWidget.focus()
		} else if (prevState && prevState.editing && this.props.editing === false) {
			if (this.props.fitToContent && this.props.fitToContentStrategy === 'autoSizeInput') {
				this.removeAutosizeDOMCrap()
		  	}
		  	ReactDOM.findDOMNode(this).focus()
		}
	}
	removeAutosizeDOMCrap() {
		if (this.autoSizer) {
		  this.autoSizer.destroy()
		  this.autoSizer = null
		}
	}
	adjustSizeToFitContent() {
		const strategy = this.props.fitToContentStrategy
		if (strategy === 'autoSizeInput') {
			this.removeAutosizeDOMCrap()
			this.autoSizer = autoSizeInput(ReactDOM.findDOMNode(this.refs.editingWidget), { minWidth: true })[10]
		}
		else {
			const $this = $(ReactDOM.findDOMNode(this))
		  	if (this.props.editing) {
				$this.css("min-width", $this.outerWidth())
		  	} else {
				$this.css("min-width", "")
			}
		}
	}
	renderContent() {
		return ( 
				<div className="EditableText__Content">
			   		<span>{this.props.children}</span>
			  	</div>			
		)
	}
	isValidEdit (val) {
		const regex = new RegExp(val, this.props.validEditRegex)
		return regex
	}
	handleControlKeys(e) {
		this.getKeyHandler(e.keyCode).call(this, e)
	}	
	getKeyHandler(keyCode) {
		if (keyCode in this.keymap) {		
			return this.keymap[keyCode]
		} else {
			return function() { }
		}
  	}
	handleBlur(e){
		let value = e.target.value		
		if (!this.isValidEdit(value)) {
			this.restoreOriginalValue()
		  	this.props.onStopEdit()
		} else {
			this.saveAndStopEditing()
		}
	}
	restoreOriginalValue() {
		if (this.props.editing) {
		  this.refs.editingWidget.value = this.props.value
		}
	}
	saveAndStopEditing() {
		let value = String(this.refs.editingWidget.value)
		let isOnlyWhitespace = value.match(/^\s*$/)
		if (isOnlyWhitespace) {
			value = this.props.defaultValue
		}
		if (value !== this.props.value) {
			this.props.onChange(value)
		}
		this.props.onStopEdit()
	}	
	getValue(){
		console.log(this.props.value)
		console.log(this.props.defaultValue)		
		if (this.props.value === this.props.defaultValue) {
			return ''
		} else {
			return this.props.value
		}
	}
	renderEditor() {
		var className = classnames({
			"EditableText__Editor": true,
			"EditableText__Editor--active": true
		})
		let inputClassName = classnames({
			"EditableText__Input": true,
			"EditableText__Input--grow-in-place": this.props.growInPlace,
		})
		return(
			<label className={className}>			
				<input
				  onBlur={this.handleBlur}
				  className={`${inputClassName} ${this.props.inputClassName}`}
				  defaultValue={this.getValue()}
				  placeholder={this.props.placeholder}
				  maxLength={this.props.maxLength}
				  readOnly={this.props.readOnly}
				  autoFocus={this.props.autoFocus}
				  ref="editingWidget"				 
				/>
			</label>
		)
	}
	render()
	{
		let tabIndex = this.props.editing ? "-1" : "0";
	  	let renderer = this.props.editing ? this.renderEditor : this.renderContent
	  	let className = classnames({
			'EditableText': true,
			'EditableText--grow-in-place': this.props.growInPlace,
			'pointer': !this.props.readOnly,
		})
		return (
			<span 
				onKeyUp={this.handleControlKeys}
				onClick={this.props.onStartEdit}
				className={`${className} ${this.props.classname}`}
				tabIndex={tabIndex}		
				children={renderer()}
				style={{
					position: 'relative'
				}}
			/>
		)
	}
}

EditableTitleContainer.propTypes = {	
	validEditRegex:PropTypes.object,
}

let mapStateToProps = (state) => (
    {
        editing: state.editableTitleReducer.editing,
        tabIndex : state.editableTitleReducer.tabIndex,
        fitToContent:state.editableTitleReducer.fitToContent,
		fitToContentStrategy:state.editableTitleReducer.fitToContentStrategy,			
		autoFocus:state.editableTitleReducer.autoFocus,
		growInPlace:state.editableTitleReducer.growInPlace
    }
)
let mapDispatchToProps = (dispatch) => 
    bindActionCreators(actionCreators,dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditableTitleContainer)