import React from 'React';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import SurveySortItemComponent from '../../../src/components/survey/SurveySortItemComponent';

describe('<SurveySortItemComponent />',() =>{

    it('Renders SurveySortItemComponent',() =>{
        const sortSelFunc = sinon.spy();
        const wrapper = render(<SurveySortItemComponent sortItemclassName="test" sortItemValue="test" onSortItemSelect={sortSelFunc} sortItemLabel="test"/>);
        expect(wrapper.find('.test')).to.have.length(1);
    });

});