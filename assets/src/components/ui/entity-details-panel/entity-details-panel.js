/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.css';
import DetailsSeparator from './details-separator';
import EntityDetail from './entity-detail';

/**
 * EntityDetailsPanel
 * big bold responsive display for details like quantities sold, etc
 *
 * @function
 * @param {Array} details    array of detail objects
 * @param {string} htmlClass
 * @return {Component}    rendered details
 */
const EntityDetailsPanel = ( { details, htmlClass } ) => {
	htmlClass = classNames( htmlClass, 'ee-entity-details-panel-div' );
	return (
		<div className={ htmlClass }>
			{
				details.map(
					( detail, index ) => {
						return (
							<Fragment key={ index }>
								<EntityDetail { ...detail } />
								<DetailsSeparator
									last={ index === details.length - 1 }
								/>
							</Fragment>
						);
					}
				)
			}
		</div>
	);
};

EntityDetailsPanel.propTypes = {
	details: PropTypes.arrayOf( PropTypes.object ).isRequired,
	htmlClass: PropTypes.string,
};

export default EntityDetailsPanel;
