/**
 * External imports
 */
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * EntityDetailsPanel
 * big bold responsive display for details like quantities sold, etc
 *
 * @function
 * @param {Array} details    array of detail objects
 * @param {string} htmlClass
 * @return {string}    rendered details
 */
class EntityDetailsPanel extends Component {
	static propTypes = {
		details: PropTypes.arrayOf(
			PropTypes.shape( {
				id: PropTypes.string,
				label: PropTypes.string,
				value: PropTypes.oneOfType( [
					PropTypes.bool,
					PropTypes.number,
					PropTypes.object,
					PropTypes.string,
				] ),
			} ),
		).isRequired,
		htmlClass: PropTypes.string,
	};

	/**
	 * entityDetail
	 *
	 * @function
	 * @param {string} id   	identifier for data item being displayed
	 * @param {string} label   	label for the data item being displayed
	 * @param {string} value    value for the data item being displayed
	 * @return {string}    		rendered details
	 */
	entityDetail = ( { id, label, value } ) => {
		value = value === 'INF' ?
			<span className={ 'ee-infinity-sign' }>&infin;</span> :
			value;
		return (
			<div className={ `ee-entity-details-div ${ id }-div` }>
				<div className={ `ee-entity-details-label-div ${ id }-label` }>
					{ label }
				</div>
				<div className={ `ee-entity-details-value-div ${ id }-value` }>
					{ value }
				</div>
			</div>
		);
	};

	/**
	 * detailsSeparator - a vertical line that separates details
	 *
	 * @function
	 * @return {string} vertical line for separating date details
	 */
	detailsSeparator = () => {
		return <div className="ee-entity-details-separator"></div>;
	};

	render() {
		const { details } = this.props;
		let { htmlClass } = this.props;
		htmlClass = htmlClass ?
			`${ htmlClass } ee-entity-details-panel-div` :
			'ee-entity-details-panel-div';

		return (
			<div className={ htmlClass }>
				{
					details.map(
						( detail, index ) => {
							return (
								<Fragment key={ index }>
									{ this.entityDetail( detail ) }
									{
										index !== details.length - 1 ?
											this.detailsSeparator() :
											null
									}
								</Fragment>
							);
						}
					)
				}
			</div>
		);
	}
}

export default EntityDetailsPanel;
