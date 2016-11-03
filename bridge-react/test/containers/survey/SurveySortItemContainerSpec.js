import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import {expect} from 'chai';
import SurveySortItemContainer from '../../../src/containers/survey/SurveySortItemContainer.js'

describe('<SurveySortItemContainer />', () =>{
    let sortSelect;

    beforeEach(() => {
        sortSelect = spy();
    })

    it('Renders Survey sort item container', () => {
        const wrapper = shallow(<SurveySortItemContainer activeSortItem="" sortItemValue="" sortItemLabel="" onSortItemSelect={sortSelect} />);
        expect(wrapper.find('SurveySortItemComponent')).to.have.length(3);
    });

    it('Check onSelectOfSortItem function', () => {
        const wrapper = shallow(<SurveySortItemContainer activeSortItem="" sortItemValue="" sortItemLabel="" onSortItemSelect={sortSelect} />);
        wrapper.instance().onSelectOfSortItem('test');
        expect(wrapper.state('activeSortItem')).to.equals('test');
    });

})