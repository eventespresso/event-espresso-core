/**
 * ToggleButton
 * Returns a component that can be used to trigger an action like opening or closing a container.
 * The component appears as an icon only but acts like a button.
 *
 * @function
 * @param {string} htmlId               Used to generate an HTML "id" attribute for all components.
 *                                      Additional text is appended by each component.
 * @param {string} htmlClass            Used to generate an HTML "class" attribute for all components.
 *                                      Additional text is appended by each component.
 * @param {string} description          Two or three words (hyphenated) that describe the container
 *                                      that the ToggleButton is associated with.
 * @param {Function} toggleCallback 	Function called when the "button" component is triggered
 * @param {string} dashicon             Css class that defines the dashicon icon
 * @param {Number} tabIndex             tab index for the element that controls when it receives focus
 * @return {Object}                     "button" for opening the modal container
 */
export const ToggleButton = (
	{
		htmlId,
		htmlClass,
		description,
		toggleCallback,
		dashicon = 'no',
		tabIndex = 0,
	}
) => {
	return toggleCallback && (
		<div
			id={ `${ htmlId }-${ description }` }
			className={ `${ htmlClass }-${ description } ee-${ description } ee-toggle-button` }
			onClick={ ( event ) => toggleCallback( event ) }
			onKeyPress={ ( event ) => toggleCallback( event ) }
			role={ 'button' }
			tabIndex={ tabIndex }
		>
			<span className={ `dashicons dashicons-${ dashicon }` }></span>
		</div>
	);
};