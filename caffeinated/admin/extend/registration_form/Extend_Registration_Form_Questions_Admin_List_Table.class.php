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
 * Extend_Registration_Form_Questions_Admin_List_Table
 *
 * Class for preparing the table listing all the custom event questions
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package		Extend_Registration_Form_Questions_Admin_List_Table
 * @subpackage	caffeinated/admin/extend/registration_form/Extend_Registration_Form_Questions_Admin_List_Table.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Extend_Registration_Form_Questions_Admin_List_Table extends Registration_Form_Questions_Admin_List_Table {

	public function __construct( $admin_page ) {
		parent::__construct( $admin_page );
	}

	public function column_display_text(EE_Question $item) {
		$system_question = $item->is_system_question();
		$actions = array();

		if ( !defined('REG_ADMIN_URL') )
			define('REG_ADMIN_URL', EVENTS_ADMIN_URL);

		$edit_query_args = array(
				'action' => 'edit_question',
				'QST_ID' => $item->ID()
			);

		$trash_query_args = array(
				'action' => 'trash_question',
				'QST_ID' => $item->ID()
			);

		$restore_query_args = array(
			'action' => 'restore_question',
			'QST_ID' => $item->ID()
			);

		$delete_query_args = array(
			'action' => 'delete_questions',
			'QST_ID' => $item->ID()
			);

		$duplicate_query_args = array(
				'action' => 'duplicate_question',
				'QST_ID' => $item->ID()
			);

		$edit_link = EE_Admin_Page::add_query_args_and_nonce( $edit_query_args, EE_FORMS_ADMIN_URL );
		$trash_link = EE_Admin_Page::add_query_args_and_nonce( $trash_query_args, EE_FORMS_ADMIN_URL );
		$restore_link = EE_Admin_Page::add_query_args_and_nonce( $restore_query_args, EE_FORMS_ADMIN_URL );
		$delete_link = EE_Admin_Page::add_query_args_and_nonce( $delete_query_args, EE_FORMS_ADMIN_URL );
		$duplicate_link = EE_Admin_Page::add_query_args_and_nonce( $duplicate_query_args, EE_FORMS_ADMIN_URL );

		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_edit_question', 'espresso_registration_form_edit_question', $item->ID() ) ) {
			$actions = array(
				'edit' => '<a href="' . $edit_link . '" title="' . __('Edit Question', 'event_espresso') . '">' . __('Edit', 'event_espresso') . '</a>'
			);
		}

		if ( ! $system_question && $this->_view != 'trash' && EE_Registry::instance()->CAP->current_user_can( 'ee_delete_question', 'espresso_registration_form_trash_question', $item->ID() ) ) {
			$actions['delete'] = '<a href="' . $trash_link . '" title="' . __('Trash Question', 'event_espresso') . '">' . __('Trash', 'event_espresso') . '</a>';
		}

		if ( $this->_view == 'trash' ) {
			if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_question', 'espresso_registration_form_restore_question', $item->ID() ) ) {
				$actions['restore'] = '<a href="' . $restore_link . '" title="' . __('Restore Question', 'event_espresso') . '">' . __('Restore', 'event_espresso') . '</a>';
			}
			if ( $item->count_related('Answer') === 0 && EE_Registry::instance()->CAP->current_user_can( 'ee_delete_question', 'espresso_registration_form_delete_questions', $item->ID() ) ) {
				$actions['delete'] = '<a href="' . $delete_link . '" title="' . __('Delete Question Permanently', 'event_espresso') . '">' . __('Delete Permanently', 'event_espresso') . '</a>';
			}
		}
		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_edit_questions', 'espresso_registration_form_edit_question' ) ) {
			$actions[ 'duplicate' ] = '<a href="' . $duplicate_link . '" title="' . __('Duplicate Question', 'event_espresso') . '">' . __('Duplicate', 'event_espresso') . '</a>';
		}

		$content = EE_Registry::instance()->CAP->current_user_can( 'ee_edit_question', 'espresso_registration_form_edit_question', $item->ID() ) ? '<strong><a class="row-title" href="' . $edit_link . '">' . $item->display_text() . '</a></strong>' : $item->display_text();
		$content .= $this->row_actions($actions);
		return $content;
	}

}
