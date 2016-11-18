import React,{Component} from 'react'

class CommentPopupContainer extends Component{
    render(){
        return(
                <div className="popup__comment"  style={this.props.popupCommentStyle}>
                    <h4>Explain Why</h4>
                    <input type="text" name="comment" placeholder="Type Anything here.."/>
                    <button className="btn filled " type="button">
                        Comment
                        <i aria-hidden="true" className="gs-arrow-right gs-1x"/>
                    </button>
                </div>
        )
    }
}
export default CommentPopupContainer