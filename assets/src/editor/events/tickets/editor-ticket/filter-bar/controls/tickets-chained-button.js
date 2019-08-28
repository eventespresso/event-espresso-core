/**
 * External imports
 */
import PropTypes from 'prop-types';
import { IconButton } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

/**
 * filter for controlling whether Tickets List is chained to the Dates List
 * if true, then only tickets that are related to the dates in the dates list
 * will appear, otherwise ALL tickets will appear (subject to other filters)
 *
 * @param {boolean} isChained
 * @param {Function} setIsChained
 * @return {Object} rendered control
 */
const TicketsChainedButton = ( { isChained, setIsChained } ) => {
	return useMemo( () => {
		isChained = !! isChained;
		return (
			<IconButton
				label={ isChained ?
					__(
						'showing tickets for above dates only',
						'event_espresso'
					) :
					__(
						'showing tickets for all event dates',
						'event_espresso'
					)
				}
				icon={ isChained ? 'admin-links' : 'editor-unlink' }
				onClick={ () => setIsChained( ! isChained ) }
				value={ isChained }
			/>
		);
	}, [ isChained, setIsChained ] );
};

TicketsChainedButton.propTypes = {
	isChained: PropTypes.bool.isRequired,
	setIsChained: PropTypes.func.isRequired,
};

export default TicketsChainedButton;
