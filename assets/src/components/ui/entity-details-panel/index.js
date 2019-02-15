/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component, Fragment } from '@wordpress/element';
import { isEmpty, isFunction } from 'lodash';

/**
 * Internal dependencies
 */
import './style.css';
import { InlineEditInput } from '../../form/inputs/inline-edit-input';

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
				id: PropTypes.string.isRequired,
				label: PropTypes.string.isRequired,
				value: PropTypes.oneOfType( [
					PropTypes.bool,
					PropTypes.number,
					PropTypes.object,
					PropTypes.string,
				] ).isRequired,
				editable: PropTypes.shape( {
					onChange: PropTypes.func.isRequired,
					placeholder: PropTypes.string,
				} ),
			} ),
		).isRequired,
		htmlClass: PropTypes.string,
	};

	/**
	 * entityDetail
	 *
	 * @function
	 * @param {string} id   		identifier for data item being displayed
	 * @param {string} label   		label for the data item being displayed
	 * @param {number|string} value value for the data item being displayed
	 * @param {Object} editable 	InlineEditInput parameters
	 * @return {string}    			rendered details
	 */
	entityDetail = ( { id, label, value, editable = {} } ) => {
		value = value === 'INF' || value === Infinity ?
			<span className={ 'ee-infinity-sign' }>&infin;</span> :
			value;
		value = ! isEmpty( editable ) ?
			<InlineEditInput
				htmlId={ id }
				value={ value }
				{ ...editable }
			/> :
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
		return (
			<div role="separator"
				className="ee-entity-details-separator"
			></div>
		);
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
