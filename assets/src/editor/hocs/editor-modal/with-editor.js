/**
 * External imports
 */
import { useCallback, useMemo, useState } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __, sprintf } from '@eventespresso/i18n';

const { confirm } = window;

/**
 * withEditor
 * controls toggling of the withEditorModal HOC
 * wraps the component that contains the withEditorModal
 *
 * @function
 * @param {string} closeEditorNotice 	message displayed if user attempts
 * 										to close modal when changes are not
 * 										yet saved. To override the appearance
 * 										of the closeEditorNotice, simply pass
 * 										an empty string for this prop
 */
const withEditor = createHigherOrderComponent(
	( WrappedComponent ) =>
		( { closeEditorNotice, ...otherProps } ) => {
			const [ editorOpen, setEditorOpen ] = useState( false );
			const [ changesSaved, setChangesSaved ] = useState( true );

			closeEditorNotice = useMemo(
				() => closeEditorNotice !== undefined ?
					closeEditorNotice :
					sprintf(
						__(
							'Are you sure you want to close the Editor?%sAll unsaved changes will be lost!',
							'event_espresso'
						),
						'\n\n'
					),
				[ closeEditorNotice ]
			);

			/**
			 * opens and closes withEditorModal
			 *
			 * @function
			 * @param {Object} event - click event
			 */
			const toggleEditor = useCallback(
				( event ) => {
					if ( event && event.preventDefault ) {
						event.preventDefault();
						event.stopPropagation();
					}
					if (
						closeEditorNotice !== '' &&
						editorOpen && ! changesSaved
					) {
						setEditorOpen( ! confirm( closeEditorNotice ) );
					} else {
						setEditorOpen( ! editorOpen );
					}
				},
				[ editorOpen, setEditorOpen, changesSaved, closeEditorNotice ]
			);

			return (
				<WrappedComponent
					{ ...otherProps }
					editorOpen={ editorOpen }
					toggleEditor={ toggleEditor }
					changesSaved={ setChangesSaved }
				/>
			);
		},
	'withEditor'
);

export default withEditor;
