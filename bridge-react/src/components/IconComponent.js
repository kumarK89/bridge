import React,{PropTypes} from 'react'

const IconComponent = (props) => (
	<i aria-hidden="true" className={props.iconClassName} />
);

IconComponent.propTypes = {
	iconClassName: PropTypes.string.isRequired
}

export default IconComponent;