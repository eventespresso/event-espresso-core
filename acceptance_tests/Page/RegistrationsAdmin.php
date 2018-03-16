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

    const REGISTRATION_STATUS_NOT_APPROVED = 'RNA';
    const REGISTRATION_STATUS_APPROVED = 'RAP';
    const REGISTRATION_STATUS_PENDING_PAYMENT = 'RPP';
    const SEARCH_INPUT_SELECTOR_LIST_TABLE_REGISTRATION = '#event-espresso_page_espresso_registrations-search-input';
    const BUTTON_ADD_NEW_REGISTRATION = '#add-new-registration';
    const DROPDOWN_REGISTRATION_STATUS = '#reg-status-change-form-reg-status';
    const BUTTON_UPDATE_REGISTRATION_STATUS = '#reg-status-change-form-submit-submit';
    const DROPDOWN_SEND_RELATED_MESSAGES = '#reg-status-change-form-send-notifications';


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
     * Assumes the view is the default registrations list table.
     * @param int $registration_id
     * @return string
     */
    public static function listTableCheckBoxSelectorForRegistrationId($registration_id)
    {
        return "//input[@name='_REG_ID[]' and @value='{$registration_id}']";
    }


    /**
     * Given a registration id, this will return the selector for the link to the registration details.
     * Assumes the view is the default registrations list table.
     * @param int $registration_id
     * @return string
     */
    public static function viewDetailsLinkSelectorForRegistrationId($registration_id)
    {
        return "//tbody[@id='the-list']/tr/td[contains(@class, 'column-_REG_ID') and contains(., $registration_id)]"
            . "//ancestor::tr/td[contains(@class, 'column-ATT_fname')]/a[1]";
    }
}