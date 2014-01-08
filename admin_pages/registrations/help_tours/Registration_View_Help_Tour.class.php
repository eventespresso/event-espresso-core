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
 * Registration_View_Help_Tour
 *
 * This is the help tour object for the single registration view page
 *
 *
 * @package		Registration_View_Help_Tour
 * @subpackage	includes/core/admin/registration/help_tours/Registration_View_Help_Tour.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_View_Help_Tour extends EE_Help_Tour {

	public function _set_tour_properties() {
		$this->_label = __('Registration View Tour', 'event_espresso');
		$this->_slug = 'registration-view-joyride';
	}


	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_start(),
				),
			20 => array(
				'id' => 'reg-admin-reg-details-reg-date-hdr',
				'content' => $this->_reg_date_title(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -40,
					'tipAdjustmentX' => 200
					)
				),
			30 => array(
				'id' => 'reg-admin-reg-details-reg-status-hdr',
				'content' => $this->_reg_details_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -50,
					'tipAdjustmentX' => 300
					)
				),
			40 => array(
				'id' => 'admin-primary-mbox-reg-session-info-tbl',
				'content' => $this->_reg_details_table(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => 50,
					'tipAdjustmentX' => 300
					)
				),
			50 => array(
				'id' => 'display-additional-registration-session-info',
				'content' => $this->_display_additional_info_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -30,
					'tipAdjustmentX' => 0
					)
				),
			60 => array(
				'id' => 'edit-reg-registrant-mbox',
				'content' => $this->_attendee_details_stop(),
				'options' => array(
					'tipLocation' => 'left',
					'tipAdjustmentY' => 0
					)
				),
			70 => array(
				'id' => 'edit-reg-questions-mbox',
				'content' => $this->_edit_reg_question_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => 0
					)
				)
			);
	}


	protected function _start() {
		$content = '<h3>' . __('Welcome to the Registration Details page!', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('An introduction to the registration details page', 'event_espresso') . '</p>';
		return $content;
	}


	protected function _reg_date_title() {
		return '<p>' . __('About the reg date') . '</p>';
	}

	

	protected function _reg_details_stop() {
		return '<p>' . __('About the reg details area (pending, buttons they can push and what happens)', 'event_espresso') . '</p>';
	}


	protected function _reg_details_table() {
		return '<p>' . __('about the registration details metabox', 'event_espresso') . '</p>';
	}


	protected function _display_additional_info_stop() {
		return '<p>' . __('what happens when they click this link?  What\'s it here for', 'event_espresso') . '</p>';
	}


	protected function _attendee_details_stop() {
		return '<p>' . __('details on the registrant attached to this registration', 'event_espresso') . '</p>';
	}


	protected function _edit_reg_question_stop() {
		return '<p>' . __('info about how they can edit the questions related to this registration here', 'event_espresso') . '</p>';
	}
}