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
class EE_Event {	//extends EE_Event_Object

	public $id;
	public $type_id;
	public $status_id;
	public $code;
	public $identifier;
	public $name;
	public $slug;
	public $desc;
	public $is_display_desc;
	public $is_display_reg_form;
	public $venue_id;
	public $eb_timestamp;
	public $eb_amount;
	public $is_eb_percentage;
	public $members_only;
	public $start_date;
	public $end_date;
	public $registration_start;
	public $registration_end;
	public $registration_startT;
	public $registration_endT;
	public $visible_on;
	public $address;
	public $address2;
	public $city;
	public $state;
	public $zip;
	public $phone;
	public $venue_title;
	public $venue_url;
	public $venue_image;
	public $venue_phone;
	public $venue_meta;
	public $virtual_url;
	public $virtual_phone;
	public $reg_limit;
	public $allow_multiple;
	public $additional_limit;
	public $send_mail;
	public $is_active;
	public $event_status;
	public $conf_mail;
	public $use_coupon_code;
	public $use_groupon_code;
	public $category_id;
	public $coupon_id;
	public $tax_percentage;
	public $tax_mode;
	public $member_only;
	public $post_id;
	public $post_type;
	public $country;
	public $externalURL;
	public $question_groups;
	public $item_groups;
	public $event_type;
	public $allow_overflow;
	public $overflow_event_id;
	public $recurrence_id;
	public $email_id;
	public $alt_email;
	public $event_meta;
	public $wp_user;
	public $require_pre_approval;
	public $timezone_string;
	public $likes;
	public $submitted;
	public $ticket_id;
	public $certificate_id;
	public $status;
	public $timeslots;
	public $active_state;
	public $categories;
	public $registration_url;
	public $location;
	public $location_array;
	public $gmap_location;
	public $contact;
	public $twitter;
	public $venue_desc;
	public $enable_for_maps;
	public $gmap_static;
	public $prices;
	public $number_of_attendees;
	public $default_payment_status;
	public $additional_attendee_reg_info;
	public $add_attendee_question_groups;
	public $date_submitted;
	public $originally_submitted_by;
	public $orig_event_staff;
	public $event_thumbnail_url;
	public $display_thumb_in_lists;
	public $display_thumb_in_regpage;
	public $display_thumb_in_calendar;
	public $enable_for_gmap;
	public $event_hashtag;
	public $event_format;
	public $event_livestreamed;
	public $questions;

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
		$sql = "SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $this->id . "'";
		global $wpdb, $org_options;
		$vars = $wpdb->get_row($sql, ARRAY_A);
		foreach ($vars as $key => $value) {
			$this->$key = $value;
		}
		$this->question_groups = unserialize($this->question_groups);
		if (isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y') {
			$sql = "SELECT ev.* FROM " . EVENTS_VENUE_TABLE . " ev ";
			$sql .= "JOIN " . EVENTS_VENUE_REL_TABLE . " evr ON evr.venue_id = ev.id ";
			$sql .= "WHERE evr.event_id = '" . $this->id . "'";
			$vars = $wpdb->get_row($sql, ARRAY_A);
			$this->venue_title = $vars['name'];
			$this->address = $vars['address'];
			$this->address2 = $vars['address2'];
			$this->city = $vars['city'];
			$this->state = $vars['state'];
			$this->zip = $vars['zip'];
			$this->country = $vars['country'];
			$this->venue_meta = unserialize($vars['meta']);
			$this->contact = $this->venue_meta['contact'];
			$this->phone = $this->venue_meta['phone'];
			$this->venue_phone = $this->venue_meta['phone'];
			$this->twitter = $this->venue_meta['twitter'];
			$this->venue_image = $this->venue_meta['image'];
			$this->venue_url = $this->venue_meta['website'];
			$this->venue_desc = $this->venue_meta['description'];
			$this->enable_for_maps = $this->venue_meta['enable_for_maps'];
			$this->gmap_static = $this->venue_meta['gmap_static'];
		}
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
		} elseif ($this->id && absint($this->id) && $this->id != '' && $this->id > 0) {	 // no event slug, so use  event_id
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