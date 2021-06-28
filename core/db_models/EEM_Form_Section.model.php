<?php

use EventEspresso\core\services\form\meta\FormStatus;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class EEM_Form_Section
 *
 * Model Fields:
 *  FSC_UUID         string
 *  FSC_appliesTo    string
 *  FSC_attributes   JSON string
 *  FSC_belongsTo    string
 *  FSC_label        JSON string
 *  FSC_order        int
 *  FSC_status       string    ex: 'archived'
 *  FSC_wpUser       int
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
     * EEM_Form_Section constructor.
     *
     * @param FormStatus  $form_status
     * @param string|null $timezone
     * @throws EE_Error
     */
    protected function __construct(FormStatus $form_status, ?string $timezone)
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

        $this->singular_item = esc_html__('Form Section', 'event_espresso');
        $this->plural_item   = esc_html__('Form Sections', 'event_espresso');

        $this->_tables          = [
            'Form_Section' => new EE_Primary_Table('esp_form_section', 'FSC_UUID'),
        ];
        $this->_fields          = [
            'Form_Section' => [
                'FSC_UUID'      => new EE_Primary_Key_String_Field(
                    'FSC_UUID',
                    esc_html__('Form Section UUID (universally unique identifier)', 'event_espresso')
                ),
                'FSC_appliesTo' => new EE_Enum_Text_Field(
                    'FSC_appliesTo',
                    esc_html(
                        sprintf(
                            /* translators: 1 class name */
                            __(
                                'Form user type that this form section should be presented to. Values correspond to the %s constants.',
                                'event_espresso'
                            ),
                            'EEM_Form_Section::APPLIES_TO_*'
                        )
                    ),
                    false,
                    EEM_Form_Section::APPLIES_TO_ALL,
                    $this->valid_applies_to_options
                ),
                'FSC_attributes' => new EE_JSON_Field(
                    'FSC_attributes',
                    esc_html__(
                        'JSON string of HTML attributes, such as class, to be applied to this form section\'s container.',
                        'event_espresso'
                    ),
                    true,
                    null
                ),
                'FSC_belongsTo' => new EE_Plain_Text_Field(
                    'FSC_belongsTo',
                    esc_html__('UUID of parent form section that this one belongs to.', 'event_espresso'),
                    true,
                    null
                ),
                'FSC_label' => new EE_JSON_Field(
                    'FSC_label',
                    esc_html__(
                        'JSON string of properties pertaining to to a form section\'s label.',
                        'event_espresso'
                    ),
                    true,
                    null
                ),
                'FSC_order'     => new EE_Integer_Field(
                    'FSC_order',
                    esc_html__('Order in which form section appears in a form.', 'event_espresso'),
                    false,
                    0
                ),
                'FSC_status'    => new EE_Enum_Text_Field(
                    'FSC_status',
                    esc_html(
                        sprintf(
                            /* translators: 1 class name */
                            __(
                                'Whether form section is active, archived, shared, trashed, or used as a default on new forms. Values correspond to the %s constants.',
                                'event_espresso'
                            ),
                            'EEM_Form_Section::STATUS_TO_'
                        )
                    ),
                    false,
                    FormStatus::ACTIVE,
                    $form_status->validStatusOptions()
                ),
                'FSC_wpUser'    => new EE_WP_User_Field(
                    'FSC_wpUser',
                    esc_html__('ID of the WP User that created this form section.', 'event_espresso'),
                    false
                ),
            ],
        ];
        $this->_model_relations = [
            'Form_Input' => new EE_Has_Many_Relation(),
            'Form_Submission' => new EE_Has_Many_Relation(),
            'WP_User'    => new EE_Belongs_To_Relation(),
        ];
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


    /**
     * returns an array of Form Sections for the specified parent Form Section
     *
     * @param string $FSC_UUID
     * @return EE_Form_Section[]
     * @throws EE_Error
     */
    public function getChildFormSections(string $FSC_UUID): array
    {
        return $this->getFormSections(['FSC_belongsTo' => $FSC_UUID]);
    }


    /**
     * @return EE_Form_Section[]
     * @throws EE_Error
     */
    private function getFormSections(array $where_params): array
    {
        $query_params = $this->addDefaultWhereConditions([$where_params]);
        $query_params = $this->addOrderByQueryParams($query_params);
        return $this->get_all($query_params);
    }


    /**
     * returns an array of Form Sections for the specified Event
     *
     * @param EE_Event $event
     * @return EE_Form_Section[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getFormSectionsForEvent(EE_Event $event): array
    {
        $FSC_UUID = $event->registrationFormUuid();
        return ! empty($FSC_UUID)
            ? $this->getFormSections(
                [
                    'OR' => [
                        'FSC_UUID'      => $FSC_UUID, // top level form
                        'FSC_belongsTo' => $FSC_UUID, // child form sections
                    ]
                ]
            )
            : [];
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
}
