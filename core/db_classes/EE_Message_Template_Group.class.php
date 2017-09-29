<?php

use EventEspresso\core\exceptions\InvalidIdentifierException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');

/**
 * EE_Message_Template_Group class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Message_Template_Group.class.php
 * @author                Darren Ethier
 * ------------------------------------------------------------------------
 */
class EE_Message_Template_Group extends EE_Soft_Delete_Base_Class
{

    /**
     * Extra Meta key prefix for whether a given context for this message tmeplate group is active or not.
     */
    const ACTIVE_CONTEXT_RECORD_META_KEY_PREFIX = 'active_context_';

    /**
     * @param array  $props_n_values
     * @param string $timezone
     * @return EE_Message_Template_Group|mixed
     * @throws EE_Error
     */
    public static function new_instance($props_n_values = array(), $timezone = '')
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone);
        return $has_object ? $has_object : new self($props_n_values, false, $timezone);
    }


    /**
     * @param array  $props_n_values
     * @param string $timezone
     * @return EE_Message_Template_Group
     */
    public static function new_instance_from_db($props_n_values = array(), $timezone = '')
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * @param bool $message_type
     * @throws EE_Error
     */
    public function set_message_type($message_type = false)
    {
        if (! $message_type) {
            throw new EE_Error(esc_html__('Missing required value for the message_type parameter', 'event_espresso'));
        }
        $this->set('MTP_message_type', $message_type);
    }


    /**
     * @param bool $messenger
     * @throws EE_Error
     */
    public function set_messenger($messenger = false)
    {
        if (! $messenger) {
            throw new EE_Error(esc_html__('Missing required value for the messenger parameter', 'event_espresso'));
        }
        $this->set('MTP_messenger', $messenger);
    }


    /**
     * @param bool $GRP_ID
     * @throws EE_Error
     */
    public function set_group_template_id($GRP_ID = false)
    {
        if (! $GRP_ID) {
            throw new EE_Error(
                esc_html__(
                    'Missing required value for the message template group id',
                    'event_espresso'
                )
            );
        }
        $this->set('GRP_ID', $GRP_ID);
    }


    /**
     * get Group ID
     *
     * @access public
     * @return int
     * @throws EE_Error
     */
    public function GRP_ID()
    {
        return $this->get('GRP_ID');
    }


    /**
     * get User ID
     *
     * @access public
     * @return int
     * @throws EE_Error
     */
    public function user()
    {
        $user_id = $this->get('MTP_user_id');
        return empty($user_id) ? get_current_user_id() : $user_id;
    }


    /**
     * Wrapper for the user function() (preserve backward compat)
     *
     * @since  4.5.0
     * @return int
     * @throws EE_Error
     */
    public function wp_user()
    {
        return $this->user();
    }


    /**
     * This simply returns a count of all related events to this message template group
     *
     * @return int
     */
    public function count_events()
    {
        return $this->count_related('Event');
    }


    /**
     * returns the name saved in the db for this template
     *
     * @return string
     * @throws EE_Error
     */
    public function name()
    {
        return $this->get('MTP_name');
    }


    /**
     * Returns the description saved in the db for this template group
     *
     * @return string
     * @throws EE_Error
     */
    public function description()
    {
        return $this->get('MTP_description');
    }


    /**
     * returns all related EE_Message_Template objects
     *
     * @param  array $query_params like EEM_Base::get_all()
     * @return EE_Message_Template[]
     * @throws EE_Error
     */
    public function message_templates($query_params = array())
    {
        return $this->get_many_related('Message_Template', $query_params);
    }


    /**
     * get Message Messenger
     *
     * @access public
     * @return string
     * @throws EE_Error
     */
    public function messenger()
    {
        return $this->get('MTP_messenger');
    }


    /**
     * get Message Messenger OBJECT
     * If an attempt to get the corresponding messenger object fails, then we set this message
     * template group to inactive, and save to db.  Then return null so client code can handle
     * appropriately.
     *
     * @return EE_messenger
     * @throws EE_Error
     */
    public function messenger_obj()
    {
        $messenger = $this->messenger();
        try {
            $messenger = EEH_MSG_Template::messenger_obj($messenger);
        } catch (EE_Error $e) {
            //if an exception was thrown then let's deactivate this message template group because it means there is no
            // class for this messenger in this group.
            $this->set('MTP_is_active', false);
            $this->save();
            return null;
        }
        return $messenger;
    }


    /**
     * get Message Type
     *
     * @access public
     * @return string
     * @throws EE_Error
     */
    public function message_type()
    {
        return $this->get('MTP_message_type');
    }


    /**
     * get Message type OBJECT
     * If an attempt to get the corresponding message type object fails, then we set this message
     * template group to inactive, and save to db.  Then return null so client code can handle
     * appropriately.
     *
     * @throws EE_Error
     * @return EE_message_type|false if exception thrown.
     */
    public function message_type_obj()
    {
        $message_type = $this->message_type();
        try {
            $message_type = EEH_MSG_Template::message_type_obj($message_type);
        } catch (EE_Error $e) {
            //if an exception was thrown then let's deactivate this message template group because it means there is no
            // class for the message type in this group.
            $this->set('MTP_is_active', false);
            $this->save();
            return null;
        }
        return $message_type;
    }


    /**
     * @return array
     * @throws EE_Error
     */
    public function contexts_config()
    {
        return $this->message_type_obj()->get_contexts();
    }


    /**
     * This returns the context_label for contexts as set in the message type object
     * Note this is an array with singular and plural keys
     *
     * @access public
     * @return array labels for "context"
     * @throws EE_Error
     */
    public function context_label()
    {
        $obj = $this->message_type_obj();
        return $obj->get_context_label();
    }


    /**
     * This returns an array of EE_Message_Template objects indexed by context and field.
     *
     * @return array ()
     * @throws EE_Error
     */
    public function context_templates()
    {
        $mtps_arr = array();
        $mtps     = $this->get_many_related('Message_Template');
        if (empty($mtps)) {
            return array();
        }
        //note contexts could have CHECKBOX fields per context. So we return the objects indexed by context AND field.
        foreach ($mtps as $mtp) {
            $mtps_arr[$mtp->get('MTP_context')][$mtp->get('MTP_template_field')] = $mtp;
        }
        return $mtps_arr;
    }


    /**
     * this returns if the template group this template belongs to is global
     *
     * @return bool true if it is, false if it isn't
     * @throws EE_Error
     */
    public function is_global()
    {
        return $this->get('MTP_is_global');
    }


    /**
     * this returns if the template group this template belongs to is active (i.e. turned "on" or not)
     *
     * @return bool true if it is, false if it isn't
     * @throws EE_Error
     */
    public function is_active()
    {
        return $this->get('MTP_is_active');
    }


    /**
     * This will return an array of shortcodes => labels from the messenger and message_type objects associated with
     * this template.
     *
     * @since 4.3.0
     * @uses  EEH_MSG_Template::get_shortcodes()
     * @param string $context what context we're going to return shortcodes for
     * @param array  $fields  what fields we're returning valid shortcodes for.  If empty then we assume all fields are
     *                        to be returned.
     * @param bool   $merged  If TRUE then we don't return shortcodes indexed by field but instead an array of the
     *                        unique shortcodes for all the given (or all) fields.
     * @return mixed (array|bool) an array of shortcodes in the format array( '[shortcode] => 'label') OR FALSE if no
     *                        shortcodes found.
     * @throws EE_Error
     */
    public function get_shortcodes($context, $fields = array(), $merged = false)
    {
        $messenger    = $this->messenger();
        $message_type = $this->message_type();
        return EEH_MSG_Template::get_shortcodes($message_type, $messenger, $fields, $context, $merged);
    }


    /**
     * This just gets the template pack name assigned to this message template group.  If it's not set, then we just
     * use the default template pack.
     *
     * @since 4.5.0
     * @return string
     * @throws EE_Error
     */
    public function get_template_pack_name()
    {
        return $this->get_extra_meta('MTP_template_pack', true, 'default');
    }


    /**
     * This returns the specific template pack object referenced by the template pack name attached to this message
     * template group.  If no template pack is assigned then the default template pack is retrieved.
     *
     * @since 4.5.0
     * @return EE_Messages_Template_Pack
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function get_template_pack()
    {
        $pack_name = $this->get_template_pack_name();
        EE_Registry::instance()->load_helper('MSG_Template');
        return EEH_MSG_Template::get_template_pack($pack_name);
    }


    /**
     * This retrieves the template variation assigned to this message template group.  If it's not set, then we just
     * use the default template variation.
     *
     * @since 4.5.0
     * @return string
     * @throws EE_Error
     */
    public function get_template_pack_variation()
    {
        return $this->get_extra_meta('MTP_variation', true, 'default');
    }


    /**
     * This just sets the template pack name attached to this message template group.
     *
     * @since 4.5.0
     * @param string $template_pack_name What message template pack is assigned.
     * @return int
     * @throws EE_Error
     */
    public function set_template_pack_name($template_pack_name)
    {
        return $this->update_extra_meta('MTP_template_pack', $template_pack_name);
    }


    /**
     * This just sets the template pack variation attached to this message template group.
     *
     * @since 4.5.0
     * @param string $variation What variation is being set on the message template group.
     * @return int
     * @throws EE_Error
     */
    public function set_template_pack_variation($variation)
    {
        return $this->update_extra_meta('MTP_variation', $variation);
    }


    /**
     * Deactivates the given context.
     *
     * @param $context
     * @return bool|int
     * @throws EE_Error
     * @throws InvalidIdentifierException
     */
    public function deactivate_context($context)
    {
        $this->validate_context($context);
        return $this->update_extra_meta(self::ACTIVE_CONTEXT_RECORD_META_KEY_PREFIX . $context, false);
    }


    /**
     * Activates the given context.
     *
     * @param $context
     * @return bool|int
     * @throws EE_Error
     * @throws InvalidIdentifierException
     */
    public function activate_context($context)
    {
        $this->validate_context($context);
        return $this->update_extra_meta(self::ACTIVE_CONTEXT_RECORD_META_KEY_PREFIX . $context, true);
    }


    /**
     * Returns whether the context is active or not.
     * Note, this will default to true if the extra meta record doesn't exist.
     * Also, this does NOT account for whether the "To" field is empty or not. Some messengers may allow the "To" field
     * to be empty (@see EE_Messenger::allow_empty_to_field()) so an empty "To" field is not always an indicator of
     * whether a context is "active" or not.
     *
     * @param $context
     * @return bool
     * @throws EE_Error
     * @throws InvalidIdentifierException
     */
    public function is_context_active($context)
    {
        $this->validate_context($context);
        return filter_var(
            $this->get_extra_meta(self::ACTIVE_CONTEXT_RECORD_META_KEY_PREFIX . $context, true, true),
            FILTER_VALIDATE_BOOLEAN
        );
    }


    /**
     * Validates the incoming context to verify it matches a registered context for the related message type.
     * @param string $context
     * @throws EE_Error
     * @throws InvalidIdentifierException
     */
    public function validate_context($context)
    {
        $contexts = $this->contexts_config();
        if (! isset($contexts[$context])) {
            throw new InvalidIdentifierException(
                '',
                '',
                sprintf(
                    esc_html__(
                        'An invalid string identifying a context was provided.  "%1$s" was received, and one of "%2$s" was expected.',
                        'event_espresso'
                    ),
                    $context,
                    implode(',', array_keys($contexts))
                )
            );
        }
    }
}
