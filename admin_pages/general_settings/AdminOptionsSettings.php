<?php
namespace EventEspresso\admin_pages\general_settings;

use EE_Admin_Two_Column_Layout;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Text_Input;
use EE_Yes_No_Input;
use EEH_HTML;
use EEH_Template;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFormSubmissionException;
use EventEspresso\core\libraries\form_sections\form_handlers\FormHandler;
use InvalidArgumentException;
use LogicException;

defined('ABSPATH') || exit;



/**
 * Class AdminOptionsSettings
 * class for handling admin options settings
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class AdminOptionsSettings extends FormHandler
{

    protected $template_args = array();

    /**
     * Form constructor.
     *
     * @param \EE_Registry $registry
     */
    public function __construct(\EE_Registry $registry) {
        parent::__construct(
            esc_html__('Admin Options', 'event_espresso'),
            esc_html__('Admin Options', 'event_espresso'),
            'admin_option_settings',
            '',
            FormHandler::DO_NOT_SETUP_FORM,
            $registry
        );
    }



    /**
     * @param array $template_args
     */
    public function setTemplateArgs(array $template_args)
    {
        $this->template_args = $template_args;
    }



    /**
     * creates and returns the actual form
     *
     * @return EE_Form_Section_Proper
     * @throws \EE_Error
     */
    public function generate()
    {
        $form = new \EE_Form_Section_Proper(
            array(
                'name'            => 'admin_option_settings',
                'html_id'         => 'admin_option_settings',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => array(
                    'help_tour_activation_hdr' => new EE_Form_Section_HTML(
                        EEH_HTML::h2(
                            esc_html__('Help Tour Global Activation', 'event_espresso')
                            . ' '
                            . EEH_HTML::span(
                                EEH_Template::get_help_tab_link('help_tour_activation_info'),
                                'help_tour_activation'
                            ),
                            '', 'ee-admin-settings-hdr'
                        )
                    ),
                    'help_tour_activation' => new EE_Yes_No_Input(
                        array(
                            'html_label_text' => esc_html__('Activate Global Help Tours?', 'event_espresso'),
                            'html_help_text'  => esc_html__(
                                'This toggles whether the Event Espresso help tours are active globally or not.',
                                'event_espresso'
                            ),
                            'default'         => isset($this->registry->CFG->admin->help_tour_activation)
                                ? filter_var($this->registry->CFG->admin->help_tour_activation, FILTER_VALIDATE_BOOLEAN)
                                : true,
                            'required'        => false
                        )
                    ),
                    'compatibility_hdr'   => new EE_Form_Section_HTML(
                        EEH_HTML::h2(
                            esc_html__('Compatibility Settings', 'event_espresso'),
                            '', 'ee-admin-settings-hdr'
                        )
                    ),
                    'encode_session_data' => new EE_Yes_No_Input(
                        array(
                            'html_label_text' => esc_html__('Encode Session Data?', 'event_espresso'),
                            'html_help_text'  => sprintf(
                                esc_html__(
                                    'Some servers and database configurations can cause problems when saving the Event Espresso session data. Setting this option to "Yes" adds an extra layer of encoding to session data to prevent serialization errors, but can be incompatible with some server configurations.%1$sIf you receive "500 internal server" type errors during registration, try turning this option on.%1$sIf you get fatal PHP errors regarding missing base64 functions, then turn this option off.',
                                    'event_espresso'
                                ),
                                '<br>'
                            ),
                            'default'         => $this->registry->CFG->admin->encode_session_data(),
                            'required'        => false
                        )
                    ),
                )
            )
        );
        if (
            $this->registry->CAP->current_user_can(
                'manage_options',
                'display_admin_settings_options_promote_and_affiliate'
            )
        ) {
            $form->add_subsections(
                array(
                    'promote_ee_hdr'  => new EE_Form_Section_HTML(
                        EEH_HTML::h2(
                            esc_html__('Promote Event Espresso', 'event_espresso')
                            . ' '
                            . EEH_HTML::span(
                                EEH_Template::get_help_tab_link('affiliate_info'),
                                'affiliate_info'
                            ),
                            '', 'ee-admin-settings-hdr'
                        )
                    ),
                    'show_reg_footer' => new EE_Yes_No_Input(
                        array(
                            'html_label_text' => esc_html__(
                                                     'Link to Event Espresso in your Registration Page?',
                                                     'event_espresso'
                                                 )
                                                 . EEH_Template::get_help_tab_link('email_validation_info'),
                            'html_help_text'  => esc_html__(
                                'adds an unobtrusive link to Event Espresso\'s website in the footer of your registration form. Get an affiliate link (see below) and make money if people click the link and purchase Event Espresso.',
                                'event_espresso'
                            ),
                            'default'         => isset($this->registry->CFG->admin->show_reg_footer)
                                ? filter_var($this->registry->CFG->admin->show_reg_footer, FILTER_VALIDATE_BOOLEAN)
                                : true,
                            'required'        => false
                        )
                    ),
                    'affiliate_id'    => new EE_Text_Input(
                        array(
                            'html_label_text' => sprintf(
                                esc_html__('Event Espresso %sAffiliate%s ID', 'event_espresso'),
                                '<a href="http://eventespresso.com/affiliates/" target="_blank">',
                                '</a>'
                            ),
                            'html_help_text'  => esc_html__(
                                'Earn cash for promoting Event Espresso.',
                                'event_espresso'
                            ),
                            'html_class'      => 'regular-text',
                            'default'         => isset($this->registry->CFG->admin->affiliate_id)
                                ? $this->registry->CFG->admin->get_pretty('affiliate_id')
                                : '',
                            'required'        => false
                        )
                    ),
                ),
                'help_tour_activation_hdr'
            );
        }
        return $form;
    }



    /**
     * takes the generated form and displays it along with ony other non-form HTML that may be required
     * returns a string of HTML that can be directly echoed in a template
     *
     * @return string
     * @throws LogicException
     * @throws \EE_Error
     */
    public function display()
    {
        add_filter(
            'FHEE__EventEspresso_core_libraries_form_sections_form_handlers_FormHandler__display__before_form',
            array($this, 'handleOldAdminOptionsSettingsAction')
        );
        return parent::display();
    }



    /**
     * @return string
     */
    public function handleOldAdminOptionsSettingsAction()
    {
        ob_start();
        do_action('AHEE__admin_option_settings__template__before', $this->template_args);
        return ob_get_clean();
    }



    /**
     * handles processing the form submission
     * returns true or false depending on whether the form was processed successfully or not
     *
     * @param array $form_data
     * @return bool
     * @throws InvalidFormSubmissionException
     * @throws EE_Error
     * @throws LogicException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     */
    public function process($form_data = array())
    {
        // process form
        $valid_data = (array)parent::process($form_data);
        if (empty($valid_data)) {
            return false;
        }
        $this->registry->CFG->admin->show_reg_footer = isset( $form_data['show_reg_footer'] )
            ? absint( $form_data['show_reg_footer'] )
            : $this->registry->CFG->admin->show_reg_footer;
        $this->registry->CFG->admin->affiliate_id = isset( $form_data['affiliate_id'] )
            ? sanitize_text_field( $form_data['affiliate_id'] )
            : $this->registry->CFG->admin->affiliate_id;
        $this->registry->CFG->admin->help_tour_activation = isset( $form_data['help_tour_activation'] )
            ? absint( $form_data['help_tour_activation'])
            : $this->registry->CFG->admin->help_tour_activation;
        if (isset($form_data['encode_session_data'])) {
            $this->registry->CFG->admin->set_encode_session_data($form_data['encode_session_data']);
        }
        return false;
    }

}
// End of file AdminOptionsSettings.php
// Location: EventEspresso\admin_pages\general_settings/AdminOptionsSettings.php