import React from 'React';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import MenuFooterComponent from '../../../src/components/menu/MenuFooterComponent';

describe('<MenuFooterComponent />',() =>{

    it('Menu Footer Component is defined',() =>{
        const onClick = sinon.spy();
        const wrapper = render(<MenuFooterComponent boundClick={onClick} />);
        expect(wrapper).to.be.isDefined;
    });
    it('It contains one sidebar footer',() =>{
        const onClick = sinon.spy();
        const wrapper = render(<MenuFooterComponent boundClick={onClick} />);
         expect(wrapper.find('.sidebar__footer')).to.have.lengthOf(1);
    });
    
    it('Check button functionality',() =>{
        const onClick = sinon.spy();
        const wrapper = shallow(<MenuFooterComponent boundClick={onClick} />);
        wrapper.find('button').simulate('click');        
        expect(onClick.calledOnce).to.be.true;
        
    });

});