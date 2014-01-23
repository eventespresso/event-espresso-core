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
 * Venue_Overview_Help_Tour
 *
 * This is the help tour object for the Venue Overview page
 *
 *
 * @package		Venue_Overview_Help_Tour
 * @subpackage	caffeinated/admin/new/pricing/help_tours/Venue_Overview_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Venues_Edit_Category_Help_Tour extends EE_Help_Tour {

	protected function _set_tour_properties() {
		$this->_label = __('Edit Venue Category Tour', 'event_espresso');
		$this->_slug = 'venue-edit-category-joyride';
	}

	protected function _set_tour_stops() {
		$this->_stops = array(
			10 => array(
				'content' => $this->_stop_one(),
				),
			20 => array(
				'id' => 'category_name',
				'content' => $this->_category_name_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -55,
					'tipAdjustmentX' => 5
					)
				),
			30 => array(
				'id' => 'cat_id',
				'content' => $this->_category_id_stop(),
				'options' => array(
					'tipLocation' => 'right',
					'tipAdjustmentY' => -55,
                    'tipAdjustmentX' => 5
					)
				),
			40 => array(
				'id' => 'category_desc',
				'content' => $this->_category_editor_stop(),
				'options' => array(
					'tipLocation' => 'top',
					'tipAdjustmentY' => -75,
                    'tipAdjustmentX' => 250
					)
				)
			);
	}


	protected function _stop_one() {
		$content = '<h3>' . __('Edit Venue Category', 'event_espresso') . '</h3>';
		$content .= '<p>' . __('This tour of the Edit Venue Category page will provide an overview of the different areas of the screen to help you understand what they are used for.', 'event_espresso') . '</p>';
		return $content;
	}

	protected function _category_name_stop() {
		return '<p>' . __('Edit the name for your venue category.', 'event_espresso') . '</p>';
	}

	protected function _category_id_stop() {
		return '<p>' . __('View the unique ID for your category (cannot be changed).', 'event_espresso') . '</p>';
	}

	protected function _category_editor_stop() {
		return '<p>' . __('The rich text editor can be used to edit information about your venue category. Images and links can also be added or removed along with your text.', 'event_espresso') . '</p>';
	}

}