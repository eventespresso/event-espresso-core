/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.css';
import InlineEditInput from '../../form/inputs/inline-edit-input';

/**
 * entity-detail
 *
 * @function
 * @param {string} id   		identifier for data item being displayed
 * @param {string} label   		label for the data item being displayed
 * @param {number|string} 		value value for the data item being
 *     displayed
 * @param {string} htmlClass 	optional css class for data item
 * @param {Object} editable 	InlineEditInput parameters
 * @return {string}    			rendered details
 */
const EntityDetail = ( {
	id,
	label,
	value,
	htmlClass = '',
	editable = {}
} ) => {
	const detailValue = editable.hasOwnProperty( 'type' ) ?
		<InlineEditInput
			htmlId={ id }
			value={ value }
			{ ...editable }
		/> :
		value;
	return (
		<div
			className={ `ee-entity-details-div ${ id }-div ${ htmlClass }` }>
			<div className={ `ee-entity-details-label-div ${ id }-label` }>
				{ label }
			</div>
			<div className={ `ee-entity-details-value-div ${ id }-value` }>
				{ detailValue }
			</div>
		</div>
	);
};

EntityDetail.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType( [
		PropTypes.bool,
		PropTypes.number,
		PropTypes.object,
		PropTypes.string,
	] ).isRequired,
	htmlClass: PropTypes.string,
	editable: PropTypes.shape( {
		onChange: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
	} ),
};

export default EntityDetail;
