import React,{Component} from 'react'



class SurveyDistributionToggleButtonContainer extends Component {

    render(){
    return(
        <div className="tooltip">
            <div className="tooltip__trigger">
                <button className="btn btn--round secondary round-button-set__button tooltip">
                    <i aria-hidden="true" className="gs-preview dark-grey"></i>
                    <span className="screenreader-only">Toggle Preview</span>
                </button>
            </div>
            <div className="tooltip__content">
                <p className="semi-bold x-small" >Toggle Preview</p>
            </div>
        </div>
    )
    }
}
export default SurveyDistributionToggleButtonContainer