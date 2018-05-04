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


    public function activateMessageTypeForMessenger($message_type_slug, $messenger_slug = 'email')
    {
        $this->actor()->dragAndDrop(
            MessagesPage::draggableSettingsBoxSelectorForMessageTypeAndMessenger($message_type_slug, $messenger_slug),
            MessagesPage::MESSAGES_SETTINGS_ACTIVE_MESSAGE_TYPES_CONTAINER_SELECTOR
        );
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
        $message_status = MessagesPage::MESSAGE_STATUS_SENT,
        $messenger = 'Email',
        $context = 'Event Admin'
    ) {
        $elements = $this->actor()->grabMultiple(MessagesPage::messagesActivityListTableCellSelectorFor(
            $field,
            $message_type_label,
            $message_status,
            $messenger,
            $context,
            $text_to_check_for,
            0
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


    /**
     * This will create a custom message template for the given messenger and message type from the context of the
     * default (global) message template list table.
     * Also takes care of verifying the template was created.
     * @param string $message_type_label
     * @param string $messenger_label
     */
    public function createCustomMessageTemplateFromDefaultFor($message_type_label, $messenger_label)
    {
        $this->amOnDefaultMessageTemplateListTablePage();
        $this->actor()->click(
            MessagesPage::createCustomButtonForMessageTypeAndMessenger(
                $message_type_label,
                $messenger_label
            )
        );
        $this->actor()->seeInField('#title', 'New Custom Template');
    }


    /**
     * This switches the context of the current messages template to the given reference.
     * @param string $context_reference  This should be the visible label for the option.
     */
    public function switchContextTo($context_reference)
    {
        $this->actor()->selectOption(MessagesPage::MESSAGES_CONTEXT_SWITCHER_SELECTOR, $context_reference);
        $this->actor()->click(MessagesPage::MESSAGES_CONTEXT_SWITCHER_BUTTON_SELECTOR);
        $this->actor()->waitForText($context_reference, 10, 'h1');
    }


    /**
     * Toggles Context so its turned off or on (depending on where it started) and verifies the expected state after
     * toggling.
     *
     * @param string $context_string           What context is being switched (used for the expected state text)
     * @param bool   $expected_state_is_active Used to indicate whether the expected state is active (true) or inactive
     *                                         (false)
     */
    public function toggleContextState($context_string, $expected_state_is_active = true)
    {
        $this->actor()->scrollTo(MessagesPage::MESSAGES_CONTEXT_SWITCHER_SELECTOR);
        $this->actor()->click(MessagesPage::MESSAGES_CONTEXT_ACTIVE_STATE_TOGGLE);
        if ($expected_state_is_active) {
            $this->actor()->waitForText("The template for $context_string is currently active.");
        } else {
            $this->actor()->waitForText("The template for $context_string is currently inactive");
        }
    }


    /**
     * Triggers saving the message template.
     * @param bool $and_close   Use to indicate to click the Save and Close button.
     */
    public function saveMessageTemplate($and_close = false)
    {
        $this->actor()->scrollTo(MessagesPage::MESSAGES_CONTEXT_SWITCHER_SELECTOR);
        if ($and_close) {
            $this->actor()->click('Save and Close');
        } else {
            $this->actor()->click('Save');
        }
        $this->actor()->waitForText('successfully updated');
    }


    /**
     * This takes care of clicking the View Message icon for the given parameters.
     * Assumes you are already viewing the messages activity list table.
     * @param        $message_type_label
     * @param        $message_status
     * @param string $messenger
     * @param string $context
     * @param int    $number_in_set
     */
    public function viewMessageInMessagesListTableFor(
        $message_type_label,
        $message_status = MessagesPage::MESSAGE_STATUS_SENT,
        $messenger = 'Email',
        $context = 'Event Admin',
        $number_in_set = 1
    ) {
        $this->actor()->click(MessagesPage::messagesActivityListTableViewButtonSelectorFor(
            $message_type_label,
            $message_status,
            $messenger,
            $context,
            $number_in_set
        ));
    }


    /**
     * Takes care of deleting a message matching the given parameters via the message activity list table.
     * Assumes you are already viewing the messages activity list table.
     * @param        $message_type_label
     * @param        $message_status
     * @param string $messenger
     * @param string $context
     * @param int    $number_in_set
     */
    public function deleteMessageInMessagesListTableFor(
        $message_type_label,
        $message_status = MessagesPage::MESSAGE_STATUS_SENT,
        $messenger = 'Email',
        $context = 'Event Admin',
        $number_in_set = 1
    ) {
        $delete_action_selector = MessagesPage::messagesActivityListTableDeleteActionSelectorFor(
            $message_type_label,
            $message_status,
            $messenger,
            $context,
            $number_in_set
        );
        $cell_selector = MessagesPage::messagesActivityListTableCellSelectorFor(
            'to',
            $message_type_label,
            $message_status,
            $messenger,
            $context,
            '',
            $number_in_set
        );
        $this->actor()->scrollTo($cell_selector, 0, -30);
        $this->actor()->moveMouseOver(
            $cell_selector,
            5,
            5
        );
        $this->actor()->waitForElementVisible(
            $delete_action_selector
        );
        $this->actor()->click(
            $delete_action_selector
        );
        $this->actor()->waitForText('successfully deleted', 20);
    }


    /**
     * Assuming you have already triggered the view modal for a single message from the context of the message activity
     * list table, this will take care of validating the given text is in that window.
     * @param string $text_to_view
     */
    public function seeTextInViewMessageModal($text_to_view, $should_not_see = false)
    {
        $this->actor()->wait(2);
        $this->actor()->waitForElementVisible('.ee-admin-dialog-container-inner-content');
        $this->actor()->switchToIframe('message-view-window');
        $should_not_see ? $this->actor()->dontSee($text_to_view) : $this->actor()->see($text_to_view);
        $this->actor()->switchToIframe();
    }


    /**
     * This returns the value for the link at the given selector in the message modal.
     * @param string $selector (any selector string accepted by WebDriver)
     */
    public function observeLinkAtSelectorInMessageModal($selector)
    {
        $this->actor()->wait(2);
        $this->actor()->waitForElementVisible('.ee-admin-dialog-container-inner-content');
        $this->actor()->switchToIframe('message-view-window');
        $link = $this->actor()->observeLinkUrlAt($selector);
        $this->actor()->switchToIframe();
        return $link;
    }


    /**
     * Assuming you have already triggered the view modal for a single message from the context of the message activity
     * list table, this will take care of validating the given text is NOT that window.
     * @param string $text_to_view
     */
    public function dontSeeTextInViewMessageModal($text_to_view)
    {
        $this->seeTextInViewMessageModal($text_to_view, true);
    }


    public function dismissMessageModal()
    {
        $this->actor()->executeJs('window.dialogHelper.closeModal()');
    }
}
