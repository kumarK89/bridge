import React,{Component,PropTypes} from 'react';
import MenuFooterComponent from '../../components/menu/MenuFooterComponent';

class MenuFooterContainer extends Component{
    render() {
    	let boundClick = this.props.collapseOrOpenMenu.bind(this);
    	return(
    		<MenuFooterComponent boundClick={boundClick}/>
    	);    	
    }
}

MenuFooterContainer.propTypes = {
	collapseOrOpenMenu : PropTypes.func.isRequired
}

export default MenuFooterContainer;