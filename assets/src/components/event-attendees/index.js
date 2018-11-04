/**
 * External dependencies
 */
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { mapReducer } from '@eventespresso/helpers';

/**
 * Internal Imports
 */
import AttendeeListItem from './attendee-list-item';
import './style.css';

export default class EventAttendeeList extends Component {
	static propTypes = {
		isLoading: PropTypes.bool,
		attendees: PropTypes.instanceOf( Map ),
		showGravatar: PropTypes.bool,
		containerCssClass: PropTypes.string,
	};

	static defaultProps = {
		attendees: new Map(),
		showGravatar: false,
		containerCssClass: '',
		isLoading: false,
	};

	getAttendeeList() {
		const { attendees, showGravatar, isLoading } = this.props;
		if ( isEmpty( attendees ) ) {
			return '';
		}

		const reducerCallback = ( items, attendee ) => {
			items.push( <AttendeeListItem
				attendee={ attendee }
				showGravatar={ showGravatar }
				isLoading={ isLoading }
				{ ...this.props }
			/> );
			return items;
		};
		const listItems = mapReducer( attendees, reducerCallback, [] );
		return (
			<ul>
				{ listItems }
			</ul>
		);
	}

	render() {
		const { containerCssClass } = this.props;
		return (
			<div
				id={ 'ee-block-event-attendees' }
				className={
					classNames(
						containerCssClass,
						'event-attendees',
					)
				}
			>
				{ this.getAttendeeList() }
			</div>
		);
	}
}
