import React from 'React';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import MenuItemSubMenuComponent from '../../../src/components/menu/MenuItemSubMenuComponent';
import SurveyPanelComponent from '../../../src/components/menu/subMenu/SurveySubMenuComponent';

describe('<MenuItemSubMenuComponent />',() =>{

    it('MenuItem sub menu component is rendered or not',() =>{
        const wrapper = shallow(<MenuItemSubMenuComponent subMenuPanelClassName="test" />);
        expect(wrapper.find('.sidebar__panel_wrapper')).to.have.lengthOf(1);
    });

    it('Should have SurveyPanelComponent',() =>{
        const wrapper = shallow(<MenuItemSubMenuComponent subMenuPanelClassName="test" />);
        expect(wrapper.find(SurveyPanelComponent)).to.have.lengthOf(1);
    });

});