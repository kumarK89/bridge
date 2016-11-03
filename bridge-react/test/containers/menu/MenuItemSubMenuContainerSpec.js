import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import MenuItemSubMenuContainer from '../../../src/containers/menu/MenuItemSubMenuContainer.js';
import MenuItemSubMenuComponent from '../../../src/components/menu/MenuItemSubMenuComponent.js';

describe('<MenuItemSubMenuContainer />', () =>{
    it('Renders Menu item sub menu container', () => {
        const onClick = sinon.spy();
        const wrapper = shallow(<MenuItemSubMenuContainer subMenuclick={onClick}/>);
        expect(wrapper.find(MenuItemSubMenuComponent)).to.have.length(1);
    });
})