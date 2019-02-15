/**
 * External Imports
 */
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import { isBoolean, isFunction, uniqueId } from 'lodash';
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
 * @param {Object} modalProps
 */
const withEditorModal = ( modalProps ) => ( WrappedComponent ) => {
	/**
	 * EditorModal
	 *
	 * @constructor
	 * @param {boolean} editorOpen
	 * @param {string} title
	 * @param {string} customClass
	 * @param {string} buttonLabel
	 * @param {Function} closeModal
	 */
	return class extends Component {
		static propTypes = {
			editorOpen: PropTypes.bool.isRequired,
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
