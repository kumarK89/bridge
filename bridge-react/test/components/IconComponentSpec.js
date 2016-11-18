import React from 'React';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import IconComponent from '../../src/components/IconComponent';

describe('<IconComponent />', () =>{
    it('renders Icon component',()=>{
        const wrapper = shallow(<IconComponent iconClassName='gs-book' />);
        expect(wrapper.containsMatchingElement(<i aria-hidden="true" className='gs-book' />)).to.equal(true);
    });
});