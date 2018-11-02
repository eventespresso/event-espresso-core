<?php

namespace EventEspresso\admin_pages\general_settings;

use DomainException;
use EE_Admin_File_Uploader_Input;
use EE_Admin_Two_Column_Layout;
use EE_Checkbox_Multi_Input;
use EE_Core_Config;
use EE_Country;
use EE_Country_Select_Input;
use EE_Currency_Config;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Network_Core_Config;
use EE_Organization_Config;
use EE_Registry;
use EE_State_Select_Input;
use EE_Text_Input;
use EEH_HTML;
use EEH_Template;
use EEM_Country;
use EEM_State;
use EventEspresso\core\domain\services\pue\Stats;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFormSubmissionException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\libraries\form_sections\form_handlers\FormHandler;
use EventEspresso\core\libraries\form_sections\strategies\filter\VsprintfFilter;
use EventEspresso\core\services\address\CountrySubRegionDao;
use InvalidArgumentException;
use LogicException;
use ReflectionException;

/**
 * OrganizationSettings
 * A form handler for Organization Settings
 *
 * @package EventEspresso\admin_pages\general_settings
 * @author  Darren Ethier
 * @since   4.9.63.p
 */
class OrganizationSettings extends FormHandler
{

    /**
     * @var EE_Organization_Config
     */
    protected $organization_config;

    /**
     * @var EE_Core_Config
     */
    protected $core_config;


    /**
     * @var EE_Network_Core_Config
     */
    protected $network_core_config;

    /**
     * @var CountrySubRegionDao $countrySubRegionDao
     */
    protected $countrySubRegionDao;

