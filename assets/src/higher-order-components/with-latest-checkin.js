/**
 * External imports
 */
import { withSelect, withDispatch } from '@wordpress/data';
import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Exposes properties related to the latest check-in entity for a given
 * registration and datetime.
 *
 * Properties passed through to wrapped component are:
 *
 * - checkInEntity {BaseEntity|null} The check-in entity that is related to the
 * given registration and datetime id.
 * - hasResolvedCheckin {boolean} Whether the check-in entity selector has
 * resolved.  This is important because its possible there is no entity for
 * this registration and datetime if that registration hasn never been checked
 * in.
 * - onClick {function} A click handler which when invoked, will toggle the
 * check-in state for the given registration and datetimeId. Note: this will
 * replace the store latestCheckin record in the state for this given
 * registration and datetime id which will get picked up by the `withSelect`
 * HOC in the composed component.
 *
 * @type {WPComponent}
 */
const withLatestCheckin = createHigherOrderComponent(
	compose( [
		withSelect(
			( select, { registration, datetimeId } ) => {
				if ( ! isModelEntityOfModel(
					registration,
					'registration'
				) ) {
					return {};
				}
				const { getLatestCheckin } = select( 'eventespresso/core' );
				const { hasFinishedResolution } = select( 'core/data' );
				return {
					checkinEntity: getLatestCheckin( registration.id, datetimeId ),
					hasResolvedCheckin: hasFinishedResolution(
						'eventespresso/core',
						'getLatestCheckin',
						[ registration.id, datetimeId ]
					),
				};
			}
		),
		withDispatch(
			( dispatch, { registration, datetimeId } ) => {
				const { toggleCheckin } = dispatch( 'eventespresso/core' );
				return {
					onClick() {
						if (
							isModelEntityOfModel(
								registration,
								'registration'
							)
						) {
							toggleCheckin( registration.id, datetimeId );
						}
					},
				};
			}
		),
	] ),
	'withLatestCheckin'
);

export default withLatestCheckin;
