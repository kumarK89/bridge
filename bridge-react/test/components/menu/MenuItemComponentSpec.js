import React from 'React';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import MenuItemComponent from '../../../src/components/menu/MenuItemComponent';

const minProps =  {
    menuItemClassName: "",
    boundClick: () => {},
    buttonClassNames: "",
    iconClassName:"",
    menuItemLabel:""
}
describe('<MenuItemComponent />',()=>{
    it('is MenuItemComponent defined', () => {
        const wrapper = shallow(<MenuItemComponent {...minProps} />);
        expect(wrapper).to.be.isDefined;
        });
    
    it('Checking the boundClick', () => {
        const mockClick= sinon.spy();
        const wrapper = shallow(<MenuItemComponent {...minProps} boundClick={mockClick} />);
        //expect(wrapper).to.be.isDefined;
        });
});