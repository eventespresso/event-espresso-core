/**
 * External imports
 */
import { Children } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * Internal imports
 */
import { default as FormColumn } from './form-column';
import { default as FormRow } from './form-row';

/**
 * AutoColumnRow
 * "two-column-admin" form layout strategy component
 * for automatically generating FormColumns for labels and inputs
 *
 * @function
 * @param {Object} children
 * @param {boolean} offset
 * @param {number|string} colSize
 * @param {string} align
 * @return {Object} rendered form row column
 */
const AutoColumnRow = ( { children } ) => {
	return (
		<FormRow>
			{
				Children.map( children, ( child, index ) => {
					index++;
					if ( index % 2 !== 0 ) {
						const colSize = child.props.labelColSize ?
							child.props.labelColSize :
							3;
						return (
							<FormColumn align="right" colSize={ colSize }>
								{ child }
							</FormColumn>
						);
					}
					const colSize = child.props.colSize ?
						child.props.colSize :
						7;
					return (
						<FormColumn colSize={ colSize }>
							{ child }
						</FormColumn>
					);
				} )
			}
		</FormRow>
	);
};

AutoColumnRow.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.arrayOf( PropTypes.object ),
	] ),
	colSize: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
};

export default AutoColumnRow;
