/**
 * Internal dependencies
 */
import './style.css';

export const HOVER_TEXT_POSITION_TOP_LEFT = 'top-left';
export const HOVER_TEXT_POSITION_TOP_RIGHT = 'top-right';
export const HOVER_TEXT_POSITION_BOTTOM_LEFT = 'bottom-left';
export const HOVER_TEXT_POSITION_BOTTOM_RIGHT = 'bottom-right';

/**
 * HoverText
 * Adds a text element that is only displayed when the wrapped component (children) is hovered over
 *
 * @function
 * @param {string} htmlId       Used to generate an HTML "id" attribute. "-hover-text" is appended.
 * @param {string} htmlClass    Used to generate an HTML "class" attribute. "-hover-text" is appended.
 * @param {string} hoverText    The actual text to be displayed when the child entity is hovered over
 * @param {string} description  Two or three words (hyphenated) that describe the component
 *                              that the hover text is being added to
 * @param {string} position     Where the hover text appears relative to the wrapped component
 * @param {string} children     The child entity that gets wrapped with the hover elements
 * @return {string}             The child entity wrapped with the hover elements
 */
export const HoverText = ( { htmlId, htmlClass, hoverText, description, position, children } ) => {
	position = position ?
		position :
		HOVER_TEXT_POSITION_TOP_RIGHT;
	const pointerCharCodes = {};
	pointerCharCodes[ HOVER_TEXT_POSITION_TOP_LEFT ] = 9701;
	pointerCharCodes[ HOVER_TEXT_POSITION_TOP_RIGHT ] = 9700;
	pointerCharCodes[ HOVER_TEXT_POSITION_BOTTOM_LEFT ] = 9698;
	pointerCharCodes[ HOVER_TEXT_POSITION_BOTTOM_RIGHT ] = 9699;
	return hoverText && (
		<div
			id={ `${ htmlId }-${ description }-hover-text` }
			className={ `${ htmlClass }-${ description }-hover-text ee-hover-text-position-${ position } ee-${ description } ee-hover-text` }
		>
			<div className="ee-hover-text-content">
				{ children }
			</div>
			<div className={ 'ee-hover-text-notice-wrapper' }>
				<div className="ee-hover-text-notice ee-small-shadow">
					<span className={ 'ee-hover-text-text' }>
						{ hoverText }
					</span>
					<span className={ 'ee-hover-text-pointer ee-small-text-shadow' }>
						{ String.fromCharCode( pointerCharCodes[ position ] ) }
					</span>
				</div>
			</div>
		</div>
	);
};
