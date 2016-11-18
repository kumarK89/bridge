import React,{Component} from 'react'



class SurveyDistributionDuplicateButtonContainer extends Component {

    render(){
        return(
            <div className="tooltip">
                <div className="tooltip__trigger">
                    <button className="btn round-button-set__button" type="button" >
                        <i aria-hidden="true" className="gs-duplicate dark-grey"></i>
                        <span className="screenreader-only">Duplicate Survey</span>
                    </button>
                </div>
                <div className="tooltip__content shadow rounded-corners-default tooltip__content--dark">
                    <p className="semi-bold x-small" >Duplicate Survey</p>
                </div>
            </div>
        )
    }
}
export default SurveyDistributionDuplicateButtonContainer