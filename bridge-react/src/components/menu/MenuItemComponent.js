import React,{PropTypes} from 'react'
import IconComponent from '../IconComponent';

const MenuItemComponent = (props) => (
	<li className={props.menuItemClassName} onClick={props.boundClick}>
        <button className={props.buttonClassNames}>
        	<IconComponent iconClassName="gs-x brand-color"/>
        	<IconComponent iconClassName={props.iconClassName}/>        	           
            <span className="sidebar__main_menu_item_label">{props.menuItemLabel}</span>
            <IconComponent iconClassName="gs-arrow-right"/> 
        </button>
   </li>
);

MenuItemComponent.propTypes = {
	menuItemClassName: PropTypes.string.isRequired,
	boundClick: PropTypes.func.isRequired,
	buttonClassNames: PropTypes.string.isRequired,
	iconClassName: PropTypes.string.isRequired,
	menuItemLabel: PropTypes.string.isRequired
}

export default MenuItemComponent;