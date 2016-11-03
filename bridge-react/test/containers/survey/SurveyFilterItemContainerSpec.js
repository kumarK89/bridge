import React from 'react';
import { shallow, mount } from 'enzyme';
import {spy} from 'sinon';
import {expect} from 'chai';
import SurveyFilterItemContainer from '../../../src/containers/survey/SurveyFilterItemContainer.js'

describe('<SurveyFilterItemContainer />', () =>{
    let mockFunc;

    beforeEach(() => {
        mockFunc = spy();
    });

    it('Renders Survey filter item container', () => {
        const wrapper = shallow(<SurveyFilterItemContainer checked={true} focused={true} disabled={true} value="test" onFilterItemSelect={mockFunc} />);
        expect(wrapper.find('.filter-selector')).to.have.length(1);
    });

    it('Check markFocused and unmarkFocused functions', () => {
        const wrapper = shallow(<SurveyFilterItemContainer checked={true} focused={true} disabled={true} value="test" onFilterItemSelect={mockFunc} />);
        wrapper.instance().markFocused();
        expect(wrapper.state('focused')).to.equals(true);
        wrapper.instance().unmarkFocused();
        expect(wrapper.state('focused')).to.equals(false);
    });

    it('onSelectOfFilterItem', () => {
        const wrapper = shallow(<SurveyFilterItemContainer checked={true} focused={true} disabled={true} value="test" onFilterItemSelect={mockFunc} />);
        let checkedState = wrapper.state('checked');
        wrapper.find('input').simulate('click');
        expect(wrapper.state('checked')).to.equals(!checkedState);
    });

})