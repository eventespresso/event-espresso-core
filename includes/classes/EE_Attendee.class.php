<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
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

	private $id;
	private $registration_id;
	private $fname;
	private $lname;
	private $email;
	private $address;
	private $address2;
	private $city;
	private $state;
	private $zip;
	private $country_id;
	private $phone;
	private $organization_name;
	private $vat_number;
	private $date;
	private $payment;
	private $payment_status;
	private $txn_type;
	private $txn_id;
	private $amount_pd;
	private $total_cost;
	private $price_option;
	private $coupon_code;
	private $quantity;
	private $payment_date;
	private $event_id;
	private $event_time;
	private $end_time;
	private $start_date;
	private $end_date;
	private $attendee_session;
	private $transaction_details;
	private $pre_approve;
	private $checked_in;
	private $checked_in_quantity;
	private $hashSalt;





	/**
	 * Attendee constructor
	 *
	 * @access 		public		
	 * @param 		int 			$id 		the attendee id
	 * @return 		void			
	 */
	public function __construct( $id = NULL ) {
	
		if ( ! empty($id) ) {
		
			$this->id = $id;
			
		} else {
		
			global $wpdb;
			
			$sql = array('registration_id' => '');
			$sql_data = array('%s');
			
			$wpdb->insert(EVENTS_ATTENDEE_TABLE, $sql, $sql_data);
			$this->id = $wpdb->insert_id;
			
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