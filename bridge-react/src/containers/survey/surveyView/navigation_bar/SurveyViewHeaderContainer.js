import React,{Component} from 'react'

class SurveyViewHeaderContainer extends Component{
    render(){
        let upArrowDisableFlag=false
        let downArrowDisableFlag=false
        let numberOfCompletedQuestions =this.props.currentQuestion
        if(this.props.currentQuestion<=0)
            upArrowDisableFlag=true
        else if(this.props.currentQuestion=== this.props.totalNumberOfQuestions)
            downArrowDisableFlag=true

        if(numberOfCompletedQuestions < this.props.totalNumberOfQuestions)
           ++numberOfCompletedQuestions

        let progress= numberOfCompletedQuestions / this.props.totalNumberOfQuestions * 100
        const transformation = `translate3d(-${100 - progress}%, 0, 0)`
        const indicatorStyle = {
            WebkitTransform: transformation,
            transform: transformation,
            }
        return(
                  <header className="learner-survey__header" >
                  	<nav className="learner-survey__nav" >
                  		<button onClick={this.props.onOpenSidebar} className="learner-survey__sidebar-open left padding-rl-s" >
                  			<i aria-hidden="true" className="gs-arrow-right gs-1x"></i>
                  		</button>
                  		<div className="learner-survey__status">
                  			<span >{numberOfCompletedQuestions}</span>
                  			<span> / </span>
                  			<span>{this.props.totalNumberOfQuestions}</span>
                  		</div>
                  		<a href="/learner/courses" className="learner-survey__come-back right btn secondary" data-capybara="link" >
                  			<span>
                  				<span>Back to My Learning</span>
                  			</span>
                  			<i aria-hidden="true" className="gs-x gs-1x padding-l-s"></i>
                  		</a>
                  		<div className="learner-survey__arrows">
                  			<button  disabled={upArrowDisableFlag} onClick={this.props.onPrevious} className="learner-survey__nav__button learner-survey__nav__button__down " >
                  				<i aria-hidden="true" className="gs-arrow-up"></i>
                  				<span className="screenreader-only" >
                  					<span>Previous Question</span>
                  				</span>
                  			</button>
                  			<button disabled={downArrowDisableFlag} onClick={this.props.onNext} className="learner-survey__nav__button learner-survey__nav__button__up ">
                  				<i aria-hidden="true" className="gs-arrow-down" ></i>
                  				<span className="screenreader-only" >
                  					<span>Next Question</span>
                  				</span>
                  			</button>
                  		</div>
                  	</nav>
                  	<div className="learner-survey__progress-bar">
                  		<div className="learner-survey__progress-indicator brand-bg" style={indicatorStyle} ></div>
                  	</div>
                  </header>
        )
    }
}

export default SurveyViewHeaderContainer