<?php

use EventEspresso\core\services\form\meta\Element;
use EventEspresso\core\services\form\meta\inputs\Text;
use EventEspresso\core\services\form\meta\InputTypes;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class EEM_Form_Input
 *
 * FIN_UUID         string
 * FIN_adminLabel    string
 * FIN_adminOnly    bool
 * FIN_belongsTo    string    UUID of parent form section
 * FIN_helpClass    string
 * FIN_helpText    string
 * FIN_htmlClass    string
 * FIN_max    int
 * FIN_min    int
 * FIN_order    int
 * FIN_placeholder    string
 * FIN_publicLabel    html label text
 * FIN_required    bool
 * FIN_requiredText    string
 * FIN_status    string    ex: 'archived'
 * FIN_type    string
 * FIN_wpUser    int
 *
 * Model Fields:
 *
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EEM_Form_Input extends EEM_Form_Element
{

    /**
     * @var EEM_Form_Input
     */
    protected static $_instance;

    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var InputTypes
     */
    private $input_types;


    protected function __construct(Element $element, InputTypes $input_types, $timezone = null)
    {
        $this->input_types = $input_types;
        $this->singular_item = esc_html__('Form Input', 'event_espresso');
        $this->plural_item   = esc_html__('Form Inputs', 'event_espresso');

        $this->_tables          = [
            'Form_Input' => new EE_Primary_Table('esp_form_input', 'FIN_UUID'),
        ];
        $this->_fields          = [
            'Form_Input' => [
                'FIN_UUID'      => new EE_Primary_Key_String_Field(
                    'FIN_UUID',
                    esc_html__('Form Input UUID (universally unique identifier)', 'event_espresso')
                ),
                'FSC_UUID' => new EE_Foreign_Key_String_Field(
                    'FSC_UUID',
                    esc_html__('UUID of parent form section this form input belongs to.', 'event_espresso'),
                    false,
                    null,
                    ['Form_Section']
                ),
                'FIN_adminLabel' => new EE_Plain_Text_Field(
                    'FIN_adminLabel',
                    esc_html__(
                        'Input label displayed in the admin to help differentiate input from others.',
                        'event_espresso'
                    ),
                    true,
                    null
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
                'FIN_helpClass' => new EE_Plain_Text_Field(
                    'FIN_helpClass',
                    esc_html__('Custom HTML classes to be applied to this form input\'s help text.', 'event_espresso'),
                    true,
                    null
                ),
                'FIN_helpText' => new EE_Plain_Text_Field(
                    'FIN_helpText',
                    esc_html__(
                        'Additional text displayed alongside a form input to assist users with completing the form.',
                        'event_espresso'
                    ),
                    true,
                    null
                ),
                'FIN_htmlClass' => new EE_Plain_Text_Field(
                    'FIN_htmlClass',
                    esc_html__('HTML classes to be applied to this form input\'s container.', 'event_espresso'),
                    true,
                    null
                ),
                'FIN_mapsTo'     => new EE_Plain_Text_Field(
                    'FIN_mapsTo',
                    esc_html__(
                        'Model and Fields name that this input maps to; ex: Attendee.email',
                        'event_espresso'
                    ),
                    true,
                    null
                ),
                'FIN_max'     => new EE_Integer_Field(
                    'FIN_max',
                    esc_html__(
                        'Maximum numeric value or maximum characters allowed for form input answer.',
                        'event_espresso'
                    ),
                    false,
                    EE_INF
                ),
                'FIN_min'     => new EE_Integer_Field(
                    'FIN_min',
                    esc_html__(
                        'Minimum numeric value or minimum characters allowed for form input answer.',
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
                    null
                ),
                'FIN_order'     => new EE_Integer_Field(
                    'FIN_order',
                    esc_html__('Order in which form input appears in a form.', 'event_espresso'),
                    false,
                    0
                ),
                'FIN_placeholder' => new EE_Plain_Text_Field(
                    'FIN_placeholder',
                    esc_html__(
                        'Example text displayed within an input to assist users with completing the form.',
                        'event_espresso'
                    ),
                    true,
                    null
                ),
                'FIN_publicLabel' => new EE_Plain_Text_Field(
                    'FIN_publicLabel',
                    esc_html__('Input label displayed on public forms, ie: the actual question text.', 'event_espresso'),
                    true,
                    null
                ),
                'FIN_required' => new EE_Boolean_Field(
                    'FIN_required',
                    esc_html__(
                        'Whether or not the input must be supplied with a value in order to complete the form.',
                        'event_espresso'
                    ),
                    false,
                    false
                ),
                'FIN_requiredText' => new EE_Plain_Text_Field(
                    'FIN_requiredText',
                    esc_html__(
                        'Custom validation text displayed alongside a required form input to assist users with completing the form.',
                        'event_espresso'
                    ),
                    true,
                    null
                ),
                'FIN_status'    => new EE_Enum_Text_Field(
                    'FIN_status',
                    esc_html(
                        sprintf(
                            /* translators: 1 class name */
                            __(
                                'Whether form input is active, archived, trashed, or used as a default on new forms. Values correspond to the %s constants.',
                                'event_espresso'
                            ),
                            'EEM_Form_Input::STATUS_*'
                        )
                    ),
                    false,
                    Element::STATUS_ACTIVE,
                    $element->validStatusOptions()
                ),
                'FIN_type'    => new EE_Enum_Text_Field(
                    'FIN_type',
                    esc_html(
                        sprintf(
                            /* translators: 1 class name */
                            __(
                                'Form input type. Values correspond to the %s constants.',
                                'event_espresso'
                            ),
                            'EventEspresso\core\domain\entities\form\Input::TYPE_*'
                        )
                    ),
                    false,
                    Text::TYPE_TEXT,
                    $this->validTypeOptions()
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
     * @param EE_Form_Input[] $all_form_inputs
     * @return EE_Form_Input[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function filterFormInputsForFormSection(EE_Form_Section $form_section, array $all_form_inputs): array
    {
        return array_filter($all_form_inputs, $form_section->formInputFilter());
    }


    /**
     * @param EE_Form_Section[] $form_sections
     * @return EE_Form_Input[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllFormInputsForFormSections(array $form_sections): array
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
        return $this->input_types->validTypeOptions($constants_only);
    }
}
