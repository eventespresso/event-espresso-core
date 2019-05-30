/**
 * External imports
 */
import warning from 'warning';
import PropTypes from 'prop-types';
import { Component } from '@wordpress/element';
import { IconButton } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';
import { isModelEntity } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import './style.css';

const lockPositions = [
	'top left',
	'top center',
	'top right',
	'middle right',
	'bottom right',
	'bottom center',
	'bottom left',
	'middle left',
];

/**
 * EntityLock
 * Component for displaying an Event Date as a visual block in grid views
 *
 * @function
 * @param {Object} date    JSON object defining the Event Date
 */
class EntityLock extends Component {
	static propTypes = {
		entity: PropTypes.object.isRequired,
		isLocked: PropTypes.bool.isRequired,
		toggleEntityLock: PropTypes.func.isRequired,
		position: PropTypes.oneOf( lockPositions ),
	};

	static defaultProps = {
		position: 'top left',
	};

	constructor( props ) {
		super( props );
		this.toggleEntityLock = props.toggleEntityLock;
		this.state = {
			locking: null,
		};
	}

	/**
	 * @function
	 * @param {Object} entity model object to lock
	 */
	toggleLock = async ( entity ) => {
		this.setState( { locking: entity.id } );
		await this.toggleEntityLock( entity );
		this.setState( { locking: null } );
	};

	/**
	 * @function
	 * @param {string} position potential lock position
	 * @return {string} valid lock position
	 */
	lockPosition = ( position ) => {
		return lockPositions.indexOf( position ) !== -1 ?
			position :
			'top left';
	};

	/**
	 * there are 8 possible lock positions and we want the labels
	 * to appear on the opposite side of the lock position.
	 * for example: if the lock is positioned in the top left,
	 * then we want the label to be positioned in the bottom right
	 * this can easily be achieved by offsetting the index by 4
	 *
	 * @function
	 * @param {string} position lock position
	 * @return {string} label position
	 */
	labelPosition = ( position ) => {
		const index = lockPositions.indexOf( position );
		let labelIndex = index + 4;
		labelIndex = lockPositions.indexOf( lockPositions[ labelIndex ] );
		return labelIndex !== -1 ?
			lockPositions[ labelIndex ] :
			lockPositions[ index - 4 ];
	};

	render() {
		const {
			entity,
			isLocked,
			position,
		} = this.props;
		warning(
			isModelEntity( entity ),
			'the supplied entity is invalid and can not be locked'
		);
		const lockPosition = this.lockPosition( position );
		let htmlClass = 'ee-entity-lock-button',
			icon, label;
		htmlClass += ` ee-position-${ lockPosition.replace( ' ', '-' ) }`;
		if ( isLocked ) {
			htmlClass += ' ee-is-locked';
			icon = 'lock';
			label = __(
				'this entity is locked and can not be edited - click to' +
				' unlock',
				'event_espresso'
			);
		} else {
			htmlClass += ' ee-not-locked';
			icon = 'unlock';
			label = __(
				'click to lock this entity and prevent editing',
				'event_espresso'
			);
		}
		if ( entity.id === this.state.locking ) {
			htmlClass += ' ee-updating-lock';
			icon = 'update';
		}
		return (
			<IconButton
				className={ htmlClass }
				icon={ icon }
				label={ label }
				labelPosition={ this.labelPosition( lockPosition ) }
				onClick={ () => this.toggleLock( entity ) }
			/>
		);
	}
}

export default EntityLock;
