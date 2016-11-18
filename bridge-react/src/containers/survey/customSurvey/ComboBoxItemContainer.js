import React,{Component,PropTypes} from 'react'
import classnames from "classnames"
class ComboBoxItemContainer extends Component{
  constructor(){
      super()
      this.focusItem = this.focusItem.bind(this)
      this.selectItem = this.selectItem.bind(this)
  }
  focusItem() {
    if (this.props.setFocused) {
      this.props.setFocused(this.props.index)
    }
  }
  selectItem(e) {
    e.preventDefault()

    if (this.props.setSelected) {
      this.props.setSelected(this.props.value)
    }
  }
  render() {
    let classes = {
      "combo-box__list-item": true,
      "combo-box__list-item--selected": this.props.focused
    }
    if (this.props.className) {
      classes[this.props.className] = true
    }
    return (
      <li
        className={classnames(classes)}
        role="option"
        tabIndex="-1"
        onClick={this.props.onClick || this.selectItem}
        onMouseEnter={this.focusItem}
        data-capybara={this.props.dataCapybara}
      >
        {this.props.children || this.props.label}
      </li>
    )
  }
}

ComboBoxItemContainer.propTypes = {
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    index: PropTypes.number,
    value: PropTypes.number.isRequired,
    label: PropTypes.string,
    setFocused: PropTypes.func,
    setSelected: PropTypes.func,
    className: PropTypes.string,
    focused: PropTypes.bool,
    children: PropTypes.any
}

export default ComboBoxItemContainer
