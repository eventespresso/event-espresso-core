<?php
namespace Page;

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
     * @var string
     */
    const ADMIN_CONTEXT_SLUG = 'admin';

    /**
     * Context slug for the primary attendee messages context
     * @var string
     */
    const PRIMARY_ATTENDEE_CONTEXT_SLUG = 'primary_attendee';


    /**
     * Status reference for the EEM_Message::status_sent status.
     * @var string
     */
    const MESSAGE_STATUS_SENT = 'MSN';


    /**
     * Message type slug for the Payment Failed message type
     */
    const PAYMENT_FAILED_MESSAGE_TYPE_SLUG = 'payment_failed';


    /**
     * Selector for the Global Messages "Send on same request" field in the Messages Settings tab.
     * @var string
     */
    const GLOBAL_MESSAGES_SETTINGS_ON_REQUEST_SELECTION_SELECTOR = '#global_messages_settings-do-messages-on-same-request';


    /**
     * Selector for the Global Messages Settings submit button in the Messages Settings tab.
     * @var string
     */
    const GLOBAL_MESSAGES_SETTINGS_SUBMIT_SELECTOR = '#global_messages_settings-update-settings-submit';


    /**
     * This is the container where active message types for a messenger are found/dragged to.
     * @var string
     */
    const MESSAGES_SETTINGS_ACTIVE_MESSAGE_TYPES_CONTAINER_SELECTOR = '#active-message-types';



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
     * @param        $field
     * @param        $message_type_label
     * @param string $message_status
     * @param string $messenger
     * @param string $context
     * @param string $table_cell_content_for_field
     * @return string
     */
    public static function messagesActivityListTableCellSelectorFor(
        $field,
        $message_type_label,
        $message_status = self::MESSAGE_STATUS_SENT,
        $messenger = 'Email',
        $context = 'Event Admin',
        $table_cell_content_for_field = ''
    ) {
        $selector = "//tr[contains(@class, 'msg-status-$message_status')]"
                . "//td[contains(@class, 'message_type') and text()='$message_type_label']";
        if ($messenger) {
            $selector .= "/ancestor::tr/td[contains(@class, 'messenger') and text()='$messenger']";
        }
        $selector .= "/ancestor::tr/td[contains(@class, 'column-context') and text()='$context']";
        $selector .= $table_cell_content_for_field
            ? "/ancestor::tr/td[contains(@class, 'column-$field') and text()='$table_cell_content_for_field']"
            : "/ancestor::tr/td[contains(@class, 'column-$field')]";
        return $selector;
    }

}