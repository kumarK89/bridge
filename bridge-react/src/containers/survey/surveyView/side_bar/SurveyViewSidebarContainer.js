import React,{Component} from 'react'
import SurveyViewSidebarItemContainer from './SurveyViewSidebarItemContainer'

class SurveyViewSidebarContainer extends Component{
    render(){
    let numberOfCompletedQuestions =this.props.currentQuestion
            if(numberOfCompletedQuestions < this.props.totalNumberOfQuestions)
               ++numberOfCompletedQuestions

    let sidebarOpenClassName   =  this.props.isSidebarOpen && "learner-survey__side-bar--open"

    let SurveyViewSidebarItems = this.props.questions.map(
        (question,index)=> <SurveyViewSidebarItemContainer
                                key={`question${question.id}`}
                                question={question}
                                index={index}
                                onSelect={this.props.onQuestionSelect}>
                            </SurveyViewSidebarItemContainer>)

        return (
            <nav className={`learner-survey__side-bar ${sidebarOpenClassName}`}>
            	<div className="learner-survey__side-bar__header" >
            		<div className="learner-survey__status learner-survey__status--side-bar" >
            			<span>{numberOfCompletedQuestions}</span>
            			<span> / </span>
            			<span>{this.props.questions.length}</span>
            		</div>
            		<button onClick={this.props.onCloseSidebar} className="learner-survey__side-bar__close" >
            			<i aria-hidden="true" className="gs-arrow-left gs-1x "></i>
            		</button>
            	</div>
            	<ol className="learner-survey__side-bar__question-list">
                    {SurveyViewSidebarItems}
            	</ol>
            </nav>
        )
    }
}

export default SurveyViewSidebarContainer