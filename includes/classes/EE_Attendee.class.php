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
 * ------------------------------------------------------------------------
 *
 * EE_Attendee class
 *
 * @package				Event Espresso
 * @subpackage			/includes/classes/
 * @author					Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EE_Attendee {

	public $id;
	public $is_primary;
	public $fname;
	public $lname;
	public $email;
	public $address;
	public $address2;
	public $city;
	public $state;
	public $zip;
	public $country_id;
	public $phone;
	public $attendee_session;
	public $social_networks;
	public $status_id;
	public $comments;
	public $notes;






	/**
	 * Attendee constructor
	 *
	 * @access 		public
	 * @param 		int 			$id 		the attendee id
	 * @return 		void
	 */
	public function __construct( $id = NULL ) {
		$this->id = $id;
	}

	public function poplulate_attendee_details_from_array($attendee) {
		foreach ($attendee as $key => $value) {
			$this->$key = $value;
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
	public function set_registration_id($registration_id) {
		$this->registration_id = $registration_id;
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
	public function add_attendee_answers($questions, $response_source) {

		foreach ($questions as $question) {

			if ($question->question_type == "MULTIPLE") {

				$value_string = '';
				if (!empty($response_source[$question->question_type . '_' . $question->id])) {
					for ($i = 0; $i < count($response_source[$question->question_type . '_' . $question->id]); $i++) {
						$value_string .= trim($response_source[$question->question_type . '_' . $question->id][$i]) . ",";
					}
				}

			} else {

				if (empty($question->system_name)) {
					$value_string = $response_source[$question->question_type . '_' . $question->id];
				} else {
					$value_string = $response_source[$question->system_name];
				}

			}

			$sql = "INSERT INTO " . EVENTS_ANSWER_TABLE;
			$sql .= " (registration_id, attendee_id, question_id, answer) ";
			$sql .= "VALUES ('" . $this->registration_id . "', '" . $this->attendee_id;
			$sql .= "', '" . $question->id . "', '" . $value_string . "')";
			$wpdb->query($sql);

		}
	}

}

/* End of file EE_Attendee.class.php */
/* Location: /includes/classes/EE_Attendee.class.php */
