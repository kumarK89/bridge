import React,{Component} from 'react';

class Level extends Component{
    constructor(props){
        super(props);
        this.handleMouseEnter=this.handleMouseEnter.bind(this);
        this.handleMouseLeave=this.handleMouseLeave.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
    }
    handleMouseEnter(){
        this.props.onHoverStart(this.props.level);
    }
    handleMouseLeave(){
        this.props.onHoverEnd();
    }
    handleSelect(){
//        this.openPopup();
        this.props.onSelect(this.props.level);
    }

    openPopup() {
        let popup = document.getElementById(`popup__${this.props.level}`);
        popup.classList.toggle('show',true);
    }


    render(){
        let contents= this.props.isSelected ?  <i className="gs-check" /> : this.props.level + 1;
        let labelClassName= ` likert__level
                              likert__level--${this.props.cssSuffix}
                              ${this.props.isHovered && !this.props.isSelected && "likert__level likert__level--hovered" }
                              ${this.props.isSelected && "likert__level--selected" }
                              `;
        return(
            <label className={labelClassName }
                   onMouseEnter={this.handleMouseEnter}
                   onMouseLeave={this.handleMouseLeave}
                   onClick={this.handleSelect}>
                <div className="likert__level__meter" ></div>
                <div className="likert__level__contents">
                    {contents}
                </div>
                <span className="screenreader-only" >
                    <span>this.props.label</span>
                </span>
            </label>
        );
    }
}
export default Level;
