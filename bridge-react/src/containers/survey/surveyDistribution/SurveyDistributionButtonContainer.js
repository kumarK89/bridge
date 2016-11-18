import React,{Component} from 'react'
import Modal from 'react-modal'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import SurveyDistributionItemsContainer from './SurveyDistributionItemsContainer'

let buttonTrigger = ''
let buttonTop,buttonLeft,buttonWidth = 0

class SurveyDistributionButtonContainer extends Component {
    constructor(){
        super()
        this.state = {
            isModalOpen : false
        }
        this.closeModal = this.closeModal.bind(this)
        this.openModal = this.openModal.bind(this)
    }
    closeModal(){
        this.setState({
            isModalOpen : false
        })
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

        const styles = { top, left, position }
        styles.left -= (width+132) 
        $box.css(styles)
    }

    render(){
        return(
            <div>
                    <span className="popdown">
                        <button type="button" ref="trigger" className="add-btn" onClick={this.openModal}>
                                     <span>
                                         <span> + </span>
                                         <span className="add-btn__text">Distribute
                                         </span>
                                     </span>
                        </button>
                        <Modal ref="modal" className='distribute-box__modal popdown__modal' isOpen={this.state.isModalOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}>
                            <SurveyDistributionItemsContainer />
                        </Modal>
                    </span>
                <noscript></noscript>
            </div>
        )
    }
}
export default SurveyDistributionButtonContainer