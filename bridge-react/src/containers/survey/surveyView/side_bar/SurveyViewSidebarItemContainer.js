import React,{Component} from 'react';

class SurveyViewSidebarItemContainer extends Component{
    constructor(props){
        super(props);
        this.onSelect=this.onSelect.bind(this);
    }
    onSelect(){
        this.props.onSelect(this.props.index);
    }

    render(){

        return(
            <li onClick={this.onSelect} className="learner-survey__side-bar__question-list-item">
                {this.props.question.response && <i className="gs-check gs-1x learner-survey__side-bar__question-list-item__responded" />}
                {this.props.question.required && <span className="learner-survey__side-bar__question-list-item__required">*</span>}
                <span>{this.props.question.text}</span>
            </li>
        );
    }
}

export default SurveyViewSidebarItemContainer;