<?php
namespace EventEspresso\Codeception\helpers;

use Page\CoreAdmin;

/**
 * Trait BaseCoreAdmin
 * Contains actions for more generic EE Admin page navigation.  Generally speaking it is preferable to create a helper
 * specific to an EE admin page you want actions for, but this is provided for quicker setup as necessary.
 *
 * @package EventEspresso\Codeception\helpers
 */
trait BaseCoreAdmin
{

    /**
     * Core method for going to an Event Espresso Admin page.
     * @param string $page
     * @param string $action
     * @param string $additional_params
     */
    public function amOnEventEspressoAdminPage($page = '', $action = '', $additional_params = '')
    {
        $this->actor()->amOnAdminPage(CoreAdmin::adminUrl($page, $action, $additional_params));
    }


    /**
     * Helper method for returning an instance of the Actor.  Intended to help with IDE fill out of methods.
     * @return \EventEspressoAcceptanceTester;
     */
    protected function actor()
    {
        /** @var \EventEspressoAcceptanceTester $this */
        return $this;
    }


    /**
     * Use this to set the per page option for a list table page.
     * Assumes you are on a page that has this field exposed.
     * @param int|string $per_page_value
     */
    public function setPerPageOptionForScreen($per_page_value)
    {
        $this->actor()->click(CoreAdmin::WP_SCREEN_SETTINGS_LINK_SELECTOR);
        $this->actor()->fillField(CoreAdmin::WP_SCREEN_SETTINGS_PER_PAGE_FIELD_SELECTOR, $per_page_value);
        $this->actor()->click(CoreAdmin::WP_SCREEN_OPTIONS_APPLY_SETTINGS_BUTTON_SELECTOR);
        $this->actor()->wait(8);
    }
}