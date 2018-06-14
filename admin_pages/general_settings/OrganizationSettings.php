<?php

namespace EventEspresso\admin_pages\general_settings;

use EE_Admin_File_Uploader_Input;
use EE_Admin_Two_Column_Layout;
use EE_Checkbox_Multi_Input;
use EE_Core_Config;
use EE_Country_Select_Input;
use EE_Currency_Config;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_License_Key_Display_Strategy;
use EE_Registry;
use EE_State_Select_Input;
use EE_Text_Input;
use EEH_HTML;
use EEH_Template;
use EventEspresso\core\domain\services\pue\Stats;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFormSubmissionException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\libraries\form_sections\form_handlers\FormHandler;
use InvalidArgumentException;
use LogicException;

/**
 * OrganizationSettings
 * A form handler for Organization Settings
 *
 * @package EventEspresso\admin_pages\general_settings
 * @author  Darren Ethier
 * @since   $VID:$
 */
class OrganizationSettings extends FormHandler
{

    /**
     * Form constructor.
     *
     * @param EE_Registry $registry
     * @throws \DomainException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    public function __construct(EE_Registry $registry)
    {
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
     * creates and returns the actual form
     *
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    public function generate()
    {
        $form = new EE_Form_Section_Proper(
            array(
                'name'            => 'organization_settings',
                'html_id'         => 'organization_settings',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => array(
                    'site_license_key_hdr' => new EE_Form_Section_HTML(
                        EEH_HTML::h2(
                            esc_html__('Your Event Espresso License Key', 'event_espresso')
                            . ' '
                            . EEH_HTML::span(
                                EEH_Template::get_help_tab_link('site_license_key_info'),
                                'help_tour_activation'
                            ),
                            '',
                            'site-license-key-hdr'
                        )
                    ),
                    'site_license_key'     => $this->getSiteLicenseKeyField(),
                    'contact_information_hdr'        => new EE_Form_Section_HTML(
                        EEH_HTML::h2(
                            esc_html__('Contact Information', 'event_espresso')
                            . ' '
                            . EEH_HTML::span(EEH_Template::get_help_tab_link('contact_info_info')),
                            '',
                            'contact-information-hdr'
                        )
                    ),
                    'organization_name'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_name',
                            'html_label_text' => esc_html__('Organization Name', 'event_espresso'),
                            'html_help_text'  => esc_html__(
                                'Displayed on all emails and invoices.',
                                'event_espresso'
                            ),
                            'default'         => $this->registry->CFG->organization->get_pretty('name'),
                            'required'        => false,
                        )
                    ),
                    'organization_address_1'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_address_1',
                            'html_label_text' => esc_html__('Street Address', 'event_espresso'),
                            'default'         => $this->registry->CFG->organization->get_pretty('address_1'),
                            'required'        => false,
                        )
                    ),
                    'organization_address_2'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_address_2',
                            'html_label_text' => esc_html__('Street Address 2', 'event_espresso'),
                            'default'         => $this->registry->CFG->organization->get_pretty('address_2'),
                            'required'        => false,
                        )
                    ),
                    'organization_city'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_city',
                            'html_label_text' => esc_html__('City', 'event_espresso'),
                            'default'         => $this->registry->CFG->organization->get_pretty('city'),
                            'required'        => false,
                        )
                    ),
                    'organization_state'      => new EE_State_Select_Input(
                        null,
                        array(
                            'html_name' => 'organization_state',
                            'html_label_text' => esc_html__('State/Province', 'event_espresso'),
                            'default'         => $this->registry->CFG->organization->STA_ID,
                            'required'        => false,
                        )
                    ),
                    'organization_country'      => new EE_Country_Select_Input(
                        null,
                        array(
                            'html_name' => 'organization_country',
                            'html_label_text' => esc_html__('Country', 'event_espresso'),
                            'default'         => $this->registry->CFG->organization->CNT_ISO,
                            'required'        => false,
                        )
                    ),
                    'organization_zip'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_zip',
                            'html_label_text' => esc_html__('Zip/Postal Code', 'event_espresso'),
                            'default'         => $this->registry->CFG->organization->get_pretty('zip'),
                            'required'        => false,
                        )
                    ),
                    'organization_email'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_email',
                            'html_label_text' => esc_html__('Primary Contact Email', 'event_espresso'),
                            'html_help_text'  => sprintf(
                                esc_html__(
                                    'This is where notifications go to when you use the %1$s and %2$s shortcodes in the message templates.',
                                    'event_espresso'
                                ),
                                '<code>[CO_FORMATTED_EMAIL]</code>',
                                '<code>[CO_EMAIL]</code>'
                            ),
                            'default'         => $this->registry->CFG->organization->get_pretty('email'),
                            'required'        => false,
                        )
                    ),
                    'organization_phone'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_phone',
                            'html_label_text' => esc_html__('Phone Number', 'event_espresso'),
                            'html_help_text'  => esc_html__(
                                'The phone number for your organization.',
                                'event_espresso'
                            ),
                            'default'         => $this->registry->CFG->organization->get_pretty('phone'),
                            'required'        => false,
                        )
                    ),
                    'organization_vat'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_vat',
                            'html_label_text' => esc_html__('VAT/Tax Number', 'event_espresso'),
                            'html_help_text'  => esc_html__(
                                'The VAT/Tax Number may be displayed on invoices and receipts.',
                                'event_espresso'
                            ),
                            'default'         => $this->registry->CFG->organization->get_pretty('vat'),
                            'required'        => false,
                        )
                    ),
                    'company_logo_hdr'        => new EE_Form_Section_HTML(
                        EEH_HTML::h2(
                            esc_html__('Company Logo', 'event_espresso', 'event_espresso')
                            . ' '
                            . EEH_HTML::span(EEH_Template::get_help_tab_link('organization_logo_info')),
                            '',
                            'company-logo-hdr'
                        )
                    ),
                    'organization_logo_url'      => new EE_Admin_File_Uploader_Input(
                        array(
                            'html_name' => 'organization_logo_url',
                            'html_label_text' => esc_html__('Upload New Logo', 'event_espresso'),
                            'html_help_text'  => esc_html__(
                                'Your logo will be used on custom invoices, tickets, certificates, and payment templates.',
                                'event_espresso'
                            ),
                            'default'         => $this->registry->CFG->organization->get_pretty('logo_url'),
                            'required'        => false,
                        )
                    ),
                    'social_links_hdr'        => new EE_Form_Section_HTML(
                        EEH_HTML::h2(
                            esc_html__('Social Links', 'event_espresso', 'event_espresso')
                            . ' '
                            . EEH_HTML::span(EEH_Template::get_help_tab_link('social_links_info'))
                            . EEH_HTML::br()
                            . EEH_HTML::p(
                                esc_html__(
                                    'Enter any links to social accounts for your organization here',
                                    'event_espresso'
                                ),
                                '',
                                'description'
                            ),
                            '',
                            'social-links-hdr'
                        )
                    ),
                    'organization_facebook'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_facebook',
                            'html_label_text' => esc_html__('Facebook', 'event_espresso'),
                            'other_html_attributes' => ' placeholder="facebook.com/profile.name"',
                            'default'         => $this->registry->CFG->organization->get_pretty('facebook'),
                            'required'        => false,
                        )
                    ),
                    'organization_twitter'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_twitter',
                            'html_label_text' => esc_html__('Twitter', 'event_espresso'),
                            'other_html_attributes' => ' placeholder="twitter.com/twitterhandle"',
                            'default'         => $this->registry->CFG->organization->get_pretty('twitter'),
                            'required'        => false,
                        )
                    ),
                    'organization_linkedin'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_linkedin',
                            'html_label_text' => esc_html__('LinkedIn', 'event_espresso'),
                            'other_html_attributes' => ' placeholder="linkedin.com/in/profilename"',
                            'default'         => $this->registry->CFG->organization->get_pretty('linkedin'),
                            'required'        => false,
                        )
                    ),
                    'organization_pinterest'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_pinterest',
                            'html_label_text' => esc_html__('Pinterest', 'event_espresso'),
                            'other_html_attributes' => ' placeholder="pinterest.com/profilename"',
                            'default'         => $this->registry->CFG->organization->get_pretty('pinterest'),
                            'required'        => false,
                        )
                    ),
                    'organization_google'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_google',
                            'html_label_text' => esc_html__('Google+', 'event_espresso'),
                            'other_html_attributes' => ' placeholder="google.com/+profilename"',
                            'default'         => $this->registry->CFG->organization->get_pretty('google'),
                            'required'        => false,
                        )
                    ),
                    'organization_instagram'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_instagram',
                            'html_label_text' => esc_html__('Instagram', 'event_espresso'),
                            'other_html_attributes' => ' placeholder="instagram.com/handle"',
                            'default'         => $this->registry->CFG->organization->get_pretty('instagram'),
                            'required'        => false,
                        )
                    ),
                ),
            )
        );
        if (is_main_site()) {
            $form->add_subsections(
                array(
                    'uxip_optin_hdr'  => new EE_Form_Section_HTML(
                        $this->uxipOptinText()
                    ),
                    'ueip_optin' => new EE_Checkbox_Multi_Input(
                        array(
                            true => __('Yes! I want to help improve Event Espresso!', 'event_espresso')
                        ),
                        array(
                            'html_name' => EE_Core_Config::OPTION_NAME_UXIP,
                            'html_label_text' => esc_html__(
                                'UXIP Opt In?',
                                'event_espresso'
                            ),
                            'default'         => isset($this->registry->CFG->core->ee_ueip_optin)
                                ? filter_var($this->registry->CFG->core->ee_ueip_optin, FILTER_VALIDATE_BOOLEAN)
                                : false,
                            'required'        => false,
                        )
                    ),
                ),
                'organization_instagram',
                false
            );
        }
        return $form;
    }


    /**
     * takes the generated form and displays it along with ony other non-form HTML that may be required
     * returns a string of HTML that can be directly echoed in a template
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws LogicException
     */
    public function display()
    {
        $this->form()->enqueue_js();
        return parent::display();
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
        $valid_data = (array) parent::process($form_data);
        if (empty($valid_data)) {
            return false;
        }

        if (is_main_site()) {
            $this->registry->NET_CFG->core->site_license_key = isset($form_data['site_license_key'])
                ? sanitize_text_field($form_data['site_license_key'])
                : $this->registry->NET_CFG->core->site_license_key;
        }
        $this->registry->CFG->organization->name = isset($form_data['organization_name'])
            ? sanitize_text_field($form_data['organization_name'])
            : $this->registry->CFG->organization->name;
        $this->registry->CFG->organization->address_1 = isset($form_data['organization_address_1'])
            ? sanitize_text_field($form_data['organization_address_1'])
            : $this->registry->CFG->organization->address_1;
        $this->registry->CFG->organization->address_2 = isset($form_data['organization_address_2'])
            ? sanitize_text_field($form_data['organization_address_2'])
            : $this->registry->CFG->organization->address_2;
        $this->registry->CFG->organization->city = isset($form_data['organization_city'])
            ? sanitize_text_field($form_data['organization_city'])
            : $this->registry->CFG->organization->city;
        $this->registry->CFG->organization->STA_ID = isset($form_data['organization_state'])
            ? absint($form_data['organization_state'])
            : $this->registry->CFG->organization->STA_ID;
        $this->registry->CFG->organization->CNT_ISO = isset($form_data['organization_country'])
            ? sanitize_text_field($form_data['organization_country'])
            : $this->registry->CFG->organization->CNT_ISO;
        $this->registry->CFG->organization->zip = isset($form_data['organization_zip'])
            ? sanitize_text_field($form_data['organization_zip'])
            : $this->registry->CFG->organization->zip;
        $this->registry->CFG->organization->email = isset($form_data['organization_email'])
            ? sanitize_email($form_data['organization_email'])
            : $this->registry->CFG->organization->email;
        $this->registry->CFG->organization->vat = isset($form_data['organization_vat'])
            ? sanitize_text_field($form_data['organization_vat'])
            : $this->registry->CFG->organization->vat;
        $this->registry->CFG->organization->phone = isset($form_data['organization_phone'])
            ? sanitize_text_field($form_data['organization_phone'])
            : $this->registry->CFG->organization->phone;
        $this->registry->CFG->organization->logo_url = isset($form_data['organization_logo_url'])
            ? esc_url_raw($form_data['organization_logo_url'])
            : $this->registry->CFG->organization->logo_url;
        $this->registry->CFG->organization->facebook = isset($form_data['organization_facebook'])
            ? esc_url_raw($form_data['organization_facebook'])
            : $this->registry->CFG->organization->facebook;
        $this->registry->CFG->organization->twitter = isset($form_data['organization_twitter'])
            ? esc_url_raw($form_data['organization_twitter'])
            : $this->registry->CFG->organization->twitter;
        $this->registry->CFG->organization->linkedin = isset($form_data['organization_linkedin'])
            ? esc_url_raw($form_data['organization_linkedin'])
            : $this->registry->CFG->organization->linkedin;
        $this->registry->CFG->organization->pinterest = isset($form_data['organization_pinterest'])
            ? esc_url_raw($form_data['organization_pinterest'])
            : $this->registry->CFG->organization->pinterest;
        $this->registry->CFG->organization->google = isset($form_data['organization_google'])
            ? esc_url_raw($form_data['organization_google'])
            : $this->registry->CFG->organization->google;
        $this->registry->CFG->organization->instagram = isset($form_data['organization_instagram'])
            ? esc_url_raw($form_data['organization_instagram'])
            : $this->registry->CFG->organization->instagram;
        $this->registry->CFG->core->ee_ueip_optin = isset($form_data[EE_Core_Config::OPTION_NAME_UXIP][0])
            ? filter_var($form_data[EE_Core_Config::OPTION_NAME_UXIP][0], FILTER_VALIDATE_BOOLEAN)
            : false;
        $this->registry->CFG->core->ee_ueip_has_notified = true;

        $this->registry->CFG->currency = new EE_Currency_Config(
            $this->registry->CFG->organization->CNT_ISO
        );
        return true;
    }


