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
    public function amOnEventEspressoAdminPage($page = '', $action = '', $additional_params = '')
    {
        $this->actor()->amOnAdminPage(CoreAdmin::adminUrl($page, $action, $additional_params));
    }


    /**
     * @return \EventEspressoAcceptanceTester;
     */
    protected function actor()
    {
        /** @var \EventEspressoAcceptanceTester $this */
        return $this;
    }
}