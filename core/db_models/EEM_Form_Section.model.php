<?php

use EventEspresso\core\services\request\RequestInterface;

/**
 * Class EEM_Form_Section
 * Model Fields:
 *      FSC_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
 *      FSC_UUID binary(16) NOT NULL,
 *      FSC_appliesTo varchar(255) NOT NULL,
 *      FSC_belongsTo binary(16) NULL,
 *      FSC_htmlClass text NULL,
 *      FSC_order tinyint(2) unsigned NOT NULL DEFAULT 0,
 *      FSC_relation tinytext NULL,
 *      FSC_status tinytext NULL,
 *      FSC_wpUser bigint(20) unsigned NULL,
 *
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EEM_Form_Section extends EEM_Base
{
    public const APPLIES_TO_ALL         = 'all';

    public const APPLIES_TO_PRIMARY     = 'primary';

    public const APPLIES_TO_PURCHASER   = 'purchaser';

    public const APPLIES_TO_REGISTRANTS = 'registrants';

    public const STATUS_ACTIVE          = 'active';

    public const STATUS_ARCHIVED        = 'archived';

    public const STATUS_DEFAULT         = 'default';

    public const STATUS_TRASHED         = 'trashed';

    /**
     * @var EEM_Form_Section
     */
    protected static $_instance;

    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var array
     */
    private $valid_applies_to_options;

    /**
     * @var array
     */
    private $valid_status_options;


    protected function __construct($timezone = null)
    {
        $this->valid_applies_to_options = apply_filters(
            'FHEE__EEM_Form_Section__valid_applies_to_options',
            [
                EEM_Form_Section::APPLIES_TO_ALL         => esc_html__('All Registrants', 'event_espresso'),
                EEM_Form_Section::APPLIES_TO_PRIMARY     => esc_html__('Primary Registrant Only', 'event_espresso'),
                EEM_Form_Section::APPLIES_TO_PURCHASER   => esc_html__('Purchasing Agent', 'event_espresso'),
                EEM_Form_Section::APPLIES_TO_REGISTRANTS => esc_html__('Additional Registrants', 'event_espresso'),
            ]
        );
        $this->valid_status_options     = apply_filters(
            'FHEE__EEM_Form_Section__valid_status_options',
            [
                EEM_Form_Section::STATUS_ACTIVE   => esc_html__('Active', 'event_espresso'),
                EEM_Form_Section::STATUS_ARCHIVED => esc_html__('Archived', 'event_espresso'),
                EEM_Form_Section::STATUS_DEFAULT  => esc_html__('Default', 'event_espresso'),
                EEM_Form_Section::STATUS_TRASHED  => esc_html__('Trashed', 'event_espresso'),
            ]
        );

        $related_entity_types = apply_filters(
            'FHEE__EEM_Form_Section__related_entity_types',
            [
                'Datetime',
                'Event',
                'Form_Section',
                'Ticket',
                'Venue',
            ]
        );

        $this->singular_item = esc_html__('Form Section', 'event_espresso');
        $this->plural_item   = esc_html__('Form Sections', 'event_espresso');

        $this->_tables          = [
            'Form_Section' => new EE_Primary_Table('esp_form_section', 'FSC_ID'),
        ];
        $this->_fields          = [
            'Form_Section' => [
                'FSC_ID'        => new EE_Integer_Field(
                    'FSC_ID',
                    esc_html__('Form Section ID (autoincrement db id)', 'event_espresso'),
                    false
                ),
                'FSC_UUID'      => new EE_Primary_Key_String_Field(
                    'FSC_UUID',
                    esc_html__('Form Section UUID (universally unique identifier)', 'event_espresso')
                ),
                'FSC_appliesTo' => new EE_Enum_Text_Field(
                    'FSC_appliesTo',
                    esc_html__(
                        'Form user types that this form section should be presented to. Values correspond to the EEM_Form_Section::APPLIES_TO_* constants.',
                        'event_espresso'
                    ),
                    false,
                    EEM_Form_Section::APPLIES_TO_ALL,
                    $this->valid_applies_to_options
                ),
                'FSC_belongsTo' => new EE_Foreign_Key_String_Field(
                    'FSC_belongsTo',
                    esc_html__('UUID or ID of related entity this form section belongs to.', 'event_espresso'),
                    true,
                    null,
                    $related_entity_types
                ),
                'FSC_htmlClass' => new EE_Plain_Text_Field(
                    'FSC_htmlClass',
                    esc_html__('HTML classes to be applied to this form section\'s container.', 'event_espresso'),
                    true,
                    null
                ),
                'FSC_order'     => new EE_Integer_Field(
                    'FSC_order',
                    esc_html__('Order in which form section appears in a form.', 'event_espresso'),
                    false,
                    0
                ),
                'FSC_relation'  => new EE_Any_Foreign_Model_Name_Field(
                    'FSC_relation',
                    esc_html__('Related model type.', 'event_espresso'),
                    true,
                    null,
                    $related_entity_types
                ),
                'FSC_status'    => new EE_Enum_Text_Field(
                    'FSC_status',
                    esc_html__(
                        'Whether form section is active, archived, trashed, or used as a default on new forms. Values correspond to the EEM_Form_Section::STATUS_TO_* constants.',
                        'event_espresso'
                    ),
                    false,
                    EEM_Form_Section::STATUS_ACTIVE,
                    $this->valid_status_options
                ),
                'FSC_wpUser'    => new EE_WP_User_Field(
                    'FSC_wpUser',
                    esc_html__('ID of the WP User that created this form section.', 'event_espresso'),
                    false
                ),
            ],
        ];
        $this->_model_relations = [];
        foreach ($related_entity_types as $model) {
            $this->_model_relations[ $model ] = new EE_Belongs_To_Any_Relation();
        }
        // this model is generally available for reading
        $restrictions                              = [];
        $restrictions[ EEM_Base::caps_read ]       = new EE_Restriction_Generator_Public();
        $restrictions[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Reg_Form('FSC_applies_to');
        $restrictions[ EEM_Base::caps_edit ]       = new EE_Restriction_Generator_Reg_Form('FSC_applies_to');
        $restrictions[ EEM_Base::caps_delete ]     = new EE_Restriction_Generator_Reg_Form('FSC_applies_to');
        $this->_cap_restriction_generators         = $restrictions;
        parent::__construct($timezone);
        $this->request = $this->getLoader()->getShared('EventEspresso\core\services\request\RequestInterface');
    }


    /**
     * @param bool $constants_only
     * @return array
     */
    public function validAppliesToOptions(bool $constants_only = false): array
    {
        return $constants_only
            ? array_keys($this->valid_applies_to_options)
            : $this->valid_applies_to_options;
    }


    /**
     * @param bool $constants_only
     * @return array
     */
    public function validStatusOptions(bool $constants_only = false): array
    {
        return $constants_only
            ? array_keys($this->valid_status_options)
            : $this->valid_status_options;
    }


    /**
     * returns an array of Form Sections for the specified Form Section
     *
     * @param string $FSC_UUID
     * @return EE_Form_Section[]
     * @throws EE_Error
     */
    public function getFormSectionChildren(string $FSC_UUID): array
    {
        return $this->getFormSectionsFor('FormSection.FSC_UUID', $FSC_UUID);
    }


    /**
     * returns an array of Form Sections for the specified Event
     *
     * @param string $EVT_ID
     * @return EE_Form_Section[]
     * @throws EE_Error
     */
    public function getFormSectionsForEvent(string $EVT_ID): array
    {
        return $this->getFormSectionsFor('Event.EVT_ID', $EVT_ID);
    }


    /**
     * returns an array of Form Sections for the specified Datetime
     *
     * @param string $DTT_ID
     * @return EE_Form_Section[]
     * @throws EE_Error
     */
    public function getFormSectionsForDatetime(string $DTT_ID): array
    {
        return $this->getFormSectionsFor('Datetime.DTT_ID', $DTT_ID);
    }


    /**
     * returns an array of Form Sections for the specified Ticket
     *
     * @param string $TKT_ID
     * @return EE_Form_Section[]
     * @throws EE_Error
     */
    public function getFormSectionsForTicket(string $TKT_ID): array
    {
        return $this->getFormSectionsFor('Ticket.TKT_ID', $TKT_ID);
    }


    /**
     * returns an array of Form Sections for the specified Venue
     *
     * @param string $VNU_ID
     * @return EE_Form_Section[]
     * @throws EE_Error
     */
    public function getFormSectionsForVenue(string $VNU_ID): array
    {
        return $this->getFormSectionsFor('Venue.VNU_ID', $VNU_ID);
    }


    /**
     * @return EE_Form_Section[]
     * @throws EE_Error
     */
    private function getFormSectionsFor(string $relation, string $related_UUID): array
    {
        $where_params = [$relation => $related_UUID];
        $query_params = $this->addDefaultWhereConditions([$where_params]);
        $query_params = $this->addOrderByQueryParams($query_params);
        return $this->get_all($query_params);
    }


    /**
     * @param array $query_params
     * @return array
     */
    private function addDefaultWhereConditions(array $query_params): array
    {
        // might need to add a way to identify GQL requests for admin domains
        $admin_request                            = $this->request->isAdmin() || $this->request->isAdminAjax();
        $query_params['default_where_conditions'] = $admin_request
            ? EEM_Base::default_where_conditions_none
            : EEM_Base::default_where_conditions_all;
        return $query_params;
    }


    /**
     * form sections should always be sorted in ascending order via the FSC_order field
     *
     * @param array $query_params
     * @return array
     */
    private function addOrderByQueryParams(array $query_params): array
    {
        $query_params['order_by'] = ['FSC_order' => 'ASC'];
        return $query_params;
    }
}
