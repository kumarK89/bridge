import React,{Component,PropTypes} from 'react';
import SurveySearchFieldContainer from './SurveySearchFieldContainer';
import SurveySortFilterContainer from './SurveySortFilterContainer';
import surveyHelpers from '../../utils/survey/surveyHelpers';
import SurveyListContainer from './SurveyListContainer';

class SurveyContainer extends Component{
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
        surveyHelpers.deleteSurvey(surveyId)
        .then(
            this.getSurveys(this.state.searchTerm,
                        this.state.sortParam,
                        this.state.isUnPublished)
        );
    }
    getSurveys(searchTerm,sortParam,isUnPublished){
        surveyHelpers.getSurveys(searchTerm,
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
                <header className="layout--list">
                    <div className="layout--list__header">
                        <h1 className="layout--list__header-text">
                            Surveys
                        </h1>
                        <button className="add-btn">
                            <span> + <span className="add-btn__text">New Survey</span></span>
                        </button>
                    </div>
                    <div className="layout--list__content">
                        <div className="sortable-table-header--first-item">
                            <div className="left indigo">
                                <SurveySearchFieldContainer key="survey-search" onSearch={this.onSearch} />
                            </div>
                            <SurveySortFilterContainer key="survey-sort-filter"                                                       
                                                       onSortSelect={this.onSortSelect}
                                                       clearSortFilterParams={this.clearSortFilterParams}
                                                       onFilterSelect={this.onFilterSelect}/>
                        </div>
           
                        <SurveyListContainer surveysData={this.state.surveys} 
                                             deleteSurvey={this.deleteSurvey}/>
                    </div>
                </header>
            </div>
        );
    }

}
SurveyContainer.propTypes = {
    focused:PropTypes.bool,
    isUnPublished:PropTypes.bool,
    surveys : PropTypes.object,
    searchTerm:PropTypes.string,
    onCarriageReturn: PropTypes.func,
    sortParam : PropTypes.string
};
export default SurveyContainer; 