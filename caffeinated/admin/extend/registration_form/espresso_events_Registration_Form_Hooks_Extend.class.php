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
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * espresso_events_Registration_Form_Hooks_Extend
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 * 
 *
 * @package		espresso_events_Registration_Form_Hooks_Extend
 * @subpackage	includes/core/admin/messages/espresso_events_Registration_Form_Hooks_Extend.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Registration_Form_Hooks_Extend extends espresso_events_Registration_Form_Hooks {


	public function __construct( EE_Admin_Page $admin_page ) {
		parent::__construct($admin_page);
	}




	/**
	 * extending the properties set in espresso_events_Registration_From_Hooks
	 *
	 * @access protected
	 * @return void
	 */
	protected function _extend_properties() {
		$new_metaboxes = array(
			1 => array(
				'page_route' => array('add_event', 'edit_event'),
				'func' => 'additional_questions',
				'label' => __('Questions for Additional Attendees', 'event_espresso'),
				'priority' => 'default',
				'context' => 'side'
				)
			);

		$this->_metaboxes = array_merge( $this->_metaboxes, $new_metaboxes);
	}






	public function additional_questions( $post_id, $post ) {
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
			$EQGs = EEM_Event::instance()->get_event_question_groups( $this->_event->id, TRUE );
			$EQGs = is_array( $EQGs ) ? $EQGs : array();

			if ( ! empty( $QSGs )) {
 				$html = count( $QSGs ) > 10 ? '<div style="height:250px;overflow:auto;">' : '';
				foreach ( $QSGs as $QSG ) {

					$checked = in_array( $QSG->QSG_ID, $EQGs ) || $QSG->QSG_system_ID == 1 ? ' checked="checked" ' : '';
					$visibility = $QSG->QSG_system_ID == 1 ? ' style=" visibility:hidden"' : '';
					$edit_link = $this->_adminpage_obj->add_query_args_and_nonce( array( 'action' => 'edit_question_group', 'QSG_ID' => $QSG->QSG_ID ), EE_FORMS_ADMIN_URL );

					$html .= '
					<p id="event-question-group-' . $QSG->QSG_ID . '">
						<input value="' . $QSG->QSG_ID . '" type="checkbox"' . $visibility . ' name="add_attendee_question_groups[' . $QSG->QSG_ID . ']"' . $checked . ' /> 
						<a href="' . $edit_link . '" title="Edit ' . $QSG->QSG_name . ' Group" target="_blank">' . $QSG->QSG_name . '</a>
					</p>';
				}
				$html .= count( $QSGs ) > 10 ? '</div>' : '';

				echo $html;

			} else {
				echo __('There seems to be a problem with your questions. Please contact support@eventespresso.com', 'event_espresso');
			}
			?>
		</div>
		<?php
	}
} //end class espresso_events_Registration_Form_Hooks_Extend