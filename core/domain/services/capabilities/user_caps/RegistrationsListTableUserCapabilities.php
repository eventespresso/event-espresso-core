<?php

namespace EventEspresso\core\domain\services\capabilities\user_caps;

use EE_Error;
use EE_Registration;
use ReflectionException;

/**
 * Class RegistrationsListTableUserCapabilities
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\capabilities
 * @since   $VID:$
 */
class RegistrationsListTableUserCapabilities extends UserCapabilities
{
    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Registration $registration
     * @return bool
     */
    public function userCanReadRegistration($registration)
    {
        return $this->hasEntityCap(
            'ee_read_registration',
            'espresso_registrations_view_registration',
            $registration->ID()
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Registration $registration
     * @return bool
     */
    public function userCanEditRegistration($registration)
    {
        return $this->hasEntityCap(
            'ee_edit_registration',
            'registration_list_table_checkbox_input',
            $registration->ID()
        );
    }


    /**
     * @return bool
     */
    public function userCanTrashRegistrations()
    {
        return $this->hasGlobalCap('ee_delete_registrations', 'espresso_registrations_trash_registrations');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Registration $registration
     * @return bool
     */
    public function userCanTrashRegistration($registration)
    {
        return $this->hasEntityCap(
            'ee_delete_registration',
            'espresso_registrations_trash_registrations',
            $registration->ID()
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Registration $registration
     * @return bool
     */
    public function userCanDeleteRegistration($registration)
    {
        return $this->hasEntityCap(
            'ee_delete_registration',
            'espresso_registrations_ee_delete_registrations',
            $registration->ID()
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Registration $registration
     * @return bool
     */
    public function userCanRestoreRegistration($registration)
    {
        return $this->hasEntityCap(
            'ee_delete_registration',
            'espresso_registrations_restore_registrations',
            $registration->ID()
        );
    }


    /**
     * @return bool
     */
    public function userCanViewTransaction()
    {
        return $this->hasGlobalCap('ee_read_transaction', 'espresso_transactions_view_transaction');
    }


    /**
     * @return bool
     */
    public function userCanReadGlobalMessages()
    {
        return $this->hasGlobalCap('ee_read_global_messages', 'view_filtered_messages');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Registration $registration
     * @return bool
     */
    public function userCanResendMessage($registration)
    {
        return $this->hasEntityCap(
            'ee_send_message',
            'espresso_registrations_resend_registration',
            $registration->ID()
        );
    }


    /**
     * @param int $EVT_ID
     * @return bool
     */
    public function userCanEditEvent($EVT_ID)
    {
        return $this->hasEntityCap('ee_edit_event', 'edit_event', $EVT_ID);
    }


    /**
     * @return bool
     */
    public function userCanEditContacts()
    {
        return $this->hasGlobalCap('ee_edit_contacts', 'espresso_registrations_edit_attendee');
    }


    /**
     * @return bool
     */
    public function userCanReadRegistrationCheckins()
    {
        return $this->hasGlobalCap('ee_read_registration', 'espresso_registrations_registration_checkins');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Registration $registration
     * @return bool
     */
    public function userCanReadRegistrationCheckin($registration)
    {
        return $this->hasEntityCap(
            'ee_read_checkins',
            'espresso_registrations_registration_checkins',
            $registration->ID()
        );
    }
}
