import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import { connect, Provider } from 'react-redux'
import configureStore from '../../../../src/store/configureStore'
import NewSurveyContainer from '../../../../src/containers/survey/customSurvey/NewSurveyContainer.js';

const store = configureStore()

describe('<NewSurveyContainer />', () =>{
    it('Check if NewSurveyContainer is loading', () => {
		const wrapper = mount(<Provider store={store}>
					<NewSurveyContainer />
				</Provider>)

        //const wrapper = shallow(<NewSurveyContainer />)
        expect(wrapper).to.isDefined;
    });


    it('Check if NewSurveyContainer is loading', () => {
		const wrapper = mount(<Provider store={store}>
					<NewSurveyContainer />
				</Provider>)
        //const wrapper = shallow(<NewSurveyContainer />)
		//expect(wrapper.find('section')).to.have.length(1)
    });
})