/**
 * External dependencies
 */
import { stringify } from 'querystringify';
import { isUndefined, pickBy, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { __ } from '@eventespresso/i18n';

/**
 * WordPress dependencies
 */
import { Placeholder, SelectControl, Spinner } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { registrationStatusSelectOptions } from './options';

/**
 * RegistrationStatusSelect component.
 * Generates a registration status select input.
 *
 * @param {Array} regStatuses           An empty array or array of Status
 *                                    Entities. See prop-types for shape.
 * @param {function} onRegStatusSelect    The callback on selection of ticket.
 * @param {string} selectLabel        The label for the select input.
 * @param {number} selectedRegStatusId  The ID of the ticket to pre-select.
 * @param {boolean} isLoading            Whether or not the selector should
 *                                    start in a loading state
 * @return {Function}                    A pure component function.
 * @constructor
 */
class RegistrationStatusSelect extends Component {
	static propTypes = {
		regStatuses: PropTypes.arrayOf( PropTypes.shape( {
			STS_ID: PropTypes.number.isRequired,
			STS_code: PropTypes.string.isRequired,
		} ) ),
		onRegStatusSelect: PropTypes.func,
		selectLabel: PropTypes.string,
		selectedRegStatusId: PropTypes.number,
		isLoading: PropTypes.bool,
		addAllOption: PropTypes.bool,
		addAllOptionLabel: PropTypes.string,
		attributes: PropTypes.shape( {
			limit: PropTypes.number,
			orderBy: PropTypes.string,
			order: PropTypes.oneOf( [ 'asc', 'desc' ] ),
		} ),
	};

	static defaultProps = {
		regStatuses: [],
		selectLabel: __( 'Select Registration Status', 'event_espresso' ),
		selectedRegStatusId: 0,
		isLoading: true,
		addAllOption: true,
		addAllOptionLabel: __( 'All Registration Statuses', 'event_espresso' ),
		attributes: {
			limit: 25,
			orderBy: 'STS_code',
			order: 'desc',
		},
	};

	placeHolder() {
		const { isLoading, selectLabel } = this.props;
		return (
			<Fragment>
				<Placeholder
					icon="clipboard"
					label={ selectLabel }
				>
					{ isLoading ?
						<Spinner /> :
						__(
							'Error loading Registration Statuses!',
							'event_espresso',
						)
					}
				</Placeholder>
			</Fragment>
		);
	}

	render() {
		const {
			regStatuses,
			selectLabel,
			selectedRegStatusId,
			onRegStatusSelect,
			addAllOption,
			addAllOptionLabel,
		} = this.props;
		if ( isEmpty( regStatuses ) ) {
			return this.placeHolder();
		}
		return (
			<Fragment>
				<SelectControl
					label={ selectLabel }
					value={ selectedRegStatusId }
					options={
						registrationStatusSelectOptions(
							regStatuses,
							addAllOption,
							addAllOptionLabel,
						)
					}
					onChange={ onRegStatusSelect }
				/>
			</Fragment>
		);
	}
}

/**
 * The RegistrationStatusSelect Component wrapped in the `withSelect` higher
 * order component. This subscribes the RegistrationStatusSelect component to
 * the state maintained via the eventespresso/lists store.
 */
export default withSelect( ( select, ownProps ) => {
	const {
		attributes = RegistrationStatusSelect.defaultProps.attributes,
	} = ownProps;
	const {
		selectedRegStatusId,
		addAllOption,
		addAllOptionLabel,
	} = ownProps;
	const {
		getRegistrationStatuss,
		isRequestingRegistrationStatuss,
	} = select( 'eventespresso/lists' );
	const queryArgs = {
		limit: attributes.limit,
		order: attributes.order,
		order_by: attributes.orderBy,
	};
	const queryString = stringify( pickBy( queryArgs,
		value => ! isUndefined( value ),
	) );
	return {
		regStatuses: getRegistrationStatuss( queryString ),
		isLoading: isRequestingRegistrationStatuss( queryString ),
		selectedRegStatusId: selectedRegStatusId,
		addAllOption: addAllOption,
		addAllOptionLabel: addAllOptionLabel,
	};
} )( RegistrationStatusSelect );
