<?php

/**
 * model for handling has-and-belongs-to-many relatinobetween events and venues
 * If you want to query based on a non-primary of foreign key on this model, you can't use the EE_HABTM_Relation on Event nor or Question Group.
 * You'll need to use each's EE_Has_Many_Relation relation to this model. Eg, when querying for question groups which apply to primary attendees,
 * you'd do a query like EEM_Question_Group::instance()->get_all(array(array('Event_Question_Group.EQG_primary'=>1)));
 */
class EEM_Event_Venue extends EEM_Base
{
    // private instance of the Attendee object
    protected static $_instance = null;

    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Event to Question Group Link', 'event_espresso');
        $this->plural_item = esc_html__('Event to Question Group Links', 'event_espresso');
        $this->_tables = array(
            'Event_Venue' => new EE_Primary_Table('esp_event_venue', 'EVV_ID')
        );
        $this->_fields = array(
            'Event_Venue' => array(
                'EVV_ID' => new EE_Primary_Key_Int_Field('EVV_ID', esc_html__('Event to Venue Link ID', 'event_espresso')),
                'EVT_ID' => new EE_Foreign_Key_Int_Field('EVT_ID', esc_html__('Event ID', 'event_espresso'), false, 0, 'Event'),
                'VNU_ID' => new EE_Foreign_Key_Int_Field('VNU_ID', esc_html__('Venue ID', 'event_espresso'), false, 0, 'Venue'),
                'EVV_primary' => new EE_Boolean_Field('EVV_primary', esc_html__("Flag indicating venue is primary one for event", "event_espresso"), false, true)

            )
        );
        $this->_model_relations = array(
            'Event' => new EE_Belongs_To_Relation(),
            'Venue' => new EE_Belongs_To_Relation()
        );
        // this model is generally available for reading
        $path_to_event = 'Event';
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Event_Related_Public($path_to_event);
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Event_Related_Protected($path_to_event);
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Event_Related_Protected($path_to_event);
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Event_Related_Protected($path_to_event, EEM_Base::caps_edit);
        $this->model_chain_to_password = $path_to_event;
        parent::__construct($timezone);
    }
}
