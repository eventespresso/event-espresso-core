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
 * Registration_Form_Questions_Overview_Help_Tour
 *
 * This is the help tour object for the Questions Overview page
 *
 *
 * @package		Registration_Form_Questions_Overview_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Registration_Form_Questions_Overview_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_Form_Edit_Question_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Edit Question Tour', 'event_espresso');
		$this->_slug = $this->_is_caf ? 'edit-question-caf-joyride' : 'edit-question-joyride';
	}

	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'QST_display_text',
				'content' => $this->_qst_display_text_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -35
					)
				),
			30 => array(
				'id' => 'QST_admin_label_disabled',
				'content' => $this->_qst_admin_label_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -35
					)
				),
			50 => array(
				'id' => 'QST_admin_only_disabled',
				'content' => $this->_qst_admin_only_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => -20,
					'tipAdjustmentY' => -35
					)
				),
			60 => array(
				'id' => 'QST_type_disabled',
				'content' => $this->_qst_type_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -35
					)
				),
			70 => array(
				'id' => 'QST_required',
				'content' => $this->_qst_required_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -35
					)
				),
			80 => array(
				'id' => 'QST_required_text',
				'content' => $this->_qst_required_text_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentX' => 0,
					'tipAdjustmentY' => -35
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Edit Question', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Edit Question page will go over different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		
		return $content;
	}

	protected function _qst_display_text_stop() {
		return '<p>' . __('This is the question that is displayed to registrants who are signing up for events.', 'event_espresso') . '</p>';
	}

	protected function _qst_admin_label_stop() {
		return '<p>' . __('Helps you understand the difference between questions that may appear similar but are actually different.', 'event_espresso') . '</p>';
	}

	protected function _qst_admin_only_stop() {
		return '<p>' . __('Specify whether this question should be shown only to the admins.', 'event_espresso') . '</p>';
	}

	protected function _qst_type_stop() {
		return '<p>' . __('Select the type of question. Available options are text, textarea, single, multiple, dropdown, and date.', 'event_espresso') . '</p>';
	}

	protected function _qst_required_stop() {
		return '<p>' . __('Specify whether this question should be required.', 'event_espresso') . '</p>';
	}

	protected function _qst_required_text_stop() {
		return '<p>' . __('Text to display when registrant does not answer question but is required to.', 'event_espresso') . '</p>';
	}

}