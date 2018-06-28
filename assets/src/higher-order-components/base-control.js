/**
 * WordPress Imports
 */
import { Component, createHigherOrderComponent, compose } from '@wordpress/element';
import { BaseControl, withInstanceId } from '@wordpress/components';

/**
 * External Imports
 */
import { PropTypes } from 'prop-types';

export default ( customId = '' ) => createHigherOrderComponent(
	compose( [
		withInstanceId,
		( WrappedComponent ) => {
			return class extends Component {
				static propTypes = {
					label: PropTypes.string,
					instanceId: PropTypes.oneOfType( [
						PropTypes.number,
						PropTypes.string,
					] ),
					className: PropTypes.string,
					help: PropTypes.string,
				};

				render() {
					const {
						label,
						instanceId,
						className,
						help,
					} = this.props;
					const id = `inspector-${ customId }-control-${ instanceId }`;
					return (
						<BaseControl
							label={ label }
							id={ id }
							className={ className }
							help={ help }
						>
							<WrappedComponent { ...this.props } />
						</BaseControl>
					);
				}
			};
		},
	] ),
	'withBaseControl'
);
