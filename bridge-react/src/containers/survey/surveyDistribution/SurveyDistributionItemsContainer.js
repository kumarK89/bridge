import React,{Component} from 'react'

class SurveyDistributionItemsContainer extends Component {

    render(){
        return(
            <div>
                <form>
                    <div className="distribute-box__contents">
                        <div className="distribute-box__element">
                            <input type="text" className="distribute-box__input distribute-box__input--title" placeholder="Untitled Distribution - 11/9/2016"/>
                        </div>
                        <div className="distribute-box__element distribute-box__element--empty">
                            <input type="text" className="distribute-box__input distribute-box__input--date" placeholder="End Date" />
                            <span> </span>
                            <span>/</span>
                            <span> </span>
                            <input type="text" className="distribute-box__input distribute-box__input--time" placeholder="End Time" />
                        </div>
                        <div className="distribute-box__element" >
                            <div className="autocomplete autocomplete--empty distribute-box__group-picker" data-capybara="autocomplete" >
                                <input className="autocomplete__input distribute-box__group-picker-input" placeholder="Add Groups" role="combobox" aria-autocomplete="list" aria-owns="autocomplete__list-5" />
                                <div id="autocomplete__list-5" className="autocomplete__list distribute-box__group-picker-list" aria-expanded="false" role="listbox" data-capybara="autocomplete-list-item">
                                </div>
                            </div>
                        </div>
                        <div className="distribute-box__element distribute-box__groups">
                            <ul className="unstyled"></ul>
                        </div>
                    </div>
                    <div className="distribute-box__footer">
                        <button type="button" className="btn button-cancel tertiary">Cancel</button>
                        <button type="submit" className="btn filled" disabled="true">Send Survey</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default SurveyDistributionItemsContainer








