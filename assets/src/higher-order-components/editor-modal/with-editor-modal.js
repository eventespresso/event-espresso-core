/**
 * External Imports
 */
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
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
	 * @param {Function} toggleEditor
	 */
	return class extends Component {
		static propTypes = {
			editorOpen: PropTypes.bool.isRequired,
			toggleEditor: PropTypes.func.isRequired,
			title: PropTypes.string,
			customClass: PropTypes.string,
			buttonLabel: PropTypes.string,
		};

		render() {
			const { editorOpen, toggleEditor } = this.props;
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
			} = this.props;
			id = id ? id : uniqueId( 'ee-editor-modal-' );
			buttonLabel = buttonLabel ? buttonLabel : closeButtonLabel;
			return editorOpen ? (
				<Modal
					id={ id }
					title={ title }
					className={ `ee-editor-modal ${ customClass }` }
					onRequestClose={ toggleEditor }
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
		}
	};
};

export default withEditorModal;
