import React,{PropTypes} from 'react'

const SurveySortItemComponent = (props) => (	
	<li key={props.sortItemValue} 
		className={props.sortItemclassName} 
		onClick={props.onSortItemSelect}>
			    {props.sortItemLabel}
	</li>	
)

SurveySortItemComponent.propTypes = {
	sortItemclassName : PropTypes.string,
	sortItemValue: PropTypes.string,
	onSortItemSelect : PropTypes.func,
	sortItemLabel:PropTypes.string
}

export default SurveySortItemComponent;