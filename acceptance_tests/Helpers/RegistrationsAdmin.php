<?php

namespace EventEspresso\Codeception\helpers;

use Page\CoreAdmin;
use Page\RegistrationsAdmin as RegistrationsAdminPage;

/**
 * Trait RegistrationsAdmin
 * Helper actions for Registration Admin Page actions.
 *
 * @package EventEspresso\Codeception\helpers
 */
trait RegistrationsAdmin
{

    /**
     * This will select all checkboxes on a registration list table for the given array of
     * registration ids.
     * Assumes the actor is on a list table page for registrations.
     * @param $registration_ids
     */
    public function selectBulkActionCheckboxesForRegistrationIds(array $registration_ids)
    {
        foreach ($registration_ids as $registration_id) {
            $this->actor()->checkOption(
                RegistrationsAdminPage::listTableCheckBoxSelectorForRegistrationId($registration_id)
            );
        }
    }


    /**
     * Navigates the actor to the default registration list table page.
     * @param string $additional_params
     */
    public function amOnDefaultRegistrationsListTableAdminPage($additional_params = '')
    {
        $this->actor()->amOnAdminPage(
            RegistrationsAdminPage::registrationsDefaultAdminListTableUrl($additional_params)
        );
        //wait for page to fully load
        $this->actor()->wait(5);
    }


    /**
     * Will enter the provided value in the registration list table search field and execute a search for that value.
     * @param string $search_text
     */
    public function searchForRegistrationOnRegistrationListTableWithText($search_text)
    {
        $this->amOnDefaultRegistrationsListTableAdminPage();
        $this->actor()->fillField(RegistrationsAdminPage::SEARCH_INPUT_SELECTOR_LIST_TABLE_REGISTRATION, $search_text);
        $this->actor()->click(CoreAdmin::LIST_TABLE_SEARCH_SUBMIT_SELECTOR);
        $this->actor()->waitForText('Displaying search results for');
    }
}