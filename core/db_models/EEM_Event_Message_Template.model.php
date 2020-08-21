<?php

/**
 *  EEM_Event_Message_Template
 *  Model for relation table between EEM_Message_Template_Group and EEM_Event
 *
 * @package          Event Espresso
 * @subpackage       models
 * @since            4.3.0
 * @author           Darren Ethier
 */
class EEM_Event_Message_Template extends EEM_Base
{

    // private instance of the EEM_Event_Message_Template object
    protected static $_instance = null;


    /**
     * protected constructor to prevent direct creation
     *
     * @param null $timezone
     * @throws EE_Error
     */
    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Event Message Template', 'event_espresso');
        $this->plural_item = esc_html__('Event Message Templates', 'event_espresso');

        $this->_tables = [
            'Event_Message_Template' => new EE_Primary_Table('esp_event_message_template', 'EMT_ID'),
        ];
        $this->_fields = [
            'Event_Message_Template' => [
                'EMT_ID' => new EE_Primary_Key_Int_Field(
                    'EMT_ID',
                    esc_html__('Event Message Template ID', 'event_espresso')
                ),
                'EVT_ID' => new EE_Foreign_Key_Int_Field(
                    'EVT_ID',
                    esc_html__('The ID to the Event', 'event_espresso'),
                    false,
                    0,
                    'Event'
                ),
                'GRP_ID' => new EE_Foreign_Key_Int_Field(
                    'GRP_ID',
                    esc_html__('The ID to the Message Template Group', 'event_espresso'),
                    false,
                    0,
                    'Message_Template_Group'
                ),
            ],
        ];
        $this->_model_relations = [
            'Event'                  => new EE_Belongs_To_Relation(),
            'Message_Template_Group' => new EE_Belongs_To_Relation(),
        ];
        $path_to_event = 'Event';
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Event_Related_Public(
            $path_to_event
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Event_Related_Protected(
            $path_to_event
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Event_Related_Protected(
            $path_to_event
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Event_Related_Protected(
            $path_to_event,
            EEM_Base::caps_edit
        );
        parent::__construct($timezone);
    }


    /**
     * helper method to simply return an array of event ids for events attached to the given
     * message template group.
     *
     * @param int $GRP_ID The MTP group we want attached events for.
     * @return  array               An array of event ids.
     * @throws EE_Error
     * @since 4.3.0
     */
    public function get_attached_event_ids($GRP_ID)
    {
        $event_ids = $this->_get_all_wpdb_results([['GRP_ID' => $GRP_ID]], ARRAY_N, 'EVT_ID');
        $event_ids = call_user_func_array('array_merge', $event_ids);
        return $event_ids;
    }


    /**
     * helper method for clearing event/group relations for the given event ids and grp ids.
     *
     * @param array $GRP_IDs An array of GRP_IDs. Optional. If empty then there must be EVT IDs.
     * @param array $EVT_IDs An array of EVT_IDs.  Optional. If empty then there must be GRP IDs.
     * @return int             How many rows were deleted.
     * @throws EE_Error
     * @throws EE_Error
     */
    public function delete_event_group_relations($GRP_IDs = [], $EVT_IDs = [])
    {
        if (empty($GRP_IDs) && empty($EVT_IDs)) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        '%s requires either an array of GRP_IDs or EVT_IDs or both, but both cannot be empty.',
                        'event_espresso'
                    ),
                    __METHOD__
                )
            );
        }

        $where = [];
        if (! empty($GRP_IDs)) {
            $where['GRP_ID'] = ['IN', (array) $GRP_IDs];
        }
        if (! empty($EVT_IDs)) {
            $where['EVT_ID'] = ['IN', (array) $EVT_IDs];
        }

        return $this->delete([$where], false);
    }
}
