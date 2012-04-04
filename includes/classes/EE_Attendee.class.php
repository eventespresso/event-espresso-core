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
 * EE_Attendee class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Transaction.class.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Attendee {


    /**
    *	Transaction ID
	* 
	* 	primary key
	*	
	* 	@access	private
    *	@var int	
    */
	private $_ATT_ID = FALSE;


    /**
    *	Attendee First Name
	* 
	*	@access	private
    *	@var string	
    */
	private $_ATT_fname = NULL;


    /**
    *	Attendee Last Name
	* 
	*	@access	private
    *	@var string	
    */
	private $_ATT_lname = NULL;


    /**
    *	Attendee Address
	* 
	*	@access	private
    *	@var string	
    */
	private $_ATT_address = NULL;


    /**
    *	Attendee Address 2
	* 
	*	@access	private
    *	@var string	
    */
	private $_ATT_address2 = NULL;


    /**
    *	Attendee City
	* 
	*	@access	private
    *	@var string	
    */
	private $_ATT_city = NULL;


    /**
    *	State ID
	* 
	*	foreign key from state table
	*  
	*	@access	private
    *	@var int	
    */
	private $_STA_ID = NULL;


    /**
    *	Country ISO Code
	* 
	*	foreign key from country table
	*  
	*	@access	private
    *	@var string	
    */
	private $_CNT_ISO = NULL;


    /**
    *	Attendee Zip/Postal Code
	* 
	*	@access	private
    *	@var string	
    */
	private $_ATT_zip = NULL;


    /**
    *	Attendee Email Address
	* 
	*	@access	private
    *	@var string	
    */
	private $_ATT_email = NULL;


    /**
    *	Attendee Phone
	* 
	*	@access	private
    *	@var string	
    */
	private $_ATT_phone = NULL;


    /**
    *	Attendee Social Networking details - links, ID's, etc
	* 
	*	@access	private
    *	@var string	
    */
	private $_ATT_social = NULL;


    /**
    *	Attendee Comments (from the attendee)
	* 
	*	@access	private
    *	@var string	
    */
	private $_ATT_comments = NULL;


    /**
    *	Attendee Notes (about the attendee)
	* 
	*	@access	private
    *	@var string	
    */
	private $_ATT_notes = NULL;





	/**
	*  Attendee constructor
	*
	* @access 		public
	* @param 		string 				$ATT_fname				Attendee First Name
	* @param 		string				$ATT_lname  				Attendee Last Name
	* @param 		string 				$ATT_address  			Attendee Address
	* @param 		string				$ATT_address2 			Attendee Address2
	* @param 		string				$ATT_city 					Attendee City
	* @param 		int					$STA_ID		 				Attendee State ID
	* @param 		string 				$CNT_ISO 					Attendee Country ISO Code
	* @param 		string 				$ATT_zip 					Attendee Zip/Postal Code
	* @param 		string 				$ATT_email 				Attendee Email Address
	* @param 		string 				$ATT_phone 				Attendee Phone #
	* @param 		string		 		$ATT_social 				Attendee Social Networking details
	* @param 		string		 		$ATT_comments 		Attendee Comments (by the attendee)
	* @param 		string		 		$ATT_notes					Attendee Notes (about the attendee)
	* @param 		int 					$ATT_ID 						Attendee ID
	*/
	public function __construct( $ATT_fname='', $ATT_lname='', $ATT_address=NULL, $ATT_address2=NULL, $ATT_city=NULL, $STA_ID=NULL,$CNT_ISO=NULL,$ATT_zip=NULL,$ATT_email=NULL,$ATT_phone=NULL,$ATT_social=NULL,$ATT_comments=NULL,$ATT_notes=NULL,$ATT_ID=FALSE ) {
		$this->_ATT_ID 					= $ATT_ID;
		$this->_ATT_fname 			= $ATT_fname;
		$this->_ATT_lname 			= $ATT_lname;
		$this->_ATT_address			= $ATT_address;
		$this->_ATT_address2		= $ATT_address2;
		$this->_ATT_city				= $ATT_city;
		$this->_STA_ID					= $STA_ID;
		$this->_CNT_ISO				= $CNT_ISO;
		$this->_ATT_zip					= $ATT_zip;
		$this->_ATT_email				= $ATT_email;
		$this->_ATT_phone			= $ATT_phone;
		$this->_ATT_social				= $ATT_social;
		$this->_ATT_comments	= $ATT_comments;
		$this->_ATT_notes				= $ATT_notes;
	}






	/**
	*		Set Attendee First Name
	* 
	* 		@access		public		
	*		@param		string		$fname
	*/	
	public function set_fname( $fname = FALSE ) {
		
		global $espresso_notices;
		if ( ! $fname ) {
			$espresso_notices['errors'][] = 'No first name was supplied.';
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
		
		global $espresso_notices;
		if ( ! $lname ) {
			$espresso_notices['errors'][] = 'No last name was supplied.';
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
		
		global $espresso_notices;
		if ( ! $lname ) {
			$espresso_notices['errors'][] = 'No address was supplied.';
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
		
		global $espresso_notices;
		if ( ! $address2 ) {
			$espresso_notices['errors'][] = 'No address was supplied.';
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
		
		global $espresso_notices;
		if ( ! $city ) {
			$espresso_notices['errors'][] = 'No city was supplied.';
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
		
		global $espresso_notices;
		if ( ! $STA_ID ) {
			$espresso_notices['errors'][] = 'No state ID was supplied.';
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
		
		global $espresso_notices;
		if ( ! $CNT_ISO ) {
			$espresso_notices['errors'][] = 'No country ISO code was supplied.';
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
		
		global $espresso_notices;
		if ( ! $zip ) {
			$espresso_notices['errors'][] = 'No zip/postal code was supplied.';
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
		
		global $espresso_notices;
		if ( ! $email ) {
			$espresso_notices['errors'][] = 'No email address was supplied.';
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
		
		global $espresso_notices;
		if ( ! $phone ) {
			$espresso_notices['errors'][] = 'No phone number was supplied.';
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
		
		global $espresso_notices;
		if ( ! $social ) {
			$espresso_notices['errors'][] = 'No social networking details were supplied.';
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
		
		global $espresso_notices;
		if ( ! $comments ) {
			$espresso_notices['errors'][] = 'No comments were supplied.';
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
		
		global $espresso_notices;
		if ( ! $notes ) {
			$espresso_notices['errors'][] = 'No notes were supplied.';
			return FALSE;
		}	
		$this->_ATT_notes = wp_strip_all_tags( $notes );
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
				'ATT_notes'				=> $this->_ATT_notes
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
		return $this->_STA_ID;
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
	*		get Attendee Attendee Comments (by the attendee)
	* 		@access		public
	*/	
	public function comments() {
		return $this->_ATT_comments;
	}



	/**
	*		get Attendee Attendee Notes (about the attendee)
	* 		@access		public
	*/	
	public function notes() {
		return $this->_ATT_notes;
	}










	/**
	 *		@ override magic methods
	 *		@ return void
	 */	
	public function __get($a) { return FALSE; }
	public function __set($a,$b) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }


}

/* End of file EE_Attendee.class.php */
/* Location: /includes/classes/EE_Attendee.class.php */