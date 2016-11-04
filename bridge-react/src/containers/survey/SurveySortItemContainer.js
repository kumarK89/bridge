import React,{Component,PropTypes} from 'react';
import SurveySortItemComponent from '../../components/survey/SurveySortItemComponent';
import classnames from 'classnames';

class SurveySortItemContainer extends Component{
	constructor(){
		super();
		this.state = {
			activeSortItem : '',
			sortItemValue : '',
			sortItemLabel : '',
			onSortItemSelect : Function.prototype
		};
	}
	onSelectOfSortItem(sortItem){
		this.setState({
			activeSortItem : sortItem
		});
		this.props.onSortItemSelect(sortItem);
	}
	render(){
		let sortOptions = [{
            value : 'duedate',
            label : "Due Date"
        },{
            value : 'newest',
            label : "Newest"
        },{
            value: "title",
            label: "Alphabetically"
        }];
		
		return(
			<div>
			{   

                sortOptions.map(function(sort) {
                    let isChecked = (this.state.activeSortItem === sort.value)
			        let sortItemclassName = classnames({
			            'sort-selector__item': true,
			            'sort-selector__item--checked brand-color': isChecked
			        });
			        let sortItemLabel = sort.label;
			        let sortItemValue = sort.value;
			        let bindSortItemSelect = this.onSelectOfSortItem.bind(this,sort.value);
                    return <SurveySortItemComponent key={sortItemValue} 
				                         sortItemclassName={sortItemclassName}
				                         sortItemValue={sortItemValue}
				                         sortItemLabel={sortItemLabel}
				                         onSortItemSelect={bindSortItemSelect}/>;                     
                }.bind(this))
            }
            </div>			
		);
	}
}

SurveySortItemContainer.propTypes = {
	activeSortItem : PropTypes.string,
	sortItemValue : PropTypes.string,
	sortItemLabel : PropTypes.string,
	onSortItemSelect : PropTypes.func
};
export default SurveySortItemContainer;