/**
 * USAGE:
 *
 * A React component for adding a WordPress Range Control input
 * for setting a query's limit clause
 *
 * Step 1: import the following external dependencies:
 *
 * 		import { __ } from '@eventespresso/i18n';
 * 		import { QueryLimit } from '@eventespresso/components';
 * 		import { PanelBody } from '@wordpress/components';
 * 		import { InspectorControls } from '@wordpress/editor';
 *
 * Step 2: add a "limit" attribute:
 *
 * 		attributes: {
 * 		  	limit: {
 * 		  		type: 'number',
 * 		  		default: 5, (10 is already set as default)
 * 		  	},
 * 		},
 *
 * Step 3: wrap the QueryLimit component within
 * the InspectorControls and PanelBody components
 * (currently shown within a block's edit() function)
 *
 * 		edit: ( ( { attributes, setAttributes } ) => {
 * 			const { limit } = attributes;
 * 			return (
 * 				<InspectorControls>
 * 		  			<PanelBody>
 * 		  				<QueryLimit
 * 		  					limit={ limit }
 * 		  					onLimitChange={
 * 		  						( value ) => setAttributes( { limit: value } )
 * 		  					}
 * 		  				/>
 * 		  			</PanelBody>
 * 		  		</InspectorControls>
 * 		  	);
 * 		}),
 */

/**
 * External dependencies
 */
import React from 'react';
import { __ } from '@eventespresso/i18n';

/**
 * WordPress dependencies
 **/
import { RangeControl } from '@wordpress/components';

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 100;

export const QueryLimit = ( {
	onLimitChange,
	limit = 10,
	label = __( 'Limit', 'event_espresso' ),
	min = DEFAULT_MIN,
	max = DEFAULT_MAX,
} ) => {
	return onLimitChange && (
		<RangeControl
			key={ 'query-limit' }
			value={ limit }
			label={ label }
			min={ min }
			max={ max }
			onChange={ onLimitChange }
		/>
	)
};
