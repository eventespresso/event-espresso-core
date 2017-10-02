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
				'page_route' => array( 'edit', 'create_new' ),
				'func' => 'primary_questions',
				'label' => __('Questions for Primary Registrant', 'event_espresso'),
				'priority' => 'default',
				'context' => 'side'
				)
		);

		//hook into the handler for saving question groups
		add_filter( 'FHEE__Events_Admin_Page___insert_update_cpt_item__event_update_callbacks', array( $this, 'modify_callbacks'), 10 );

		//hook into revision restores (we're hooking into the global action because EE_Admin_Hooks classes are already restricted by page)
		add_action( 'AHEE_EE_Admin_Page_CPT__restore_revision', array($this, 'restore_revision' ), 10, 2 );
	}





	public function modify_callbacks( $callbacks ) {
		//now let's add the question group callback
		$callbacks[] = array( $this, 'primary_question_group_update' );
		return $callbacks;
	}


	public function restore_revision( $post_id, $revision_id ) {
		$EVT_MDL = EE_Registry::instance()->load_model('Event');
		$post_evt = $EVT_MDL->get_one_by_ID( $post_id );
		//restore revision for primary questions
		$post_evt->restore_revision($revision_id, array('Question_Group'), array('Question_Group' => array('Event_Question_Group.EQG_primary' => 1 ) ) );
		return $post_evt; //for any caffeinated functionality extending.
	}




	public function primary_questions($post_id, $post) {
		$this->_event = $this->_adminpage_obj->get_event_object();
		$event_id = $this->_event->ID();
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

			$qsg_where['QSG_deleted'] = FALSE;
			$query_params = array( $qsg_where, 'order_by' => array( 'QSG_order' => 'ASC' ) );
			$QSGs = EEM_Question_Group::instance()->get_all( $query_params );
			$EQGs = !empty( $event_id ) ? $this->_event->get_many_related('Question_Group', array(array('Event_Question_Group.EQG_primary' => 1 )) ) : array();
			$EQGids = array_keys($EQGs);

			//EEH_Debug_Tools::printr( $QSGs, '$QSGs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

			if ( ! empty( $QSGs )) {
 				$html = count( $QSGs ) > 10 ? '<div style="height:250px;overflow:auto;">' : '';
				foreach ( $QSGs as $QSG ) {

					$checked = ( in_array( $QSG->ID(), $EQGids ) || $QSG->get('QSG_system') == 1 ) ? ' checked="checked"' : '';
					$visibility = $QSG->get('QSG_system') == 1 ? ' style="visibility:hidden"' : '';
					$edit_query_args = $this->_adminpage_obj->is_caf() ? array( 'action' => 'edit_question_group', 'QSG_ID' => $QSG->ID() ) : array( 'action' => 'question_groups' );
					$edit_link = $this->_adminpage_obj->add_query_args_and_nonce( $edit_query_args, EE_FORMS_ADMIN_URL );

					$html .= '
					<p id="event-question-group-' . $QSG->ID() . '">
						<input value="' . $QSG->ID() . '" type="checkbox"' . $visibility . ' name="question_groups[' . $QSG->ID() . ']"' . $checked . ' />
						<a href="' . $edit_link . '" title="' . sprintf( esc_attr__('Edit %s Group', 'event_espresso'),  $QSG->get('QSG_name') ) . '" target="_blank">' . $QSG->get('QSG_name') . '</a>
					</p>';
				}
				$html .= count( $QSGs ) > 10 ? '</div>' : '';

				echo $html;
			} else {
				echo __('There seems to be a problem with your questions. Please contact support@eventespresso.com', 'event_espresso');
			}
			do_action( 'AHEE_event_editor_questions_notice' );
			?>
		</div>
		<?php
	}





	public function primary_question_group_update( $evtobj, $data ) {
		$question_groups = !empty( $data['question_groups'] ) ? (array) $data['question_groups'] : array();
		$added_qgs = array_keys($question_groups);
		$success = array();

		//let's get all current question groups associated with this event.
		$current_qgs = $evtobj->get_many_related('Question_Group', array(array('Event_Question_Group.EQG_primary' => 1) ));
		$current_qgs = array_keys($current_qgs); //we just want the ids

		//now let's get the groups selected in the editor and update (IF we have data)
		if ( !empty( $question_groups ) ) {
			foreach ( $question_groups as $id => $val ) {
				//add to event
				if ( $val )
					$qg = $evtobj->_add_relation_to( $id, 'Question_Group', array('EQG_primary' => 1) );
				$success[] = !empty($qg) ? 1 : 0;
			}
		}

		//wait a minute... are there question groups missing in the saved groups that ARE with the current event?
		$removed_qgs = array_diff( $current_qgs, $added_qgs );

		foreach ( $removed_qgs as $qgid ) {
			$qg = $evtobj->_remove_relation_to( $qgid, 'Question_Group', array('EQG_primary' => 1 ) );
			$success[] = !empty($qg) ? 1 : 0;
		}


		return in_array(0, $success) ? FALSE : TRUE;

	}
} //end espresso_events_Registration_Form_Hooks
