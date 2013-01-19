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
require_once ( 'EE_Base_Class.class.php' );
class EE_Answer extends EE_Base_Class{
	
	/**
	 * Answer ID
	 * 
	 * @access protected
	 * @var int
	 */
	protected $_ANS_ID=FALSE;
	
	/**
	 * ID of the related Registration
	 * @access protected
	 * @var int 
	 */
	protected $_REG_ID=NULL;
	
	/**
	 * ID of the related question
	 * @access protected
	 * @var int
	 */
	protected $_QST_ID=NULL;
	
	/**
	 * Text of answer. This is obvious for text and textarea typed questions.
	 * For check
	 * @access protected
	 * @var text 
	 */
	protected $_ANS_value=NULL;




	/**
	 * Constructor
	 * @param int $REG_ID registration ID
	 * @param int $QST_ID question ID
	 * @param string $ANS_value text representing the answer. Could be CSV'd
	 */
	public function __construct( $REG_ID=NULL, $QST_ID=NULL, $ANS_value='') {
		parent::__construct(array('REG_ID'=>$REG_ID,'QST_ID'=>$QST_ID,'ANS_value'=>$ANS_value));
	}


	/**
	*		Set	Question ID
	* 
	* 		@access		public		
	*		@param		int		$QST_ID
	*/	
	public function set_question( $QST_ID = FALSE ) {
		return $this->set('QST_ID',$QST_ID);
	}





	/**
	*		Set	Registration ID
	* 
	* 		@access		public		
	*		@param		int		$REG_ID
	*/	
	public function set_registration( $REG_ID = FALSE ) {
		return $this->set('REG_ID',$REG_ID);
	}





	/**
	*		Set	Answer value
	* 
	* 		@access		public		
	*		@param		int		$ANS_value
	*/	
	public function set_value( $ANS_value = FALSE ) {
		return $this->set('ANS_value',$ANS_value);
	}

	






	/**
	*		update existing db record
	* 
	* 		@access		public
	*/	
	public function update() {
		return $this->_save_to_db( array( 'ANS_ID' => $this->_ANS_ID ));
	}






	






	/**
	*		get Attendee ID
	* 		@access		public
	*/	
	public function ID() {
		return $this->_ANS_ID;
	}



	/**
	*		get Attendee First Name
	* 		@access		public
	*/	
	public function registration_ID() {
		return $this->_REG_ID;
	}



	/**
	*		get Attendee Last Name
	* 		@access		public
	*/	
	public function question_ID() {
		return $this->_QST_ID;
	}



	/**
	*		get Attendee Address
	* 		@access		public
	*/	
	public function value() {
		return $this->_ANS_value;
	}




}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */