<?php

/**
 * Question Group Model
 *
 * @package     Event Espresso
 * @subpackage  includes/models/
 * @author      Michael Nelson
 */
class EEM_Question_Option extends EEM_Soft_Delete_Base
{

    // private instance of the Attendee object
    protected static $_instance = null;


    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Question Option', 'event_espresso');
        $this->plural_item   = esc_html__('Question Options', 'event_espresso');

        $this->_tables          = [
            'Question_Option' => new EE_Primary_Table('esp_question_option', 'QSO_ID'),
        ];
        $this->_fields          = [
            'Question_Option' => [
                'QSO_ID'      => new EE_Primary_Key_Int_Field(
                    'QSO_ID', esc_html__('Question Option ID', 'event_espresso')
                ),
                'QST_ID'      => new EE_Foreign_Key_Int_Field(
                    'QST_ID',
                    esc_html__('Question ID', 'event_espresso'),
                    false,
                    0,
                    'Question'
                ),
                'QSO_value'   => new EE_Plain_Text_Field(
                    'QSO_value',
                    esc_html__("Question Option Value", "event_espresso"),
                    false,
                    ''
                ),
                'QSO_desc'    => new EE_Post_Content_Field(
                    'QSO_desc',
                    esc_html__('Question Option Description', 'event_espresso'),
                    false,
                    ''
                ),
                'QSO_order'   => new EE_Integer_Field(
                    'QSO_order',
                    esc_html__('Question Option Order', 'event_espresso'),
                    false,
                    0
                ),
                'QSO_system'  => new EE_Plain_Text_Field(
                    'QSO_system',
                    esc_html__('Internal string ID for question option', 'event_espresso'),
                    true,
                    null
                ),
                'QSO_deleted' => new EE_Trashed_Flag_Field(
                    'QSO_deleted',
                    esc_html__('Flag indicating Option was trashed', 'event_espresso'),
                    false,
                    false
                ),
            ],
        ];
        $this->_model_relations = [
            'Question' => new EE_Belongs_To_Relation(),
        ];

        $this->_caps_slug              = 'questions';
        $this->_model_chain_to_wp_user = 'Question';

        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ]       =
            new EE_Restriction_Generator_Public();
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] =
            new EE_Restriction_Generator_Reg_Form('QSO_system');
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ]       =
            new EE_Restriction_Generator_Reg_Form('QSO_system');
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ]     =
            new EE_Restriction_Generator_Reg_Form('QSO_system');

        parent::__construct($timezone);
    }
}
