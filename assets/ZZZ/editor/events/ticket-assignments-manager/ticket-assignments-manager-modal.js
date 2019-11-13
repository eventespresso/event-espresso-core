/**
 * External imports
 */
import PropTypes from 'prop-types';
import { EditorModal } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import TicketAssignmentsManager from './ticket-assignments-manager';

/**
 * withTicketAssignmentsManagerModal
 * controls toggling of the modal
 * wraps the component that adds the TicketAssignmentsManager
 *
 * @param {string} editorId
 * @param {string} editorTitle
 * @param {string} editorHtmlClass
 * @param {string} editorCloseButtonLabel
 * @param {Function} onEditorOpen
 * @param {Function} onEditorClose
 * @param {Object} otherProps
 * @return {Object} rendered Ticket Assignments Manager with EditorModal
 */
const TicketAssignmentsManagerModal = ( {
	editorId,
	editorTitle,
	editorHtmlClass,
	editorCloseButtonLabel,
	onEditorOpen,
	onEditorClose,
	...otherProps
} ) => {
	return (
		<EditorModal
			editorId={ editorId }
			editorTitle={ editorTitle }
			editorHtmlClass={
				editorHtmlClass || 'ee-ticket-assignments-manager-modal'
			}
			editorCloseButtonLabel={
				editorCloseButtonLabel || __(
					'close ticket assignments manager',
					'event_espresso'
				)
			}
			onEditorOpen={ onEditorOpen }
			onEditorClose={ onEditorClose }
		>
			<TicketAssignmentsManager
				editorId={ editorId }
				{ ...otherProps }
			/>
		</EditorModal>
	);
};

TicketAssignmentsManagerModal.propTypes = {
	editorId: PropTypes.string.isRequired,
	editorTitle: PropTypes.string.isRequired,
	editorHtmlClass: PropTypes.string,
	editorCloseButtonLabel: PropTypes.string,
};

export default TicketAssignmentsManagerModal;
