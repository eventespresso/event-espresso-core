/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	createBlock,
	getBlockType,
	registerBlockType,
} from '@wordpress/blocks';
import { BlockEdit } from '@wordpress/editor';

/**
 * copy of `/gutenberg/packages/block-library/src/test/helpers/index.js`
 * but using shallow rendering
 *
 * @param {string} name
 * @param {string} settings
 * @return {string} the rendered edit block
 */
export const blockEditRender = ( name, settings ) => {
	if ( ! getBlockType( name ) ) {
		registerBlockType( name, settings );
	}
	const block = createBlock( name );

	return shallow(
		<BlockEdit
			name={ name }
			isSelected={ false }
			attributes={ block.attributes }
			setAttributes={ noop }
			user={ {} }
		/>,
	);
};
