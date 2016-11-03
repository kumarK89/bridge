import React from 'react';
import { shallow, mount } from 'enzyme';
import {expect} from 'chai';
import SurveyListContainer from '../../../src/containers/survey/SurveyListContainer.js'

describe('<SurveyListContainer />', () =>{
    let surveysData;
    beforeEach(() => {
        surveysData = [{surveyId:1,surveyName:'test1'},{surveyId:2,surveyName:'test2'}];
    })
    it('Renders Survey List container', () => {
        const wrapper = shallow(<SurveyListContainer surveysData={surveysData} />);
        expect(wrapper.find('SurveyListItemContainer')).to.have.length(2);
    });

})