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


    /**
     * Use this action to verify that the count for the given text in the specified field is as expected.  For example
     * filling the condition of, "There should only be 1 instance of `someaddress@email.com` in all the 'to' column.
     *
     * @param int    $expected_occurence_count
     * @param string $text_to_check_for
     * @param string $field
     * @param string $message_type_label
     * @param string $message_status
     * @param string $messenger
     * @param string $context
     */
    public function verifyMatchingCountofTextInMessageActivityListTableFor(
        $expected_occurence_count,
        $text_to_check_for,
        $field,
        $message_type_label,
        $message_status = self::MESSAGE_STATUS_SENT,
        $messenger = 'Email',
        $context = 'Event Admin'
    ) {
        $elements = $this->actor()->grabMultiple(MessagesPage::messagesActivityListTableCellSelectorFor(
            $field,
            $message_type_label,
            $message_status,
            $messenger,
            $context,
            $text_to_check_for
        ));
        $actual_count = count($elements);
        $this->actor()->assertEquals(
            $expected_occurence_count,
            $actual_count,
            sprintf(
                'Expected %s of the %s text for the %s field but there were actually %s counted.',
                $expected_occurence_count,
                $text_to_check_for,
                $field,
                $actual_count
            )
        );
    }

}