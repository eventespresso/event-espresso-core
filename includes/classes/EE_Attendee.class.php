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
 * @ since		 		4.0
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
class EE_Attendee extends EE_Base_Class{


    /**
    *	Transaction ID
	* 
	* 	primary key
	*	
	* 	@access	protected
    *	@var int	
    */
	protected $_ATT_ID = FALSE;


    /**
    *	Attendee First Name
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_fname = NULL;


    /**
    *	Attendee Last Name
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_lname = NULL;


    /**
    *	Attendee Address
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_address = NULL;


    /**
    *	Attendee Address 2
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_address2 = NULL;


    /**
    *	Attendee City
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_city = NULL;


    /**
    *	State ID
	* 
	*	foreign key from state table
	*  
	*	@access	protected
    *	@var int	
    */
	protected $_STA_ID = NULL;


    /**
    *	Country ISO Code
	* 
	*	foreign key from country table
	*  
	*	@access	protected
    *	@var string	
    */
	protected $_CNT_ISO = NULL;


    /**
    *	Attendee Zip/Postal Code
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_zip = NULL;


    /**
    *	Attendee Email Address
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_email = NULL;


    /**
    *	Attendee Phone
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_phone = NULL;


    /**
    *	Attendee Social Networking details - links, ID's, etc
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_social = NULL;


    /**
    *	Attendee Comments (from the attendee)
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_comments = NULL;


    /**
    *	Attendee Notes (about the attendee)
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_ATT_notes = NULL;


    /**
    *	Whether this Attendee has been moved to the trash
	* 
	*	@access	protected
    *	@var boolean	
    */
	protected $_ATT_deleted = FALSE;
	
	/**
	 *
	 * @var EE_Registration[]
	 */
	protected $_Registration=NULL;



	/**
	 * Will hold an array of events attached to this attendee (attached by others not on instantiating)
	 * @var EE_Event[]
	 */
	protected $_Event = array();





	/**
	*  Attendee constructor
	*
	* @access 		public
	* @param 		string/array 				$ATT_fname				Attendee First Name, or array of all field values, keys being column names
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
	* @param 		string		 		$ATT_deleted					Whether this Attendee has been moved to the trash
	* @param 		int 					$ATT_ID 						Attendee ID
	*/
	public function __construct( $ATT_fname='', $ATT_lname='', $ATT_address=NULL, $ATT_address2=NULL, $ATT_city=NULL, $STA_ID=NULL, $CNT_ISO=NULL, $ATT_zip=NULL, $ATT_email=NULL, $ATT_phone=NULL, $ATT_social=NULL, $ATT_comments=NULL, $ATT_notes=NULL, $ATT_deleted=FALSE,$ATT_ID=FALSE ) {
		/* @todo consolidate this logic by using constructor like EE_Answer, and ensuring each of EEM_Attendee's _field_settings has a type that performs the logic
		 * of removing html tags, encoding htmlentities, etc.
		 */
		if(is_array($ATT_fname)){
			parent::__construct($ATT_fname);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);
//		$this->_ATT_ID 					= absint( $ATT_ID );
//		$this->_ATT_fname 			= 	htmlentities( wp_strip_all_tags( $ATT_fname ), ENT_QUOTES, 'UTF-8' ); 
//		$this->_ATT_lname 			= htmlentities( wp_strip_all_tags( $ATT_lname ), ENT_QUOTES, 'UTF-8' );
//		$this->_ATT_address			= htmlentities( wp_strip_all_tags( $ATT_address ), ENT_QUOTES, 'UTF-8' );
//		$this->_ATT_address2		= htmlentities( wp_strip_all_tags( $ATT_address2 ), ENT_QUOTES, 'UTF-8' );
//		$this->_ATT_city				= htmlentities( wp_strip_all_tags( $ATT_city ), ENT_QUOTES, 'UTF-8' );
//		$this->_STA_ID					= wp_strip_all_tags( $STA_ID );
//		$this->_CNT_ISO				= wp_strip_all_tags( $CNT_ISO );
//		$this->_ATT_zip					= wp_strip_all_tags( $ATT_zip );
//		$this->_ATT_email				= sanitize_email( $ATT_email );
//		$this->_ATT_phone			= htmlentities( wp_strip_all_tags( $ATT_phone ), ENT_QUOTES, 'UTF-8' );
//		$this->_ATT_social				= htmlentities( wp_strip_all_tags( $ATT_social ), ENT_QUOTES, 'UTF-8' );
//		$this->_ATT_comments	= htmlentities( wp_strip_all_tags( $ATT_comments ), ENT_QUOTES, 'UTF-8' );
//		$this->_ATT_notes				= htmlentities( wp_strip_all_tags( $ATT_notes ), ENT_QUOTES, 'UTF-8' );
//		$this->_ATT_deleted			= absint( $ATT_deleted ) === 1 ? TRUE : FALSE;
//		parent::__construct();
	}






