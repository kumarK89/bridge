import React,{Component,PropTypes} from 'react';
import SurveySearchFieldContainer from './surveyDetails/SurveySearchFieldContainer';
import SurveySortFilterContainer from './surveyDetails/SurveySortFilterContainer';
import surveyApi from '../../middleware/survey/surveyDetails/api';


class SurveyDetailsContainer extends Component{

    constructor(){
        super();
        this.state = {
            focused: false,
            surveys : [],
            searchTerm: '',
            isUnPublished : false,
            sortParam : ''
        };

        this.getSurveys = this.getSurveys.bind(this);
        this.onSortSelect = this.onSortSelect.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.clearSortFilterParams = this.clearSortFilterParams.bind(this);
        this.deleteSurvey = this.deleteSurvey.bind(this);
        this.getSurveys('','',false);
    }
    clearSortFilterParams(){
        this.setState({
            sortParam:'',
            isUnPublished:false
        });
        this.getSurveys(this.state.searchTerm,
            '',
            false);
    }
    onSortSelect(param){
        this.setState({
            sortParam : param
        });
        this.getSurveys(this.state.searchTerm,
            param,
            this.state.isUnPublished);
    }
    onFilterSelect(isUnPublished){
        this.setState({
            isUnPublished : isUnPublished
        });
        this.getSurveys(this.state.searchTerm,
            this.state.sortParam,
            isUnPublished);
    }
    onSearch(searchTerm){
        this.setState({
            searchTerm : searchTerm
        });
        this.getSurveys(searchTerm,
            this.state.sortParam,
            this.state.isUnPublished);
    }
    deleteSurvey(surveyId){
        surveyApi.deleteSurvey(surveyId)
            .then(
            this.getSurveys(this.state.searchTerm,
                this.state.sortParam,
                this.state.isUnPublished)
        );
    }
    getSurveys(searchTerm,sortParam,isUnPublished){
        surveyApi.getSurveys(searchTerm,
            sortParam,
            isUnPublished)
            .then(this.getSurveysResult.bind(this));
    }
    getSurveysResult(data){
        this.setState({
            surveys : data
        });
    }
    render(){
        return(
            <div className='full-height next-to-sidebar-panel'>
                <header className="survey-header layout--item-header">
                    <div className="layout--item-header__content">
                        <div className="layout--item-header__content">
                        <div className="layout--item-header__actions">
                        <span className="undefined margin-r-s right round-button-set">
                        <div className="tooltip">
                        <div className="tooltip__trigger">
                        <button className="btn btn--round secondary round-button-set__button tooltip">
                            <i aria-hidden="true" className="gs-preview dark-grey"></i>
                            <span className="screenreader-only">Toggle Preview</span>
                        </button>
                        </div>
                            <div className="tooltip__content"  >
                                <p className="semi-bold x-small" >Toggle Preview</p></div>

                        </div>
                           <div className="tooltip">
                               <div className="tooltip__trigger">
                                   <button className="btn round-button-set__button" type="button" >
                                       <i aria-hidden="true" className="gs-duplicate dark-grey"></i>
                                       <span className="screenreader-only">Duplicate Survey</span></button>
                               </div>
                               <div className="tooltip__content shadow rounded-corners-default tooltip__content--dark">
                                   <p className="semi-bold x-small" >Duplicate Survey</p></div>
                           </div>
                            <div className="tooltip">
                                <div className="tooltip__trigger">
                                    <button className="btn round-button-set__button" type="button">
                                        <i aria-hidden="true" className="gs-edit dark-grey">
                                        </i><span className="screenreader-only">Edit Survey</span></button></div>
                                <div className="tooltip__content shadow rounded-corners-default tooltip__content--dark">
                                    <p className="semi-bold x-small">Edit Survey</p></div></div>
                        </span>
                        </div>
                            <div className="layout--item-header__details--with-icon"><i aria-hidden="true" className="layout--item-header__icon gs-surveys"></i>
                                <div className="EditableText pointer undefined" >
                                    <div className="EditableText__Content">
                                        <h1 className="survey-header__title">Untitled Survey</h1>
                                        <button className="screenreader-only">Edit</button>
                                    </div>
                                </div>
                                <ul className="list--slashed">
                                    <li>
                                        <span>No Distributions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                    </header>
                <div className="survey-distributions large-content-area--main-container centered">
                    <div className="padding-tb-l sortable-table-header--first-item">
                        <h2 className="margin-b-s left">Distributions</h2>
                        <span className="distribute-box">
                        <button type="button" className="add-btn">
                                     <span>
                                         <span> + </span>
                                         <span className="add-btn__text">Distribute</span>
                                     </span>
                        </button>
                        </span>
                        <noscript></noscript>
                    </div>
                    <div><div className="sortable-table-header--first-item">
                        <div className="left indigo">
                            <SurveySearchFieldContainer key="survey-search" onSearch={this.onSearch} />
                        </div>
                        <SurveySortFilterContainer key="survey-sort-filter"
                                                   onSortSelect={this.onSortSelect}
                                                   clearSortFilterParams={this.clearSortFilterParams}
                                                   onFilterSelect={this.onFilterSelect}/>
                    </div>
                        <ul className="survey-distribution-list bordered" >
                            <li className="bold dark-grey padding-tb-m text-center">This survey has not been distributed yet.</li></ul>
                    </div>
                </div>
                </div>

        );
    }

}
SurveyDetailsContainer.propTypes = {
    focused:PropTypes.bool,
    isUnPublished:PropTypes.bool,
    surveys : PropTypes.object,
    searchTerm:PropTypes.string,
    onCarriageReturn: PropTypes.func,
    sortParam : PropTypes.string
};
export default SurveyDetailsContainer;