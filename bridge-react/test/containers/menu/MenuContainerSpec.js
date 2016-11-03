import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import {expect} from 'chai';
import MenuContainer from '../../../src/containers/menu/MenuContainer.js';
import MenuComponent from '../../../src/components/menu/MenuComponent.js';

describe('<MenuContainer />', () =>{
    let mockFunc1;
    beforeEach(() => {
        mockFunc1 = spy();
    });
    it('Renders Menu container with specified props-I', () => {
        const wrapper = shallow(<MenuContainer open={true} showSubMenu={true} activePanel="" collapseOrOpenMenu={mockFunc1}/>);
        expect(wrapper.find(MenuComponent)).to.have.length(1);
    });

    it('Check showExpand function', () => {
        const wrapper = shallow(<MenuContainer open={true} showSubMenu={true} activePanel="" collapseOrOpenMenu={mockFunc1}/>);
        wrapper.setState({showSubMenu:true});
        const value = wrapper.instance().showExpand();
        expect(value).to.equal(true);
    });

    it('Check isSurveyActive function', () => {
        const wrapper = shallow(<MenuContainer open={true} showSubMenu={true} activePanel="" collapseOrOpenMenu={mockFunc1}/>);
        wrapper.setState({activePanel:'surveys'});
        const value = wrapper.instance().isSurveyActive();
        expect(value).to.equal(true);
        wrapper.setState({activePanel:'test'});
        const value1 = wrapper.instance().isSurveyActive();
        expect(value1).to.equal(false);
    });

    it('Check collapseOrOpenMenu function', () => {
        const wrapper = shallow(<MenuContainer open={true} showSubMenu={true} activePanel="" collapseOrOpenMenu={mockFunc1}/>);
        wrapper.setState({open:true});
        wrapper.instance().collapseOrOpenMenu();
        expect(wrapper.state('open')).to.equal(false);
        expect(wrapper.state('showSubMenu')).to.equal(false);
    });

    it('Check showSubMenuPanel function', () => {
        const wrapper = shallow(<MenuContainer open={true} showSubMenu={true} activePanel="" collapseOrOpenMenu={mockFunc1}/>);
        const item = {value:'test'};
        wrapper.setState({activePanel:'test'});
        wrapper.instance().showSubMenuPanel(item);
        expect(wrapper.state('activePanel')).to.equal('none');
        wrapper.setState({activePanel:'none'});
        wrapper.instance().showSubMenuPanel(item);
        expect(wrapper.state('showSubMenu')).to.equal(true);
        expect(wrapper.state('activePanel')).to.equal('test');
    });
})