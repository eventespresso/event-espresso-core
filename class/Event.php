<?php

class Event {

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

	private function _retrieve_event_meta() {
		if (!isset($this->event_meta))
			$this->_retrieve_event_details();
		$meta = unserialize($this->event_meta);
		$this->default_payment_status = $meta['default_payment_status'];
		$this->venue_id = $meta['venue_id'];
		$this->additional_attendee_reg_info = $meta['additional_attendee_reg_info'];
		$this->add_attendee_question_groups = $meta['add_attendee_question_groups'];
		$this->date_submitted = $meta['date_submitted'];
		$this->originally_submitted_by = $meta['originally_submitted_by'];
		$this->orig_event_staff = $meta['orig_event_staff'];
		$this->event_thumbnail_url = $meta['event_thumbnail_url'];
		$this->display_thumb_in_lists = $meta['display_thumb_in_lists'];
		$this->display_thumb_in_regpage = $meta['display_thumb_in_regpage'];
		$this->display_thumb_in_calendar = $meta['display_thumb_in_calendar'];
		$this->enable_for_gmap = $meta['enable_for_gmap'];
		$this->event_hashtag = $meta['event_hashtag'];
		$this->event_format = $meta['event_format'];
		$this->event_livestreamed = $meta['event_livestreamed'];
	}

