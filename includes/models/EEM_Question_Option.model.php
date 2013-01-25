<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.1.P.7
 *
 * ------------------------------------------------------------------------
 *
 * Question Group Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_TempBase.model.php' );

class EEM_Question_Option extends EEM_TempBase {

  	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Question_Option instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Attendee already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Attendee object
		return self::$_instance;
	}

	protected function __construct(){
		$this->_fields_settings=array(
					'QSO_ID'=>new EE_Model_Field('Question Option ID', 'primary_key', false, null, null, null),
					'QSO_name'=>new EE_Model_Field('Question option Display Name', 'simplehtml', false, '', null, null),
					'QSO_value'=>new EE_Model_Field('QUestion Option Value', 'plaintext', false, '', null, null),
					'QST_ID'=>new EE_Model_Field('Related Question ID', 'foreign_key', false, null, null, 'Question'),
					'QSO_deleted'=>new EE_Model_Field('Whether the option has been deleted', 'bool', false, false, null, null)
								);
		$this->_related_models=array(
								'Question'=>new EE_Model_Relation('belongsTo', 'Question', 'QST_ID')
						);
		
		parent::__construct();
	}


	/**
	*		delete  a single question option from db via their ID
	*		actually just marks it as deleted, but doesn't really remove the question.
	 *		This is handy because we might not want to remove all old ANSWERS which relate to thsi question option
	* 		@access		public
	* 		@param		$ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function delete_by_ID( $ID = FALSE ) {
		if ( ! $ID ) {
			return FALSE;
		}		
		// mark an option as deleted
		$where_cols_n_values = array( 'QSO_ID' => $ID );
		if ( $question = $this->update (array("QSO_deleted"=>true), $where_cols_n_values )) {
			return TRUE;
		} else {
			return FALSE;
		}

	}




}
// End of file EEM_Question_Option.model.php
// Location: /ee-mvc/models/EEM_Question_Option.model.php