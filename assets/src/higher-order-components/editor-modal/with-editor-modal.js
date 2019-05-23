/**
 * External Imports
 */
import { useCallback } from '@wordpress/element';
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
const withEditorModal = ( mainModalProps ) => ( WrappedComponent ) =>
	( {
		editorOpen,
		toggleEditor,
		doRefresh = () => null,
		modalProps,
		id,
		buttonLabel,
		...passedProps
	} ) => {
		const closeAction = useCallback( () => {
			flow( [ doRefresh, toggleEditor ] )();
		}, [ toggleEditor, doRefresh ] );
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
