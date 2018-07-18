/**
 * External imports
 */
import { HoverText } from '../hover-text';

/**
 * Internal dependencies
 */
import { ToggleButton } from './toggle-button';

/**
 * ToggleButtonWithHoverText
 * Returns a component that can be used to trigger an action like opening or closing a container.
 * The component appears as an icon only but acts like a button, and is wrapped with HoverText.
 *
 * @function
 * @param {string} hoverText            The text to be displayed when the "button" component is hovered over
 * @param {string} hoverTextPosition 	Where the hover text appears relative to the wrapped component
 * @param {string} htmlId               Used to generate an HTML "id" attribute for all components.
 *                                      Additional text is appended by each component.
 * @param {string} htmlClass            Used to generate an HTML "class" attribute for all components.
 *                                      Additional text is appended by each component.
 * @param {string} description          Two or three words (hyphenated) that describe the container
 *                                      that the ToggleButtonWithHoverText is associated with.
 * @param {Function} toggleCallback 	Function called when the "button" component is triggered
 * @param {string} dashicon             Css class that defines the dashicon icon
 * @param {Number} tabIndex             tab index for the element that controls when it receives focus
 * @return {Object}                     "button" for opening the modal container
 */
export const ToggleButtonWithHoverText = (
	{
		hoverText,
		hoverTextPosition,
		htmlId,
		htmlClass,
		description,
		toggleCallback,
		dashicon,
		tabIndex = 0,
	}
) => {
	return hoverText && toggleCallback && (
		<HoverText
			hoverText={ hoverText }
			htmlId={ htmlId }
			htmlClass={ `ee-toggle-hover-text ${ htmlClass }` }
			description={ description }
			position={ hoverTextPosition }
		>
			<ToggleButton
				htmlId={ htmlId }
				htmlClass={ htmlClass }
				description={ description }
				toggleCallback={ toggleCallback }
				dashicon={ dashicon }
				tabIndex={ tabIndex }
			/>
		</HoverText>
	);
};
