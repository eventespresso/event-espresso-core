<?php
namespace Page;

/**
 * RegistrationsAdmin
 * Selectors/References to elements in the Registrations admin pages.
 *
 * @package Page
 * @author  Darren Ethier
 * @since   1.0.0
 */
class RegistrationsAdmin extends CoreAdmin
{
    /**
     * @var string
     */
    const REGISTRATION_STATUS_NOT_APPROVED = 'RNA';


    /**
     * @var string
     */
    const REGISTRATION_STATUS_APPROVED = 'RAP';


    /**
     * @var string
     */
    const REGISTRATION_STATUS_PENDING_PAYMENT = 'RPP';



    /**
     * @param string $additional_params
     * @return string
     */
    public static function registrationsDefaultAdminListTableUrl($additional_params = '')
    {
        return self::adminUrl('espresso_registrations', 'default', $additional_params);
    }


    /**
     * Given a registration id, this will return the selector for all the checkbox for that id.
     * Assumes the view is a Registration list table.
     * @param int $registration_id
     * @return string
     */
    public static function listTableCheckBoxSelectorForRegistrationId($registration_id)
    {
        return "//input[@name='_REG_ID[]' and @value='{$registration_id}']";
    }
}