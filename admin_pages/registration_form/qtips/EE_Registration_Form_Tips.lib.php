<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

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
 * EE_Event_Editor_Tips	
 *
 * Qtip config for the event editor.
 *
 * @package		Event Espresso
 * @subpackage	/admin_pages/events/qtips/EE_Event_Editor_Tips.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Registration_Form_Tips extends EE_Qtip_Config {


	protected function _set_tips_array() {
		$this->_qtipsa = array(
			0 => array(
				'content_id' => 'about-system-lock-icon',
				'target' => '.questions .ee-lock-icon',
				'content' => __('This question is a system question and cannot be trashed', 'event_espresso'),
				'options' => array(), //defaults
				),
			1 => array(
				'content_id' => 'about-non-system-lock-icon',
				'target' => '.questions .ee-lock-icon.ee-alternate-color',
				'content' => __('This question has answers attached to it from registrations that have the question.  It cannot be permanently deleted.', 'event_espresso'),
				'options' => array()
				)
			);
	}
}