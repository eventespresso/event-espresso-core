/**
 * External imports
 */
import {
	compose,
	createHigherOrderComponent,
	withInstanceId,
} from '@wordpress/compose';
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * withEntityPaperFrame
 * Higher-Order-Component that wraps an "entity" component
 * with an EntityPaperFrame component that adds a styled frame
 * that gives the appearance of a piece of paper on a surface
 *
 * @return {Object} Entity with added EntityPaperFrame
 */
export default createHigherOrderComponent(
	compose( [
		withInstanceId,
		( Entity ) => {
			return class EntityPaperFrame extends Component {
				render() {
					const {
						instanceId,
						...otherProps
					} = this.props;
					return (
						<div id={ `ee-entity-paper-frame-${ instanceId }` }
							 className="ee-entity-paper-frame-wrapper"
						>
							<div className="ee-entity-paper-frame">
							</div>
							<div className="ee-entity-wrapper">
								<Entity { ...otherProps } />
							</div>
						</div>
					);
				}
			};
		},
	] ),
	'withEntityPaperFrame'
);
