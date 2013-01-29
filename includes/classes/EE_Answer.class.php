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
	 * Related question, lazy-loaded
	 * @access protected
	 * @var EE_Question[] 
	 */
	protected $_Question;
	
	/**
	 * Related registration, lazy-loaded
	 * @access protected
	 * @var EE_Registration[] 
	 */
	protected $_Registration;


	/**
	 * Constructor
	 * @param int $REG_ID registration ID OR an array of all field values, where keys match these arguments' names
	 * @param int $QST_ID question ID
	 * @param string $ANS_value text representing the answer. Could be CSV'd
	 */
	public function __construct( $REG_ID=NULL, $QST_ID=NULL, $ANS_value='') {
		//if the first parameter is an array, assume it's an array of key-value pairs for this object
		if(is_array($REG_ID)){
			parent::__construct($REG_ID);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);
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
	*		get Attendee First Name
	* 		@access		public
	 *		@return		int
	*/	
	public function registration_ID() {
		return $this->get('REG_ID');
	}



	/**
	*		get Attendee Last Name
	* 		@access		public
	 *		@return		int
	*/	
	public function question_ID() {
		return $this->get('QST_ID');
	}



	/**
	*		get Attendee Address
	* 		@access		public
	 *		@return		string
	*/	
	public function value() {
		return $this->get('ANS_value');
	}
	/**
	 * Gets the related EE_Question to this EE_Answer
	 * @return EE_Question
	 */
	public function question(){
		return $this->_get_first_related('Question');
	}
	/**
	 * Gets teh realted EE_Registration to this EE_Answer
	 * @return EE_Registration
	 */
	public function registration(){
		return $this->_get_first_related('Registration');
	}


}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */