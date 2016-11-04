import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import axios from 'axios';

import SurveyContainer from '../../../src/containers/survey/SurveyContainer.js'
import surveyHelpers from '../../../src/utils/survey/surveyHelpers.js'

describe('<SurveyContainer />', () =>{    
    let mockFunc1;
    let sandbox;
    let server;
    
    const minProps = {
        focused:true,
        isUnPublished:true,
        surveys:{},
        searchTerm:"",
        onCarriageReturn: ()=>{},
        sortParam:""
    }
    beforeEach(() => {
        mockFunc1 = sinon.spy();
        sandbox = sinon.sandbox.create();
        server = sandbox.useFakeServer();
    });   
    
  afterEach(() => {
    server.restore();
    sandbox.restore();
  });
    
    it('Renders Survey container', () => {
        const wrapper = shallow(<SurveyContainer focused={false} surveys={ [] } searchTerm='' isUnPublished={false} sortParam='' />);
        expect(wrapper.containsMatchingElement(<span className="add-btn__text">New Survey</span>)).to.equal(true);
    });
        
    it('Checks for clearSortFilterParams', () => {
        const wrapper = shallow(<SurveyContainer {...minProps}/>);
        wrapper.setState({isUnPublished:true});
        wrapper.instance().clearSortFilterParams();
        expect(wrapper.state('isUnPublished')).to.equal(false);
        expect(wrapper.state('sortParam')).to.equal('');
    });    
    
    it('Checks for onSortSelect', () => {
        const wrapper = shallow(<SurveyContainer {...minProps}/>);        
        wrapper.instance().onSortSelect('Ascending');
        expect(wrapper.state('sortParam')).to.equal('Ascending');
    });    
        
    it('Checks for onFilterSelect', () => {
        const wrapper = shallow(<SurveyContainer {...minProps}/>);        
        wrapper.instance().onFilterSelect(true);
        expect(wrapper.state('isUnPublished')).to.equal(true);
    });
    
    it('Checks for onSearch', () => {
        const wrapper = shallow(<SurveyContainer {...minProps}/>);        
        wrapper.instance().onSearch('Untitled Survey');
        expect(wrapper.state('searchTerm')).to.equal('Untitled Survey');
    });

    it('getSurveys checking for success response', (done) => {
        let data = {key:'test'};
        const wrapper = shallow(<SurveyContainer {...minProps}/>);
        const mockFunc = sinon.spy(wrapper.instance(),'getSurveysResult');
        const resolved = new Promise((resolve) => resolve({ data }));
        sandbox.stub(axios, 'get').returns(resolved);
        surveyHelpers.getSurveys('test','Ascending',true).then(() => {
            expect(mockFunc).to.have.been.called;
        }).then(done, done);
        setTimeout(() => server.respond([200,{ 'Content-Type': 'application/json' },'[]']), 0);
    });

    it('getSurveys checking for error response', (done) => {
        let data = {error:'test'};
        const rejected = new Promise((resolve, reject) => reject({ data }));
        sandbox.stub(axios, 'get').returns(rejected);
        surveyHelpers.getSurveys('test','Ascending',true).then(() => {
            expect(data.error).to.equals('test');
        }).then(done, done);
        setTimeout(() => server.respond([500, { 'Content-Type': 'application/json' }, '[]']), 0);
    });

    it('Checks for getSurveysResult', () => {
        const data = 'test';
        const wrapper = shallow(<SurveyContainer {...minProps}/>);
        wrapper.instance().getSurveysResult(data);
        expect(wrapper.state('surveys')).to.equal('test');
    });

    it('deleteSurvey checking for success response', (done) => {
        let data = {success:'test'};
        const wrapper = shallow(<SurveyContainer {...minProps}/>);
        let getSurveysFunc = sinon.spy(wrapper.instance(),'getSurveys');
        wrapper.instance().deleteSurvey(1);
        const resolved = new Promise((resolve) => resolve({ data }));
        sandbox.stub(axios, 'get').returns(resolved);
        surveyHelpers.getSurveys('test','Ascending',true).then(() => {
            expect(getSurveysFunc).to.have.been.called;
        }).then(done, done);
    });

    it('deleteSurvey service call check for success response', (done) => {
        let data = {success:'test'};
        const wrapper = shallow(<SurveyContainer {...minProps}/>);
        let getSurveysFunc = sinon.spy(wrapper.instance(),'getSurveys');
        let delSurveyFunc = sinon.spy(wrapper.instance(),'deleteSurvey');
        wrapper.instance().deleteSurvey(1);
        const resolved = new Promise((resolve) => resolve({ data }));
        sandbox.stub(axios, 'get').returns(resolved);
        const resolved1 = new Promise((resolve) => resolve({ data }));
        sandbox.stub(axios, 'delete').returns(resolved1);
        surveyHelpers.deleteSurvey(1).then(() => {
            expect(getSurveysFunc).to.have.been.called;
        }).then(done, done);
    });

    it('deleteSurvey checking for error response', (done) => {
        let data = {error:'test'};
        const rejected = new Promise((resolve, reject) => reject({ data }));
        sandbox.stub(axios, 'get').returns(rejected);
        surveyHelpers.deleteSurvey(1).then(() => {
            expect(data.error).to.equals('test');
        }).then(done, done);
        setTimeout(() => server.respond([500, { 'Content-Type': 'application/json' }, '[]']), 0);
    });

})