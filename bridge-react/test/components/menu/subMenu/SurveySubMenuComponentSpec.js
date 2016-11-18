import React from 'React';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import SurveyPanelComponent from '../../../../src/components/menu/subMenu/SurveySubMenuComponent';

describe('<SurveyPanelComponent />',() =>{

    it('SurveySubMenuComponent is rendered or not',() =>{
        const wrapper = shallow(<SurveyPanelComponent surveyPanelClassName="test" />);
        expect(wrapper.find('.sidebar__panel_menu')).to.have.lengthOf(1);
    });

});