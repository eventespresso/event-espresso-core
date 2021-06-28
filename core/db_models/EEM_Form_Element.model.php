<?php

use EventEspresso\core\services\form\meta\FormStatus;
use EventEspresso\core\services\form\meta\InputTypes;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class EEM_Form_Element
 *
 * Model Fields:
 *  FIN_UUID         string
 *  FSC_UUID         string    UUID of parent form section
 *  FIN_adminOnly    bool
 *  FIN_attributes   JSON string
 *  FIN_helpText     JSON string
 *  FIN_label        JSON string
 *  FIN_mapsTo       string
 *  FIN_options      JSON string
 *  FIN_order        int
 *  FIN_required     JSON string
 *  FIN_status       string    ex: 'archived'
 *  FIN_type    string
 *  FIN_wpUser       int
 *
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EEM_Form_Element extends EEM_Base
{

    /**
     * @var EEM_Form_Element
     */
    protected static $_instance;

    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var InputTypes
     */
    private $element_types;


    /**
     * EEM_Form_Element constructor.
     *
     * @param FormStatus  $form_status
     * @param InputTypes  $element_types
     * @param string|null $timezone
     * @throws EE_Error
     */
    protected function __construct(FormStatus $form_status, InputTypes $element_types, ?string $timezone)
    {
        $this->element_types = $element_types;
        $this->singular_item = esc_html__('Form Element', 'event_espresso');
        $this->plural_item   = esc_html__('Form Elements', 'event_espresso');

        $this->_tables          = [
            'Form_Element' => new EE_Primary_Table('esp_form_element', 'FIN_UUID'),
        ];
        $this->_fields          = [
            'Form_Element' => [
                'FIN_UUID'      => new EE_Primary_Key_String_Field(
                    'FIN_UUID',
                    esc_html__('Form Element UUID (universally unique identifier)', 'event_espresso')
                ),
                'FSC_UUID' => new EE_Foreign_Key_String_Field(
                    'FSC_UUID',
                    esc_html__('UUID of parent form section this form input belongs to.', 'event_espresso'),
                    false,
                    null,
                    ['Form_Section']
                ),
                'FIN_adminOnly' => new EE_Boolean_Field(
                    'FIN_adminOnly',
                    esc_html__(
                        'Whether or not input is only displayed in the admin. If false, input will appear in public forms',
                        'event_espresso'
                    ),
                    false,
                    false
                ),
                'FIN_attributes' => new EE_JSON_Field(
                    'FIN_attributes',
                    esc_html__(
                        'JSON string of HTML attributes such as class, max, min, placeholder, type, etc.',
                        'event_espresso'
                    ),
                    true,
                    '{}'
                ),
                'FIN_helpText' => new EE_JSON_Field(
                    'FIN_helpText',
                    esc_html__(
                        'JSON string of properties pertaining to any help text required for an input.',
                        'event_espresso'
                    ),
                    true,
                    '{}'
                ),
                'FIN_label' => new EE_JSON_Field(
                    'FIN_label',
                    esc_html__(
                        'JSON string of properties pertaining to an element\'s label.',
                        'event_espresso'
                    ),
                    true,
                    '{}'
                ),
                'FIN_mapsTo'     => new EE_Plain_Text_Field(
                    'FIN_mapsTo',
                    esc_html__(
                        'Model and Fields name that this element maps to; ex: Attendee.email',
                        'event_espresso'
                    ),
                    true,
                    null
                ),
                'FIN_options'     => new EE_JSON_Field(
                    'FIN_options',
                    esc_html__(
                        'JSON string of options for ENUM type inputs like checkboxes, radio buttons, select inputs, etc.',
                        'event_espresso'
                    ),
                    true,
                    '[]'
                ),
                'FIN_order'     => new EE_Integer_Field(
                    'FIN_order',
                    esc_html__('Order in which form input appears in a form.', 'event_espresso'),
                    false,
                    0
                ),
                'FIN_required' => new EE_JSON_Field(
                    'FIN_required',
                    esc_html__(
                        'properties pertaining to an input\'s required status and the validation text to display.',
                        'event_espresso'
                    ),
                    false,
                    false
                ),
                'FIN_status'    => new EE_Enum_Text_Field(
                    'FIN_status',
                    esc_html(
                        sprintf(
                            /* translators: 1 class name */
                            __(
                                'Whether form element is active, archived, trashed, or used as a default on new forms. Values correspond to the %s constants.',
                                'event_espresso'
                            ),
                            'EventEspresso\core\services\form\meta\FormStatus'
                        )
                    ),
                    false,
                    FormStatus::ACTIVE,
                    $form_status->validStatusOptions()
                ),
                'FIN_type'    => new EE_Enum_Text_Field(
                    'FIN_type',
                    esc_html__('Form element type.', 'event_espresso'),
                    false,
                    false,
                    $element_types->validTypeOptions()
                ),
                'FIN_wpUser'    => new EE_WP_User_Field(
                    'FIN_wpUser',
                    esc_html__('ID of the WP User that created this form input.', 'event_espresso'),
                    false
                ),
            ],
        ];

        $this->_model_relations = [
            'Form_Section' => new EE_Belongs_To_Relation(),
            'WP_User'      => new EE_Belongs_To_Relation(),
        ];
        // this model is generally available for reading
        $this->_cap_restriction_generators = [
            EEM_Base::caps_read       => new EE_Restriction_Generator_Public(),
            EEM_Base::caps_read_admin => new EE_Restriction_Generator_Reg_Form('FIN_applies_to'),
            EEM_Base::caps_edit       => new EE_Restriction_Generator_Reg_Form('FIN_applies_to'),
            EEM_Base::caps_delete     => new EE_Restriction_Generator_Reg_Form('FIN_applies_to'),
        ];
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
     * form inputs should always be sorted in ascending order via the FIN_order field
     *
     * @param array $query_params
     * @return array
     */
    private function addOrderByQueryParams(array $query_params): array
    {
        $query_params['order_by'] = ['FIN_order' => 'ASC'];
        return $query_params;
    }


    /**
     * @param EE_Form_Section $form_section
     * @param EE_Form_Element[] $all_form_elements
     * @return EE_Form_Element[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function filterFormElementsForFormSection(EE_Form_Section $form_section, array $all_form_elements): array
    {
        return array_filter($all_form_elements, $form_section->formElementFilter());
    }


    /**
     * @param EE_Form_Section[] $form_sections
     * @return EE_Form_Element[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllFormElementsForFormSections(array $form_sections): array
    {
        $FSC_UUIDs = [];
        foreach ($form_sections as $form_section) {
            if ($form_section instanceof EE_Form_Section) {
                $FSC_UUIDs[] = $form_section->UUID();
            }
        }
        $where_params = ['FSC_UUID' => ['IN', $FSC_UUIDs]];
        $query_params = $this->addDefaultWhereConditions([$where_params]);
        $query_params = $this->addOrderByQueryParams($query_params);
        return $this->get_all($query_params);
    }


    /**
     * @param bool $constants_only
     * @return array
     */
    public function validTypeOptions(bool $constants_only = false): array
    {
        return $this->element_types->validTypeOptions($constants_only);
    }
}
