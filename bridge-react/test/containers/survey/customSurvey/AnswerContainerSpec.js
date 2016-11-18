import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import AnswerContainer from '../../../../src/containers/survey/customSurvey/AnswersContainer.js';

describe('<AnswerContainer />', () =>{
    const answers = [{text:'Text1',id:1},{text:'Text2',id:2}]
    it('Check if container is loading', () => {
        const wrapper = shallow(<AnswerContainer answers={answers} />)
        expect(wrapper.find('section')).to.have.length(1)
    });
})