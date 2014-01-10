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
 * EE_Answer class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_CLASSES . 'EE_Base_Class.class.php' );
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
	 * @var string 
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
	 * 
	 * @param type $props_n_values
	 * @return EE_Answer
	 */
	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
//		d( $has_object );
		return $has_object ? $has_object : new self( $props_n_values);
	}

	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Answer
	 */
	public static function new_instance_from_db ( $props_n_values = array() ) {
		$classname = __CLASS__;
//		$mapped_object = parent::_get_object_from_entity_mapper($props_n_values, $classname);
//		d( $mapped_object );
//		return $mapped_object ? $mapped_object : new self( $props_n_values, TRUE );
		return new self( $props_n_values, TRUE );
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
	 * Gets a pretty form of the value (mostly applies to answers that have multiple answers)
	 * @return string
	 */
	public function pretty_value($schema = null){
		return $this->get_pretty('ANS_value',$schema);
	}
	/**
	 * Echoes out a pretty value (even for multichoice-options)
	 * @param string $schema
	 * @return void
	 */
	public function e_value($schema = null){
		return $this->e('ANS_value',$schema);
	}
	/**
	 * Gets the related EE_Question to this EE_Answer
	 * @return EE_Question
	 */
	public function question(){
		return $this->get_first_related('Question');
	}
	/**
	 * Gets teh realted EE_Registration to this EE_Answer
	 * @return EE_Registration
	 */
	public function registration(){
		return $this->get_first_related('Registration');
	}


}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */