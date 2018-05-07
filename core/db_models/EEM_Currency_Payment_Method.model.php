<?php

/**
 * EEM_Currency_Payment_Method
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEM_Currency_Payment_Method extends EEM_Base
{
    // private instance of the Attendee object
    protected static $_instance = null;


    protected function __construct($timezone = null)
    {
        $this->singular_item = __('Currency Usable by Payment Method', 'event_espresso');
        $this->plural_item = __('Currencies Usable by Payment Methods', 'event_espresso');
        $this->_tables = array(
            'Currency_Payment_Method'=>new EE_Primary_Table('esp_currency_payment_method', 'CPM_ID')
        );
        $this->_fields = array(
            'Currency_Payment_Method'=>array(
                'CPM_ID'=>new EE_Primary_Key_Int_Field('CPM_ID', __('Currency to Payment Method LInk ID', 'event_espresso')),
                'CUR_code'=>new EE_Foreign_Key_String_Field('CUR_code', __('Currency Code', 'event_espresso'), false, '', 'Currency'),
                'PMD_ID'=>new EE_Foreign_Key_Int_Field('PMD_ID', __('Paymetn Method ID', 'event_espresso'), false, 0, 'Payment_Method')
            )
        );
        $this->_model_relations = array(
            'Currency'=>new EE_Belongs_To_Relation(),
            'Payment_Method'=>new EE_Belongs_To_Relation()
        );
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
        $this->_caps_slug = 'payment_methods';
        parent::__construct($timezone);
    }
}
