<?php

/**
 * Datetime Ticket Model
 *
 * @package         Event Espresso
 * @subpackage      includes/models/EEM_Datetime_Ticket.model.php
 * @author          Darren Ethier
 */
class EEM_Datetime_Ticket extends EEM_Base
{


    // private instance of the EEM_Datetime_Ticket object
    protected static $_instance;


    /**
     *      private constructor to prevent direct creation
     *
     * @Constructor
     * @access private
     * @param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any
     *                         incoming timezone data that gets saved).  Note this just sends the timezone info to the
     *                         date time model field objects.  Default is NULL (and will be assumed using the set
     *                         timezone in the 'timezone_string' wp option)
     * @return void
     * @throws EE_Error
     */
    protected function __construct(string $timezone = '')
    {
        $this->singular_item = esc_html__('Datetime Ticket', 'event_espresso');
        $this->plural_item   = esc_html__('Datetime Tickets', 'event_espresso');

        $this->_tables          = [
            'Datetime_Ticket' => new EE_Primary_Table(
                'esp_datetime_ticket',
                'DTK_ID'
            ),
        ];
        $this->_fields          = [
            'Datetime_Ticket' => [
                'DTK_ID' => new EE_Primary_Key_Int_Field(
                    'DTK_ID',
                    esc_html__('Datetime Ticket ID', 'event_espresso')
                ),
                'DTT_ID' => new EE_Foreign_Key_Int_Field(
                    'DTT_ID',
                    esc_html__('The ID to the Datetime', 'event_espresso'),
                    false,
                    0,
                    'Datetime'
                ),
                'TKT_ID' => new EE_Foreign_Key_Int_Field(
                    'TKT_ID',
                    esc_html__('The ID to the Ticket', 'event_espresso'),
                    false,
                    0,
                    'Ticket'
                ),
            ],
        ];
        $this->_model_relations = [
            'Ticket'   => new EE_Belongs_To_Relation(),
            'Datetime' => new EE_Belongs_To_Relation(),
        ];
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Event_Related_Public(
            'Datetime.Event'
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ]
                                                                  = new EE_Restriction_Generator_Event_Related_Protected(
            'Datetime.Event'
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ]
                                                                  = new EE_Restriction_Generator_Event_Related_Protected(
            'Datetime.Event'
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ]
                                                                  = new EE_Restriction_Generator_Event_Related_Protected(
            'Datetime.Event',
            EEM_Base::caps_edit
        );
        $this->model_chain_to_password                            = 'Datetime.Event';
        parent::__construct($timezone);
    }
}
