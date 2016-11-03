import React,{Component,PropTypes} from 'react';
import classnames from 'classnames';
import MenuItemComponent from '../../components/menu/MenuItemComponent';

class MenuItemContainer extends Component{
	constructor(){
		super();
		this.state = {
			menuItem : {},
			showSubMenu : false,
            activePanel : 'none'
		}
		this.isPanelActive = this.isPanelActive.bind(this);
	}
	isPanelActive(){
        if(this.props.activePanel === this.props.menuItem.value){
            return true;
        }else{
            return false;
        }
    }
	render(){
		let boundClick = this.props.menuClick.bind(this,this.props.menuItem);
		let menuItemClassName = classnames('sidebar__main_menu_item block sidebar__main_menu_item--surveys');
		let iconClassName = classnames('sidebar__main_menu_item_icon', 'gs-'+this.props.menuItem.icon);
		let buttonClassNames = classnames('sidebar__main_menu_link btn--reset',{
            'sidebar__main_menu_link--active': this.isPanelActive()
        });        
        return(
        	<MenuItemComponent key={this.props.menuItem.value}
							   menuItemClassName={menuItemClassName}
						       boundClick={boundClick}
						       buttonClassNames={buttonClassNames}
						       iconClassName={iconClassName}
						       menuItemLabel={this.props.menuItem.label}/>
        	
        );
	}
}

MenuItemContainer.propTypes = {
	menuItem : PropTypes.object.isRequired,
    menuClick : PropTypes.func.isRequired,
    showSubMenu : PropTypes.bool,
    activePanel : PropTypes.string
}


export default MenuItemContainer;