import React,{PropTypes} from 'react'
import IconComponent from '../IconComponent';

const MenuFooterComponent = (props) => (
	<footer className="sidebar__footer">
        <nav className="sidebar__main_menu">
            <ul>
                <li className="sidebar__main_menu_item">
                    <button onClick={props.boundClick} className="btn--reset sidebar__main_menu_link sidebar__toggle">
                        <IconComponent iconClassName="gs-collapse sidebar__main_menu_item_icon"/>
                        <span>Collapse Menu</span>
                    </button>                   
                </li>
            </ul>
        </nav>
    </footer>
);

MenuFooterComponent.propTypes = {
	boundClick: PropTypes.func.isRequired,
}

export default MenuFooterComponent;
