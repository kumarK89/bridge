import React from 'react';
import IconComponent from '../../components/IconComponent'

class PreviewHeaderBarContainer extends React.Component{
    constructor(props){
        super(props);
        this.onDesktop=this.onDesktop.bind(this);
        this.onTablet=this.onTablet.bind(this);
        this.onMobile=this.onMobile.bind(this);
    }

    onDesktop(){
        this.props.onSelectDevice("default");
    }
    onMobile(){
        this.props.onSelectDevice("mobile");
    }
    onTablet(){
        this.props.onSelectDevice("tablet");
    }

    render()
    {
        return (
                  <header className="authoring-heading white padding-t-s padding-l-m shadow border-none">

                        <button className="authoring-heading__menu-button" data-capybara="preview_header_hide" >
                           <IconComponent iconClassName="gs-hide-menu gs-half white" />
                        </button>

                        <span className="authoring-heading__title authoring-heading__title--short">
                            Untitled Survey
                        </span>

                        <span className="authoring-heading__save-status authoring-heading__save-status--preview">
                            Previewing
                        </span>

                        <ul className="survey-preview-responsive-picker">
                             <li>
                                 <button onClick={this.onDesktop} className="btn--reset desktop">
                                    <IconComponent iconClassName="gs-desktop gs-2x " />
                                 </button>
                             </li>
                             <li>
                                 <button onClick={this.onTablet} className="btn--reset  tablet">
                                    <IconComponent iconClassName="gs-tablet " />
                                 </button>
                             </li>
                             <li>
                                 <button onClick={this.onMobile} className="btn--reset mobile">
                                    <IconComponent iconClassName="gs-phone-portrait " />
                                 </button>
                             </li>
                        </ul>

                        <span className="survey-header-actions margin-r-s right round-button-set">
                            <div className="icontooltip">
                            		<button className="btn btn--round dark secondary btn--active round-button-set__button">
                            			<IconComponent iconClassName="gs-preview "></IconComponent>
                            		</button>
                            		<div className="icontooltiptext">
                            		    <p className="semi-bold x-small">Toggle Preview</p>
                            		</div>
                            </div>
                            <div className="icontooltip">
                                    <button className="btn round-button-set__button" type="button" >
                                        <IconComponent iconClassName="gs-edit white" ></IconComponent>
                                    </button>
                                    <div className="icontooltiptext">
                                        <p className="semi-bold x-small">Edit Survey</p>
                                    </div>
                            </div>
                        </span>

                  </header>
        );
    }
}

export default PreviewHeaderBarContainer;