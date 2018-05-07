<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 * @ package            Event Espresso
 * @ author                Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link                    {@link http://www.eventespresso.com}
 * @ since                4.0
 */


/**
 * EE_Attendee class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Transaction.class.php
 * @author                Mike Nelson
 */
class EE_Attendee extends EE_CPT_Base implements EEI_Contact, EEI_Address, EEI_Admin_Links, EEI_Attendee
{

    /**
     * Sets some dynamic defaults
     *
     * @param array  $fieldValues
     * @param bool   $bydb
     * @param string $timezone
     * @param array  $date_formats
     * @throws EE_Error
     */
    protected function __construct($fieldValues = null, $bydb = false, $timezone = null, $date_formats = array())
    {
        if (! isset($fieldValues['ATT_full_name'])) {
            $fname = isset($fieldValues['ATT_fname']) ? $fieldValues['ATT_fname'] . ' ' : '';
            $lname = isset($fieldValues['ATT_lname']) ? $fieldValues['ATT_lname'] : '';
            $fieldValues['ATT_full_name'] = $fname . $lname;
        }
        if (! isset($fieldValues['ATT_slug'])) {
            // $fieldValues['ATT_slug'] = sanitize_key(wp_generate_password(20));
            $fieldValues['ATT_slug'] = sanitize_title($fieldValues['ATT_full_name']);
        }
        if (! isset($fieldValues['ATT_short_bio']) && isset($fieldValues['ATT_bio'])) {
            $fieldValues['ATT_short_bio'] = substr($fieldValues['ATT_bio'], 0, 50);
        }
        parent::__construct($fieldValues, $bydb, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values          incoming values
     * @param string $timezone                incoming timezone (if not set the timezone set for the website will be
     *                                        used.)
     * @param array  $date_formats            incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Attendee
     * @throws EE_Error
     */
    public static function new_instance($props_n_values = array(), $timezone = null, $date_formats = array())
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ? $has_object : new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string $timezone        incoming timezone as set by the model.  If not set the timezone for
     *                                the website will be used.
     * @return EE_Attendee
     */
    public static function new_instance_from_db($props_n_values = array(), $timezone = null)
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     *        Set Attendee First Name
     *
     * @access        public
     * @param string $fname
     * @throws EE_Error
     */
    public function set_fname($fname = '')
    {
        $this->set('ATT_fname', $fname);
    }


    /**
     *        Set Attendee Last Name
     *
     * @access        public
     * @param string $lname
     * @throws EE_Error
     */
    public function set_lname($lname = '')
    {
        $this->set('ATT_lname', $lname);
    }


    /**
     *        Set Attendee Address
     *
     * @access        public
     * @param string $address
     * @throws EE_Error
     */
    public function set_address($address = '')
    {
        $this->set('ATT_address', $address);
    }


    /**
     *        Set Attendee Address2
     *
     * @access        public
     * @param        string $address2
     * @throws EE_Error
     */
    public function set_address2($address2 = '')
    {
        $this->set('ATT_address2', $address2);
    }


    /**
     *        Set Attendee City
     *
     * @access        public
     * @param        string $city
     * @throws EE_Error
     */
    public function set_city($city = '')
    {
        $this->set('ATT_city', $city);
    }


    /**
     *        Set Attendee State ID
     *
     * @access        public
     * @param        int $STA_ID
     * @throws EE_Error
     */
    public function set_state($STA_ID = 0)
    {
        $this->set('STA_ID', $STA_ID);
    }


    /**
     *        Set Attendee Country ISO Code
     *
     * @access        public
     * @param        string $CNT_ISO
     * @throws EE_Error
     */
    public function set_country($CNT_ISO = '')
    {
        $this->set('CNT_ISO', $CNT_ISO);
    }


    /**
     *        Set Attendee Zip/Postal Code
     *
     * @access        public
     * @param        string $zip
     * @throws EE_Error
     */
    public function set_zip($zip = '')
    {
        $this->set('ATT_zip', $zip);
    }


    /**
     *        Set Attendee Email Address
     *
     * @access        public
     * @param        string $email
     * @throws EE_Error
     */
    public function set_email($email = '')
    {
        $this->set('ATT_email', $email);
    }


    /**
     *        Set Attendee Phone
     *
     * @access        public
     * @param        string $phone
     * @throws EE_Error
     */
    public function set_phone($phone = '')
    {
        $this->set('ATT_phone', $phone);
    }


    /**
     *        set deleted
     *
     * @access        public
     * @param        bool $ATT_deleted
     * @throws EE_Error
     */
    public function set_deleted($ATT_deleted = false)
    {
        $this->set('ATT_deleted', $ATT_deleted);
    }


    /**
     * Returns the value for the post_author id saved with the cpt
     *
     * @since 4.5.0
     * @return int
     * @throws EE_Error
     */
    public function wp_user()
    {
        return $this->get('ATT_author');
    }


    /**
     *        get Attendee First Name
     *
     * @access        public
     * @return string
     * @throws EE_Error
     */
    public function fname()
    {
        return $this->get('ATT_fname');
    }


    /**
     * echoes out the attendee's first name
     *
     * @return void
     * @throws EE_Error
     */
    public function e_full_name()
    {
        echo $this->full_name();
    }


    /**
     * Returns the first and last name concatenated together with a space.
     *
     * @param bool $apply_html_entities
     * @return string
     * @throws EE_Error
     */
    public function full_name($apply_html_entities = false)
    {
        $full_name = array(
            $this->fname(),
            $this->lname(),
        );
        $full_name = array_filter($full_name);
        $full_name = implode(' ', $full_name);
        return $apply_html_entities ? htmlentities($full_name, ENT_QUOTES, 'UTF-8') : $full_name;
    }


    /**
     * This returns the value of the `ATT_full_name` field which is usually equivalent to calling `full_name()` unless
     * the post_title field has been directly modified in the db for the post (espresso_attendees post type) for this
     * attendee.
     *
     * @param bool $apply_html_entities
     * @return string
     * @throws EE_Error
     */
    public function ATT_full_name($apply_html_entities = false)
    {
        return $apply_html_entities
            ? htmlentities($this->get('ATT_full_name'), ENT_QUOTES, 'UTF-8')
            : $this->get('ATT_full_name');
    }


    /**
     *        get Attendee Last Name
     *
     * @access        public
     * @return string
     * @throws EE_Error
     */
    public function lname()
    {
        return $this->get('ATT_lname');
    }


    /**
     * Gets the attendee's full address as an array so client code can decide hwo to display it
     *
     * @return array numerically indexed, with each part of the address that is known.
     * Eg, if the user only responded to state and country,
     * it would be array(0=>'Alabama',1=>'USA')
     * @return array
     * @throws EE_Error
     */
    public function full_address_as_array()
    {
        $full_address_array = array();
        $initial_address_fields = array('ATT_address', 'ATT_address2', 'ATT_city',);
        foreach ($initial_address_fields as $address_field_name) {
            $address_fields_value = $this->get($address_field_name);
            if (! empty($address_fields_value)) {
                $full_address_array[] = $address_fields_value;
            }
        }
        // now handle state and country
        $state_obj = $this->state_obj();
        if ($state_obj instanceof EE_State) {
            $full_address_array[] = $state_obj->name();
        }
        $country_obj = $this->country_obj();
        if ($country_obj instanceof EE_Country) {
            $full_address_array[] = $country_obj->name();
        }
        // lastly get the xip
        $zip_value = $this->zip();
        if (! empty($zip_value)) {
            $full_address_array[] = $zip_value;
        }
        return $full_address_array;
    }


    /**
     *        get Attendee Address
     *
     * @return string
     * @throws EE_Error
     */
    public function address()
    {
        return $this->get('ATT_address');
    }


    /**
     *        get Attendee Address2
     *
     * @return string
     * @throws EE_Error
     */
    public function address2()
    {
        return $this->get('ATT_address2');
    }


    /**
     *        get Attendee City
     *
     * @return string
     * @throws EE_Error
     */
    public function city()
    {
        return $this->get('ATT_city');
    }


    /**
     *        get Attendee State ID
     *
     * @return string
     * @throws EE_Error
     */
    public function state_ID()
    {
        return $this->get('STA_ID');
    }


    /**
     * @return string
     * @throws EE_Error
     */
    public function state_abbrev()
    {
        return $this->state_obj() instanceof EE_State ? $this->state_obj()->abbrev() : '';
    }


    /**
     * Gets the state set to this attendee
     *
     * @return EE_State
     * @throws EE_Error
     */
    public function state_obj()
    {
        return $this->get_first_related('State');
    }


    /**
     * Returns the state's name, otherwise 'Unknown'
     *
     * @return string
     * @throws EE_Error
     */
    public function state_name()
    {
        if ($this->state_obj()) {
            return $this->state_obj()->name();
        } else {
            return '';
        }
    }


    /**
     * either displays the state abbreviation or the state name, as determined
     * by the "FHEE__EEI_Address__state__use_abbreviation" filter.
     * defaults to abbreviation
     *
     * @return string
     * @throws EE_Error
     */
    public function state()
    {
        if (apply_filters('FHEE__EEI_Address__state__use_abbreviation', true, $this->state_obj())) {
            return $this->state_abbrev();
        }
        return $this->state_name();
    }


    /**
     *    get Attendee Country ISO Code
     *
     * @return string
     * @throws EE_Error
     */
    public function country_ID()
    {
        return $this->get('CNT_ISO');
    }


    /**
     * Gets country set for this attendee
     *
     * @return EE_Country
     * @throws EE_Error
     */
    public function country_obj()
    {
        return $this->get_first_related('Country');
    }


    /**
     * Returns the country's name if known, otherwise 'Unknown'
     *
     * @return string
     * @throws EE_Error
     */
    public function country_name()
    {
        if ($this->country_obj()) {
            return $this->country_obj()->name();
        }
        return '';
    }


    /**
     * either displays the country ISO2 code or the country name, as determined
     * by the "FHEE__EEI_Address__country__use_abbreviation" filter.
     * defaults to abbreviation
     *
     * @return string
     * @throws EE_Error
     */
    public function country()
    {
        if (apply_filters('FHEE__EEI_Address__country__use_abbreviation', true, $this->country_obj())) {
            return $this->country_ID();
        }
        return $this->country_name();
    }


    /**
     *        get Attendee Zip/Postal Code
     *
     * @return string
     * @throws EE_Error
     */
    public function zip()
    {
        return $this->get('ATT_zip');
    }


    /**
     *        get Attendee Email Address
     *
     * @return string
     * @throws EE_Error
     */
    public function email()
    {
        return $this->get('ATT_email');
    }


    /**
     *        get Attendee Phone #
     *
     * @return string
     * @throws EE_Error
     */
    public function phone()
    {
        return $this->get('ATT_phone');
    }


    /**
     *    get deleted
     *
     * @return        bool
     * @throws EE_Error
     */
    public function deleted()
    {
        return $this->get('ATT_deleted');
    }


    /**
     * Gets registrations of this attendee
     *
     * @param array $query_params
     * @return EE_Registration[]
     * @throws EE_Error
     */
    public function get_registrations($query_params = array())
    {
        return $this->get_many_related('Registration', $query_params);
    }


    /**
     * Gets the most recent registration of this attendee
     *
     * @return EE_Registration
     * @throws EE_Error
     */
    public function get_most_recent_registration()
    {
        return $this->get_first_related(
            'Registration',
            array('order_by' => array('REG_date' => 'DESC'))
        ); // null, 'REG_date', 'DESC', '=', 'OBJECT_K');
    }


    /**
     * Gets the most recent registration for this attend at this event
     *
     * @param int $event_id
     * @return EE_Registration
     * @throws EE_Error
     */
    public function get_most_recent_registration_for_event($event_id)
    {
        return $this->get_first_related(
            'Registration',
            array(array('EVT_ID' => $event_id), 'order_by' => array('REG_date' => 'DESC'))
        );
    }


    /**
     * returns any events attached to this attendee ($_Event property);
     *
     * @return array
     * @throws EE_Error
     */
    public function events()
    {
        return $this->get_many_related('Event');
    }


    /**
     * Gets the billing info array where keys match espresso_reg_page_billing_inputs(),
     * and keys are their cleaned values. @see EE_Attendee::save_and_clean_billing_info_for_payment_method() which was
     * used to save the billing info
     *
     * @param EE_Payment_Method $payment_method the _gateway_name property on the gateway class
     * @return EE_Form_Section_Proper|null
     * @throws EE_Error
     */
    public function billing_info_for_payment_method($payment_method)
    {
        $pm_type = $payment_method->type_obj();
        if (! $pm_type instanceof EE_PMT_Base) {
            return null;
        }
        $billing_info = $this->get_post_meta($this->get_billing_info_postmeta_name($payment_method), true);
        if (! $billing_info) {
            return null;
        }
        $billing_form = $pm_type->billing_form();
        // double-check the form isn't totally hidden, in which case pretend there is no form
        $form_totally_hidden = true;
        foreach ($billing_form->inputs_in_subsections() as $input) {
            if (! $input->get_display_strategy() instanceof EE_Hidden_Display_Strategy) {
                $form_totally_hidden = false;
                break;
            }
        }
        if ($form_totally_hidden) {
            return null;
        }
        if ($billing_form instanceof EE_Form_Section_Proper) {
            $billing_form->receive_form_submission(array($billing_form->name() => $billing_info), false);
        }

        return $billing_form;
    }


    /**
     * Gets the postmeta key that holds this attendee's billing info for the
     * specified payment method
     *
     * @param EE_Payment_Method $payment_method
     * @return string
     * @throws EE_Error
     */
    public function get_billing_info_postmeta_name($payment_method)
    {
        if ($payment_method->type_obj() instanceof EE_PMT_Base) {
            return 'billing_info_' . $payment_method->type_obj()->system_name();
        }
        return null;
    }


    /**
     * Saves the billing info to the attendee. @see EE_Attendee::billing_info_for_payment_method() which is used to
     * retrieve it
     *
     * @param EE_Billing_Attendee_Info_Form $billing_form
     * @param EE_Payment_Method             $payment_method
     * @return boolean
     * @throws EE_Error
     */
    public function save_and_clean_billing_info_for_payment_method($billing_form, $payment_method)
    {
        if (! $billing_form instanceof EE_Billing_Attendee_Info_Form) {
            EE_Error::add_error(__('Cannot save billing info because there is none.', 'event_espresso'));
            return false;
        }
        $billing_form->clean_sensitive_data();
        return update_post_meta(
            $this->ID(),
            $this->get_billing_info_postmeta_name($payment_method),
            $billing_form->input_values(true)
        );
    }


    /**
     * Return the link to the admin details for the object.
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_admin_details_link()
    {
        return $this->get_admin_edit_link();
    }


    /**
     * Returns the link to the editor for the object.  Sometimes this is the same as the details.
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_admin_edit_link()
    {
        EE_Registry::instance()->load_helper('URL');
        return EEH_URL::add_query_args_and_nonce(
            array(
                'page'   => 'espresso_registrations',
                'action' => 'edit_attendee',
                'post'   => $this->ID(),
            ),
            admin_url('admin.php')
        );
    }


    /**
     * Returns the link to a settings page for the object.
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_admin_settings_link()
    {
        return $this->get_admin_edit_link();
    }


    /**
     * Returns the link to the "overview" for the object (typically the "list table" view).
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_admin_overview_link()
    {
        EE_Registry::instance()->load_helper('URL');
        return EEH_URL::add_query_args_and_nonce(
            array(
                'page'   => 'espresso_registrations',
                'action' => 'contact_list',
            ),
            admin_url('admin.php')
        );
    }
}
