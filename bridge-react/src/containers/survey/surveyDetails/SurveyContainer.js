import React,{Component} from 'react'
import SurveySearchFieldContainer from './SurveySearchFieldContainer'
import SurveySortFilterContainer from './SurveySortFilterContainer'
import SurveyListContainer from './SurveyListContainer'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../../actions/survey/surveyDetails/actions'

class SurveyContainer extends Component{
    constructor(){
        super()
        this.onSortSelect = this.onSortSelect.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.clearSortFilterParams = this.clearSortFilterParams.bind(this)
        this.onDeleteSurvey = this.onDeleteSurvey.bind(this)        
    }
    clearSortFilterParams(){
        this.props.onClearSortFields()
        this.props.searchSurvey(this.props.searchTerm,
                                '',
                                false)       
    }
    onSortSelect(param){
        this.props.onSetSortParam(param)
        this.props.searchSurvey(this.props.searchTerm,
                                param,
                                this.props.isUnPublished)
    }
    onFilterSelect(isUnPublished){
        this.props.onSetFilterParam(isUnPublished)
        this.props.searchSurvey(this.props.searchTerm,
                                this.props.sortParam,
                                isUnPublished)
    }
    onSearch(searchTerm){
        this.props.onSetSearchParam(searchTerm)        
        this.props.searchSurvey(searchTerm,
                                this.props.sortParam,
                                this.props.isUnPublished)
    }
    onDeleteSurvey(surveyId){
        this.props.deleteSurvey(surveyId)
        .then(() =>
            this.props.searchSurvey(this.props.searchTerm,
                                    this.props.sortParam,
                                    this.props.isUnPublished))
    }
    componentWillMount() {
        this.props.searchSurvey('',
                                '',
                                false)        
    }
    render(){              
        return(
            <main className='full-height next-to-sidebar-panel layout--list'>                
                <header className="layout--list__header">
                    <h1 className="layout--list__header-text">
                        Surveys
                    </h1>
                    <Link to="/createSurvey" className="btnLink-style"><button className="add-btn">
                        <span> + <span className="add-btn__text">New Survey</span></span>
                    </button></Link>
                </header>
                <section className="layout--list__content">
                    <article className="sortable-table-header--first-item">
                        <SurveySearchFieldContainer className="left indigo" 
                                                    key="survey-search" 
                                                    onSearch={this.onSearch}
                                                    searchTerm={this.props.searchTerm}
                                                    focused={this.props.focused}
                                                    searchFieldFocus={this.props.onSearchFieldFocus}
                                                    searchFieldBlur={this.props.onSearchFieldBlur}
                                                    clearSearchField={this.props.onClearSearchField}/>
                        <SurveySortFilterContainer className="popdown"
                                                   key="survey-sort-filter"                                                       
                                                   onSortSelect={this.onSortSelect}
                                                   clearSortFilterParams={this.clearSortFilterParams}
                                                   onFilterSelect={this.onFilterSelect}/>
                    </article>
                    <SurveyListContainer surveysData={this.props.surveys}
                                         onDeleteSurvey={this.onDeleteSurvey}/>
                </section>
            </main>
        )
    }

}

let mapStateToProps = (state) => (
    {
        surveys : state.surveyReducer.surveys,
        sortParam : state.surveyReducer.sortParam,
        isUnPublished : state.surveyReducer.isUnPublished,
        searchTerm : state.surveyReducer.searchTerm,
        focused : state.surveyReducer.focused
    }
)

let mapDispatchToProps = (dispatch) => 
    bindActionCreators(actionCreators,dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer)