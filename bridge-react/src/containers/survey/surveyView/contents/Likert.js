import React,{Component} from 'react';
import Level from './Level';
import CommentPopupContainer from "./CommentPopupContainer"
class Likert extends Component{
    constructor(props){
        super(props);
        this.state={
            hoverLevel:null,
            selectedLevel:null,
            isPopupCommentVisible: false
        }
        this.handleHoverStart=this.handleHoverStart.bind(this);
        this.handleHoverEnd=this.handleHoverEnd.bind(this);
        this.handleLevelSelect=this.handleLevelSelect.bind(this);
    }
    handleHoverEnd() {
        this.setState({hoverLevel: null});
    }

    handleHoverStart(level) {
        this.setState({hoverLevel: level});
    }

    handleLevelSelect(level){
        this.props.onAnswerHandler(level,this.props.questionIndex);
        this.setState({ selectedLevel: level, isPopupCommentVisible: this.props.commentRequired });
    }

    render(){
        const ratings=[
            {
                name:"Strongly Disagree",
                cssSuffix:"lowest",
            },
            {
                name:"Somewhat Disagree",
                cssSuffix:"low",
            },
            {
                name:"Neutral",
                cssSuffix:"neutral",
            },
            {
                name:"Somewhat Agree",
                cssSuffix:"high",
            },
            {
                name:"Strongly Agree",
                cssSuffix:"highest",
            },
        ];

        let levelJSXElements= ratings.map(
            (rating,index)   =>   <Level
                key={`meter-${index+1}`}
                label={rating.name}
                level={index}
                cssSuffix={rating.cssSuffix}
                onHoverStart={this.handleHoverStart}
                onHoverEnd={this.handleHoverEnd}
                onSelect={this.handleLevelSelect}
                isHovered={index===this.state.hoverLevel}
                isSelected={index===this.state.selectedLevel}>
            </Level>
        );

        let commentPopupJSXElement= this.state.isPopupCommentVisible &&  <CommentPopupContainer popupCommentStyle={{left: `${10*(2*this.state.selectedLevel+1)}%`}}> </CommentPopupContainer>;

        return(
            <div className="likert">
                <div className={`likert__description
                                 ${this.state.hoverLevel!==null && `likert__description--${ratings[this.state.hoverLevel].cssSuffix}`}
                                 ${this.state.hoverLevel===null && this.state.selectedLevel !=null && `likert__description--${ratings[this.state.selectedLevel].cssSuffix}` }
                                `}>
                    {this.state.selectedLevel!==null && <i aria-hidden="true" className="gs-check gs-3-4 likert__description__icon" /> }
                    <span className="likert__description__label--selected" >
                        {this.state.hoverLevel !== null && ratings[this.state.hoverLevel].name }
                        {this.state.hoverLevel===null && this.state.selectedLevel !=null && ratings[this.state.selectedLevel].name }
                    </span>
                </div>
                <div className="likert__levels">
                    {levelJSXElements}
                    {commentPopupJSXElement}
                </div>
                <div className="likert__labels" >
                    <div className={`likert__labels__${ratings[0].cssSuffix}`} >{ratings[0].name}</div>
                    <div className={`likert__labels__${ratings[ratings.length-1].cssSuffix}`} >{ratings[ratings.length-1].name}</div>
                </div>
            </div>
        );
    }
}

export default Likert;