    /**
     * @return string
     */
    private function uxipOptinText()
    {
        ob_start();
        Stats::optinText(false);
        return ob_get_clean();
    }


    /**
     * Return whether the site license key has been verified or not.
     * @return bool
     */
    private function licenseKeyVerified()
    {
        if (empty($this->registry->NET_CFG->core->site_license_key)) {
            return false;
        }
        $ver_option_key = 'puvererr_' . basename(EE_PLUGIN_BASENAME);
        $verify_fail = get_option($ver_option_key, false);
        return $verify_fail === false
                  || (! empty($this->registry->NET_CFG->core->site_license_key)
                        && $verify_fail === false
                  );
    }


    private function getSiteLicenseKeyField()
    {
        $text_input = new EE_Text_Input(
            array(
                'html_name' => 'site_license_key',
                'html_id' => 'site_license_key',
                'html_label_text' => esc_html__('Support License Key', 'event_espresso'),
                'html_help_text'  => sprintf(
                    esc_html__(
                        'Adding a valid Support License Key will enable automatic update notifications and backend updates for Event Espresso Core and any installed add-ons. If this is a Development or Test site, %sDO NOT%s enter your Support License Key.',
                        'event_espresso'
                    ),
                    '<strong>',
                    '</strong>'
                ),
                'default'         => isset($this->registry->NET_CFG->core->site_license_key)
                    ? $this->registry->NET_CFG->core->site_license_key
                    : '',
                'required'        => false,
            )
        );
        $text_input->set_display_strategy(new EE_License_Key_Display_Strategy($this->licenseKeyVerified()));
        return $text_input;
    }
}