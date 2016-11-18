import React,{Component,PropTypes} from 'react'
import MenuContainer from './menu/MenuContainer'
import SurveyContainer from './survey/surveyDetails/SurveyContainer'

class BridgeContainer extends Component{
	constructor(){
		super()
		this.state = {
			showContent : false
		}
		this.showSubMenuContent = this.showSubMenuContent.bind(this)
	}
	showSubMenuContent(){
		this.setState({
			showContent : true
		})
	}
	componentWillMount(){
		if(this.props.location.pathname === '/showSurvey'){
			this.setState({
				showContent : true
			})
		}
	}
	render(){
		let boundShowSubMenuContent = this.showSubMenuContent.bind(this)
		return(
			<main className="content-wrapper full-min-height layout--with-sidebar">
				<aside>
					<MenuContainer showSubMenuContent={boundShowSubMenuContent}/>
				</aside>
				{
					this.state.showContent &&
					<section><SurveyContainer/></section>
				}
			</main>
		);
	}
}

BridgeContainer.propTypes={
	showContent : PropTypes.bool
}

export default BridgeContainer