import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import BridgeContainer from '../../src/containers/BridgeContainer.js';
import MenuContainer from '../../src/containers/menu/MenuContainer.js';
import SurveyContainer from '../../src/containers/survey/surveyDetails/SurveyContainer.js'

describe('<BridgeContainer />', () =>{
    it('Check Bridge container purpose', () => {
        const wrapper = shallow(<BridgeContainer />);
        expect(wrapper.find(MenuContainer)).to.have.length(1);
        expect(wrapper.find(SurveyContainer)).to.have.length(1);
    });
})