<?php

namespace EventEspresso\core\domain\services\capabilities;

use EE_Capabilities;
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
class RegistrationsListTableUserCapabilities
{

    /**
     * @var EE_Capabilities
     */
    protected $capabilities;


    /**
     * @var array
     */
    protected $caps = [];


    /**
     * @param EE_Capabilities $capabilities
     */
    public function __construct(EE_Capabilities $capabilities)
    {
        $this->capabilities = $capabilities;
    }


    /**
     * @param string     $cap
     * @param string     $context
     * @param int|string $ID
     * @return bool
     */
    private function hasEntityCap(string $cap, string $context, $ID): bool
    {
        if (! isset($this->caps[ $cap ][ $context ][ $ID ])) {
            $this->caps[ $cap ][ $context ][ $ID ] = $this->capabilities->current_user_can($cap, $context, $ID);
        }
        return $this->caps[ $cap ][ $context ][ $ID ];
    }


    /**
     * @param string $cap
     * @param string $context
     * @return bool
     */
    private function hasGlobalCap(string $cap, string $context): bool
    {
        if (! isset($this->caps[ $cap ][ $context ])) {
            $this->caps[ $cap ][ $context ] = $this->capabilities->current_user_can($cap, $context);
        }
        return $this->caps[ $cap ][ $context ];
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function userCanReadRegistration(EE_Registration $registration): bool
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
     */
    public function userCanEditRegistration(EE_Registration $registration): bool
    {
        return $this->hasEntityCap(
            'ee_edit_registration',
            'registration_list_table_checkbox_input',
            $registration->ID()
        );
    }


    public function userCanTrashRegistrations(): bool
    {
        return $this->hasGlobalCap('ee_delete_registrations', 'espresso_registrations_trash_registrations');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function userCanTrashRegistration(EE_Registration $registration): bool
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
     */
    public function userCanDeleteRegistration(EE_Registration $registration): bool
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
     */
    public function userCanRestoreRegistration(EE_Registration $registration): bool
    {
        return $this->hasEntityCap(
            'ee_delete_registration',
            'espresso_registrations_restore_registrations',
            $registration->ID()
        );
    }


    public function userCanViewTransaction(): bool
    {
        return $this->hasGlobalCap('ee_read_transaction', 'espresso_transactions_view_transaction');
    }


    public function userCanReadGlobalMessages(): bool
    {
        return $this->hasGlobalCap('ee_read_global_messages', 'view_filtered_messages');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function userCanResendMessage(EE_Registration $registration): bool
    {
        return $this->hasEntityCap(
            'ee_send_message',
            'espresso_registrations_resend_registration',
            $registration->ID()
        );
    }


    public function userCanEditEvent(int $EVT_ID): bool
    {
        return $this->hasEntityCap('ee_edit_event', 'edit_event', $EVT_ID);
    }


    public function userCanEditContacts(): bool
    {
        return $this->hasGlobalCap('ee_edit_contacts', 'espresso_registrations_edit_attendee');
    }


    public function userCanReadRegistrationCheckins(): bool
    {
        return $this->hasGlobalCap('ee_read_registration', 'espresso_registrations_registration_checkins');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function userCanReadRegistrationCheckin(EE_Registration $registration): bool
    {
        return $this->hasEntityCap(
            'ee_read_checkins',
            'espresso_registrations_registration_checkins',
            $registration->ID()
        );
    }
}
