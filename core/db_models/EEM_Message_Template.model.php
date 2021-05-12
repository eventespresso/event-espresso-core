<?php

/**
 * EEM_Message_Template
 *
 * @package     Event Espresso
 * @subpackage  includes/models/EEM_Message_Template.model.php
 * @author      Darren Ethier
 */
class EEM_Message_Template extends EEM_Base
{
    /**
     * @var EEM_Message_Template
     */
    protected static $_instance;


    /**
     * private constructor to prevent direct creation
     *
     * @param string $timezone
     * @throws EE_Error
     */
    protected function __construct(string $timezone = '')
    {
        $this->singular_item = esc_html__('Message Template', 'event_espresso');
        $this->plural_item   = esc_html__('Message Templates', 'event_espresso');

        $this->_tables = [
            'Message_Template' => new EE_Primary_Table('esp_message_template', 'MTP_ID'),
        ];
        $this->_fields = [
            'Message_Template' => [
                'MTP_ID'             => new EE_Primary_Key_Int_Field(
                    'MTP_ID',
                    esc_html__('Message Template ID', 'event_espresso')),
                'GRP_ID'             => new EE_Foreign_Key_Int_Field(
                    'GRP_ID',
                    esc_html__('Message Template Group ID', 'event_espresso'),
                    false, 0, 'Message_Template_Group'
                ),
                'MTP_template_field' => new EE_Plain_Text_Field(
                    'MTP_template_field',
                    esc_html__('Field Name for this Template', 'event_espresso'),
                    false,
                    'default'
                ),
                'MTP_context'        => new EE_Plain_Text_Field(
                    'MTP_context',
                    esc_html__('Message Type Context for this field', 'event_espresso'),
                    false,
                    'admin'
                ),
                'MTP_content'        => new EE_Serialized_Text_Field(
                    'MTP_content',
                    esc_html__('The field content for the template', 'event_espresso'),
                    false,
                    ''
                ),
            ],
        ];

        $this->_model_chain_to_wp_user = 'Message_Template_Group';
        $this->_model_relations        = ['Message_Template_Group' => new EE_Belongs_To_Relation()];
        foreach ($this->_cap_contexts_to_cap_action_map as $context => $action) {
            $this->_cap_restriction_generators[ $context ] = new EE_Restriction_Generator_Global(
                'Message_Template_Group.MTP_is_global'
            );
        }
        $this->_caps_slug = 'messages';
        parent::__construct($timezone);
    }
}
