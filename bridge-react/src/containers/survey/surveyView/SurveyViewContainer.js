import React,{Component} from 'react';
import SurveyViewHeaderContainer from './navigation_bar/SurveyViewHeaderContainer';
import SurveyViewSidebarContainer from './side_bar/SurveyViewSidebarContainer';
import SurveyViewContentContainer from './contents/SurveyViewContentContainer';


class SurveyViewContainer extends Component{

    constructor(props){
        super(props);
        this.state={
            isSidebarOpen:false,
            currentQuestionIndex:-1,
            //surveyTitle and questions - remove when inherited through props
            surveyTitle:"",
            questions:[],
            showSubmit:false
        }
        this.toggleSidebar=this.toggleSidebar.bind(this);
        this.nextHandler=this.nextHandler.bind(this);
        this.previousHandler=this.previousHandler.bind(this);
        this.selectiveHandler=this.selectiveHandler.bind(this);
        this.onAnswerHandler=this.onAnswerHandler.bind(this);
    }

    componentDidMount(){
        let surveyDataObject={
                                "meta":{},
                                "surveys":[
                                    {"id":"71","title":"Test"}
                                    ],
                                "questions":[
                                    {   "id":"102",
                                        "survey_id":"71",
                                        "answer_type":"agreement",
                                        "statement":"Test  Comment",
                                        "required":true,
                                        "comment_required":true
                                     },
                                    {
                                        "id":"108",
                                        "survey_id":"71",
                                        "answer_type":"agreement",
                                        "statement":"ASDf",
                                        "required":false
                                     },
                                     {
                                        "id":"109",
                                        "survey_id":"71",
                                        "answer_type":"agreement",
                                        "statement":"Question3",
                                        "required":true
                                     }
                                     ]
                               }
        //let surveyDataObject= this.props.surveyDetail
        this.setState({
            surveyTitle: this.props.survey.surveyName,
            questions:this.props.survey.surveyQuestions
        });
    }

    toggleSidebar(){
        this.setState({isSidebarOpen : ! this.state.isSidebarOpen});
    }

    nextHandler(){
        if(++this.state.currentQuestionIndex=== this.state.questions.length)
            this.state.showSubmit=true;

        this.setState({
            currentQuestionIndex: this.state.currentQuestionIndex,
            showSubmit: this.state.showSubmit
        });
    }

    previousHandler(){
        if(this.state.currentQuestionIndex-- === this.props.survey.surveyQuestions.length)
               this.state.showSubmit=false;
         this.setState({
            currentQuestionIndex: this.state.currentQuestionIndex,
            showSubmit: this.state.showSubmit
         });
    }

    selectiveHandler(indexOfSelectedQuestion){
        this.state.currentQuestionIndex= indexOfSelectedQuestion;
        this.state.showSubmit=false;
        this.setState({
            currentQuestionIndex: this.state.currentQuestionIndex,
            showSubmit: this.state.showSubmit
        });
    }

    onAnswerHandler(level,questionIndex){
        if(!this.state.questions[questionIndex].response)
        {
           this.nextHandler();
        }
        this.state.questions[questionIndex].response={"answer" : level};
        this.setState({
            questions   : this.props.survey.surveyQuestions
        });
    }

    render(){

        return (
            <main className="full-viewport-height ">
                <div className="learner-survey__wrapper">

                    <SurveyViewHeaderContainer
                        onOpenSidebar={this.toggleSidebar}
                        currentQuestion={this.state.currentQuestionIndex}
                        onNext={this.nextHandler}
                        onPrevious={this.previousHandler}
                        totalNumberOfQuestions={this.props.survey.surveyQuestions.length}>
                    </SurveyViewHeaderContainer>

                    <SurveyViewSidebarContainer
                        isSidebarOpen={this.state.isSidebarOpen}
                        onCloseSidebar={this.toggleSidebar}
                        questions={this.props.survey.surveyQuestions}
                        onQuestionSelect={this.selectiveHandler}
                        currentQuestion={this.state.currentQuestionIndex}
                        totalNumberOfQuestions={this.props.survey.surveyQuestions.length}>
                    </SurveyViewSidebarContainer>

                    <SurveyViewContentContainer
                        currentQuestion={this.state.currentQuestionIndex}
                        questions={this.props.survey.surveyQuestions}
                        surveyTitle={this.props.survey.surveyName}
                        showSubmit={this.state.showSubmit}
                        onGetStart={this.nextHandler}
                        onAnswerHandler={this.onAnswerHandler}>
                    </SurveyViewContentContainer>

                </div>
            </main>
         );
    }
}


export default SurveyViewContainer;







