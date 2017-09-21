<?php
namespace Page;

use Codeception\Util\Locator;

/**
 * MessagesAdmin
 * Selectors/References to elements in the Messages Admin Pages
 *
 * @package Page
 * @author  Darren Ethier
 * @since   1.0.0
 */
class MessagesAdmin extends CoreAdmin
{

    /**
     * Context slug for the admin messages context.
     */
    const ADMIN_CONTEXT_SLUG = 'admin';

    /**
     * Context slug for the primary attendee messages context
     */
    const PRIMARY_ATTENDEE_CONTEXT_SLUG = 'primary_attendee';


    /**
     * Context slug for the attendee messages context
     */
    const ATTENDEE_CONTEXT_SLUG = 'attendee';


    /**
     * Status reference for the EEM_Message::status_sent status.
     */
    const MESSAGE_STATUS_SENT = 'MSN';


    /**
     * Message type slug for the Payment Failed message type
     */
    const PAYMENT_FAILED_MESSAGE_TYPE_SLUG = 'payment_failed';


    /**
     * Selector for the Global Messages "Send on same request" field in the Messages Settings tab.
     */
    const GLOBAL_MESSAGES_SETTINGS_ON_REQUEST_SELECTION_SELECTOR =
        '#global_messages_settings-do-messages-on-same-request';


    /**
     * Selector for the Global Messages Settings submit button in the Messages Settings tab.
     */
    const GLOBAL_MESSAGES_SETTINGS_SUBMIT_SELECTOR = '#global_messages_settings-update-settings-submit';


    /**
     * This is the container where active message types for a messenger are found/dragged to.
     */
    const MESSAGES_SETTINGS_ACTIVE_MESSAGE_TYPES_CONTAINER_SELECTOR = '#active-message-types';


    /**
     * Locator for the context switcher selector on the Message Template Editor page.
     */
    const MESSAGES_CONTEXT_SWITCHER_SELECTOR = "//form[@id='ee-msg-context-switcher-frm']/select";


    /**
     * Locator for the context switcher submit button in the Message Template Editor page.
     */
    const MESSAGES_CONTEXT_SWITCHER_BUTTON_SELECTOR = "#submit-msg-context-switcher-sbmt";


    /**
     * Locator for the dialog container used for housing viewed messages in the message activity list table.
     */
    const MESSAGES_LIST_TABLE_VIEW_MESSAGE_DIALOG_CONTAINER_SELECTOR = '.ee-admin-dialog-container-inner-content';


    /**
     * Returns the selector for the on/off toggle for context on the message template editor.
     */
    const MESSAGES_CONTEXT_ACTIVE_STATE_TOGGLE =
        "//div[@class='activate_context_on_off_toggle_container']/div[@class='switch']/label";



    /**
     * @param string $additional_params Any additional request parameters for the generated url should be included as
     *                                  a string.
     * @return string
     */
    public static function messageActivityListTableUrl($additional_params = '')
    {
        return self::adminUrl('espresso_messages', 'default', $additional_params);
    }


    /**
     * @param string $additional_params Any additional request parameters for the generated url should be included as
     *                                  a string.
     * @return string
     */
    public static function defaultMessageTemplateListTableUrl($additional_params = '')
    {
        return self::adminUrl('espresso_messages', 'global_mtps', $additional_params);
    }


    /**
     * @param string $additional_params Any additional request parameters for the generated url should be included as
     *                                  a string.
     * @return string
     */
    public static function customMessageTemplateListTableUrl($additional_params = '')
    {
        return self::adminUrl('espresso_messages', 'custom_mtps', $additional_params);
    }


    /**
     * @return string
     */
    public static function messageSettingsUrl()
    {
        return self::adminUrl('espresso_messages', 'settings');
    }



    public static function draggableSettingsBoxSelectorForMessageTypeAndMessenger(
        $message_type_slug,
        $messenger_slug = 'email'
    ) {
        return "#$message_type_slug-messagetype-$messenger_slug";
    }


    /**
     * @param string $message_type_slug
     * @param string $context
     * @return string
     */
    public static function editMessageTemplateClassByMessageType($message_type_slug, $context = '')
    {
        return $context
            ? '.' . $message_type_slug . '-' . $context . '-edit-link'
            : '.' . $message_type_slug . '-edit-link';
    }