	/**
	*		Set Attendee First Name
	* 
	* 		@access		public		
	*		@param		string		$fname
	*/	
	public function set_fname( $fname = FALSE ) {
		$this->set('ATT_fname',$fname);
	}





	/**
	*		Set Attendee Last Name
	* 
	* 		@access		public		
	*		@param		string		$lname
	*/	
	public function set_lname( $lname = FALSE ) {
		$this->set('ATT_lname',$lname);
	}





	/**
	*		Set Attendee Address
	* 
	* 		@access		public		
	*		@param		string		$address
	*/	
	public function set_address( $address = FALSE ) {
		$this->set('ATT_address',$address);
	}





	/**
	*		Set Attendee Address2
	* 
	* 		@access		public		
	*		@param		string		$address2
	*/	
	public function set_address2( $address2 = FALSE ) {
		$this->set('ATT_address2',$address2);
	}





	/**
	*		Set Attendee City
	* 
	* 		@access		public		
	*		@param		string		$city
	*/	
	public function set_city( $city = FALSE ) {
		
		$this->set('ATT_city',$city);
	}





	/**
	*		Set Attendee State ID
	* 
	* 		@access		public		
	*		@param		int		$STA_ID
	*/	
	public function set_state( $STA_ID = FALSE ) {
		
		$this->set('STA_ID',$STA_ID);
	}





	/**
	*		Set Attendee Country ISO Code
	* 
	* 		@access		public		
	*		@param		string		$CNT_ISO
	*/	
	public function set_country( $CNT_ISO = FALSE ) {
		
		$this->set('CNT_ISO',$CNT_ISO);
	}





	/**
	*		Set Attendee Zip/Postal Code
	* 
	* 		@access		public		
	*		@param		string		$zip
	*/	
	public function set_zip( $zip = FALSE ) {
		$this->set('ATT_zip',$zip);
	}





	/**
	*		Set Attendee Email Address
	* 
	* 		@access		public		
	*		@param		string		$email
	*/	
	public function set_email( $email = FALSE ) {
		$this->set('ATT_email',$email);
	}





	/**
	*		Set Attendee Phone
	* 
	* 		@access		public		
	*		@param		string		$phone
	*/	
	public function set_phone( $phone = FALSE ) {
		
		$this->set('ATT_phone',$phone);
	}





	/**
	*		Set Attendee Social Networking details
	* 
	* 		@access		public		
	*		@param		string		$social
	*/	
	public function set_social( $social = FALSE ) {
		
		$this->set('ATT_social',$social);
	}





	/**
	*		Set Attendee Comments (by the attendee)
	* 
	* 		@access		public		
	*		@param		string		$comments
	*/	
	public function set_comments( $comments = FALSE ) {
		$this->set('ATT_comments',$comments);
	}





