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
	
	static protected $_fieldSettings=array('ANS_ID'=>array('type'=>'primary_key','nullable'=>false,'nicename'=>'Answer ID'),
						'REG_ID'=>array('type'=>'foreign_key','class'=>'Registration','nullable'=>false,'nicename'=>'Registration ID'),
						'QST_ID'=>array('type'=>'foreign_key','class'=>'Question','nullable'=>false,'nicename'=>'Question ID'),
						'ANS_value'=>array('type'=>'string','nullable'=>false,'nicename'=>'Answer Value/Text'));
			
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
		$this->_REG_ID 				= absint( $REG_ID );
		$this->_QST_ID 					= absint( $QST_ID );
		$this->_ANS_value 			= 	htmlentities( wp_strip_all_tags( $ANS_value ), ENT_QUOTES, 'UTF-8' ); 
	}


	/**
	*		Set	Question ID
	* 
	* 		@access		public		
	*		@param		int		$QST_ID
	*/	
	public function set_question( $QST_ID = FALSE ) {
		if ( ! $this->_check_for( $QST_ID, 'Question ID' )) { return FALSE; }
		$this->_QST_ID = absint( $QST_ID );
		return TRUE;
	}





	/**
	*		Set	Registration ID
	* 
	* 		@access		public		
	*		@param		int		$REG_ID
	*/	
	public function set_registration( $REG_ID = FALSE ) {
		if ( ! $this->_check_for( $REG_ID, 'Registration ID' )) { return FALSE; }
		$this->_REG_ID = absint( $REG_ID );
		return TRUE;
	}





	/**
	*		Set	Answer value
	* 
	* 		@access		public		
	*		@param		int		$ANS_value
	*/	
	public function set_value( $ANS_value = FALSE ) {
		if ( ! $this->_check_for( $ANS_value, 'Value ID' )) { return FALSE; }
		$this->_ANS_value = htmlentities(wp_strip_all_tags( $ANS_value ));
		return TRUE;
	}

	/**
	*		save object to db
	* 
	* 		@access		private
	* 		@param		array		$where_cols_n_values		
	*		@return int, 1 on a successful update, the ID of
	*					the new entry on insert; 0 on failure		
	
	*/	
	private function _save_to_db( $where_cols_n_values = FALSE ) {
		//@todo implement saaving of answers to db
		 $MODEL = EEM_Answer::instance();
		
		$set_column_values = array(		
				'REG_ID'=>$this->_REG_ID,
				'QST_ID'=>$this->_QST_ID,
				'ANS_value'=>$this->_ANS_value
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