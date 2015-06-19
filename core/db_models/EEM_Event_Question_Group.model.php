<?php
/**
 * model for handling has-and-belongs-to-many relatinobetween events and question groups.
 * If you want to query based on a non-primary of foreign key on this model, you can't use the EE_HABTM_Relation on Event nor or Question Group.
 * You'll need to use each's EE_Has_Many_Relation relation to this model. Eg, when querying for question groups which apply to primary attendees,
 * you'd do a query like EEM_Question_Group::instance()->get_all(array(array('Event_Question_Group.EQG_primary'=>1)));
 */
require_once( EE_CLASSES . 'EE_Event_Question_Group.class.php');

class EEM_Event_Question_Group extends EEM_Base{
	// private instance of the Attendee object
	protected static $_instance = NULL;

	protected function __construct( $timezone = NULL ) {
		$this->singular_item = __('Event to Question Group Link','event_espresso');
		$this->plural_item = __('Event to Question Group Links','event_espresso');
		$this->_tables = array(
			'Event_Question_Group'=>new EE_Primary_Table('esp_event_question_group','EQG_ID')
		);
		$this->_fields = array(
			'Event_Question_Group'=>array(
				'EQG_ID'=>new EE_Primary_Key_Int_Field('EQG_ID', __('Event to Question Group Link ID','event_espresso')),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', __('Event ID','event_espresso'), false, 0, 'Event'),
				'QSG_ID'=>new EE_Foreign_Key_Int_Field('QSG_ID', __('Question Group Id','event_espresso'), false, 0, 'Question_Group'),
				'EQG_primary'=>new EE_Boolean_Field('EQG_primary', __('Flag indicating question is only for primary attendees','event_espresso'), false, false)
			)
		);
		$this->_model_relations = array(
			'Event'=>new EE_Belongs_To_Relation(),
			'Question_Group'=>new EE_Belongs_To_Relation()
		);
		//this model is generally available for reading
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Event_Related_Public( 'Event' );
		$this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Event_Related_Protected( 'Event' );
		$this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Event_Related_Protected( 'Event' );
		$this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Event_Related_Protected( 'Event', EEM_Base::caps_edit );
		parent::__construct( $timezone );
	}




}