    /**
     * Form constructor.
     *
     * @param EE_Registry             $registry
     * @param EE_Organization_Config  $organization_config
     * @param EE_Core_Config          $core_config
     * @param EE_Network_Core_Config $network_core_config
     * @param CountrySubRegionDao $countrySubRegionDao
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws DomainException
     */
    public function __construct(
        EE_Registry $registry,
        EE_Organization_Config $organization_config,
        EE_Core_Config $core_config,
        EE_Network_Core_Config $network_core_config,
        CountrySubRegionDao $countrySubRegionDao
    ) {
        $this->organization_config = $organization_config;
        $this->core_config = $core_config;
        $this->network_core_config = $network_core_config;
        $this->countrySubRegionDao = $countrySubRegionDao;
        parent::__construct(
            esc_html__('Your Organization Settings', 'event_espresso'),
            esc_html__('Your Organization Settings', 'event_espresso'),
            'organization_settings',
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
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function generate()
    {
        $has_sub_regions = EEM_State::instance()->count(
            array(array('Country.CNT_ISO' => $this->organization_config->CNT_ISO))
        );
        $form = new EE_Form_Section_Proper(
            array(
                'name'            => 'organization_settings',
                'html_id'         => 'organization_settings',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => array(
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
                            'default'         => $this->organization_config->get_pretty('name'),
                            'required'        => false,
                        )
                    ),
                    'organization_address_1'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_address_1',
                            'html_label_text' => esc_html__('Street Address', 'event_espresso'),
                            'default'         => $this->organization_config->get_pretty('address_1'),
                            'required'        => false,
                        )
                    ),
                    'organization_address_2'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_address_2',
                            'html_label_text' => esc_html__('Street Address 2', 'event_espresso'),
                            'default'         => $this->organization_config->get_pretty('address_2'),
                            'required'        => false,
                        )
                    ),
                    'organization_city'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_city',
                            'html_label_text' => esc_html__('City', 'event_espresso'),
                            'default'         => $this->organization_config->get_pretty('city'),
                            'required'        => false,
                        )
                    ),
                    'organization_country'      => new EE_Country_Select_Input(
                        null,
                        array(
                            EE_Country_Select_Input::OPTION_GET_KEY => EE_Country_Select_Input::OPTION_GET_ALL,
                            'html_name'       => 'organization_country',
                            'html_label_text' => esc_html__('Country', 'event_espresso'),
                            'default'         => $this->organization_config->CNT_ISO,
                            'required'        => false,
                            'html_help_text'  => sprintf(
                                esc_html__(
                                    '%1$sThe Country set here will have the effect of setting the currency used for all ticket prices.%2$s',
                                    'event_espresso'
                                ),
                                '<span class="reminder-spn">',
                                '</span>'
                            ),
                        )
                    ),
                    'organization_state' => new EE_State_Select_Input(
                        null,
                        array(
                            'html_name'       => 'organization_state',
                            'html_label_text' => esc_html__('State/Province', 'event_espresso'),
                            'default'         => $this->organization_config->STA_ID,
                            'required'        => false,
                            'html_help_text' => empty($this->organization_config->STA_ID) || ! $has_sub_regions
                                ? sprintf(
                                    esc_html__(
                                        'If the States/Provinces for the selected Country do not appear in this list, then click "Save".%3$sIf data exists, then the list will be populated when the page reloads and you will be able to make a selection at that time.%3$s%1$sMake sure you click "Save" again after selecting a State/Province that has just been loaded in order to keep that selection.%2$s',
                                        'event_espresso'
                                    ),
                                    '<span class="reminder-spn">',
                                    '</span>',
                                    '<br />'
                                )
                                : '',
                        )
                    ),
                    'organization_zip'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_zip',
                            'html_label_text' => esc_html__('Zip/Postal Code', 'event_espresso'),
                            'default'         => $this->organization_config->get_pretty('zip'),
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
                            'default'         => $this->organization_config->get_pretty('email'),
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
                            'default'         => $this->organization_config->get_pretty('phone'),
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
                            'default'         => $this->organization_config->get_pretty('vat'),
                            'required'        => false,
                        )
                    ),
                    'company_logo_hdr'        => new EE_Form_Section_HTML(
                        EEH_HTML::h2(
                            esc_html__('Company Logo', 'event_espresso')
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
                            'default'         => $this->organization_config->get_pretty('logo_url'),
                            'required'        => false,
                        )
                    ),
                    'social_links_hdr'        => new EE_Form_Section_HTML(
                        EEH_HTML::h2(
                            esc_html__('Social Links', 'event_espresso')
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
                            'default'         => $this->organization_config->get_pretty('facebook'),
                            'required'        => false,
                        )
                    ),
                    'organization_twitter'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_twitter',
                            'html_label_text' => esc_html__('Twitter', 'event_espresso'),
                            'other_html_attributes' => ' placeholder="twitter.com/twitterhandle"',
                            'default'         => $this->organization_config->get_pretty('twitter'),
                            'required'        => false,
                        )
                    ),
                    'organization_linkedin'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_linkedin',
                            'html_label_text' => esc_html__('LinkedIn', 'event_espresso'),
                            'other_html_attributes' => ' placeholder="linkedin.com/in/profilename"',
                            'default'         => $this->organization_config->get_pretty('linkedin'),
                            'required'        => false,
                        )
                    ),
                    'organization_pinterest'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_pinterest',
                            'html_label_text' => esc_html__('Pinterest', 'event_espresso'),
                            'other_html_attributes' => ' placeholder="pinterest.com/profilename"',
                            'default'         => $this->organization_config->get_pretty('pinterest'),
                            'required'        => false,
                        )
                    ),
                    'organization_google'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_google',
                            'html_label_text' => esc_html__('Google+', 'event_espresso'),
                            'other_html_attributes' => ' placeholder="google.com/+profilename"',
                            'default'         => $this->organization_config->get_pretty('google'),
                            'required'        => false,
                        )
                    ),
                    'organization_instagram'      => new EE_Text_Input(
                        array(
                            'html_name' => 'organization_instagram',
                            'html_label_text' => esc_html__('Instagram', 'event_espresso'),
                            'other_html_attributes' => ' placeholder="instagram.com/handle"',
                            'default'         => $this->organization_config->get_pretty('instagram'),
                            'required'        => false,
                        )
                    ),
                ),
            )
        );
        if (is_main_site()) {
            $form->add_subsections(
                array(
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
                    'site_license_key' => $this->getSiteLicenseKeyField()
                )
            );
            $form->add_subsections(
                array(
                    'uxip_optin_hdr' => new EE_Form_Section_HTML(
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
                            'default'         => isset($this->core_config->ee_ueip_optin)
                                ? filter_var($this->core_config->ee_ueip_optin, FILTER_VALIDATE_BOOLEAN)
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
     * @throws ReflectionException
     */
    public function process($form_data = array())
    {
        // process form
        $valid_data = (array) parent::process($form_data);
        if (empty($valid_data)) {
            return false;
        }

        if (is_main_site()) {
            $this->network_core_config->site_license_key = isset($form_data['ee_site_license_key'])
                ? sanitize_text_field($form_data['ee_site_license_key'])
                : $this->network_core_config->site_license_key;
        }
        $this->organization_config->name = isset($form_data['organization_name'])
            ? sanitize_text_field($form_data['organization_name'])
            : $this->organization_config->name;
        $this->organization_config->address_1 = isset($form_data['organization_address_1'])
            ? sanitize_text_field($form_data['organization_address_1'])
            : $this->organization_config->address_1;
        $this->organization_config->address_2 = isset($form_data['organization_address_2'])
            ? sanitize_text_field($form_data['organization_address_2'])
            : $this->organization_config->address_2;
        $this->organization_config->city = isset($form_data['organization_city'])
            ? sanitize_text_field($form_data['organization_city'])
            : $this->organization_config->city;
        $this->organization_config->STA_ID = isset($form_data['organization_state'])
            ? absint($form_data['organization_state'])
            : $this->organization_config->STA_ID;
        $this->organization_config->CNT_ISO = isset($form_data['organization_country'])
            ? sanitize_text_field($form_data['organization_country'])
            : $this->organization_config->CNT_ISO;
        $this->organization_config->zip = isset($form_data['organization_zip'])
            ? sanitize_text_field($form_data['organization_zip'])
            : $this->organization_config->zip;
        $this->organization_config->email = isset($form_data['organization_email'])
            ? sanitize_email($form_data['organization_email'])
            : $this->organization_config->email;
        $this->organization_config->vat = isset($form_data['organization_vat'])
            ? sanitize_text_field($form_data['organization_vat'])
            : $this->organization_config->vat;
        $this->organization_config->phone = isset($form_data['organization_phone'])
            ? sanitize_text_field($form_data['organization_phone'])
            : $this->organization_config->phone;
        $this->organization_config->logo_url = isset($form_data['organization_logo_url'])
            ? esc_url_raw($form_data['organization_logo_url'])
            : $this->organization_config->logo_url;
        $this->organization_config->facebook = isset($form_data['organization_facebook'])
            ? esc_url_raw($form_data['organization_facebook'])
            : $this->organization_config->facebook;
        $this->organization_config->twitter = isset($form_data['organization_twitter'])
            ? esc_url_raw($form_data['organization_twitter'])
            : $this->organization_config->twitter;
        $this->organization_config->linkedin = isset($form_data['organization_linkedin'])
            ? esc_url_raw($form_data['organization_linkedin'])
            : $this->organization_config->linkedin;
        $this->organization_config->pinterest = isset($form_data['organization_pinterest'])
            ? esc_url_raw($form_data['organization_pinterest'])
            : $this->organization_config->pinterest;
        $this->organization_config->google = isset($form_data['organization_google'])
            ? esc_url_raw($form_data['organization_google'])
            : $this->organization_config->google;
        $this->organization_config->instagram = isset($form_data['organization_instagram'])
            ? esc_url_raw($form_data['organization_instagram'])
            : $this->organization_config->instagram;
        $this->core_config->ee_ueip_optin = isset($form_data[ EE_Core_Config::OPTION_NAME_UXIP ][0])
            ? filter_var($form_data[ EE_Core_Config::OPTION_NAME_UXIP ][0], FILTER_VALIDATE_BOOLEAN)
            : false;
        $this->core_config->ee_ueip_has_notified = true;

        $this->registry->CFG->currency = new EE_Currency_Config(
            $this->organization_config->CNT_ISO
        );
        /** @var EE_Country $country */
        $country = EEM_Country::instance()->get_one_by_ID($this->organization_config->CNT_ISO);
        if ($country instanceof EE_Country) {
            $country->set('CNT_active', 1);
            $country->save();
            $this->countrySubRegionDao->saveCountrySubRegions($country);
        }
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
        if (empty($this->network_core_config->site_license_key)) {
            return false;
        }
        $ver_option_key = 'puvererr_' . basename(EE_PLUGIN_BASENAME);
        $verify_fail = get_option($ver_option_key, false);
        return $verify_fail === false
                  || (! empty($this->network_core_config->site_license_key)
                        && $verify_fail === false
                  );
    }


    /**
     * @return EE_Text_Input
     */
    private function getSiteLicenseKeyField()
    {
        $text_input = new EE_Text_Input(
            array(
                'html_name' => 'ee_site_license_key',
                'html_id' => 'site_license_key',
                'html_label_text' => esc_html__('Support License Key', 'event_espresso'),
                /** phpcs:disable WordPress.WP.I18n.UnorderedPlaceholdersText */
                'html_help_text'  => sprintf(
                    esc_html__(
                        'Adding a valid Support License Key will enable automatic update notifications and backend updates for Event Espresso Core and any installed add-ons. If this is a Development or Test site, %sDO NOT%s enter your Support License Key.',
                        'event_espresso'
                    ),
                    '<strong>',
                    '</strong>'
                ),
                /** phpcs:enable */
                'default'         => isset($this->network_core_config->site_license_key)
                    ? $this->network_core_config->site_license_key
                    : '',
                'required'        => false,
                'form_html_filter' => new VsprintfFilter(
                    '%2$s %1$s',
                    array($this->getValidationIndicator())
                )
            )
        );
        return $text_input;
    }


    /**
     * @return string
     */
    private function getValidationIndicator()
    {
        $verified_class = $this->licenseKeyVerified() ? 'ee-icon-color-ee-green' : 'ee-icon-color-ee-red';
        return '<span class="dashicons dashicons-admin-network ' . $verified_class . ' ee-icon-size-20"></span>';
    }
}
