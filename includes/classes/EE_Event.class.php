<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');
/*
  Plugin Name: 	Event Espresso
  Plugin URI: 		http://eventespresso.com/
  Description: 	Out-of-the-box Events Registration integrated with PayPal IPN for your Wordpress blog/website. <a href="admin.php?page=support" >Support</a>
  Version: 			3.2.P
  Author: 			Seth Shoultes
  Author URI:		http://eventespresso.com
  License: 			GPLv2

  Copyright (c) 2011 Event Espresso  All Rights Reserved.

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 */

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright			(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Event class
 *
 * @package				Event Espresso
 * @subpackage			/includes/classes/
 * @author					Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EE_Event { //extends EE_Event_Object

	public $id;
	public $code;
	public $name;
	public $slug;
	public $description;
	public $is_display_desc;
	public $is_display_reg_form;
	public $identifier;
	public $start_timestamp;
	public $end_timestamp;
	public $registration_start_timestamp;
	public $registration_end_timestamp;
	public $visible_on;
	public $venue_id;
	public $virtual_phone;
	public $virtual_url;
	public $virtual_call_in_number;
	public $confirmation_email_id;
	public $payment_email_id;
	public $attendee_limit;
	public $allow_group_registrations;
	public $additional_attendee_limit;
	public $additional_attendee_reg_info;
	public $is_active;
	public $status_id;
	public $default_payment_status;
	public $alternate_registration_url;
	public $alternate_email_address;
	public $eb_timestamp;
	public $eb_amount;
	public $is_eb_percentage;
	public $is_allow_coupons;
	public $featured_image_url;
	public $is_use_image_in_event_lists;
	public $is_use_image_in_registration;
	public $type_id;
	public $parent;
	public $event_link;

	/**
	 * Event constructor
	 *
	 * @access 		public
	 * @param 		int 			$id 		the event id
	 * @return 		void
	 */
	public function __construct($id) {
		$this->id = $id;
	}

	public function poplulate_event_details_from_db() {
		$sql = "SELECT ed.*, t.start_time, t.end_time, vr.venue_id FROM " . EVENTS_DETAIL_TABLE . " ed";
		$sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " t ON t.event_id=ed.id ";
		$sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " vr ON vr.event_id=ed.id ";
		$sql .= " WHERE ed.id = '" . $this->id . "' LIMIT 1";
		global $wpdb, $org_options;
		$vars = $wpdb->get_row($sql, ARRAY_A);
		$meta = unserialize($vars['event_meta']);
		$this->id = $vars['id'];
		$this->name = $vars['event_name'];
		$this->slug = $vars['slug'];
		$this->description = $vars['event_desc'];
		$this->registration_start_timestamp = $vars['registration_start'] . ' ' . $vars['registration_startT'];
		$this->registration_end_timestamp = $vars['registration_end'] . ' ' . $vars['registration_endT'];
		$this->start_timestamp = $vars['start_date'] . ' ' . $vars['start_time'];
		$this->end_timestamp = $vars['end_date'] . ' ' . $vars['end_time'];
		$this->venue_id = $vars['venue_id'];
		$this->virtual_phone = $vars['phone'];
		$this->virtual_url = $vars['virtual_url'];
		$this->virtual_call_in_number = $vars['virtual_phone'];
		$this->confirmation_email_id = $vars['confirmation_email_id'];
		$this->payment_email_id = $vars['payment_email_id'];
		$this->attendee_limit = $vars['reg_limit'];
		$this->allow_group_registrations = $vars['allow_multiple'];
		$this->additional_attendee_limit = $vars['additional_limit'];
		$this->additional_attendee_reg_info = $meta['additional_attendee_reg_info'];
		$this->is_active = $vars['is_active']=='Y' ? true : false;
		$this->status_id = $vars['event_status'];
		$this->is_display_desc = ($vars['display_desc']=='Y') ? true : false;
		$this->is_display_reg_form = $vars['display_reg_form']=='Y' ? true : false;
		$this->default_payment_status = $meta['default_payment_status'];
		$this->alternate_registration_url = $vars['externalURL'];
		$this->alternate_email_address = $vars['alt_email'];
		$this->eb_timestamp = date($vars['early_disc_date']);
		$this->eb_amount = $vars['early_disc'];
		$this->is_eb_percentage = $vars['early_disc_percentage']=='Y' ? true : false;
		$this->is_allow_coupons = $vars['use_coupon_code']=='Y' ? true : false;
		$this->is_allow_groupons = $vars['use_groupon_code']=='Y' ? true : false;
		$this->featured_image_url = $meta['event_thumbnail_url'];
		$this->is_use_image_in_event_lists = $meta['display_thumb_in_lists']=='Y' ? true : false;
		$this->is_use_image_in_registration = $meta['display_thumb_in_regpage']=="Y" ? true : false;
		$this->type_id = NULL; //$vars[''];
		$this->code = NULL; //$vars[''];
		$this->parent = NULL; //$vars[''];
		$this->create_event_link();
	}

	private function create_event_link() {

		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		$registration_url = rtrim(get_permalink($org_options['event_page_id']), '/') . '/';
		$use_pretty_permalinks = espresso_use_pretty_permalinks();

		if (is_int($this->slug)) {
			$this->id = $this->slug;
			$this->slug = FALSE;
		}

		// if an event slug was supplied
		if ($this->slug && $this->slug != '') {

			// check if permalinks are being used
			if ($use_pretty_permalinks) {
				// create pretty permalink
				$registration_url = $registration_url . $this->slug;
			} else {
				// use fugly oldsckool link
				$registration_url = add_query_arg('event_slug', $this->slug, $registration_url);
			}
		} elseif ($this->id && absint($this->id) && $this->id != '' && $this->id > 0) { // no event slug, so use  event_id
			// check if permalinks are being used
			if ($use_pretty_permalinks) {


				$this->slug = get_transient('espresso_event_slug_' . $this->id);
				if (false === $this->slug) {
					// if transient not set, do this!
					// create the data that needs to be saved.
					$SQL = 'SELECT slug  FROM ' . EVENTS_DETAIL_TABLE . ' WHERE id = %d';
					$this->slug = $wpdb->get_var($wpdb->prepare($SQL, $this->id));

					// save the newly created transient value
					// 60 seconds * 60 minutes * 24 hours * 365 = 1 year
					set_transient('espresso_event_slug_' . $this->id, $this->slug, 60 * 60 * 24 * 365);

					//Debug:
					//Check if using the cache
					//echo 'Not using cache';
				}


				// check if slug exists for that event
				if (!empty($this->slug)) {
					// create pretty permalink
					$registration_url = $registration_url = $registration_url . $this->slug;
				} else {
					// couldn't find a slug, so use really fugly oldsckool link
					$registration_url = add_query_arg('ee', $this->id, $registration_url);
				}
			} else {
				// use really fugly oldsckool link
				$registration_url = add_query_arg('ee', $this->id, $registration_url);
			}
		}

		$this->event_link = '<a href="' . $registration_url . '">' . $this->event_name . '</a>';
	}

}