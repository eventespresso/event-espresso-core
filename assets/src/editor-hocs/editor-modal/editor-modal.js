/**
 * External Imports
 */
import classNames from 'classnames';
import { Modal } from '@wordpress/components';
import {
	Children,
	cloneElement,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from '@wordpress/element';
import { __, sprintf } from '@eventespresso/i18n';

/**
 * Internal Imports
 */
import './style.css';
import useCloseEditor from './use-close-editor.js';
import useIsEditorOpen from './use-is-editor-open.js';

const { confirm } = window;
const nullFunc = () => null;

/**
 * EditorModal
 * Wraps a component with a WP Modal component
 *
 * @constructor
 * @param {Object} WrappedComponent
 * @param {string} editorId
 * @param {string} editorTitle
 * @param {string} editorHtmlClass
 * @param {string} editorCloseButtonLabel
 * @param {Function} onEditorOpen
 * @param {Function} onEditorClose
 * @param {string} closeEditorNotice
 * @param {Object} extraModalProps
 * @return {Object} WrappedComponent with Editor Modal
 */
const EditorModal = ( {
	editorId,
	editorTitle,
	editorHtmlClass,
	editorCloseButtonLabel,
	closeEditorNotice,
	onEditorOpen = nullFunc,
	onEditorClose = nullFunc,
	extraModalProps = {},
	children,
	...passedProps
} ) => {
	// ref used for determining when modal has JUST been opened or closed
	// so that we know when to fire onEditorOpen() and onEditorClose()
	const editorOpened = useRef( false );
	const [ changesSaved, setChangesSaved ] = useState( true );
	const isEditorOpen = useIsEditorOpen( editorId );
	const closeEditor = useCloseEditor( editorId );

	// trigger onEditorOpen event
	useEffect( () => {
		// if isEditorOpen was just toggled and is now "true"
		// but editorOpened has not been toggled yet and is still "false"
		// then we know the editor was JUST opened, so call onEditorOpen()
		if ( isEditorOpen && ! editorOpened.current ) {
			if ( typeof onEditorOpen === 'function' ) {
				onEditorOpen();
			}
			editorOpened.current = true;
		}
	}, [ editorId, isEditorOpen, editorOpened.current, onEditorOpen ] );

	// trigger onEditorClose event
	useEffect( () => {
		// then on first render after close,
		// we trigger the onEditorClose() event
		// and then set editorOpened state to false
		if ( ! isEditorOpen && editorOpened.current ) {
			if ( typeof onEditorClose === 'function' ) {
				onEditorClose();
			}
			editorOpened.current = false;
		}
	}, [ editorId, isEditorOpen, editorOpened.current, onEditorClose ] );

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

	const onRequestClose = useCallback( ( click ) => {
		if ( ! changesSaved && closeEditorNotice !== '' ) {
			if ( confirm( closeEditorNotice ) ) {
				closeEditor( click, 'EditorModal.onRequestClose()' );
			}
		} else {
			closeEditor( click, 'EditorModal.onRequestClose()' );
		}
	}, [
		changesSaved,
		closeEditor,
		closeEditorNotice,
	] );

	const htmlClass = classNames( {
		[ editorHtmlClass ]: editorHtmlClass,
		'ee-editor-modal': true,
	} );

	return isEditorOpen ? (
		<Modal
			title={ editorTitle }
			className={ htmlClass }
			onRequestClose={ onRequestClose }
			closeButtonLabel={ editorCloseButtonLabel }
			overlayClassName={ 'ee-editor-modal-overlay' }
			shouldCloseOnEsc={ false }
			shouldCloseOnClickOutside={ false }
			{ ...extraModalProps }
		>
			{
				cloneElement(
					Children.only(
						children,
						{
							isEditorOpen,
							changesSaved: setChangesSaved,
							...passedProps,
						}
					)
				)
			}
		</Modal>
	) : null;
};

export default EditorModal;
