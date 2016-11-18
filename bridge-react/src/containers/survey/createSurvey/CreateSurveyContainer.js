import React,{Component} from 'react'
import SurveyTemplateComponent from '../../../components/survey/SurveyTemplateComponent'
import IconComponent from '../../../components/IconComponent'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../../actions/survey/createSurvey/actions'

class CreateSurveyContainer extends Component{
  componentWillMount() {
    this.props.getSurveyTemplates()
  }
  render(){
    let surveyTemplateComponents= this.props.createSurvey.createSurveyReducer.surveyTemplates.map(function(surveyTemplate){
      let redirectUrl = '/newSurveyFromTemplate/'+surveyTemplate.id
      return (
        <SurveyTemplateComponent key={surveyTemplate.id}
                                    surveyQuestionSetName={surveyTemplate.name}
                                    redirectUrl={redirectUrl}>
        </SurveyTemplateComponent>
      )
    })
    return (
        <main className="surveycontainer ">
            <nav>
                <Link to="/showSurvey">
                    Back to Surveys
                </Link>
            </nav>
            <header className="surveycontainer-header text-center">
                <IconComponent iconClassName="gs-surveys"/><br/>
                <h4 className="text-underline">CREATE SURVEY</h4>
            </header>
            <section className="surveycontainer-content">
                <SurveyTemplateComponent surveyQuestionSetName={'Create Your Own Survey'}
                                            redirectUrl={'/newSurvey'}>
                </SurveyTemplateComponent>
                <article className="surveytile-transparent">
                     <hr className="survey-or-line"/>
                </article>
                {surveyTemplateComponents}
            </section>
        </main>
    )
  }
}

let mapStateToProps = (state) => ({createSurvey : state})

let mapDispatchToProps = (dispatch) => 
    bindActionCreators(actionCreators,dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurveyContainer)