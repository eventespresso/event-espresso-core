/**
 * External Imports
 */
import { useCallback, useEffect } from '@wordpress/element';
import { uniqueId, flow } from 'lodash';
import { Modal } from '@wordpress/components';

/**
 * Internal Imports
 */
import './style.css';

/**
 * withEditorModal
 * HOC for wrapping a component with a WP Modal component
 *
 * @constructor
 * @param {Object} mainModalProps
 */
const withEditorModal = ( mainModalProps ) => ( WrappedComponent ) => ( {
	editorOpen,
	toggleEditor = () => null,
	doRefresh = () => null,
	modalProps,
	id,
	buttonLabel,
	onClose = () => null,
	onOpen = () => null,
	...passedProps
} ) => {
	useEffect( () => {
		if ( editorOpen ) {
			onOpen();
		}
	}, [ editorOpen, onOpen ] );
	const closeAction = useCallback( () => {
		flow( [ doRefresh, toggleEditor, onClose ] )();
	}, [ toggleEditor, doRefresh, onClose ] );
	modalProps = modalProps ?
		modalProps :
		mainModalProps;
	const {
		title,
		customClass,
		closeButtonLabel,
		...extraModalProps
	} = modalProps;
	id = id ? id : uniqueId( 'ee-editor-modal-' );
	buttonLabel = buttonLabel ? buttonLabel : closeButtonLabel;
	return editorOpen ? (
		<Modal
			id={ id }
			title={ title }
			className={ `ee-editor-modal ${ customClass }` }
			onRequestClose={ closeAction }
			closeButtonLabel={ buttonLabel }
			{ ...extraModalProps }
		>
			<WrappedComponent
				editorOpen={ editorOpen }
				toggleEditor={ toggleEditor }
				{ ...passedProps }
			/>
		</Modal>
	) : null;
};

export default withEditorModal;
