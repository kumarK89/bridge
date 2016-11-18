import React,{Component} from 'react'

class SubmitContainer extends Component{
    render(){
        let activeClassName=""
        if(this.props.showSubmit){
            this.props.onActive(this)
            activeClassName="learner-survey__submit--active"
        }
        else
            activeClassName=""

        return (
            <div>
                <div className={`learner-survey__submit ${activeClassName}`} >
                    <h2 >
                        <span >Thanks.</span>
                        <br/>
                        <span >We appreciate the feedback.</span>
                    </h2>
                    <div>
                        <button className="btn primary filled brand-bg brand-border" disabled="" >
                            <span >Submit</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubmitContainer