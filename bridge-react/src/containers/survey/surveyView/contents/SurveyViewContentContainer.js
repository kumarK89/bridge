import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import WelcomeComponent from './WelcomeComponent';
import QuestionsContainer from './QuestionsContainer';
import SubmitContainer from './SubmitContainer'

class SurveyViewContentContainer extends Component{
    constructor(props){
        super(props);

        this.scrollToActive=this.scrollToActive.bind(this);
    }

    scrollToActive(component) {
        if (!component) return;
        const surveyNode = ReactDOM.findDOMNode(this.refs.survey);

        if (surveyNode) {
            const node = ReactDOM.findDOMNode(component);
            const quarterScreen = window.innerHeight / 4;
            const translation = `translate3d(0, -${node.offsetTop - quarterScreen}px, 0)`;

            surveyNode.style.WebkitTransform = translation;
            surveyNode.style.transform = translation;
        }
    }

    render(){
        //   alert(this.props.currentQuestion);
        return (
            <div className="learner-survey__content pure-g-r" data-top="true" >
                <div className="pure-u-4-24" ></div>
                <div  ref="survey" className="learner-survey pure-u-16-24">

                    <WelcomeComponent
                        surveyTitle={this.props.surveyTitle}
                        onGetStart={this.props.onGetStart}>
                    </WelcomeComponent>
                    <QuestionsContainer
                        onActive={this.scrollToActive}
                        currentQuestion={this.props.currentQuestion}
                        questions={this.props.questions}
                        onAnswerHandler={this.props.onAnswerHandler}>
                    </QuestionsContainer>
                    <SubmitContainer
                        onActive={this.scrollToActive}
                        showSubmit={this.props.showSubmit}>
                    </SubmitContainer>

                </div>
                <div className="pure-u-4-24"></div>
            </div>
        );
    }
}

export default SurveyViewContentContainer;