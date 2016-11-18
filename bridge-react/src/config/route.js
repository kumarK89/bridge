import React from 'react'
import { Router,Route,browserHistory} from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from '../store/configureStore'
import CreateSurveyContainer from '../containers/survey/createSurvey/CreateSurveyContainer'
import BridgeContainer from '../containers/BridgeContainer'
import NewSurveyContainer from '../containers/survey/customSurvey/NewSurveyContainer'
import PreviewViewContainer from '../containers/preview/PreviewViewContainer'
import ParentSurveyContainer from  '../containers/survey/ParentSurveyContainer'
import SurveyViewContainer from '../containers/survey/surveyView/SurveyViewContainer'
import SurveyDistributionContainer from '../containers/survey/surveyDistribution/SurveyDistributionContainer'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

let routes= (
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={BridgeContainer}/>
            <Route path='/showSurvey' component={BridgeContainer}/>
            <Route path='/createSurvey' component={CreateSurveyContainer}/>
            <Route path='/surveyDistribution' component={SurveyDistributionContainer}/>            
            <Route path='/newSurvey' component={NewSurveyContainer}/>
            <Route path='/newSurveyFromTemplate/:surveyTemplateId' component={NewSurveyContainer}/>
            <Route path='/previewSurvey' component={PreviewViewContainer}/>            
        </Router>
    </Provider>
)

export default routes