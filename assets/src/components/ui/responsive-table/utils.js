/**
 * External imports
 */
import {
	castArray,
	filter,
	first,
	isArray,
	isEmpty,
	isFunction,
	last,
} from 'lodash';
import { Children } from '@wordpress/element';

export const getChildren = ( props ) => {
	return props.hasOwnProperty( 'children' ) &&
	Children.count( props.children ) ?
		Children.toArray( props.children ) :
		[];
	;
};

const filterChildren = ( children, predicate ) => {
	children = isArray( children ) && ! isEmpty( children ) ?
		children :
		getChildren( children );
	console.log( ' > filterChildren() ', children );
	return isFunction( predicate ) ? filter( children, predicate ) : children;
};

export const getFirstChild = ( children ) => {
	return filterChildren( children, first )
};

export const getLastChild = ( children ) => {
	return filterChildren( children, last )
};

export const getTableHeader = ( children ) => {
	children = filterChildren( children, isTableHeader );
	return first( children );
};

export const getTableFooter = ( children ) => {
	children = filterChildren( children, isTableFooter );
	return first( children );
};

export const getTableRows = ( children ) => {
	return filterChildren( children, isTableRow );
};

export const getTableRowCells = ( children ) => {
	return filterChildren( children, ( child ) => {
		return isTableHeadingCell( child ) || isTableDataCell( child );
	} );
};

const isElement = ( element, name ) => {
	element = isArray( element ) && ! isEmpty( element ) ?
		first( element ) :
		element;
	return element &&
		element.type &&
		element.type.name &&
		element.type.name === name;
};

export const isTableHeader = ( element ) => {
	return isElement( element, 'TableHeader' );
};

export const isTableBody = ( element ) => {
	return isElement( element, 'TableBody' );
};


export const isTableFooter = ( element ) => {
	return isElement( element, 'TableFooter' );
};

export const isTableRow = ( element ) => {
	return isElement( element, 'TableRow' );
};

export const isArrayOfTableCells = ( elements ) => {
	elements = castArray( elements );
	let allAreCells = true;
	elements.forEach( ( cell ) => {
		allAreCells = isTableHeadingCell( cell ) || isTableDataCell( cell ) ?
			allAreCells :
			false;
	} );
	return allAreCells;
};

export const isTableHeadingCell = ( element ) => {
	return isElement( element, 'TableHeadingCell' );
};

export const isTableDataCell = ( element ) => {
	return isElement( element, 'TableDataCell' );
};
