import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import { connect, Provider } from 'react-redux'
import configureStore from '../../../../src/store/configureStore'
import CreateSurveyContainer from '../../../../src/containers/survey/createSurvey/CreateSurveyContainer.js';
import SurveyTemplateComponent from '../../../../src/components/survey/SurveyTemplateComponent'

const store = configureStore()

describe('<CreateSurveyContainer />', () =>{

	 	const minProps = {
	        getSurveyTemplates: ()=>{},
			createSurvey: {
				createSurveyReducer:{
					surveyTemplates:[]
				}
			}
	    }

    it('Check if CreateSurveyContainer is loading', () => {
        const wrapper = mount(<Provider store={store}>
					<CreateSurveyContainer {...minProps}  />
				</Provider>)
        expect(wrapper.find('main').hasClass('surveycontainer')).to.be.true;
    });

    it('Finding  SurveyTemplateComponent', () => {
            const wrapper = mount(<Provider store={store}>
					<CreateSurveyContainer {...minProps}  />
				</Provider>)
            expect(wrapper.find(SurveyTemplateComponent)).to.have.length(1);
    });

})