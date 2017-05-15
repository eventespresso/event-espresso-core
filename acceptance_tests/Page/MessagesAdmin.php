<?php
namespace Page;

class MessagesAdmin extends CoreAdmin
{

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


    /**
     * @param string $message_type_slug
     * @param string $context
     * @return string
     */
    public static function editMessageTemplateClassByMessageType($message_type_slug, $context = '')
    {
        return $context
            ? $message_type_slug . '-' . $context . '-edit-link'
            : $message_type_slug . '-edit-link';
    }

}