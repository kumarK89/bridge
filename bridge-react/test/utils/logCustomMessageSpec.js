import React from 'React';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import LogCustomMessage from '../../src/utils/logCustomMessage';

describe('<LogCustomMessage />', () =>{
    it('renders Log Custom Message',()=>{
        const wrapper = shallow(<LogCustomMessage />);
        expect(wrapper).to.be.isDefined;
        });

    });