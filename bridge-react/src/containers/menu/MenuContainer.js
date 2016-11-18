import React,{Component,PropTypes} from 'react'
import classnames from 'classnames'
import MenuComponent from '../../components/menu/MenuComponent'

class MenuContainer extends Component{
	constructor(){
		super()
		this.state = {
			open:true,
			showSubMenu : false,
            activePanel : 'none'
		}
        this.collapseOrOpenMenu = this.collapseOrOpenMenu.bind(this)
        this.showSubMenuPanel = this.showSubMenuPanel.bind(this)        
        this.isSurveyActive = this.isSurveyActive.bind(this)
        this.showExpand = this.showExpand.bind(this)
	}    
    showSubMenuPanel(item){
        if(this.state.activePanel !== 'none'){
            this.setState({
                activePanel : 'none',
                showSubMenu : false
            })
        }
        else{
            this.setState({
                showSubMenu : true,
                activePanel: item.value
            })
        }
    }    
    collapseOrOpenMenu(){
        this.setState({
            open: !this.state.open,
            showSubMenu : false
        })
    }
	menuStatus(){
        return this.state.open
    }
    showExpand(){
        if(this.state.showSubMenu === true){
            return true
        }
        else{
            return false
        }
    }   
    isSurveyActive(){
        if(this.state.activePanel === 'surveys'){
            return true
        }else{
            return false
        }
    }
	render(){
		let menuClassName = classnames('sidebar', {
          'sidebar--is-open': this.menuStatus(),
          'sidebar--is-expanded': this.showExpand(),
          'sidebar--is-closed': !this.menuStatus()
        })
        let menuItems = [ 
            {
                label:'kumark@prokarma.com',
                icon:'',
                value:'profile'
            },
            {
                label:'Dashboard',
                icon:'dashboard',
                value:'dashboard'
            },
            {
                label:'Training',
                icon:'book',
                value:'training'
            },
            {
                label:'Surveys',
                icon:'surveys',
                value:'surveys'
            }, 
            {
                label:'People',
                icon:'users',
                value:'people'
            }, 
            {
                label:'Tools',
                icon:'tools',
                value:'tools'
            }, 
            {
                label:'Account Settings',
                icon:'sliders',
                value:'accounts'
            }
        ]
        let collapseOrOpenMenuClick = this.collapseOrOpenMenu.bind(this)
        let subMenuclick = this.isSurveyActive.bind(this)
        let menuClick = this.showSubMenuPanel.bind(this)
        let activePanelValue = this.state.activePanel
		return(
            <MenuComponent menuClassName={menuClassName} 
                           collapseOrOpenMenu={collapseOrOpenMenuClick} 
                           menuItems={menuItems}
                           menuClick={menuClick}
                           activePanel={activePanelValue}
                           showSubMenuContent={this.props.showSubMenuContent}
                           subMenuclick={subMenuclick}/>             
		)
	}

}

MenuContainer.propTypes = {
	open:PropTypes.bool,
    showSubMenu : PropTypes.bool,
    activePanel : PropTypes.string,
    showSubMenuContent : PropTypes.func.isRequired
}

export default MenuContainer