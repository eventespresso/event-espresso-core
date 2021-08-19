<?php

/**
 * EEM_Currency_Payment_Method
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EEM_Currency_Payment_Method extends EEM_Base
{
    /**
     * @var EEM_Currency_Payment_Method
     */
    protected static $_instance;


    /**
     * EEM_Currency_Payment_Method constructor.
     *
     * @param string $timezone
     * @throws EE_Error
     */
    protected function __construct(string $timezone = '')
    {
        $this->singular_item    = esc_html__('Currency Usable by Payment Method', 'event_espresso');
        $this->plural_item      = esc_html__('Currencies Usable by Payment Methods', 'event_espresso');
        $this->_tables          = [
            'Currency_Payment_Method' => new EE_Primary_Table('esp_currency_payment_method', 'CPM_ID'),
        ];
        $this->_fields          = [
            'Currency_Payment_Method' => [
                'CPM_ID'   => new EE_Primary_Key_Int_Field(
                    'CPM_ID',
                    esc_html__('Currency to Payment Method LInk ID', 'event_espresso')
                ),
                'CUR_code' => new EE_Foreign_Key_String_Field(
                    'CUR_code',
                    esc_html__('Currency Code', 'event_espresso'),
                    false,
                    '',
                    'Currency'
                ),
                'PMD_ID'   => new EE_Foreign_Key_Int_Field(
                    'PMD_ID',
                    esc_html__('Payment Method ID', 'event_espresso'),
                    false,
                    0,
                    'Payment_Method'
                ),
            ],
        ];
        $this->_model_relations = [
            'Currency'       => new EE_Belongs_To_Relation(),
            'Payment_Method' => new EE_Belongs_To_Relation(),
        ];
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
        $this->_caps_slug                                         = 'payment_methods';
        parent::__construct($timezone);
    }
}
