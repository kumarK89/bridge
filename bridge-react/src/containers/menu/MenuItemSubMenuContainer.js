import React,{Component,PropTypes} from 'react'
import classnames from 'classnames'
import MenuItemSubMenuComponent from '../../components/menu/MenuItemSubMenuComponent'
class MenuItemSubMenuContainer extends Component{
	constructor(){
		super()
		this.onSubMenuClick = this.onSubMenuClick.bind(this)
	}
	onSubMenuClick(){
		this.props.showSubMenuContent()
	}
	render(){
		let panelMenuClassNames = classnames('sidebar__panel', {
            'active': this.props.subMenuclick()
        })
        let boundSubMenuClick = this.onSubMenuClick.bind(this)
        return(
        	<MenuItemSubMenuComponent subMenuPanelClassName={panelMenuClassNames} 
        							  boundSubMenuClick={boundSubMenuClick}/>
        )
	}
}

MenuItemSubMenuContainer.propTypes = {
	subMenuclick : PropTypes.func.isRequired,
	showSubMenuContent : PropTypes.func.isRequired
}

export default MenuItemSubMenuContainer

