/**
 * External Imports
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { isBoolean, isFunction, uniqueId } from 'lodash';

/**
 * WordPress Imports
 */
import { Modal } from '@wordpress/components';

const withEditorModal = ( modalProps ) => WrappedComponent => {
	return class extends Component {
		static propTypes = {
			title: PropTypes.string,
			customClass: PropTypes.string,
			buttonLabel: PropTypes.string,
			closeModal: PropTypes.func,
		};

		constructor( props ) {
			super( props );
			this.state = {
				editorOpen: isBoolean( props.editorOpen ) ?
					props.editorOpen :
					false,
			};
		}

		closeModal = () => {
			// console.log( ' #### ' );
			// console.log( 'withEditorModal.toggleEditor())', event );
			// console.log( 'withEditorModal.toggleEditor() key', this.key );
			this.setState( prevState => ( {
				editorOpen: ! prevState.editorOpen,
			} ) );
		};

		render() {
			modalProps = this.props.modalProps ?
				this.props.modalProps :
				modalProps;
			// console.log( 'withEditorModal modalProps', modalProps );
			const {
				title,
				customClass,
				closeButtonLabel,
				...extraModalProps
			} = modalProps;
			const { ...passedProps } = this.props;
			delete passedProps.modalProps;
			// console.log( 'withEditorModal passedProps', passedProps );
			// onUpdate
			let {
				id,
				buttonLabel,
				editorOpen,
				closeModal,
			} = this.props;
			id = id ? id : uniqueId( 'ee-editor-modal-' );
			// console.log( 'withEditorModal key: ' + id + ' editorOpen: ' + editorOpen );
			buttonLabel = buttonLabel ? buttonLabel : closeButtonLabel;
			if ( ! isFunction( closeModal ) ) {
				// console.log( 'withEditorModal use internal state' );
				editorOpen = this.state.editorOpen;
				closeModal = this.closeModal;
			}
			// console.log( 'withEditorModal closeModal', closeModal );
			return editorOpen && (
				<Modal
					id={ id }
					title={ title }
					className={ `ee-editor-modal ${ customClass }` }
					onRequestClose={ closeModal }
					closeButtonLabel={ buttonLabel }
					{ ...extraModalProps }
				>
					<WrappedComponent
						closeModal={ closeModal }
						{ ...passedProps }
					/>
				</Modal>
			);
		}
	};
};

export default withEditorModal;
