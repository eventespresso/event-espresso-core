/**
 * External imports
 */
import { Component } from 'react';
import { isArray } from 'lodash';

/**
 * Internal dependencies
 */
import './style.css';
import { EditorDate } from './editor-date';

/**
 * EditorDates 	Displays dates as mobile and finger friendly blocks with the most relevant info visible
 *
 * @function
 * @param {Array} eventDates 	array of JSON objects defining the Event Dates
 * @return {Component}          list of rendered Event Dates
 */
export class EditorDates extends Component {
	render() {
		const { eventDates } = this.props;
		// console.log( '' );
		// console.log( 'EditorDates eventDates:', eventDates );
		if ( ! isArray( eventDates ) ) {
			return null;
		}
		const dates = eventDates.map(
			function( eventDate ) {
				return <li key={ eventDate.id }><EditorDate eventDate={ eventDate } /></li>;
			}
		);
		return <ul>{ dates }</ul>;
	}
}
