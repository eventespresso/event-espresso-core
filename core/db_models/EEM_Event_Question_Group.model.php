<?php

/**
 * model for handling has-and-belongs-to-many relation between events and question groups.
 * If you want to query based on a non-primary or foreign key on this model,
 * you can't use the EE_HABTM_Relation on Event nor or Question Group.
 * You'll need to use the EE_Has_Many_Relation for each relation to this model.
 * for example:
 * when querying for question groups which apply to primary attendees,
 * you'd do a query like:
 *      EEM_Question_Group::instance()->get_all(
 *          [['Event_Question_Group.EQG_primary' => 1]]
 *      );
 */
class EEM_Event_Question_Group extends EEM_Base
{
    /**
     * Name of the field indicating an event should use the question group for the primary attendee
     */
    const PRIMARY = 'EQG_primary';

    /**
     * Name of hte field indicating an event should use the question group for additional attendees
     */
    const ADDITIONAL = 'EQG_additional';


    protected static ?EEM_Event_Question_Group $_instance = null;


    /**
     * @param string|null $timezone
     * @throws EE_Error
     */
    protected function __construct(?string $timezone = '')
    {
        $this->singular_item    = esc_html__('Event to Question Group Link', 'event_espresso');
        $this->plural_item      = esc_html__('Event to Question Group Links', 'event_espresso');
        $this->_tables          = [
            'Event_Question_Group' => new EE_Primary_Table('esp_event_question_group', 'EQG_ID'),
        ];
        $this->_fields          = [
            'Event_Question_Group' => [
                'EQG_ID'         => new EE_Primary_Key_Int_Field(
                    'EQG_ID',
                    esc_html__('Event to Question Group Link ID', 'event_espresso')
                ),
                'EVT_ID'         => new EE_Foreign_Key_Int_Field(
                    'EVT_ID',
                    esc_html__('Event ID', 'event_espresso'),
                    false,
                    0,
                    'Event'
                ),
                'QSG_ID'         => new EE_Foreign_Key_Int_Field(
                    'QSG_ID',
                    esc_html__('Question Group Id', 'event_espresso'),
                    false,
                    0,
                    'Question_Group'
                ),
                'EQG_additional' => new EE_Boolean_Field(
                    'EQG_additional',
                    esc_html__(
                        'Flag indicating question is only for additional attendees',
                        'event_espresso'
                    ),
                    false,
                    false
                ),
                'EQG_primary'    => new EE_Boolean_Field(
                    'EQG_primary',
                    esc_html__(
                        'Flag indicating question is only for primary attendees',
                        'event_espresso'
                    ),
                    false,
                    false
                ),
            ],
        ];
        $this->_model_relations = [
            'Event'          => new EE_Belongs_To_Relation(),
            'Question_Group' => new EE_Belongs_To_Relation(),
        ];

        // this model is generally available for reading
        $path_to_event = 'Event';

        $caps[ EEM_Base::caps_read ]       = new EE_Restriction_Generator_Event_Related_Public($path_to_event);
        $caps[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Event_Related_Protected($path_to_event);
        $caps[ EEM_Base::caps_edit ]       = new EE_Restriction_Generator_Event_Related_Protected($path_to_event);
        $caps[ EEM_Base::caps_delete ]     = new EE_Restriction_Generator_Event_Related_Protected(
            $path_to_event,
            EEM_Base::caps_edit
        );
        $this->_cap_restriction_generators = $caps;
        parent::__construct($timezone);
    }


    /**
     * Decides whether to use the 'EQG_primary' or newer 'EQG_additional' for use in queries, based on whether
     * this is concerning primary attendees or additional attendees.
     * If 1, true, or "primary" is passed in, returns EQG_primary. If 0, false, or "additional" is passed in, returns
     * EQG_additional.
     *
     * @param string|boolean|int $context
     * @return string
     * @since 4.10.0.p
     */
    public function fieldNameForContext($context): string
    {
        // Basically do a strict switch statement.
        switch (true) {
            case $context === 'additional':
            case $context === false:
            case $context === 0:
                $field_name = EEM_Event_Question_Group::ADDITIONAL;
                break;
            case $context === 'primary':
            case $context === true:
            case $context === 1:
            default:
                $field_name = EEM_Event_Question_Group::PRIMARY;
        }
        return apply_filters('FHEE__EEM_Event_Question_Group__fieldNameForContext', $field_name, $context);
    }
}
