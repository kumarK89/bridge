import React from 'react';
import { shallow, mount } from 'enzyme';
import {spy} from 'sinon';
import {expect} from 'chai';
import SurveyListItemContainer from '../../../src/containers/survey/SurveyListItemContainer.js'

describe('<SurveyListItemContainer />', () =>{
    let surveysData, survey, onRemove, deleteSurvey;
    beforeEach(() => {
        surveysData = [{surveyId:1,surveyName:'test1'},{surveyId:2,surveyName:'test2'}];
        survey = {surveyId:3, surveyName:'test'};
        onRemove = spy();
        deleteSurvey = spy();
    })
    it('Renders Survey List container', () => {
        const wrapper = shallow(<SurveyListItemContainer surveysData={surveysData} id="1" survey={survey} title="title" distributionsCount={1} removable={true} highlight="test" onRemove={onRemove} />);
        expect(wrapper.find('.removable-item__title--large')).to.have.length(1);
    });

    it('Check getTitle function', () => {
        const wrapper = shallow(<SurveyListItemContainer surveysData={surveysData} id="1" survey={survey} title="title" distributionsCount={1} removable={true} highlight="test" onRemove={onRemove} />);
        let title = wrapper.instance().getTitle();
        expect(title).to.equals('title');
        const wrapper1 = shallow(<SurveyListItemContainer surveysData={surveysData} id="1" survey={survey} title="" distributionsCount={1} removable={true} highlight="test" onRemove={onRemove} />);
        let title1 = wrapper1.instance().getTitle();
        expect(title1).to.equals('Untitled Survey');
    });

    it('Check getIsDistributed function', () => {
        const wrapper = shallow(<SurveyListItemContainer surveysData={surveysData} id="1" survey={survey} title="title" distributionsCount={0} removable={true} highlight="test" onRemove={onRemove} />);
        let distValue = wrapper.instance().getIsDistributed();
        expect(distValue).to.equals(false);
        expect(wrapper.find('h2.unpublished')).to.have.length(1);
        const wrapper1 = shallow(<SurveyListItemContainer surveysData={surveysData} id="1" survey={survey} title="title" distributionsCount={1} removable={true} highlight="test" onRemove={onRemove} />);
        wrapper1.instance().getIsDistributed();
        expect(wrapper1.find('h2.unpublished')).to.have.length(0);
    });

    it('Check confirm removal and cancel cancelRemoval function', () => {
        const wrapper = shallow(<SurveyListItemContainer surveysData={surveysData} id="1" survey={survey} title="title" distributionsCount={0} removable={true} highlight="test" onRemove={onRemove} />);
        wrapper.instance().confirmRemoval();
        expect(wrapper.state('removable')).to.equals(true);
        wrapper.instance().cancelRemoval();
        expect(wrapper.state('removable')).to.equals(false);
    })


    it('Check removeSurvey function', () => {
        const wrapper = shallow(<SurveyListItemContainer surveysData={surveysData} id="1" survey={survey} title="title" distributionsCount={0} removable={true} highlight="test" onRemove={onRemove} deleteSurvey={deleteSurvey} />);
        wrapper.instance().removeSurvey(1);
        expect(deleteSurvey.calledOnce).to.equals(true);
    });

})