	/**
	*		Set Attendee Notes (about the attendee)
	* 
	* 		@access		public		
	*		@param		string		$notes
	*/	
	public function set_notes( $notes = FALSE ) {
		$this->set('ATT_notes',$notes);
	}





	/**
	*		set deleted
	* 
	* 		@access		public
	*		@param		bool		ATT_deleted
	*/
	public function set_deleted( $ATT_deleted = NULL ) {
		$this->set('ATT_deleted',$ATT_deleted);
	}


	/**
	*		get Attendee First Name
	* 		@access		public
	*/	
	public function fname() {
		return $this->get('ATT_fname');
	}
	
	
	
	
	
	/**
	 * echoes out the attendee's first name
	 */
	public function e_full_name(){
		echo $this->full_name();
	}
	
	
	
	
	
	/**
	 * Returns the first and last name concatenated together with a space.
	 * @return string
	 */
	public function full_name(){
		return $this->fname()." ".$this->lname();
	}

	
	


	/**
	*		get Attendee Last Name
	* 		@access		public
	*/	
	public function lname() {
		return $this->get('ATT_lname');
	}



	/**
	*		get Attendee Address
	* 		@access		public
	*/	
	public function address() {
		return $this->get('ATT_address');
	}



	/**
	*		get Attendee Address2
	* 		@access		public
	*/	
	public function address2() {
		return $this->get('ATT_address2');
	}



	/**
	*		get Attendee City
	* 		@access		public
	*/	
	public function city() {
		return $this->get('ATT_city');
	}



	/**
	*		get Attendee State ID
	* 		@access		public
	*/	
	public function state_ID() {
		return $this->get('STA_ID');
	}



	/**
	*		get Attendee Country ISO Code
	* 		@access		public
	*/	
	public function country_ISO() {
		return $this->get('CNT_ISO');
	}



	/**
	*		get Attendee Zip/Postal Code
	* 		@access		public
	*/	
	public function zip() {
		return $this->get('ATT_zip');
	}



	/**
	*		get Attendee Email Address
	* 		@access		public
	*/	
	public function email() {
		return $this->get('ATT_email');
	}



	/**
	*		get Attendee Phone #
	* 		@access		public
	*/	
	public function phone() {
		return $this->get('ATT_phone');
	}



	/**
	*		get Attendee Social Networking details
	* 		@access		public
	*/	
	public function social() {
		return $this->get('ATT_social');
	}



	/**
	*		get Attendee Comments (by the attendee)
	* 		@access		public
	*/	
	public function comments() {
		return $this->get('ATT_comments');
	}



	/**
	*		get Attendee Notes (about the attendee)
	* 		@access		public
	*/	
	public function notes() {
		return $this->get('ATT_notes');
	}


	/**
	*	get deleted
	* 	@access		public
	* 	@return 		bool
	*/
	public function deleted() {
		return $this->get('ATT_deleted');
	}




	/**
	 * Gets a maximum of 100 related registrations
	 * @return EE_Registration[] UNLESS $output='count', in which case INT
	 */
	public function get_registrations($query_params = array()){
		return $this->get_many_related('Registration',$query_params);
	}
	
	/**
	 * Gets the most recent registration of this attendee
	 * @return EE_Registration
	 */
	public function get_most_recent_registration(){
		return $this->get_first_related('Registration', array('order_by'=>array('REG_date'=>'DESC')));//null, 'REG_date', 'DESC', '=', 'OBJECT_K');
	}

	/**
	 * returns any events attached to this attendee ($_Event property);
	 * @return array 
	 */
	public function events() {

		if ( empty( $this->_Event ) ){
			//first we'd have to get all the registrations for this attendee
			$registrations = $this->get_registrations();

			//now we have to loop through each registration and assemble an array of events
			foreach ( $registrations as $reg ) {
				$this->_Event[] = $reg->event();
			}
			
		}


		return $this->_Event;
	}
}

/* End of file EE_Attendee.class.php */
/* Location: /includes/classes/EE_Attendee.class.php */