<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Answer class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Answer {
	/**
	 * Answer ID
	 * 
	 * @access private
	 * @var int
	 */
	private $_ANS_ID=FALSE;
	
	/**
	 * ID of the related Registration
	 * @access private
	 * @var int 
	 */
	private $_REG_ID=NULL;
	
	/**
	 * ID of the related question
	 * @access private
	 * @var int
	 */
	private $_QST_ID=NULL;
	
	/**
	 * Text of answer. This is obvious for text and textarea typed questions.
	 * For check
	 * @access private
	 * @var text 
	 */
	private $_ANS_answer=NULL;





	public function __construct(  ) {
		$this->_ATT_ID 					= absint( $ATT_ID );
		$this->_ATT_fname 			= 	htmlentities( wp_strip_all_tags( $ATT_fname ), ENT_QUOTES, 'UTF-8' ); 
		$this->_ATT_lname 			= htmlentities( wp_strip_all_tags( $ATT_lname ), ENT_QUOTES, 'UTF-8' );
		$this->_ATT_address			= htmlentities( wp_strip_all_tags( $ATT_address ), ENT_QUOTES, 'UTF-8' );
		$this->_ATT_address2		= htmlentities( wp_strip_all_tags( $ATT_address2 ), ENT_QUOTES, 'UTF-8' );
		$this->_ATT_city				= htmlentities( wp_strip_all_tags( $ATT_city ), ENT_QUOTES, 'UTF-8' );
		$this->_STA_ID					= wp_strip_all_tags( $STA_ID );
		$this->_CNT_ISO				= wp_strip_all_tags( $CNT_ISO );
		$this->_ATT_zip					= wp_strip_all_tags( $ATT_zip );
		$this->_ATT_email				= sanitize_email( $ATT_email );
		$this->_ATT_phone			= htmlentities( wp_strip_all_tags( $ATT_phone ), ENT_QUOTES, 'UTF-8' );
		$this->_ATT_social				= htmlentities( wp_strip_all_tags( $ATT_social ), ENT_QUOTES, 'UTF-8' );
		$this->_ATT_comments	= htmlentities( wp_strip_all_tags( $ATT_comments ), ENT_QUOTES, 'UTF-8' );
		$this->_ATT_notes				= htmlentities( wp_strip_all_tags( $ATT_notes ), ENT_QUOTES, 'UTF-8' );
		$this->_ATT_deleted			= absint( $ATT_deleted ) === 1 ? TRUE : FALSE;
	}






	/**
	*		Set Attendee First Name
	* 
	* 		@access		public		
	*		@param		string		$fname
	*/	
	public function set_fname( $fname = FALSE ) {
		
		if ( ! $fname ) {
			$msg = __( 'No first name was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_ATT_fname = wp_strip_all_tags( $fname );
		return TRUE;
	}





	/**
	*		Set Attendee Last Name
	* 
	* 		@access		public		
	*		@param		string		$lname
	*/	
	public function set_lname( $lname = FALSE ) {
		
		if ( ! $lname ) {
			$msg = __( 'No last name was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_ATT_lname = wp_strip_all_tags( $lname );
		return TRUE;
	}





	/**
	*		Set Attendee Address
	* 
	* 		@access		public		
	*		@param		string		$address
	*/	
	public function set_address( $address = FALSE ) {
		
		if ( ! $lname ) {
			$msg = __( 'No address was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_ATT_address = wp_strip_all_tags( $address );
		return TRUE;
	}





	/**
	*		Set Attendee Address2
	* 
	* 		@access		public		
	*		@param		string		$address2
	*/	
	public function set_address2( $address2 = FALSE ) {
		
		if ( ! $address2 ) {
			$msg = __( 'No second address was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_ATT_address2 = wp_strip_all_tags( $address2 );
		return TRUE;
	}





	/**
	*		Set Attendee City
	* 
	* 		@access		public		
	*		@param		string		$city
	*/	
	public function set_city( $city = FALSE ) {
		
		if ( ! $city ) {
			$msg = __( 'No city was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_ATT_city = wp_strip_all_tags( $city );
		return TRUE;
	}





	/**
	*		Set Attendee State ID
	* 
	* 		@access		public		
	*		@param		int		$STA_ID
	*/	
	public function set_state( $STA_ID = FALSE ) {
		
		if ( ! $STA_ID ) {
			$msg = __( 'No state ID was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_STA_ID = absint( $STA_ID );
		return TRUE;
	}





	/**
	*		Set Attendee Country ISO Code
	* 
	* 		@access		public		
	*		@param		string		$CNT_ISO
	*/	
	public function set_country( $CNT_ISO = FALSE ) {
		
		if ( ! $CNT_ISO ) {
			$msg = __( 'No country ISO code was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_CNT_ISO = wp_strip_all_tags( $CNT_ISO );
		return TRUE;
	}





	/**
	*		Set Attendee Zip/Postal Code
	* 
	* 		@access		public		
	*		@param		string		$zip
	*/	
	public function set_zip( $zip = FALSE ) {
		
		if ( ! $zip ) {
			$msg = __( 'No zip/postal code was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_ATT_zip = wp_strip_all_tags( $zip );
		return TRUE;
	}





	/**
	*		Set Attendee Email Address
	* 
	* 		@access		public		
	*		@param		string		$email
	*/	
	public function set_email( $email = FALSE ) {
		
		if ( ! $email ) {
			$msg = __( 'No email address was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_ATT_email = sanitize_email( $email );
		return TRUE;
	}





	/**
	*		Set Attendee Phone
	* 
	* 		@access		public		
	*		@param		string		$phone
	*/	
	public function set_phone( $phone = FALSE ) {
		
		if ( ! $phone ) {
			$msg = __( 'No phone number was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_ATT_phone = wp_strip_all_tags( $phone );
		return TRUE;
	}





	/**
	*		Set Attendee Social Networking details
	* 
	* 		@access		public		
	*		@param		string		$social
	*/	
	public function set_social( $social = FALSE ) {
		
		if ( ! $social ) {
			$msg = __( 'No social networking details were supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_ATT_phone = wp_kses_data( $social );
		return TRUE;
	}





	/**
	*		Set Attendee Comments (by the attendee)
	* 
	* 		@access		public		
	*		@param		string		$comments
	*/	
	public function set_comments( $comments = FALSE ) {
		
		if ( ! $comments ) {
			$msg = __( 'No comments were supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_ATT_phone = wp_strip_all_tags( $comments );
		return TRUE;
	}





	/**
	*		Set Attendee Notes (about the attendee)
	* 
	* 		@access		public		
	*		@param		string		$notes
	*/	
	public function set_notes( $notes = FALSE ) {
		
		if ( ! $notes ) {
			$msg = __( 'No notes were supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_ATT_notes = wp_strip_all_tags( $notes );
		return TRUE;
	}





	/**
	*		set deleted
	* 
	* 		@access		public
	*		@param		bool		ATT_deleted
	*/
	public function set_deleted( $ATT_deleted = NULL ) {

		if ( $ATT_deleted == NULL ) {
			$msg = __( 'No deleted boolean flag was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_ATT_deleted = (bool)absint( $ATT_deleted );
		return TRUE;
	}





	/**
	*		save object to db
	* 
	* 		@access		private
	* 		@param		array		$where_cols_n_values		
	*/	
	private function _save_to_db( $where_cols_n_values = FALSE ) {
		
		 $MODEL = EEM_Attendee::instance();
		
		$set_column_values = array(		
				'ATT_fname' 			=> $this->_ATT_fname,
				'ATT_lname' 			=> $this->_ATT_lname,
				'ATT_address'			=> $this->_ATT_address,
				'ATT_address2'		=> $this->_ATT_address2,
				'ATT_city'					=> $this->_ATT_city,
				'STA_ID'					=> $this->_STA_ID,
				'CNT_ISO'				=> $this->_CNT_ISO,
				'ATT_zip'					=> $this->_ATT_zip,
				'ATT_email'				=> $this->_ATT_email,
				'ATT_phone'			=> $this->_ATT_phone,
				'ATT_social'				=> $this->_ATT_social,
				'ATT_comments'		=> $this->_ATT_comments,
				'ATT_notes'				=> $this->_ATT_notes,
				'ATT_deleted'			=> $this->_ATT_deleted
		);

		if ( $where_cols_n_values ){
			$results = $MODEL->update ( $set_column_values, $where_cols_n_values );
		} else {
			$results = $MODEL->insert ( $set_column_values );
		}
		
		return $results;
	}






	/**
	*		update existing db record
	* 
	* 		@access		public
	*/	
	public function update() {
		return $this->_save_to_db( array( 'ATT_ID' => $this->_ATT_ID ));
	}






	/**
	*		insert new db record
	* 
	* 		@access		public
	*/	
	public function insert() {
		return $this->_save_to_db();
	}






	/**
	*		get Attendee ID
	* 		@access		public
	*/	
	public function ID() {
		return $this->_ATT_ID;
	}



	/**
	*		get Attendee First Name
	* 		@access		public
	*/	
	public function fname() {
		return $this->_ATT_fname;
	}



	/**
	*		get Attendee Last Name
	* 		@access		public
	*/	
	public function lname() {
		return $this->_ATT_lname;
	}



	/**
	*		get Attendee Address
	* 		@access		public
	*/	
	public function address() {
		return $this->_ATT_address;
	}



	/**
	*		get Attendee Address2
	* 		@access		public
	*/	
	public function address2() {
		return $this->_ATT_address2;
	}



	/**
	*		get Attendee City
	* 		@access		public
	*/	
	public function city() {
		return $this->_ATT_city;
	}



	/**
	*		get Attendee State ID
	* 		@access		public
	*/	
	public function state_ID() {
		return ! empty( $this->_STA_ID ) ? $this->_STA_ID : '';
	}



	/**
	*		get Attendee Country ISO Code
	* 		@access		public
	*/	
	public function country_ISO() {
		return $this->_CNT_ISO;
	}



	/**
	*		get Attendee Zip/Postal Code
	* 		@access		public
	*/	
	public function zip() {
		return $this->_ATT_zip;
	}



	/**
	*		get Attendee Email Address
	* 		@access		public
	*/	
	public function email() {
		return $this->_ATT_email;
	}



	/**
	*		get Attendee Phone #
	* 		@access		public
	*/	
	public function phone() {
		return $this->_ATT_phone;
	}



	/**
	*		get Attendee Social Networking details
	* 		@access		public
	*/	
	public function social() {
		return $this->_ATT_social;
	}



	/**
	*		get Attendee Comments (by the attendee)
	* 		@access		public
	*/	
	public function comments() {
		return $this->_ATT_comments;
	}



	/**
	*		get Attendee Notes (about the attendee)
	* 		@access		public
	*/	
	public function notes() {
		return $this->_ATT_notes;
	}


	/**
	*	get deleted
	* 	@access		public
	* 	@return 		bool
	*/
	public function deleted() {
		return $this->_ATT_deleted;
	}





}

/* End of file EE_Attendee.class.php */
/* Location: /includes/classes/EE_Attendee.class.php */