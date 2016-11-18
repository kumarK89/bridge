import React from 'react';

const WelcomeComponent=(props)=> (
            <div className="learner-survey__welcome">
                <div className="learner-survey__welcome__content">
                    <h1 className="h2">{props.surveyTitle}</h1>
                   	<div className="x-medium dark-grey">
                   	    <p>
                   		    <span>All responses are submitted anonymously.</span>
                   		</p>
                   	</div>
                   	<div className="margin-t-l">
                   		<button onClick={props.onGetStart} className="btn btn-primary filled brand-bg brand-border">
                   			<span>Get Started</span>
                   		</button>
                   	</div>
                </div>
             </div>
)

export default WelcomeComponent;

//// Declare this as a stateless functional component
//class Welcome from React.Component{
//    constructor(props){
//        super(props);
//    }
//
//    render(){
//        return (
//            <div class="learner-survey__welcome">
//                <div class="learner-survey__welcome__content">
//                    <h1 class="h2">Test</h1>
//                   	<div class="x-medium dark-grey">
//                   	    <p>
//                   		    <span>All responses are submitted anonymously.</span>
//                   		</p>
//                   	</div>
//                   	<div class="margin-t-l">
//                   		<button class="btn btn-primary filled brand-bg brand-border">
//                   			<span>Get Started</span>
//                   		</button>
//                   	</div>
//                </div>
//             </div>
//        );
//    }
//}