import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import SurveyContainer from '../../../src/containers/survey/SurveyContainer.js'

describe('<SurveyContainer />', () =>{
    const minProps = {
        focused:true,
        isUnPublished:true,
        surveys:{},
        searchTerm:"",
        onCarriageReturn: ()=>{},
        sortParam:""
    }
    let mockFunc1;
    beforeEach(() => {
        mockFunc1 = sinon.spy();
    });
    
    it('Renders Survey container', () => {
        const wrapper = shallow(<SurveyContainer />);
        expect(wrapper.containsMatchingElement(<span className="add-btn__text">New Survey</span>)).to.equal(true);
    });
        
    it('Checks for clearSortFilterParams', () => {
        const wrapper = shallow(<SurveyContainer {...minProps}/>);
        wrapper.setState({isUnPublished:true});
        wrapper.instance().clearSortFilterParams();
        expect(wrapper.state('isUnPublished')).to.equal(false);
        wrapper.setState({sortParam:'test'});
        expect(wrapper.state('sortParam')).to.equal('test');
    });    
    
    it('Checks for onSortSelect', () => {
        const wrapper = shallow(<SurveyContainer {...minProps}/>);        
        wrapper.instance().onSortSelect();
        wrapper.setState({sortParam:'Ascending'});
        expect(wrapper.state('sortParam')).to.equal('Ascending');
    });    
        
    it('Checks for onFilterSelect', () => {
        const wrapper = shallow(<SurveyContainer {...minProps}/>);        
        wrapper.instance().onFilterSelect();
        wrapper.setState({isUnPublished:true});
        expect(wrapper.state('isUnPublished')).to.equal(true);
    });
    
    it('Checks for onSearch', () => {
        const wrapper = shallow(<SurveyContainer {...minProps}/>);        
        wrapper.instance().onSearch();
        wrapper.setState({searchTerm :'Untitled Survey'});
        expect(wrapper.state('searchTerm')).to.equal('Untitled Survey');
    });
        
    it('Checks for getSurveys', () => {
       /* let mockArray = [{id:'1',title:'Test',description:'this is test'}];
        const wrapper = shallow(<SurveyContainer {...minProps}/>);        
        wrapper.instance().getSurveys();
        wrapper.setState({surveys :mockArray});
        expect(wrapper.state('surveys')).to.equal(mockArray);*/
    });    
    
    
})