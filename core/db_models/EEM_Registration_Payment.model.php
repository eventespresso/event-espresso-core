<?php

/**
 * EEM_Registration_Payment
 *
 * model for join relationship between registrations, line items and payments
 * Client code will probably never need to use this, as you can easily query  the HABTM relationships from the related models
 *
 * @package         Event Espresso
 * @subpackage  includes/models/
 * @author              Brent Christensen
 */
class EEM_Registration_Payment extends EEM_Base
{
    // private instance
    protected static $_instance = null;


    protected function __construct($timezone = null)
    {

        $this->singular_item = esc_html__('Registration Payment', 'event_espresso');
        $this->plural_item  = esc_html__('Registration Payments', 'event_espresso');

        $this->_tables = array(
            'Registration_Payment' => new EE_Primary_Table('esp_registration_payment', 'RPY_ID')
        );

        $this->_fields = array(
            'Registration_Payment' => array(
                'RPY_ID'                => new EE_Primary_Key_Int_Field('RPY_ID', esc_html__('Registration Payment ID', 'event_espresso')),
                'REG_ID'                => new EE_Foreign_Key_Int_Field('REG_ID', esc_html__('Registration ID', 'event_espresso'), false, 0, 'Registration'),
                'PAY_ID'                => new EE_Foreign_Key_Int_Field('PAY_ID', esc_html__('Payment ID', 'event_espresso'), true, null, 'Payment'),
                'RPY_amount'    => new EE_Money_Field('RPY_amount', esc_html__('Amount attributed to the registration', 'event_espresso'), false, 0),
            )
        );

        $this->_model_relations = array(
            'Registration'  => new EE_Belongs_To_Relation(),
            'Payment'       => new EE_Belongs_To_Relation(),
        );

        parent::__construct($timezone);
    }
}
