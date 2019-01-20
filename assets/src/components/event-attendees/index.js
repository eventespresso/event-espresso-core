/**
 * External dependencies
 */
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import cuid from 'cuid';

/**
 * Internal Imports
 */
import AttendeeListItem from './attendee-list-item';
import './style.css';

export default class EventAttendeeList extends Component {
	static propTypes = {
		isLoading: PropTypes.bool,
		attendees: PropTypes.array,
		showGravatar: PropTypes.bool,
		containerCssClass: PropTypes.string,
		containerId: PropTypes.string,
	};

	static defaultProps = {
		attendees: [],
		showGravatar: false,
		containerCssClass: '',
		containerId: 'event-attendees-list',
		isLoading: false,
	};

	getAttendeeList() {
		const { attendees, showGravatar, isLoading } = this.props;
		if ( isEmpty( attendees ) ) {
			return '';
		}
		const listItems = attendees.map(
			( attendee ) => {
				return <AttendeeListItem
					key={ attendee.id || cuid() }
					attendee={ attendee }
					showGravatar={ showGravatar }
					isLoading={ isLoading }
					{ ...this.props }
				/>;
			}
		);
		return (
			<ul>
				{ listItems }
			</ul>
		);
	}

	render() {
		const { containerCssClass, containerId } = this.props;
		return (
			<div
				id={ containerId }
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
