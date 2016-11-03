import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import MenuItemContainer from '../../../src/containers/menu/MenuItemContainer.js';
import MenuItemComponent from '../../../src/components/menu/MenuItemComponent.js';

describe('<MenuItemContainer />', () =>{
    let menuClick, menuItem;
    beforeEach(() =>{
        menuItem = {label:'test'};
        menuClick = sinon.spy();
    })

    it('Renders Menu item container', () => {
        const wrapper = shallow(<MenuItemContainer menuItem={menuItem} menuClick={menuClick} showSubMenu={true} activePanel=""/>);
        expect(wrapper.find(MenuItemComponent)).to.have.length(1);
    });

    it('Check functioning of isPanelActive function', () => {
        const wrapper = shallow(<MenuItemContainer menuItem={menuItem} menuClick={menuClick} showSubMenu={true} activePanel=""/>);
        wrapper.setProps({activePanel:'test', menuItem:{label:'test',value:'test'}});
        const value = wrapper.instance().isPanelActive();
        expect(value).to.equal(true);
    });


})