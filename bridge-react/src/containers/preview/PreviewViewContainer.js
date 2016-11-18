import React from 'react';
import PreviewHeaderBarContainer from './PreviewHeaderBarContainer';
import {onSelectDevice} from '../../utils/survey/surveyView/surveyViewHelper';
import SurveyViewContainer from '../survey/surveyView/SurveyViewContainer';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/survey/customSurvey/actions'


class PreviewViewContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            iframedimension:{height: "100%", width : "100%"}
        }
        this.onSelectDeviceHandler=this.onSelectDeviceHandler.bind(this);
    }

    onSelectDeviceHandler(device){
        this.state.iframedimension= onSelectDevice(device);
        this.setState({
            iframedimension: this.state.iframedimension
        })
    }

    render(){

        return (
            <div className="full-viewport-height overflow-hidden chart-grey-bg">
                <PreviewHeaderBarContainer
                    onSelectDevice={this.onSelectDeviceHandler}>
                </PreviewHeaderBarContainer>
                <div className="survey-preview survey-preview--with-header" style={this.state.iframedimension}>
                    {/*<iframe style={this.state.iframedimension}
                     src="/previewSurveyContent"
                     />*/}
                    <SurveyViewContainer {...this.props.surveyDetail}>
                        </SurveyViewContainer>
                </div>
            </div>

    );
    }
    }

    let mapStateToProps = (state) => (
    {
        surveyDetail: state.customSurveyReducer
    }
    )
    let mapDispatchToProps = (dispatch) =>
    bindActionCreators(actionCreators,dispatch)

    export default connect(mapStateToProps, mapDispatchToProps)(PreviewViewContainer)




