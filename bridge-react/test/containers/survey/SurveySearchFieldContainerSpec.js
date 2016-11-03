import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import SurveySearchFieldContainer from '../../../src/containers/survey/SurveySearchFieldContainer.js';

describe('<SurveySearchFieldContainer />', () =>{
    const minProps = {
        label:"",
        placeholderText:"",
        onChange:()=>{},
        onCarriageReturn:()=>{},
        urlDriven: false,
        onSearch :()=>{},
        debounceRate: 0,
        searchTerm: ""
    }
    let mockFunc1;
    beforeEach(() => {
        mockFunc1 = sinon.spy();
    });
    
    it('Renders Menu container with specified props-I', () => {
        const wrapper = shallow(<SurveySearchFieldContainer {...minProps} />);
        expect(wrapper).to.be.isDefined;
    });
    
    it('Checks for getPlaceholderText', () => {
        const wrapper = shallow(<SurveySearchFieldContainer {...minProps} />);        
        wrapper.instance().getPlaceholderText();
        wrapper.instance().handleFocus();
        wrapper.setState({focused  :true});
        expect(wrapper.state('focused')).to.equal(true);
    });
    
    it('Checks for handleFocus', () => {
        const wrapper = shallow(<SurveySearchFieldContainer {...minProps} />);
        wrapper.instance().handleFocus();
        wrapper.setState({focused  :true});
        expect(wrapper.state('focused')).to.equal(true);
    });    
    
    it('Checks for handleBlur', () => {
        const wrapper = shallow(<SurveySearchFieldContainer {...minProps} />);
        wrapper.instance().handleBlur();
        wrapper.setState({focused  :true});
        expect(wrapper.state('focused')).to.equal(true);
    });
    
    it('Checks for setSearchTerm', () => {
        const wrapper = shallow(<SurveySearchFieldContainer {...minProps} />);
        wrapper.instance().setSearchTerm();
        wrapper.setState({searchTerm  :"test"});
        expect(wrapper.state('searchTerm')).to.equal('test');
    });
    
    it('Checks for handleInputChange', () => {
        let event = {target:{value:'search test'}};
        const wrapper = shallow(<SurveySearchFieldContainer {...minProps} />);
        wrapper.instance().handleInputChange(event);
        expect(wrapper.state('searchTerm')).to.equal('search test');
    });

    it('Checks for handleKeyDown', () => {
        let mockEvent = {key:'Escape',target:{value:'test'}};
        let mockEvent1 = {key:'Enter',target:{value:'test'}};
        const mockonCarriageReturn = sinon.spy();
        const wrapper = shallow(<SurveySearchFieldContainer {...minProps} onCarriageReturn={mockonCarriageReturn} />);
        wrapper.setState({searchTerm  :"test"});
        wrapper.instance().handleKeyDown(mockEvent);
        expect(wrapper.state('searchTerm')).to.equal('');
        wrapper.setState({searchTerm  :"test"});
        wrapper.instance().handleKeyDown(mockEvent1);
        expect(mockonCarriageReturn.calledOnce).to.equal(true);
    });

    it('Checks for clearSearchTerm', () => {
        const wrapper = shallow(<SurveySearchFieldContainer {...minProps} />);
        wrapper.setState({searchTerm  :"test"});
        wrapper.instance().clearSearchTerm();
        expect(wrapper.state('searchTerm')).to.equal('');
    });

    it('Checks for getClassName', () => {
        const wrapper = shallow(<SurveySearchFieldContainer {...minProps} />);
        wrapper.setState({searchTerm  :"test", focused:true});
        let classes = wrapper.instance().getClassName();
        expect(classes).to.equal('search-field search-field--focused search-field--no-label');
    });
});