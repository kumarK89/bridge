import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import {expect} from 'chai';
import SurveySortFilterContainer from '../../../src/containers/survey/SurveySortFilterContainer.js'

describe('<SurveySortFilterContainer />', () =>{
    let mockFunc1, mockFunc2, mockFunc3;

    beforeEach(() => {
        mockFunc1 = spy();
        mockFunc2 = spy();
        mockFunc3 = spy();
    });

    it('Renders Survey sort filter container', () => {
        const wrapper = shallow(<SurveySortFilterContainer isModalOpen={true} onSortSelect={mockFunc1} onFilterSelect={mockFunc2} clearSortFilterParams={mockFunc3} />);
        expect(wrapper.find('.filter-sort-selector')).to.have.length(1);
    });

    it('Check closeModal function', () => {
        const wrapper = shallow(<SurveySortFilterContainer isModalOpen={true} onSortSelect={mockFunc1} onFilterSelect={mockFunc2} clearSortFilterParams={mockFunc3} />);
        wrapper.state({isModalOpen:true});
        wrapper.instance().closeModal();
        expect(wrapper.state('isModalOpen')).to.equals(false);
    });

    it('Check onFilterItemSelect and onSortItemSelect function', () => {
        const wrapper = shallow(<SurveySortFilterContainer isModalOpen={true} onSortSelect={mockFunc1} onFilterSelect={mockFunc2} clearSortFilterParams={mockFunc3} />);
        wrapper.instance().onFilterItemSelect();
        expect(mockFunc2.calledOnce).to.equal(true);
        wrapper.instance().onSortItemSelect();
        expect(mockFunc1.calledOnce).to.equal(true);
    });

    it('Check afterOpenModal function', () => {
        const wrapper = shallow(<SurveySortFilterContainer isModalOpen={true} onSortSelect={mockFunc1} onFilterSelect={mockFunc2} clearSortFilterParams={mockFunc3} />);
        wrapper.instance().afterOpenModal();
        expect(wrapper.find('.popdown__modal')).to.have.length(1);
    });

})