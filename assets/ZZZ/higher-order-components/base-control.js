/**
 * WordPress Imports
 */
import {
	compose,
	createHigherOrderComponent,
	withInstanceId,
} from '@wordpress/compose';
import { BaseControl } from '@wordpress/components';

/**
 * External Imports
 */
import PropTypes from 'prop-types';

export default ( customId = '' ) => createHigherOrderComponent(
	compose( [
		withInstanceId,
		( WrappedComponent ) => {
			const HOC = ( props ) => {
				const {
					label,
					instanceId,
					className,
					help,
				} = props;
				const id = `inspector-${ customId }-control-${ instanceId }`;
				return (
					<BaseControl
						label={ label }
						id={ id }
						className={ className }
						help={ help }
					>
						<WrappedComponent { ...props } label={ '' } id={ id } />
					</BaseControl>
				);
			};
			HOC.propTypes = {
				label: PropTypes.string,
				instanceId: PropTypes.oneOfType( [
					PropTypes.number,
					PropTypes.string,
				] ),
				className: PropTypes.string,
				help: PropTypes.string,
			};

			HOC.defaultProps = {
				label: WrappedComponent.defaultProps &&
					WrappedComponent.defaultProps.label ?
					WrappedComponent.defaultProps.label :
					'',
			};
			return HOC;
		},
	] ),
	'withBaseControl'
);
