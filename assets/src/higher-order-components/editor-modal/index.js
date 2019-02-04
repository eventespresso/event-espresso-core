/**
 * External Imports
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { isBoolean, isFunction, uniqueId } from 'lodash';
import { Modal } from '@wordpress/components';

/**
 * Internal Imports
 */
import './style.css';

const withEditorModal = ( modalProps ) => ( WrappedComponent ) => {
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
			this.setState( ( prevState ) => ( {
				editorOpen: ! prevState.editorOpen,
			} ) );
		};

		render() {
			modalProps = this.props.modalProps ?
				this.props.modalProps :
				modalProps;
			const {
				title,
				customClass,
				closeButtonLabel,
				...extraModalProps
			} = modalProps;
			const { ...passedProps } = this.props;
			delete passedProps.modalProps;
			let {
				id,
				buttonLabel,
				editorOpen,
				closeModal,
			} = this.props;
			id = id ? id : uniqueId( 'ee-editor-modal-' );
			buttonLabel = buttonLabel ? buttonLabel : closeButtonLabel;
			if ( ! isFunction( closeModal ) ) {
				editorOpen = this.state.editorOpen;
				closeModal = this.closeModal;
			}
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
