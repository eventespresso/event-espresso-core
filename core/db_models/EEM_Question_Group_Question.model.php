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
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEM_Question_Group_Question
 *
 * model for simple join relationship between Questions and Question Groups.
 * Client code will probably never need to use this, as you can easily query questions by question group
 * (and the inverse) using the HABTM relationship present on either; and there's no additional fields on this
 * model other than keys.
 *
 * @package			Event Espresso
 * @subpackage	includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );
require_once( EE_CLASSES . 'EE_Question_Group_Question.class.php');
class EEM_Question_Group_Question extends EEM_Base {

  	// private instance of the Attendee object
	protected static $_instance = NULL;


	protected function __construct( $timezone = NULL ) {
		$this->singular_item = __('Question Group to Question Link','event_espresso');
		$this->plural_item = __('Question Group to Question Links','event_espresso');
		$this->_tables = array(
			'Question_Group_Question'=>new EE_Primary_Table('esp_question_group_question','QGQ_ID')
		);
		$this->_fields = array(
			'Question_Group_Question'=>array(
				'QGQ_ID'=>new EE_Primary_Key_Int_Field('QGQ_ID', __('Question Group to Question Link ID','event_espresso')),
				'QSG_ID'=>new EE_Foreign_Key_Int_Field('QSG_ID', __('Question Group ID','event_espresso'), false, 0, 'Question_Group'),
				'QST_ID'=>new EE_Foreign_Key_Int_Field('QST_ID', __('Question Id','event_espresso'), false, 0, 'Question'),
				'QGQ_order' => new EE_Integer_Field('QGQ_order', __('Question Group Question Order', 'event_espresso'), false, 0 )
			)
		);
		$this->_model_relations = array(
			'Question_Group'=>new EE_Belongs_To_Relation(),
			'Question'=>new EE_Belongs_To_Relation()
		);

		$this->_model_chain_to_wp_user = 'Question_Group';
		//this model is generally available for reading
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
		$this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Reg_Form('Question_Group.QSG_system');
		$this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Reg_Form('Question_Group.QSG_system');
		$this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Reg_Form('Question_Group.QSG_system');
		//use the caps for question groups
		$this->_caps_slug = 'question_groups';
		parent::__construct( $timezone );
	}



}