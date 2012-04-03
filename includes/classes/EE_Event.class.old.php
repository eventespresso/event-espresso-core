<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
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
class EE_Event  {  //extends EE_Event_Object

	private $id;
	private $members_only;
	private $event_code;
	private $event_name;
	private $event_desc;
	private $display_desc;
	private $display_reg_form;
	private $event_identifier;
	private $start_date;
	private $end_date;
	private $registration_start;
	private $registration_end;
	private $registration_startT;
	private $registration_endT;
	private $visible_on;
	private $address;
	private $address2;
	private $city;
	private $state;
	private $zip;
	private $phone;
	private $venue_title;
	private $venue_url;
	private $venue_image;
	private $venue_phone;
	private $virtual_url;
	private $virtual_phone;
	private $reg_limit;
	private $allow_multiple;
	private $additional_limit;
	private $send_mail;
	private $is_active;
	private $event_status;
	private $conf_mail;
	private $use_coupon_code;
	private $use_groupon_code;
	private $category_id;
	private $coupon_id;
	private $tax_percentage;
	private $tax_mode;
	private $member_only;
	private $post_id;
	private $post_type;
	private $country;
	private $externalURL;
	private $early_disc;
	private $early_disc_date;
	private $early_disc_percentage;
	private $question_groups;
	private $item_groups;
	private $event_type;
	private $allow_overflow;
	private $overflow_event_id;
	private $recurrence_id;
	private $email_id;
	private $alt_email;
	private $event_meta;
	private $wp_user;
	private $require_pre_approval;
	private $timezone_string;
	private $likes;
	private $submitted;
	private $ticket_id;
	private $certificate_id;
	private $status;
	private $timeslots;
	private $active_state;
	private $categories;
	private $registration_url;
	private $location;
	private $location_array;
	private $gmap_location;
	private $contact;
	private $twitter;
	private $venue_desc;
	private $enable_for_maps;
	private $gmap_static;
	private $prices;
	private $number_of_attendees;
	private $default_payment_status;
	private $venue_id;
	private $additional_attendee_reg_info;
	private $add_attendee_question_groups;
	private $date_submitted;
	private $originally_submitted_by;
	private $orig_event_staff;
	private $event_thumbnail_url;
	private $display_thumb_in_lists;
	private $display_thumb_in_regpage;
	private $display_thumb_in_calendar;
	private $enable_for_gmap;
	private $event_hashtag;
	private $event_format;
	private $event_livestreamed;
	private $questions;





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





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	private function set_event_meta() {

		if ( ! isset($this->event_meta)) {
			$this->set_event_details();
		}

		$meta = unserialize($this->event_meta);
		$this->default_payment_status = isset( $meta['default_payment_status'] ) ? $meta['default_payment_status'] : '';
		$this->venue_id = isset( $meta['venue_id'] ) ? $meta['venue_id'] : '';
		$this->additional_attendee_reg_info = isset( $meta['additional_attendee_reg_info'] ) ? $meta['additional_attendee_reg_info'] : '';
		$this->add_attendee_question_groups = isset( $meta['add_attendee_question_groups'] ) ? $meta['add_attendee_question_groups'] : '';
		$this->date_submitted = isset( $meta['date_submitted'] ) ? $meta['date_submitted'] : '';
		$this->originally_submitted_by = isset( $meta['originally_submitted_by'] ) ? $meta['originally_submitted_by'] : '';
		$this->orig_event_staff = isset( $meta['orig_event_staff'] ) ? $meta['orig_event_staff'] : '';
		$this->event_thumbnail_url = isset( $meta['event_thumbnail_url'] ) ? $meta['event_thumbnail_url'] : '';
		$this->display_thumb_in_lists = isset( $meta['display_thumb_in_lists'] ) ? $meta['display_thumb_in_lists'] : '';
		$this->display_thumb_in_regpage = isset( $meta['display_thumb_in_regpage'] ) ? $meta['display_thumb_in_regpage'] : '';
		$this->display_thumb_in_calendar = isset( $meta['display_thumb_in_calendar'] ) ? $meta['display_thumb_in_calendar'] : '';
		$this->enable_for_gmap = isset( $meta['enable_for_gmap'] ) ? $meta['enable_for_gmap'] : '';
		$this->event_hashtag = isset( $meta['event_hashtag'] ) ? $meta['event_hashtag'] : '';
		$this->event_format = isset( $meta['event_format'] ) ? $meta['event_format'] : '';
		$this->event_livestreamed = isset( $meta['event_livestreamed'] ) ? $meta['event_livestreamed'] : '';
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function poplulate_number_of_attendees_from_db() {
		global $wpdb;
		$sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE;
		$sql .= " WHERE event_id='" . $this->id . "' AND (payment_status='Completed' OR payment_status='Pending') ";
		$quantity = $wpdb->get_var($sql);
		if (!empty($quantity)) {
			$this->number_of_attendees = $quantity;
		} else {
			$this->number_of_attendees = 0;
		}
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	private function set_questions() {
		global $wpdb;
		if (!isset($this->question_groups))
			$this->set_event_details();
		foreach ($this->question_groups as $group) {
			$sql = "SELECT * FROM " . EVENTS_QST_GROUP_TABLE . " WHERE id='" . $group . "'";
			$group_info = $wpdb->get_row($sql, ARRAY_A);
			foreach ($group_info as $key => $value) {
				$this->questions['primary'][$group][$key] = $value;
			}
			$sql = "SELECT q.* FROM " . EVENTS_QUESTION_TABLE . " q ";
			$sql .= "JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qr ON qr.question_id=q.id ";
			$sql .= "WHERE qr.group_id='" . $group . "' ORDER BY q.sequence";
			$questions = $wpdb->get_results($sql, ARRAY_A);
			foreach ($questions as $question) {
				foreach ($question as $key => $value) {
					$this->questions['primary'][$group]['question'][$question['id']][$key] = $value;
				}
			}
		}
		if (!isset($this->additional_attendee_reg_info))
			$this->set_event_meta();
		if ($this->additional_attendee_reg_info != 1) {
			foreach ($this->add_attendee_question_groups as $group) {
				$sql = "SELECT * FROM " . EVENTS_QST_GROUP_TABLE . " WHERE id='" . $group . "'";
				$group_info = $wpdb->get_row($sql, ARRAY_A);
				foreach ($group_info as $key => $value) {
					$this->questions['additional'][$group][$key] = $value;
				}
				$sql = "SELECT q.* FROM " . EVENTS_QUESTION_TABLE . " q ";
				$sql .= "JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qr ON qr.question_id=q.id ";
				$sql .= "WHERE qr.group_id='" . $group . "' ORDER BY q.sequence";
				$questions = $wpdb->get_results($sql, ARRAY_A);
				foreach ($questions as $question) {
					foreach ($question as $key => $value) {
						$this->questions['additional'][$group]['question'][$question['id']][$key] = $value;
					}
				}
			}
		}
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	private function set_prices() {
		$sql = "SELECT * FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $this->id . "' ";
		$sql .= "ORDER BY event_cost ASC";
		global $wpdb;
		$prices = $wpdb->get_results($sql, ARRAY_A);
		foreach ($prices as $price) {
			$this->prices[] = array(
					'id' => $price['id'],
					'price_type' => $price['price_type'],
					'event_cost' => $price['event_cost'],
					'surcharge' => $price['surcharge'],
					'surcharge_type' => $price['surcharge_type'],
					'member_price_type' => $price['member_price_type'],
					'member_price' => $price['member_price'],
					'max_qty' => $price['max_qty'],
					'max_qty_members' => $price['max_qty_members']
			);
		}
		if (!isset($this->early_disc)) {
			$this->set_event_details();
		}
		if (!empty($this->early_disc)
						&& !empty($this->early_disc_date)
						&& strtotime($this->early_disc_date) > strtotime(date("Y-m-d"))) {
			foreach ($this->prices as &$price) {
				$price['early_price'] = $this->early_discount($price['event_cost']);
				if ($price['event_cost'] != $price['member_price']) {
					$price['early_member_price'] = $this->early_discount($price['member_price']);
				}
				if ($this->early_disc_percentage) {
					$price['early_display'] = $this->early_disc . '%';
				} else {
					global $org_options;
					$price['early_display'] = $org_options['currency_symbol'] . $this->early_disc;
				}
			}
		}
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	private function early_discount($event_cost) {
		if ($this->early_disc_percentage) {
			$pdisc = $this->early_disc / 100;
			$event_cost = $event_cost - ($event_cost * $pdisc);
		} else {
			$event_cost = max(0, $event_cost - $this->early_disc);
		}
		return $event_cost;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	private function set_location() {

		if (!isset($this->address)) {
			$this->set_event_details();
		}

		$location = $this->address != '' ? $this->address : '';
		$location .= $this->address2 != '' ? '<br />' . $this->address2 : '';
		$location .= $this->city != '' ? '<br />' . $this->city : '';
		$location .= $this->state != '' ? ', ' . $this->state : '';
		$location .= $this->zip != '' ? '<br />' . $this->zip : '';
		$location .= $this->country != '' ? '<br />' . $this->country : '';

		// location array
		$location_array = array();
		$location_array['address'] = $this->address != '' ? $this->address : '';
		$location_array['address2'] = $this->address2 != '' ? $this->address2 : '';
		$location_array['city'] = $this->city != '' ? $this->city : '';
		$location_array['state'] = $this->state != '' ? $this->state : '';
		$location_array['zip'] = $this->zip != '' ? $this->zip : '';
		$location_array['country'] = $this->country != '' ? $this->country : '';

		$this->location = $location;
		$this->location_array = $location_array;

	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	private function set_gmap_location() {

		if (!isset($this->address)) {
			$this->set_event_details();
		}

		$gmap_location = $this->address != '' ? $this->address . ',' : '';
		$gmap_location .= $this->address2 != '' ? $this->address2 . ',' : '';
		$gmap_location .= $this->city != '' ? $this->city . ',' : '';
		$gmap_location .= $this->state != '' ? $this->state . ',' : '';
		$gmap_location .= $this->zip != '' ? $this->zip . ',' : '';
		$gmap_location .= $this->country != '' ? $this->country : '';

		$this->gmap_location = $gmap_location;

	}




	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	private function set_registration_url() {
		if (!isset($this->externalURL)) {
			$this->set_event_details();
		}
		if ($this->externalURL != '') {
			$this->registration_url = $this->externalURL;
		} else {
			global $org_options;
			$this->registration_url = add_query_arg('ee', $this->id, get_permalink($org_options['event_page_id']));
		}
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function poplulate_event_details_from_db() {
		$sql = "SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $this->id . "'";
		global $wpdb, $org_options;
		$vars = $wpdb->get_row($sql, ARRAY_A);
		foreach ($vars as $key => $value) {
			$this->$key = $value;
		}
		$this->question_groups = unserialize($this->question_groups);
		if (!empty($org_options['use_venue_manager'])) {
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
			$venue_meta = unserialize($vars['meta']);
			$this->contact = $venue_meta['contact'];
			$this->phone = $venue_meta['phone'];
			$this->venue_phone = $venue_meta['phone'];
			$this->twitter = $venue_meta['twitter'];
			$this->venue_image = $venue_meta['image'];
			$this->venue_url = $venue_meta['website'];
			$this->venue_desc = $venue_meta['description'];
			$this->enable_for_maps = $venue_meta['enable_for_maps'];
			$this->gmap_static = $venue_meta['gmap_static'];
		}
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	protected function set_categories() {
		$sql = "SELECT ec.* FROM " . EVENTS_CATEGORY_TABLE . " ec ";
		$sql .= "JOIN " . EVENTS_CATEGORY_REL_TABLE . " ecr ON ecr.cat_id=ec.id ";
		$sql .= "WHERE ecr.event_id = '" . $this->id . "'";
		global $wpdb;
		$vars = $wpdb->get_results($sql, ARRAY_A);
		if (empty($vars)) {
			$this->categories[] = array(
					'category_name' => '',
					'category_identifier' => '',
					'category_desc' => '',
					'display_desc' => '',
					'wp_user' => ''
			);
		} else {
			foreach ($vars as $var) {
				$this->categories[] = array(
						'category_name' => $var['category_name'],
						'category_identifier' => $var['category_identifier'],
						'category_desc' => $var['category_desc'],
						'display_desc' => $var['display_desc'],
						'wp_user' => $var['wp_user']
				);
			}
		}
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	protected function set_timeslots() {
		$sql = "SELECT * FROM " . EVENTS_START_END_TABLE . " WHERE event_id = '" . $this->id . "'";
		global $wpdb;
		$vars = $wpdb->get_results($sql, ARRAY_A);
		if (empty($vars)) {
			$this->timeslots[] = array('start_time' => '',
					'end_time' => '',
					'reg_limit' => ''
			);
		} else {
			foreach ($vars as $var) {
				$this->timeslots[] = array(
						'start_time' => $var['start_time'],
						'end_time' => $var['end_time'],
						'reg_limit' => $var['reg_limit']
				);
			}
		}
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	protected function set_status() {
		if (!isset($this->start_date))
			$this->set_event_details();
		if (!isset($this->timeslots))
			$this->set_timeslots();
		$timestamp = strtotime($this->start_date . ' ' . $this->timeslots[0]['start_time']);
		$registration_start_timestamp = strtotime($this->registration_start);
		$registration_end_timestamp = strtotime($this->registration_end);
		if ($this->is_active == "Y" && $this->event_status == "O") {
			$this->status = array(
					'status' => 'ONGOING',
					'display' => '<span style="color: #090; font-weight:bold;">' . __('ONGOING', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_ongoing">' . __('Ongoing', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && $this->event_status == "S") {
			$this->status = array(
					'status' => 'SECONDARY',
					'display' => '<span style="color: #090; font-weight:bold;">' . __('WAITLIST', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_secondary">' . __('Waitlist', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && $this->event_status == "R") {
			$this->status = array(
					'status' => 'DRAFT',
					'display' => '<span style="color: #ff8400; font-weight:bold;">' . __('DRAFT', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_draft">' . __('Draft', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && $this->event_status == "P") {
			$this->status = array(
					'status' => 'PENDING',
					'display' => '<span style="color: #ff8400; font-weight:bold;">' . __('PENDING', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_pending">' . __('Pending', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && $this->event_status == "X") {
			$this->status = array(
					'status' => 'DENIED',
					'display' => '<span style="color: #F00; font-weight:bold;">' . __('DENIED', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_denied">' . __('Denied', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && date($registration_end_timestamp) <= date(time()) && $this->event_status != "D") {
			$this->status = array(
					'status' => 'REGISTRATION_CLOSED',
					'display' => '<span style="color: #F00; font-weight:bold;">' . __('CLOSED', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_closed">' . __('Closed', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && date($registration_start_timestamp) >= date(time()) && $this->event_status != "D") {
			$this->status = array(
					'status' => 'REGISTRATION_NOT_OPEN',
					'display' => '<span style="color: #090; font-weight:bold;">' . __('NOT_OPEN', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_not_open">' . __('Not Open', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && date($registration_start_timestamp) <= date(time()) && $this->event_status != "D") {
			$this->status = array(
					'status' => 'REGISTRATION_OPEN',
					'display' => '<span style="color: #090; font-weight:bold;">' . __('OPEN', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_open">' . __('Open', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && date($timestamp) <= date(time()) && $this->event_status != "D") {
			$this->status = array(
					'status' => 'EXPIRED',
					'display' => '<span style="color: #F00; font-weight:bold;">' . __('EXPIRED', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_expired">' . __('Expired', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && date($timestamp) >= date(time()) && $this->event_status != "D") {
			$this->status = array(
					'status' => 'ACTIVE',
					'display' => '<span style="color: #090; font-weight:bold;">' . __('ACTIVE', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_active">' . __('Active', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "N" && $this->event_status != "D") {
			$this->status = array(
					'status' => 'NOT_ACTIVE',
					'display' => '<span style="color: #F00; font-weight:bold;">' . __('NOT_ACTIVE', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_not_active">' . __('Not Active', 'event_espresso') . '</span>');
		} elseif ($this->event_status == "D") {
			$this->status = array(
					'status' => 'DELETED',
					'display' => '<span style="color: #000; font-weight:bold;">' . __('DELETED', 'event_espresso') . '</span>',
					'display_custom' => '<span class="espresso_deleted">' . __('Deleted', 'event_espresso') . '</span>');
		}
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		private		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	protected function set_active_state() {
		if (!isset($this->status))
			$this->set_status();
		switch ($this->status['status']) {
			case 'EXPIRED':
			case 'NOT_ACTIVE':
			case 'DELETED':
			case 'REGISTRATION_CLOSED':
			case 'DENIED':
				//case 'REGISTRATION_NOT_OPEN':
				$this->active_state = 'NOT_ACTIVE';
				break;

			case 'PENDING':
			case 'DRAFT':
				$this->active_state = 'PENDING';
				break;

			case 'ACTIVE':
			case 'ONGOING':
			case 'SECONDARY':
			case 'REGISTRATION_OPEN':
				$this->active_state = 'ACTIVE';
				break;

			default:
				break;
		}
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_id() {
		return $this->id;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function is_member_only() {
		if (!isset($this->member_only))
			$this->set_event_details();
		return $this->member_only;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function is_use_coupon_code() {
		if (!isset($this->use_coupon_code))
			$this->set_event_details();
		return $this->use_coupon_code;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function is_use_groupon_code() {
		if (!isset($this->use_groupon_code))
			$this->set_event_details();
		return $this->use_groupon_code;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function is_allow_multiple() {
		if (!isset($this->allow_multiple))
			$this->set_event_details();
		return $this->allow_multiple;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_start_date() {
		if (!isset($this->start_date))
			$this->set_event_details();
		return $this->start_date;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_end_date() {
		if (!isset($this->end_date))
			$this->set_event_details();
		return $this->end_date;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_question_groups() {
		if (!isset($this->question_groups))
			$this->set_event_details();
		return $this->question_groups;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_questions() {
		if (!isset($this->questions))
			$this->set_questions();
		return $this->questions;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_event_meta() {
		if (!isset($this->event_meta))
			$this->set_event_details();
		return unserialize($this->event_meta);
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function is_enable_for_gmap() {
		if (!isset($this->enable_for_gmap))
			$this->set_event_meta();
		return $this->enable_for_gmap;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function is_display_thumb_in_regpage() {
		if (!isset($this->display_thumb_in_regpage))
			$this->set_event_meta();
		return $this->display_thumb_in_regpage;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_event_thumbnail_url() {
		if (!isset($this->event_thumbnail_url))
			$this->set_event_meta();
		return $this->event_thumbnail_url;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_reg_limit() {
		if (!isset($this->reg_limit))
			$this->set_event_details();
		return $this->reg_limit;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_externalURL() {
		if (!isset($this->externalURL))
			$this->set_event_details();
		return $this->externalURL;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_event_desc() {
		if (!isset($this->event_desc))
			$this->set_event_details();
		return $this->event_desc;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_additional_limit() {
		if (!isset($this->additional_limit))
			$this->set_event_details();
		return $this->additional_limit;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function is_display_reg_form() {
		if (!isset($this->display_reg_form))
			$this->set_event_details();
		return $this->display_reg_form;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function is_display_desc() {
		if (!isset($this->display_desc))
			$this->set_event_details();
		return $this->display_desc;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_status() {
		if (!isset($this->status))
			$this->set_status();
		return $this->status;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_active_state() {
		if (!isset($this->active_state))
			$this->set_active_state();
		return $this->active_state;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_categories() {
		if (!isset($this->categories))
			$this->set_categories();
		return $this->categories;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_event_name() {
		if (!isset($this->event_name))
			$this->set_event_details();
		return $this->event_name;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_registration_url() {
		if (!isset($this->registration_url))
			$this->set_registration_url();
		return $this->registration_url;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_location() {
		if (!isset($this->location))
			$this->set_location();
		return $this->location;
	}




	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_location_array() {
		if (!isset($this->location_array))
			$this->set_location_array();
		return $this->location_array;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_gmap_location() {
		if (!isset($this->gmap_location))
			$this->set_gmap_location();
		return $this->gmap_location;
	}




	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_prices() {
		if (!isset($this->prices))
			$this->set_prices();
		return $this->prices;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_number_of_attendees() {
		return $this->number_of_attendees;
	}





	/**
	 * method short descriptiom (req)
	 *
	 * method long descriptiom
	 *
	 * @access 		public		private protected public
	 * @param 		int 			$var_name 		int float string array object mixed
	 * @return 		void			var type
	 */
	public function get_number_of_available_spaces() {
		return $this->get_reg_limit() - $this->get_number_of_attendees();
	}




}

/* End of file EE_Event.class.php */
/* Location: /includes/classes/EE_Event.class.php */