    /**
     * Selector for (a) specific table cell(s) in the Messages Activity list table for the given parameters.
     *
     * @param        $field
     * @param        $message_type_label
     * @param string $message_status
     * @param string $messenger
     * @param string $context
     * @param string $table_cell_content_for_field
     * @param int    $number_in_set   It's possible that the given parameters could match multiple items in the view.
     *                                This allows you to indicate which item from the set to match.  If this is set to 0
     *                                then all matches for the locator will be returned.
     * @return string
     * @throws \InvalidArgumentException
     */
    public static function messagesActivityListTableCellSelectorFor(
        $field,
        $message_type_label,
        $message_status = self::MESSAGE_STATUS_SENT,
        $messenger = 'Email',
        $context = 'Event Admin',
        $table_cell_content_for_field = '',
        $number_in_set = 1
    ) {
        $selector = "//tbody[@id='the-list']";
        $selector .= "//tr[contains(@class, 'msg-status-$message_status')]"
                     . "//td[contains(@class, 'message_type') and text()='$message_type_label']";
        if ($messenger) {
            $selector .= "/ancestor::tr/td[contains(@class, 'messenger') and text()='$messenger']";
        }
        $selector .= "/ancestor::tr/td[contains(@class, 'column-context') and text()='$context']";
        $selector .= $table_cell_content_for_field
            ? "/ancestor::tr/td[contains(@class, 'column-$field') and text()='$table_cell_content_for_field']"
            : "/ancestor::tr/td[contains(@class, 'column-$field')]";
        return $number_in_set > 0 ? Locator::elementAt($selector, $number_in_set) : $selector;
    }


    /**
     * Selector for the Create Custom button found in the message template list table.
     * @param string $message_type_label
     * @param string $messenger_label
     * @return string
     */
    public static function createCustomButtonForMessageTypeAndMessenger($message_type_label, $messenger_label)
    {
        $selector = "//tr/td[contains(@class, 'message_type') and text()='$message_type_label']"
                    . "//ancestor::tr/td[contains(@class, 'messenger') and contains(., '$messenger_label')]"
                    . "//ancestor::tr/td/a[@class='button button-small']";
        return $selector;
    }


    /**
     * Note, this could potentially match multiple buttons in the view so the selector is intentionally restricted to
     * the FIRST match (which will be the latest message sent if the table is default sorted).
     *
     * @param string $message_type_label    The visible message type label for the row you want to match
     * @param string $message_status        The status of the message for the row you want to match.
     * @param string $messenger             The visible messenger label for the row you want to match.
     * @param string $context               The visible context label for the row you want to match.
     * @param int    $number_in_set         It's possible that the given parameters could match multiple items in the
     *                                      view. This allows you to indicate which item from the set to match.
     * @return string
     * @throws \InvalidArgumentException
     */
    public static function messagesActivityListTableViewButtonSelectorFor(
        $message_type_label,
        $message_status = self::MESSAGE_STATUS_SENT,
        $messenger = 'Email',
        $context = 'Event Admin',
        $number_in_set = 1
    ) {
        $selector = self::messagesActivityListTableCellSelectorFor(
            'action',
            $message_type_label,
            $message_status,
            $messenger,
            $context,
            '',
            $number_in_set
        );
        $selector .= "/a/span[contains(@class, 'ee-message-action-link-view')"
                     . " and not(contains(@class, 'ee-message-action-link-view_transaction'))]";
        return $selector;
    }


    /**
     * Locator for the delete action link for a message item in the message activity list table.
     * Note: The link is not visible by default, so the column would need hovered over for the link to appear.
     *
     * @param        $message_type_label
     * @param string $message_status
     * @param string $messenger
     * @param string $context
     * @param int    $number_in_set
     * @return string
     * @throws \InvalidArgumentException
     */
    public static function messagesActivityListTableDeleteActionSelectorFor(
        $message_type_label,
        $message_status = self::MESSAGE_STATUS_SENT,
        $messenger = 'Email',
        $context = 'Event Admin',
        $number_in_set = 1
    ) {
        $selector = self::messagesActivityListTableCellSelectorFor(
            'to',
            $message_type_label,
            $message_status,
            $messenger,
            $context,
            '',
            $number_in_set
        );
        $selector .= "/div/span[@class='delete']/a";
        return $selector;
    }



    /**
     * Returns the input selector for a given field in the message template editor.
     * Assumes one is already viewing the Message Template Editor.
     * @param string     $field
     * @return string
     */
    public static function messageInputFieldSelectorFor($field)
    {
        return "//div[@id='post-body']//input[@id='$field-content']";
    }


    /**
     * Wrapper for self::messageInputFieldSelectorFor('to') that takes care of getting the input for the To field.
     */
    public static function messageTemplateToFieldSelector()
    {
        return self::messageInputFieldSelectorFor('to');
    }
}