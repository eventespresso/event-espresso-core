<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\address\AddressInterface;

/**
 * EE_Attendee class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Transaction.class.php
 * @author                Mike Nelson
 * @method EE_Country|EE_State|EE_Registration get_first_related(string $relation_name, array $query_params = [])
 * @method EE_Event[]|EE_Registration[] get_many_related($relationName, $query_params = [])
 */
class EE_Attendee extends EE_CPT_Base implements EEI_Contact, AddressInterface, EEI_Admin_Links, EEI_Attendee
{
    /**
     * Sets some dynamic defaults
     *
     * @param array  $fieldValues
     * @param bool   $bydb
     * @param string $timezone
     * @param array  $date_formats
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function __construct($fieldValues = null, $bydb = false, $timezone = '', $date_formats = [])
    {
        if (! isset($fieldValues['ATT_full_name'])) {
            $fname                        = $fieldValues['ATT_fname'] ?? '';
            $lname                        = $fieldValues['ATT_lname'] ?? '';
            $fieldValues['ATT_full_name'] = "$fname $lname";
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
     * @param array       $props_n_values     incoming values
     * @param string|null $timezone           incoming timezone (if not set the timezone set for the website
     *                                        will be
     *                                        used.)
     * @param array       $date_formats       incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Attendee
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance(
        array $props_n_values = [],
        ?string $timezone = '',
        array $date_formats = []
    ): EE_Attendee {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ?: new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array       $props_n_values incoming values from the database
     * @param string|null $timezone       incoming timezone as set by the model.
     *                                    If not set, the timezone for the website will be used.
     * @return EE_Attendee
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db(array $props_n_values = [], ?string $timezone = ''): EE_Attendee
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * @param string|null $fname
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_fname(?string $fname = '')
    {
        $this->set('ATT_fname', (string) $fname);
    }


    /**
     * @param string|null $lname
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_lname(?string $lname = '')
    {
        $this->set('ATT_lname', (string) $lname);
    }


    /**
     * @param string|null $address
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_address(?string $address = '')
    {
        $this->set('ATT_address', (string) $address);
    }


    /**
     * @param string|null $address2
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_address2(?string $address2 = '')
    {
        $this->set('ATT_address2', (string) $address2);
    }


    /**
     * @param string|null $city
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_city(?string $city = '')
    {
        $this->set('ATT_city', $city);
    }


    /**
     * @param int|null $STA_ID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_state(?int $STA_ID = 0)
    {
        $this->set('STA_ID', $STA_ID);
    }


    /**
     * @param string|null $CNT_ISO
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_country(?string $CNT_ISO = '')
    {
        $this->set('CNT_ISO', $CNT_ISO);
    }


    /**
     * @param string|null $zip
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_zip(?string $zip = '')
    {
        $this->set('ATT_zip', $zip);
    }


    /**
     * @param string|null $email
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_email(?string $email = '')
    {
        $this->set('ATT_email', $email);
    }


    /**
     * @param string|null $phone
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_phone(?string $phone = '')
    {
        $this->set('ATT_phone', $phone);
    }


    /**
     * @param bool|int|string|null $ATT_deleted
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_deleted($ATT_deleted = false)
    {
        $this->set('ATT_deleted', $ATT_deleted);
    }


    /**
     * Returns the value for the post_author id saved with the cpt
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.5.0
     */
    public function wp_user(): int
    {
        return (int) $this->get('ATT_author');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function fname(): string
    {
        return (string) $this->get('ATT_fname');
    }


    /**
     * echoes out the attendee's first name
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function e_full_name()
    {
        echo esc_html($this->full_name());
    }


    /**
     * Returns the first and last name concatenated together with a space.
     *
     * @param bool $apply_html_entities
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function full_name(bool $apply_html_entities = false): string
    {
        $full_name = [$this->fname(), $this->lname()];
        $full_name = array_filter($full_name);
        $full_name = implode(' ', $full_name);
        return $apply_html_entities
            ? htmlentities($full_name, ENT_QUOTES, 'UTF-8')
            : $full_name;
    }


    /**
     * This returns the value of the `ATT_full_name` field which is usually equivalent to calling `full_name()` unless
     * the post_title field has been directly modified in the db for the post (espresso_attendees post type) for this
     * attendee.
     *
     * @param bool $apply_html_entities
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function ATT_full_name(bool $apply_html_entities = false): string
    {
        return $apply_html_entities
            ? htmlentities((string) $this->get('ATT_full_name'), ENT_QUOTES, 'UTF-8')
            : (string) $this->get('ATT_full_name');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function lname(): string
    {
        return (string) $this->get('ATT_lname');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function bio(): string
    {
        return (string) $this->get('ATT_bio');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function short_bio(): string
    {
        return (string) $this->get('ATT_short_bio');
    }


    /**
     * Gets the attendee's full address as an array so client code can decide hwo to display it
     *
     * @return array numerically indexed, with each part of the address that is known.
     * Eg, if the user only responded to state and country,
     * it would be array(0=>'Alabama',1=>'USA')
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function full_address_as_array(): array
    {
        $full_address_array     = [];
        $initial_address_fields = ['ATT_address', 'ATT_address2', 'ATT_city',];
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
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function address(): string
    {
        return (string) $this->get('ATT_address');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function address2(): string
    {
        return (string) $this->get('ATT_address2');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function city(): string
    {
        return (string) $this->get('ATT_city');
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function state_ID(): int
    {
        return (int) $this->get('STA_ID');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function state_abbrev(): string
    {
        return $this->state_obj() instanceof EE_State
            ? $this->state_obj()->abbrev()
            : '';
    }


    /**
     * @return EE_State|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function state_obj(): ?EE_State
    {
        return $this->get_first_related('State');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function state_name(): string
    {
        return $this->state_obj() instanceof EE_State
            ? $this->state_obj()->name()
            : '';
    }


    /**
     * either displays the state abbreviation or the state name, as determined
     * by the "FHEE__EEI_Address__state__use_abbreviation" filter.
     * defaults to abbreviation
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function state(): string
    {
        return apply_filters('FHEE__EEI_Address__state__use_abbreviation', true, $this->state_obj())
            ? $this->state_abbrev()
            : $this->state_name();
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function country_ID(): string
    {
        return (string) $this->get('CNT_ISO');
    }


    /**
     * @return EE_Country|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function country_obj(): ?EE_Country
    {
        return $this->get_first_related('Country');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function country_name(): string
    {
        return $this->country_obj() instanceof EE_Country
            ? $this->country_obj()->name()
            : '';
    }


    /**
     * either displays the country ISO2 code or the country name, as determined
     * by the "FHEE__EEI_Address__country__use_abbreviation" filter.
     * defaults to abbreviation
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function country(): string
    {
        return apply_filters('FHEE__EEI_Address__country__use_abbreviation', true, $this->country_obj())
            ? $this->country_ID()
            : $this->country_name();
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function zip(): string
    {
        return (string) $this->get('ATT_zip');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function email(): string
    {
        return (string) $this->get('ATT_email');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function phone(): string
    {
        return (string) $this->get('ATT_phone');
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function deleted(): bool
    {
        return (bool) $this->get('ATT_deleted');
    }


    /**
     * @param array $query_params
     * @return EE_Registration[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_registrations(array $query_params = []): array
    {
        return $this->get_many_related('Registration', $query_params);
    }


    /**
     * Gets the most recent registration of this attendee
     *
     * @return EE_Registration|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_most_recent_registration(): ?EE_Registration
    {
        return $this->get_first_related('Registration', ['order_by' => ['REG_date' => 'DESC']]);
    }


    /**
     * Gets the most recent registration for this attend at this event
     *
     * @param int $event_id
     * @return EE_Registration|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_most_recent_registration_for_event(int $event_id): ?EE_Registration
    {
        return $this->get_first_related(
            'Registration',
            [['EVT_ID' => $event_id], 'order_by' => ['REG_date' => 'DESC']]
        );
    }


    /**
     * returns any events attached to this attendee ($_Event property);
     *
     * @return EE_Event[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function events(): array
    {
        return $this->get_many_related('Event');
    }


    /**
     * Gets the billing info array where keys match espresso_reg_page_billing_inputs(),
     * and keys are their cleaned values. @param EE_Payment_Method $payment_method the _gateway_name property on the
     * gateway class
     *
     * @return EE_Form_Section_Proper|null
     * @throws EE_Error
     * @throws ReflectionException
     * @see EE_Attendee::save_and_clean_billing_info_for_payment_method() which was used to save the billing info
     */
    public function billing_info_for_payment_method(EE_Payment_Method $payment_method): ?EE_Form_Section_Proper
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
        if (! $billing_form instanceof EE_Billing_Info_Form) {
            return null;
        }
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
            $billing_form->receive_form_submission([$billing_form->name() => $billing_info], false);
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
    public function get_billing_info_postmeta_name(EE_Payment_Method $payment_method): string
    {
        return $payment_method->type_obj() instanceof EE_PMT_Base
            ? 'billing_info_' . $payment_method->type_obj()->system_name()
            : '';
    }


    /**
     * Saves the billing info to the attendee.
     *
     * @param EE_Billing_Attendee_Info_Form|null $billing_form
     * @param EE_Payment_Method                  $payment_method
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     * @see EE_Attendee::billing_info_for_payment_method() which is used to retrieve it
     */
    public function save_and_clean_billing_info_for_payment_method(
        ?EE_Billing_Attendee_Info_Form $billing_form,
        EE_Payment_Method $payment_method
    ): bool {
        if (! $billing_form instanceof EE_Billing_Attendee_Info_Form) {
            EE_Error::add_error(
                esc_html__('Cannot save billing info because there is none.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        $billing_form->clean_sensitive_data();
        $postmeta_name = $this->get_billing_info_postmeta_name($payment_method);
        $saved_values  = get_post_meta($this->ID(), $postmeta_name);
        $input_values  = $billing_form->input_values(true);
        // Merge the values in case some fields were already saved somewhere.
        if ($saved_values && is_array($saved_values)) {
            // Need a one dimensional array.
            $saved_values = array_merge(...$saved_values);
            $input_values = array_merge($saved_values, $input_values);
        }
        return update_post_meta($this->ID(), $postmeta_name, $input_values);
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
    public function get_admin_details_link(): string
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
    public function get_admin_edit_link(): string
    {
        return EEH_URL::add_query_args_and_nonce(
            [
                'page'   => 'espresso_registrations',
                'action' => 'edit_attendee',
                'post'   => $this->ID(),
            ],
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
    public function get_admin_settings_link(): string
    {
        return $this->get_admin_edit_link();
    }


    /**
     * Returns the link to the "overview" for the object (typically the "list table" view).
     *
     * @return string
     */
    public function get_admin_overview_link(): string
    {
        return EEH_URL::add_query_args_and_nonce(
            [
                'page'   => 'espresso_registrations',
                'action' => 'contact_list',
            ],
            admin_url('admin.php')
        );
    }
}
