import classNames from 'classnames';
import { Children } from 'react';
import { castArray, filter, first, isArray, isEmpty, isFunction, last, reject } from 'lodash';

export const getChildren = (props) => {
	return props.hasOwnProperty('children') && Children.count(props.children) ? Children.toArray(props.children) : [];
};

const filterChildren = (children, predicate) => {
	children = isArray(children) && !isEmpty(children) ? children : getChildren(children);
	return isFunction(predicate) ? filter(children, predicate) : children;
};

export const getFirstChild = (children) => {
	return filterChildren(children, first);
};

export const getLastChild = (children) => {
	return filterChildren(children, last);
};

export const getTableHeader = (children) => {
	children = filterChildren(children, isTableHeader);
	return first(children);
};

export const getTableFooter = (children) => {
	children = filterChildren(children, isTableFooter);
	return first(children);
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
	element = isArray(element) && !isEmpty(element) ? first(element) : element;
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

export const isArrayOfTableCells = (elements) => {
	elements = castArray(elements);
	let allAreCells = true;
	elements.forEach((cell) => {
		allAreCells = isTableHeaderCell(cell) || isTableDataCell(cell) ? allAreCells : false;
	});
	return allAreCells;
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

/**
 * toggles display of start and end date columns
 * based on incoming value of showDate
 *
 * @function
 * @param {Array} columns
 * @param {string} exclude table row cell "key"
 * @return {Array} columns
 */
export const filterColumnsByKey = (columns, exclude) => {
	if (!Array.isArray(columns)) {
		return columns;
	}
	return exclude ? reject(columns, ['key', exclude]) : columns;
};
