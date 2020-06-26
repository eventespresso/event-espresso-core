import classNames from 'classnames';
import { Children } from 'react';
import { head, isEmpty, last } from 'ramda';

export const getChildren = (props) => {
	return props.hasOwnProperty('children') && Children.count(props.children) ? Children.toArray(props.children) : [];
};

const filterChildren = (children, predicate) => {
	const newChildren = Array.isArray(children) && !isEmpty(children) ? [...children] : [...getChildren(children)];

	return typeof predicate === 'function' ? newChildren.filter(predicate) : newChildren;
};

export const getFirstChild = (children) => {
	return filterChildren(children, head);
};

export const getLastChild = (children) => {
	return filterChildren(children, last);
};

export const getTableHeader = (children) => {
	children = filterChildren(children, isTableHeader);
	return head(children);
};

export const getTableFooter = (children) => {
	children = filterChildren(children, isTableFooter);
	return head(children);
};

export const getTableRows = (children) => {
	return filterChildren(children, isTableRow);
};

export const getTableRowCells = (children) => {
	return filterChildren(children, (child) => {
		return isTableHeaderCell(child) || isTableDataCell(child);
	});
};

const isElement = (element, name) => {
	element = Array.isArray(element) && !isEmpty(element) ? head(element) : element;
	return element && element.type && element.type.name && element.type.name === name;
};

export const isTableHeader = (element) => {
	return isElement(element, 'TableHeader');
};

export const isTableBody = (element) => {
	return isElement(element, 'TableBody');
};

export const isTableFooter = (element) => {
	return isElement(element, 'TableFooter');
};

export const isTableRow = (element) => {
	return isElement(element, 'TableRow');
};

export const isTableHeaderCell = (element) => {
	return isElement(element, 'TableHeaderCell');
};

export const isTableDataCell = (element) => {
	return isElement(element, 'TableDataCell');
};

/**
 * adds 'ee-zebra-stripe-on-mobile' css class to every other table cell
 * except those whose table row cell "key" is in the exclude array
 */
export const addZebraStripesOnMobile = (exclude) => (cells) => {
	let x = 0;

	return cells.map((cell) => {
		if (!cell.key || exclude.indexOf(cell.key) > -1) {
			return cell;
		}

		x++;

		if (x % 2 === 0) {
			cell.className = classNames(cell.className, 'ee-zebra-stripe-on-mobile');
		}

		return cell;
	});
};