	private function _retrieve_number_of_attendees() {
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

	private function _retrieve_questions() {
		global $wpdb;
		if (!isset($this->question_groups))
			$this->_retrieve_event_details();
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
			$this->_retrieve_event_meta();
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

	private function _retrieve_prices() {
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
			$this->_retrieve_event_details();
		}
		if (!empty($this->early_disc)
						&& !empty($this->early_disc_date)
						&& strtotime($this->early_disc_date) > strtotime(date("Y-m-d"))) {
			foreach ($this->prices as &$price) {
				$price['early_price'] = $this->_compute_early_discount($price['event_cost']);
				if ($price['event_cost'] != $price['member_price']) {
					$price['early_member_price'] = $this->_compute_early_discount($price['member_price']);
				}
				if ($this->early_disc_percentage == 'Y') {
					$price['early_display'] = $this->early_disc . '%';
				} else {
					global $org_options;
					$price['early_display'] = $org_options['currency_symbol'] . $this->early_disc;
				}
			}
		}
	}

	private function _compute_early_discount($event_cost) {
		if ($this->early_disc_percentage == 'Y') {
			$pdisc = $this->early_disc / 100;
			$event_cost = $event_cost - ($event_cost * $pdisc);
		} else {
			$event_cost = max(0, $event_cost - $this->early_disc);
		}
		return $event_cost;
	}

	private function _retrieve_location() {
		if (!isset($this->address))
			$this->_retrieve_event_details();
		$location = $this->address != '' ? $this->address : '';
		$location .= $this->address2 != '' ? '<br />' . $this->address2 : '';
		$location .= $this->city != '' ? '<br />' . $this->city : '';
		$location .= $this->state != '' ? ', ' . $this->state : '';
		$location .= $this->zip != '' ? '<br />' . $this->zip : '';
		$location .= $this->country != '' ? '<br />' . $this->country : '';
		$this->location = $location;
	}

	private function _retrieve_registration_url() {
		if (!isset($this->externalURL)) {
			$this->_retrieve_event_details();
		}
		if ($this->externalURL != '') {
			$this->registration_url = $this->externalURL;
		} else {
			global $org_options;
			$this->registration_url = add_query_arg('ee', $this->id, get_permalink($org_options['event_page_id']));
		}
	}

	protected function _retrieve_event_details() {
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

	protected function _retrieve_categories() {
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

	protected function _retrieve_timeslots() {
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

	protected function _retrieve_status() {
		if (!isset($this->start_date))
			$this->_retrieve_event_details();
		if (!isset($this->timeslots))
			$this->_retrieve_timeslots();
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

	protected function _compute_active_state() {
		if (!isset($this->status))
			$this->_retrieve_status();
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

	public function Event($id) {
		$this->id = $id;
	}

	public function get_id() {
		return $this->id;
	}

	public function is_member_only() {
		if (!isset($this->member_only))
			$this->_retrieve_event_details();
		return $this->member_only;
	}

	public function is_use_coupon_code() {
		if (!isset($this->use_coupon_code))
			$this->_retrieve_event_details();
		return $this->use_coupon_code;
	}

	public function is_use_groupon_code() {
		if (!isset($this->use_groupon_code))
			$this->_retrieve_event_details();
		return $this->use_groupon_code;
	}

	public function is_allow_multiple() {
		if (!isset($this->allow_multiple))
			$this->_retrieve_event_details();
		return $this->allow_multiple;
	}

	public function get_start_date() {
		if (!isset($this->start_date))
			$this->_retrieve_event_details();
		return $this->start_date;
	}

	public function get_end_date() {
		if (!isset($this->end_date))
			$this->_retrieve_event_details();
		return $this->end_date;
	}

	public function get_question_groups() {
		if (!isset($this->question_groups))
			$this->_retrieve_event_details();
		return $this->question_groups;
	}

	public function get_questions() {
		if (!isset($this->questions))
			$this->_retrieve_questions();
		return $this->questions;
	}

	public function get_event_meta() {
		if (!isset($this->event_meta))
			$this->_retrieve_event_details();
		return unserialize($this->event_meta);
	}

	public function is_enable_for_gmap() {
		if (!isset($this->enable_for_gmap))
			$this->_retrieve_event_meta();
		return $this->enable_for_gmap;
	}

	public function is_display_thumb_in_regpage() {
		if (!isset($this->display_thumb_in_regpage))
			$this->_retrieve_event_meta();
		return $this->display_thumb_in_regpage;
	}

	public function get_event_thumbnail_url() {
		if (!isset($this->event_thumbnail_url))
			$this->_retrieve_event_meta();
		return $this->event_thumbnail_url;
	}

	public function get_reg_limit() {
		if (!isset($this->reg_limit))
			$this->_retrieve_event_details();
		return $this->reg_limit;
	}

	public function get_externalURL() {
		if (!isset($this->externalURL))
			$this->_retrieve_event_details();
		return $this->externalURL;
	}

	public function get_event_desc() {
		if (!isset($this->event_desc))
			$this->_retrieve_event_details();
		return $this->event_desc;
	}

	public function get_additional_limit() {
		if (!isset($this->additional_limit))
			$this->_retrieve_event_details();
		return $this->additional_limit;
	}

	public function is_display_reg_form() {
		if (!isset($this->display_reg_form))
			$this->_retrieve_event_details();
		return $this->display_reg_form;
	}

	public function is_display_desc() {
		if (!isset($this->display_desc))
			$this->_retrieve_event_details();
		return $this->display_desc;
	}

	public function get_status() {
		if (!isset($this->status))
			$this->_retrieve_status();
		return $this->status;
	}

	public function get_active_state() {
		if (!isset($this->active_state))
			$this->_compute_active_state();
		return $this->active_state;
	}

	public function get_categories() {
		if (!isset($this->categories))
			$this->_retrieve_categories();
		return $this->categories;
	}

	public function get_event_name() {
		if (!isset($this->event_name))
			$this->_retrieve_event_details();
		return $this->event_name;
	}

	public function get_registration_url() {
		if (!isset($this->registration_url))
			$this->_retrieve_registration_url();
		return $this->registration_url;
	}

	public function get_location() {
		if (!isset($this->location))
			$this->_retrieve_location();
		return $this->location;
	}

	public function get_prices() {
		if (!isset($this->prices))
			$this->_retrieve_prices();
		return $this->prices;
	}

	public function get_number_of_attendees() {
		if (!isset($this->number_of_attendees))
			$this->_retrieve_number_of_attendees();
		return $this->number_of_attendees;
	}

	public function get_number_of_available_spaces() {
		return $this->get_reg_limit() - $this->get_number_of_attendees();
	}

}