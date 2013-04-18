<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * espresso_events_Registration_Form_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 * 
 *
 * @package		espresso_events_Registration_Form_Hooks
 * @subpackage	includes/core/admin/messages/espresso_events_Registration_Form_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Registration_Form_Hooks extends EE_Admin_Hooks {



	protected $_event;



	public function __construct( EE_Admin_Page $admin_page ) {
		parent::__construct($admin_page);
	}



	protected function _set_hooks_properties() {

		$this->_name = 'registration_form';
		$this->_metaboxes = array(
			0 => array(
				'page_route' => array( 'edit_event', 'add_event' ),
				'func' => 'event_edit_metabox',
				'label' => __('Questions for Primary Attendee', 'event_espresso'),
				'priority' => 'core',
				'context' => 'side'
				)
			);
	}




	public function event_edit_metabox() {
		$this->_event = $this->_adminpage_obj->get_event_object();
		?>
		<div class="inside">
			<p><strong>
					<?php _e('Question Groups', 'event_espresso'); ?>
				</strong><br />
				<?php _e('Add a pre-populated', 'event_espresso'); ?>
				<a href="admin.php?page=espresso_registration_form" target="_blank">
					<?php _e('group of questions', 'event_espresso'); ?>
				</a>
				<?php _e('to your event. The personal information group is required for all events.', 'event_espresso'); ?>
			</p>
			<?php
			$QSGs = EEM_Event::instance()->get_all_question_groups();
			$EQGs = EEM_Event::instance()->get_event_question_groups( $this->_event->id );
			$EQGs = is_array( $EQGs ) ? $EQGs : array();

			if ( ! empty( $QSGs )) {
 				$html = count( $QSGs ) > 10 ? '<div style="height:250px;overflow:auto;">' : '';
				foreach ( $QSGs as $QSG ) {

					$checked = ( in_array( $QSG->QSG_ID, $EQGs ) || $QSG->QSG_system_ID == 1 ) ? ' checked="checked"' : '';
					$visibility = $QSG->QSG_system_ID == 1 ? ' style="visibility:hidden"' : '';
					$edit_link = $this->_adminpage_obj->add_query_args_and_nonce( array( 'action' => 'edit_question_group', 'QSG_ID' => $QSG->QSG_ID ), EE_FORMS_ADMIN_URL );
					
					$html .= '
					<p id="event-question-group-' . $QSG->QSG_ID . '">
						<input value="' . $QSG->QSG_ID . '" type="checkbox"' . $visibility . ' name="question_groups[' . $QSG->QSG_ID . ']"' . $checked . ' /> 
						<a href="' . $edit_link . '" title="Edit ' . $QSG->QSG_name . ' Group" target="_blank">' . $QSG->QSG_name . '</a>
					</p>';
				}
				$html .= count( $QSGs ) > 10 ? '</div>' : '';

				echo $html;
			} else {
				echo __('There seems to be a problem with your questions. Please contact support@eventespresso.com', 'event_espresso');
			}
			do_action('action_hook_espresso_event_editor_questions_notice');
			?>
		</div>
		<?php
	}
} //end espresso_events_Registration_Form_Hooks