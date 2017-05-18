<?php
namespace EventEspresso\Codeception\helpers;

use Page\MessagesAdmin as MessagesPage;

/**
 * Trait MessagesAdmin
 * Helper actions for the Messages Admin Pages
 * @package EventEspresso\Codeception\helpers
 */
trait MessagesAdmin
{
    /**
     * @param string $additional_params Any additional request parameters for the generated url should be included as
     *                                  a string.
     */
    public function amOnMessagesActivityListTablePage($additional_params = '')
    {
        $this->actor()->amOnAdminPage(MessagesPage::messageActivityListTableUrl($additional_params));
    }

    /**
     * @param string $additional_params Any additional request parameters for the generated url should be included as
     *                                  a string.
     */
    public function amOnDefaultMessageTemplateListTablePage($additional_params = '')
    {
        $this->actor()->amOnAdminPage(MessagesPage::defaultMessageTemplateListTableUrl($additional_params));
    }


    /**
     * @param string $additional_params Any additional request parameters for the generated url should be included as
     *                                  a string.
     */
    public function amOnCustomMessageTemplateListTablePage($additional_params = '')
    {
        $this->actor()->amOnAdminPage(MessagesPage::customMessageTemplateListTableUrl($additional_params));
    }


    /**
     * Directs to message settings page
     */
    public function amOnMessageSettingsPage()
    {
        $this->actor()->amOnAdminPage(MessagesPage::messageSettingsUrl());
    }


    /**
     * Assumes you are already on the list table page that has the ui for editing the template.
     * @param string $message_type_slug
     * @param string $context [optional] if you want to click directly to the given context in the editor
     */
    public function clickToEditMessageTemplateByMessageType($message_type_slug, $context = '')
    {
        $this->actor()->click(MessagesPage::editMessageTemplateClassByMessageType($message_type_slug, $context));
    }

}