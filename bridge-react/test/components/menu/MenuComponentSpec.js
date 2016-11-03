import React from 'React';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import MenuComponent from '../../../src/components/menu/MenuComponent';
import MenuFooterContainer from '../../../src/containers/menu/MenuFooterContainer';
import MenuItemSubMenuContainer from '../../../src/containers/menu/MenuItemSubMenuContainer';
import MenuItemContainer from '../../../src/containers/menu/MenuItemContainer';

describe('<MenuComponent />',() =>{
    let items, collapseOpenMenu, activePanel, menuClick, subMenuclick;

    beforeEach(() => {
        items =  [ {label:'kumark@prokarma.com',icon:''},{label:'Dashboard',icon:'dashboard'},{label:'Surveys',icon:'surveys'}];
        collapseOpenMenu = sinon.spy();
        activePanel = 'surveys';
        menuClick = sinon.spy();
        subMenuclick = sinon.spy();
    });

    it('check menu component is rendered or not',() =>{
        const wrapper = shallow(<MenuComponent menuClassName="test" menuItems={items} collapseOrOpenMenu={collapseOpenMenu} activePanel={activePanel} menuClick={menuClick} subMenuclick={subMenuclick} />);
        expect(wrapper.find('.sidebar__wrapper')).to.have.lengthOf(1);
    });

    it('Should have MenuItemContainer',() =>{
        const wrapper = mount(<MenuComponent menuClassName="test" menuItems={items} collapseOrOpenMenu={collapseOpenMenu} activePanel={activePanel} menuClick={menuClick} subMenuclick={subMenuclick} />);
        expect(wrapper.find('.sidebar__main_menu_item_label')).to.have.length(3);
    });

    it('Should have MenuFooterContainer',() =>{
        const wrapper = shallow(<MenuComponent menuClassName="test" menuItems={items} collapseOrOpenMenu={collapseOpenMenu} activePanel={activePanel} menuClick={menuClick} subMenuclick={subMenuclick} />);
        expect(wrapper.find(MenuFooterContainer)).to.have.length(1);
    });

    it('Should have MenuItemSubMenuContainer',() =>{
        const wrapper = shallow(<MenuComponent menuClassName="test" menuItems={items} collapseOrOpenMenu={collapseOpenMenu} activePanel={activePanel} menuClick={menuClick} subMenuclick={subMenuclick} />);
        expect(wrapper.find(MenuItemSubMenuContainer)).to.have.length(1);
    });


});