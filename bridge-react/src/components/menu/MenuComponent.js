import React,{PropTypes} from 'react';
import MenuItemContainer from '../../containers/menu/MenuItemContainer';
import MenuFooterContainer from '../../containers/menu/MenuFooterContainer';
import MenuItemSubMenuContainer from '../../containers/menu/MenuItemSubMenuContainer';

const MenuComponent = (props) => (
	<div className={props.menuClassName}>
		<div className="sidebar__wrapper">
		    <div className="sidebar__main">
		        <nav className="sidebar__main_menu">
		        	<ul>
			        	{
						    props.menuItems.map(function(menuItem)
						    {
						    	return <MenuItemContainer key={menuItem.value} 
						    						      menuItem={menuItem} 
						    						      menuClick={props.menuClick}
						    						      activePanel={props.activePanel} />;
						    },props)
						}
		        	</ul>
		    	</nav>
		    </div>
		    <MenuFooterContainer collapseOrOpenMenu={props.collapseOrOpenMenu} />
		</div>
		<MenuItemSubMenuContainer subMenuclick={props.subMenuclick} />		
	</div>
);

MenuComponent.propTypes = {
	menuClassName:PropTypes.string.isRequired,
	menuItems: PropTypes.array.isRequired,
	collapseOrOpenMenu: PropTypes.func.isRequired,
	activePanel : PropTypes.string,
	menuClick: PropTypes.func.isRequired,
	subMenuclick: PropTypes.func.isRequired
}
export default MenuComponent;