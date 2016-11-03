import React from 'react';
import { shallow, mount } from 'enzyme';
import {spy} from 'sinon';
import {expect} from 'chai';
import MenuFooterContainer from '../../../src/containers/menu/MenuFooterContainer.js';
import MenuFooterComponent from '../../../src/components/menu/MenuFooterComponent.js';

describe('<MenuFooterContainer />', () =>{
    it('Renders menu footer container', () => {
        const onClick = spy();
        const wrapper = shallow(<MenuFooterContainer collapseOrOpenMenu={onClick}/>);
        expect(wrapper.find(MenuFooterComponent)).to.have.length(1);
    });
})