import React,{Component,PropTypes} from 'react'
import Modal from 'react-modal'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import SurveySortItemContainer from './SurveySortItemContainer'
import SurveyFilterItemContainer from './SurveyFilterItemContainer'

let buttonTrigger = ''
let buttonTop,buttonLeft,buttonWidth = 0
class SurveySortFilterContainer extends Component{
    constructor(){
        super()
        this.state = {
            isModalOpen : false
        }
        this.closeModal = this.closeModal.bind(this)
        this.openModal = this.openModal.bind(this)
        this.onSortItemSelect = this.onSortItemSelect.bind(this)
        this.onFilterItemSelect = this.onFilterItemSelect.bind(this)
    }
    closeModal(){
        this.setState({
            isModalOpen : false
        })
        this.props.clearSortFilterParams()
    }
    openModal(){
        buttonTrigger = ReactDOM.findDOMNode(this.refs.trigger)
        const { top, left, width } = buttonTrigger.getBoundingClientRect()
        buttonTop = top
        buttonLeft = left
        buttonWidth = width
        this.setState({
            isModalOpen : true
        })        
        
    }
    afterOpenModal(){
        const $box = $('.ReactModal__Content.popdown__modal')
        
        
        const top = buttonTop
        const left = buttonLeft
        const width = buttonWidth
       
        const position = 'absolute'
        
        const styles = { top, left,position }        
        styles.left -= (width-50) 
        
        
        $box.css(styles)
    }
    onFilterItemSelect(isUnPublished){
        this.props.onFilterSelect(isUnPublished)
    }
    onSortItemSelect(activeSortItem){        
        this.props.onSortSelect(activeSortItem)
    }    
    render(){
        
        return(
            <span>                               
                <button type="button" ref="trigger" className="popdown__trigger right" onClick={this.openModal}>
                    <span>
                        Sort & Filter
                        <i aria-hidden="true" className="gs-arrow-down gs-half" key="button-icon"/>
                    </span>
                </button>
                <Modal
                    ref="modal"
                    className='popdown__modal'
                    isOpen={this.state.isModalOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}                    
                  >
                    <div className="filter-sort-selector">
                        <h3 className="bold padding-s small white-bg sort-selector__header">
                            <i aria-hidden="true" className="gs-sort margin-r-xs leading-condensed text-above-baseline-10" />
                            Sort by
                        </h3>
                        <div className="sort-selector">
                            <ul role="listbox" className="unstyled">
                                <SurveySortItemContainer onSortItemSelect={this.onSortItemSelect} />                                               
                            </ul>
                        </div>
                        <h3 className="bold padding-s small white-bg filter-selector__header">
                            <i aria-hidden="true" className="gs-filter gs-1x margin-r-xs" />
                            Filter by
                            <SurveyFilterItemContainer onFilterItemSelect={this.onFilterItemSelect}/>
                        </h3>
                    </div>
                </Modal>
            </span>
        )
    }
}

SurveySortFilterContainer.propTypes = {
    isModalOpen:PropTypes.bool,
    onSortSelect:PropTypes.func,
    onFilterSelect:PropTypes.func,
    clearSortFilterParams:PropTypes.func
}

export default SurveySortFilterContainer