/**
 * External Imports
 */
import classNames from 'classnames';
import { flow } from 'lodash';
import { Modal } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useCallback, useEffect } from '@wordpress/element';

/**
 * Internal Imports
 */
import './style.css';

const nullFunc = () => null;

/**
 * withEditorModal
 * HOC for wrapping a component with a WP Modal component
 *
 * @constructor
 * @param {Object} mainModalProps
 */
const withEditorModal = createHigherOrderComponent(
	( mainModalProps ) => ( WrappedComponent ) => ( {
		editorOpen,
		modalProps,
		buttonLabel,
		onOpen = nullFunc,
		onClose = nullFunc,
		doRefresh = nullFunc,
		toggleEditor = nullFunc,
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
		buttonLabel = buttonLabel ? buttonLabel : closeButtonLabel;
		const htmlClass = classNames( {
			[ customClass ]: customClass,
			'ee-editor-modal': true,
		} );
		return editorOpen ? (
			<Modal
				title={ title }
				className={ htmlClass }
				onRequestClose={ closeAction }
				closeButtonLabel={ buttonLabel }
				overlayClassName={ 'ee-editor-modal-overlay' }
				{ ...extraModalProps }
			>
				<WrappedComponent
					editorOpen={ editorOpen }
					toggleEditor={ toggleEditor }
					{ ...passedProps }
				/>
			</Modal>
		) : null;
	},
	'withEditorModal'
);

export default withEditorModal;
