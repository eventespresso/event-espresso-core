<?php

/**
 * Question Group Model
 *
 * @package         Event Espresso
 * @subpackage      includes/models/
 * @author          Michael Nelson
 */
class EEM_Question_Group extends EEM_Soft_Delete_Base
{

    const system_personal = 1;

    const system_address = 2;

    /**
     * private instance of the EEM_Question_Group object
     *
     * @var EEM_Question_Group
     */
    protected static $_instance = null;


    /**
     * EEM_Question_Group constructor.
     *
     * @param string|null $timezone
     */
    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Question Group', 'event_espresso');
        $this->plural_item   = esc_html__('Question Groups', 'event_espresso');

        $this->_tables          = [
            'Question_Group' => new EE_Primary_Table('esp_question_group', 'QSG_ID'),
        ];
        $this->_fields          = [
            'Question_Group' => [
                'QSG_ID'              => new EE_Primary_Key_Int_Field(
                    'QSG_ID',
                    esc_html__('Question Group ID', 'event_espresso')
                ),
                'QSG_name'            => new EE_Plain_Text_Field(
                    'QSG_name',
                    esc_html__('Question Group Name', 'event_espresso'),
                    false,
                    ''
                ),
                'QSG_identifier'      => new EE_Plain_Text_Field(
                    'QSG_identifier',
                    esc_html__('Text ID for question Group', 'event_espresso'),
                    false,
                    ''
                ),
                'QSG_desc'            => new EE_Post_Content_Field(
                    'QSG_desc',
                    esc_html__('Description of Question Group', 'event_espresso'),
                    true,
                    ''
                ),
                'QSG_order'           => new EE_Integer_Field(
                    'QSG_order',
                    esc_html__('Order in which to show the question group', 'event_espresso'),
                    true,
                    0
                ),
                'QSG_show_group_name' => new EE_Boolean_Field(
                    'QSG_show_group_name',
                    esc_html__(
                        'Flag indicating whether to show the group\'s name on the registration page',
                        'event_espresso'
                    ),
                    false,
                    true
                ),
                'QSG_show_group_desc' => new EE_Boolean_Field(
                    'QSG_show_group_desc',
                    esc_html__(
                        'Flag indicating whether to show the group\s description on the registration page',
                        'event_espresso'
                    ), false,
                    false
                ),
                'QSG_wp_user'         => new EE_WP_User_Field(
                    'QSG_wp_user',
                    esc_html__('Question Group Creator ID', 'event_espresso'),
                    false
                ),
                'QSG_system'          => new EE_Integer_Field(
                    'QSG_system',
                    esc_html__(
                        'Indicate IF this is a system group and if it is what system group it corresponds to.',
                        'event_espresso'
                    ), false,
                    0
                ),
                'QSG_deleted'         => new EE_Trashed_Flag_Field(
                    'QSG_deleted',
                    esc_html__('Flag indicating this question group was deleted', 'event_espresso'),
                    false,
                    false
                ),
            ],
        ];
        $this->_model_relations = [
            'Question'             => new EE_HABTM_Relation('Question_Group_Question'),
            'Event'                => new EE_HABTM_Relation('Event_Question_Group'),
            'Event_Question_Group' => new EE_Has_Many_Relation(),
            'WP_User'              => new EE_Belongs_To_Relation(),
        ];
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ]       =
            new EE_Restriction_Generator_Public();
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] =
            new EE_Restriction_Generator_Reg_Form('QSG_system');
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ]       =
            new EE_Restriction_Generator_Reg_Form('QSG_system');
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ]     =
            new EE_Restriction_Generator_Reg_Form('QSG_system');

        parent::__construct($timezone);
    }


    /**
     * searches the db for the question group with the latest question order and returns that value.
     *
     * @return int
     * @throws EE_Error
     */
    public function get_latest_question_group_order()
    {
        $max = $this->_get_all_wpdb_results(
            [],
            ARRAY_A,
            [
                'max_order' => ["MAX(QSG_order)", "%d"],
            ]
        );
        return $max[0]['max_order'];
    }
}
