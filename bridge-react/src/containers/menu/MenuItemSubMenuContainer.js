import React,{Component,PropTypes} from 'react';
import classnames from 'classnames';
import MenuItemSubMenuComponent from '../../components/menu/MenuItemSubMenuComponent';
class MenuItemSubMenuContainer extends Component{
	render(){
		let panelMenuClassNames = classnames('sidebar__panel', {
            'active': this.props.subMenuclick()
        });
        return(
        	<MenuItemSubMenuComponent subMenuPanelClassName={panelMenuClassNames} />
        );		
	}
}

MenuItemSubMenuContainer.propTypes = {
	subMenuclick : PropTypes.func.isRequired
}

export default MenuItemSubMenuContainer;

