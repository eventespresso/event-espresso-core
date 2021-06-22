<?php

use EventEspresso\core\services\form\meta\Element;
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
class EEM_Form_Section extends EEM_Form_Element
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


    protected function __construct(Element $element, $timezone = null)
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
                        'Form user type that this form section should be presented to. Values correspond to the EEM_Form_Section::APPLIES_TO_* constants.',
                        'event_espresso'
                    ),
                    false,
                    EEM_Form_Section::APPLIES_TO_ALL,
                    $this->valid_applies_to_options
                ),
                // 'FSC_attributes' => new EE_Serialized_Text_Field(
                //     'FSC_attributes',
                //     esc_html__(
                //         'Array of HTML attributes that apply to this form section.',
                //         'event_espresso'
                //     ),
                //     true,
                //     []
                // ),
                'FSC_belongsTo' => new EE_Plain_Text_Field(
                    'FSC_belongsTo',
                    esc_html__('UUID of parent form section that this one belongs to.', 'event_espresso'),
                    true,
                    null
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
                'FSC_publicLabel' => new EE_Plain_Text_Field(
                    'FSC_publicLabel',
                    esc_html__('Form Section label displayed on public forms as a heading.', 'event_espresso'),
                    true,
                    null
                ),
                'FSC_showLabel' => new EE_Boolean_Field(
                    'FSC_showLabel',
                    esc_html__(
                        'Whether or not to display the Form Section name (Public Label) on public forms.',
                        'event_espresso'
                    ),
                    false,
                    true
                ),
                'FSC_status'    => new EE_Enum_Text_Field(
                    'FSC_status',
                    esc_html__(
                        'Whether form section is active, archived, shared, trashed, or used as a default on new forms. Values correspond to the EEM_Form_Section::STATUS_TO_* constants.',
                        'event_espresso'
                    ),
                    false,
                    Element::STATUS_ACTIVE,
                    $element->validStatusOptions()
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
        parent::__construct($element, $timezone);
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
