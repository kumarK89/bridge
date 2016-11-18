import React,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import ComboBoxItemContainer from "./ComboBoxItemContainer"
import IconComponent from '../../../../src/components/IconComponent'
import * as constants from '../../../../src/constants/constants'

let uniqueElementId = 0

class ComboBoxContainer extends Component{
  constructor(){
      super()
      this.state = {
          isOpen: false,
          keepFocus: false,
          focusedIndex: null
      }
      this.domChanged = this.domChanged.bind(this)
      this.toggleOpen = this.toggleOpen.bind(this)
      this.maybeOuterClick = this.maybeOuterClick.bind(this)
      this.close = this.close.bind(this)
      this.focusSelected = this.focusSelected.bind(this)
      this.getIndexOf = this.getIndexOf.bind(this)
      this.getValueAt = this.getValueAt.bind(this)
      this.getSelectedIndex = this.getSelectedIndex.bind(this)
      this.getSelectedItem = this.getSelectedItem.bind(this)
      this.getLabel = this.getLabel.bind(this)
      this.setSelected = this.setSelected.bind(this)
      this.keyDown = this.keyDown.bind(this)
      this.focusPrevious = this.focusPrevious.bind(this)
      this.selectFocused = this.selectFocused.bind(this)
      this.focusNext = this.focusNext.bind(this)
      this.items = this.items.bind(this)
      this.setFocused = this.setFocused.bind(this)
  }
  componentWillMount() {
    this.uniqueElementId = uniqueElementId++
  }
  componentDidMount() {
    this.domChanged()
  }
  componentDidUpdate() {
    this.domChanged()
  }
  domChanged() {
    if (this.state.keepFocus) {
      this.refs.box.focus()
      this.setState({keepFocus: false})
    }
    if (this.state.isOpen) {
      document.body.addEventListener("click", this.maybeOuterClick)
    } else {
      document.body.removeEventListener("click", this.maybeOuterClick)
    }
  }
  componentWillUnmount() {
    document.body.removeEventListener("click", this.maybeOuterClick)
  }
  toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen,
      keepFocus: true
    })
    this.focusSelected()
  }
  maybeOuterClick(e) {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.close(false)
    }
  }
  close(keepFocus) {
    if (keepFocus !== false) keepFocus = true
    this.setState({isOpen: false, keepFocus: keepFocus})
    this.focusSelected()
  }
  focusSelected() {
    let selectedIndex = this.getSelectedIndex()
    if (selectedIndex < 0) selectedIndex = 0
    this.setFocused(selectedIndex)
  }
  getIndexOf(id) {
    let items = this.items()
    for (let i = 0 ;i < items.length ;i++) {
      if (items[i].props.value === id) {
        return i
      }
    }
    return undefined
  }
  getValueAt(index) {
    if (!this.items()[index]) {
      throw new Error(`Index ${index} is out of range.`)
    }
    return this.items()[index].props.value
  }
  getSelectedIndex() {
    if (typeof this.props.selectedValue === "undefined") {
      return -1
    }
    return this.getIndexOf(this.props.selectedValue)
  }
  getSelectedItem() {
    return this.items()[this.getSelectedIndex()]
  }
  getLabel() {
    const selected = this.getSelectedItem()
    const { isOpen } = this.state
    const { label } = this.props
    if (isOpen) {
      if (label)    return label
      if (selected) return selected.props.label
    } else {
      if (selected) return selected.props.label
      if (label)    return label
    }
    const firstItem = this.items()[0]
    return firstItem && firstItem.props.label
  }
  setSelected(value) {
    this.setState({
      isOpen: false,
      keepFocus: true
    }, () => this.props.onChange(value) )
  }
  setFocused(index) {
    this.setState({focusedIndex: index})
    if (this.props.onSelect) {
      this.props.onSelect(this.getValueAt(index))
    }
  }
  selectFocused() {
    this.setSelected(this.getValueAt(this.state.focusedIndex))
  }
  items() {
    let items = []
    React.Children.forEach(this.props.children, (child) => {
      if (child.type === ComboBoxItemContainer) {
        items.push(child)
      }
    })
    return items
  }
  focusNext() {
    let numItems = this.items().length
    let focusedIndex = (this.state.focusedIndex + 1) % numItems
    this.setFocused(focusedIndex)
  }
  focusPrevious() {
    let numItems = this.items().length
    let focusedIndex = (numItems + this.state.focusedIndex - 1) % numItems
    this.setFocused(focusedIndex)
  }
  keyDown(e) {
    if ([constants.KC_UP, constants.KC_DOWN, constants.KC_RETURN].indexOf(e.keyCode) !== -1) {
      e.preventDefault()
  }
  switch (e.keyCode) {
    case constants.KC_UP:
      if (this.state.isOpen) {
        this.focusPrevious()
      }
      break
      case constants.KC_DOWN:
        if (this.state.isOpen) {
          this.focusNext()
        }
        break
      case constants.KC_RETURN:
        if (this.state.isOpen) {
          this.selectFocused()
        } else {
          this.toggleOpen()
        }
        break
      case constants.KC_ESCAPE:
        this.close()
        break
      case constants.KC_TAB:
        this.close(false)
        break
      default:
    }
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child, index) => {
      if (child.type === ComboBoxItemContainer) {
        return React.cloneElement(child, {
          index: index,
          setSelected: this.setSelected,
          setFocused: this.setFocused,
          focused: index === this.state.focusedIndex,
          key: child.key
        })
      } else {
        return child
      }
    })
  }

  render() {
    let classes = classnames(this.props.className, {
      "combo-box": true,
      "combo-box--open": this.state.isOpen
    })
    let listClasses = classnames({
      "combo-box__list": true,
      "unstyled": true,
      "hidden": !this.state.isOpen
    })
    let elementId = this.props.id || `combo-box-${this.uniqueElementId}`
    let listId = `${elementId}-list`
    let labelId = `${elementId}-label`

    return (
      <div
        id={elementId}
        className={classes}
        onClick={this.toggleOpen}
        onKeyDown={this.keyDown}
        data-capybara={this.props.dataCapybara}
      >
        <div
          ref="box"
          tabIndex="0"
          role="combobox"
          className="combo-box__box"
          aria-readonly="true"
          aria-autocomplete="none"
          aria-labelledby={labelId}
          aria-owns={listId}
        >
          {this.props.labelElement || (
            <span>
              <span className="combo-box__label" aria-hidden="true">
                {this.getLabel()}
              </span>

              <IconComponent iconClassName="gs-arrow-down gs-half combo-box__icon" />
            </span>
          )}
        </div>

        <button tabIndex="-1" className="screenreader-only" aria-controls={listId}>
          {this.props.buttonLabel || "Open Combobox"}
        </button>

        <ul role="listbox" tabIndex="-1" id={listId} className={listClasses} data-capybara={`${this.props.dataCapybara}-list`}>
          {this.renderChildren()}
        </ul>
      </div>
    )
  }
}

ComboBoxContainer.propTypes = {
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    buttonLabel: PropTypes.string,
    selectedValue: PropTypes.number,
    className: PropTypes.string,
    id: PropTypes.string,
    dataCapybara: PropTypes.string,
    label: PropTypes.string,
    labelElement: PropTypes.any,
    children: PropTypes.any
}

export default ComboBoxContainer
