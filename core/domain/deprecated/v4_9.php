<?php

use EventEspresso\caffeinated\core\domain\services\pue\Stats;
use EventEspresso\caffeinated\core\services\licensing\LicenseService;
use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\interfaces\InterminableInterface;

/**
 * Deprecated class for instantiating default templates.  This was deprecated because of a substantial change in the
 * constructor signature.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.1
 * @deprecated 4.9.0  Replaced by EE_Messages_Template_Defaults (note the plural s on Messages)
 */
class EE_Message_Template_Defaults extends EE_Base
{
    /**
     * EE_Message_Template_Defaults constructor.
     *
     * @param EE_messages $messages
     * @param             $messenger_name
     * @param             $message_type_name
     * @param int         $GRP_ID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(
        EE_messages $messages,
        $messenger_name,
        $message_type_name,
        $GRP_ID = 0
    ) {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__(
                'The class EE_Message_Template_Defaults has been deprecated and replaced by EE_Messages_Template_Defaults.',
                'event_espresso'
            ),
            '4.9.0'
        );
        /** @var EE_Message_Resource_Manager $message_resource_manager */
        $message_resource_manager = EE_Registry::instance()->load_lib('Message_Resource_Manager');
        $messenger                = $message_resource_manager->get_messenger($messenger_name);
        $message_type             = $message_resource_manager->get_message_type($message_type_name);
        return EE_Registry::instance()->load_lib(
            'Messages_Template_Defaults',
            [
                $messenger,
                $message_type,
                $GRP_ID,
            ]
        );
    }
}


// end EE_Message_Template_Defaults class


/**
 * @deprecated     4.9.0
 * @package        Event Espresso
 * @subpackage     includes/core/messages
 * @author         Darren Ethier, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_messages
{
    /** @type EE_messenger[] */
    protected $_active_messengers = [];

    /** @type array */
    protected $_active_message_types = [];

    /** @type EE_message_type[] */
    protected $_installed_message_types = [];

    /** @type EE_messenger */
    protected $_messenger;

    /** @type EE_message_type */
    protected $_message_type;

    /** @type array */
    protected $_contexts = [];

    /** @type EE_Message_Resource_Manager $_message_resource_manager */
    protected $_message_resource_manager;


    /**
     * EE_messages constructor.
     *
     * @deprecated 4.9.0
     */
    public function __construct()
    {
    }


    /**
     * @param string $method
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function _class_is_deprecated($method)
    {
        EE_Error::doing_it_wrong(
            'EE_messages::' . $method,
            esc_html__('EE_messages has been deprecated.  Please use EE_Message_Resource_Manager instead.'),
            '4.9.0',
            '4.10.0.p'
        );
        // Please use EE_Message_Resource_Manager instead
        $this->_message_resource_manager = EE_Registry::instance()->load_lib('Message_Resource_Manager');
    }


    /**
     * @param string $messenger_name
     * @return boolean TRUE if it was PREVIOUSLY active, and FALSE if it was previously inactive
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function ensure_messenger_is_active($messenger_name)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->ensure_messenger_is_active($messenger_name);
    }


    /**
     * @param string $message_type message type name
     * @param        $messenger
     * @return bool true if it got activated (or was active) and false if not.
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function ensure_message_type_is_active($message_type, $messenger)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->ensure_message_type_is_active($message_type, $messenger);
    }


    /**
     * @param string $messenger_name
     * @param array  $mts_to_activate              (optional) An array of message types to activate with this messenger.
     *                                             If included we do NOT setup the default message types (assuming they
     *                                             are already setup.)
     * @return array an array of generated templates or false if nothing generated/activated.
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function activate_messenger($messenger_name, $mts_to_activate = [])
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->activate_messenger($messenger_name, $mts_to_activate);
    }


    /**
     * @param EE_messenger    $messenger    messenger used in trigger
     * @param EE_message_type $message_type message type used in trigger
     *
     * @return bool true is a generating messenger and can be sent OR FALSE meaning cannot send.
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function is_generating_messenger_and_active(EE_messenger $messenger, EE_message_type $message_type)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->is_generating_messenger_and_active($messenger, $message_type);
    }


    /**
     * @param string $messenger
     * @return EE_messenger | null
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function get_messenger_if_active($messenger)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->get_active_messenger($messenger);
    }


    /**
     * @param EE_Message $message
     * @return array  An array with 'messenger' and 'message_type' as the index and the corresponding valid object if
     *                  available.
     *                  Eg. Valid Messenger and Message Type:
     *                  array(
     *                  'messenger' => new EE_Email_messenger(),
     *                  'message_type' => new EE_Registration_Approved_message_type()
     *                  )
     *                  Valid Messenger and Invalid Message Type:
     *                  array(
     *                  'messenger' => new EE_Email_messenger(),
     *                  'message_type' => null
     *                  )
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function validate_for_use(EE_Message $message)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return [
            'messenger'    => $message->messenger_object(),
            'message_type' => $message->message_type_object(),
        ];
    }


    /**
     * @param string $type                  What type of message are we sending (corresponds to message types)
     * @param mixed  $vars                  Data being sent for parsing in the message
     * @param string $sending_messenger     if included then we ONLY use the specified messenger for delivery.
     *                                      Otherwise we cycle through all active messengers.
     * @param string $generating_messenger  if included then this messenger is used for generating the message
     *                                      templates (but not for sending).
     * @param string $context               If included then only a message type for a specific context will be
     *                                      generated.
     * @param bool   $send                  Default TRUE.  If false, then this will just return the generated
     *                                      EE_messages objects which might be used by the trigger to setup a batch
     *                                      message (typically html messenger uses it).
     * @return bool|array
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function send_message(
        $type,
        $vars,
        $sending_messenger = '',
        $generating_messenger = '',
        $context = '',
        $send = true
    ) {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        /** @type EE_Messages_Processor $processor */
        $processor = EE_Registry::instance()->load_lib('Messages_Processor');
        $error     = false;
        // try to intelligently determine what method we'll call based on the incoming data.
        // if generating and sending are different then generate and send immediately.
        if (! empty($sending_messenger) && $sending_messenger != $generating_messenger && $send) {
            // in the legacy system, when generating and sending were different, that means all the
            // vars are already in the request object.  So let's just use that.
            try {
                /** @type EE_Message_To_Generate_From_Request $mtg */
                $mtg = EE_Registry::instance()->load_lib('Message_To_Generate_From_Request');
                $processor->generate_and_send_now($mtg);
            } catch (EE_Error $e) {
                $error_msg = esc_html__(
                    'Please note that a system message failed to send due to a technical issue.',
                    'event_espresso'
                );
                // add specific message for developers if WP_DEBUG in on
                $error_msg .= '||' . $e->getMessage();
                EE_Error::add_error($error_msg, __FILE__, __FUNCTION__, __LINE__);
                $error = true;
            }
        } else {
            $processor->generate_for_all_active_messengers($type, $vars, $send);
            // let's find out if there were any errors and how many successfully were queued.
            $count_errors = $processor->get_queue()->count_STS_in_queue(
                [EEM_Message::status_failed, EEM_Message::status_debug_only]
            );
            $count_queued = $processor->get_queue()->count_STS_in_queue(EEM_Message::status_incomplete);
            $count_retry  = $processor->get_queue()->count_STS_in_queue(EEM_Message::status_retry);
            $count_errors = $count_errors + $count_retry;
            if ($count_errors > 0) {
                $error = true;
                if ($count_errors > 1 && $count_retry > 1 && $count_queued > 1) {
                    $message = sprintf(
                        esc_html__(
                            'There were %1$d errors and %2$d messages successfully queued for generation and sending',
                            'event_espresso'
                        ),
                        $count_errors,
                        $count_queued
                    );
                } elseif ($count_errors > 1 && $count_queued === 1) {
                    $message = sprintf(
                        esc_html__(
                            'There were %1$d errors and %2$d message successfully queued for generation.',
                            'event_espresso'
                        ),
                        $count_errors,
                        $count_queued
                    );
                } elseif ($count_errors === 1 && $count_queued > 1) {
                    $message = sprintf(
                        esc_html__(
                            'There was %1$d error and %2$d messages successfully queued for generation.',
                            'event_espresso'
                        ),
                        $count_errors,
                        $count_queued
                    );
                } else {
                    $message = sprintf(
                        esc_html__(
                            'There was %d message that failed to be queued for generation.',
                            'event_espresso'
                        ),
                        $count_errors
                    );
                }
                EE_Error::add_error($message, __FILE__, __FUNCTION__, __LINE__);
            } else {
                if ($count_queued === 1) {
                    $message = sprintf(
                        esc_html__(
                            '%d message successfully queued for generation.',
                            'event_espresso'
                        ),
                        $count_queued
                    );
                } else {
                    $message = sprintf(
                        esc_html__(
                            '%d messages were successfully queued for generation.',
                            'event_espresso'
                        ),
                        $count_queued
                    );
                }
                EE_Error::add_success($message);
            }
        }
        // if no error then return the generated message(s).
        if (! $error && ! $send) {
            $generated_queue = $processor->generate_queue(false);
            // get message and return.
            $generated_queue->get_message_repository()->rewind();
            $messages = [];
            while ($generated_queue->get_message_repository()->valid()) {
                $message = $generated_queue->get_message_repository()->current();
                if ($message instanceof EE_Message) {
                    // set properties that might be expected by add-ons (backward compat)
                    $message->content            = $message->content();
                    $message->template_pack      = $message->get_template_pack();
                    $message->template_variation = $message->get_template_pack_variation();
                    $messages[]                  = $message;
                }
                $generated_queue->get_message_repository()->next();
            }
            return $messages;
        }
        return $error ? false
            : true; // yeah backwards eh?  Really what we're returning is if there is a total success for all the messages or not.  We'll modify this once we get message recording in place.
    }


    /**
     * @param string $type       This should correspond with a valid message type
     * @param string $context    This should correspond with a valid context for the message type
     * @param string $messenger  This should correspond with a valid messenger.
     * @param bool   $send       true we will do a test send using the messenger delivery, false we just do a regular
     *                           preview
     * @return string          The body of the message.
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function preview_message($type, $context, $messenger, $send = false)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return EED_Messages::preview_message($type, $context, $messenger, $send);
    }


    /**
     * @param string   $messenger    a string matching a valid active messenger in the system
     * @param string   $message_type Although it seems contrary to the name of the method, a message type name is still
     *                               required to send along the message type to the messenger because this is used for
     *                               determining what specific variations might be loaded for the generated message.
     * @param stdClass $message      a stdClass object in the format expected by the messenger.
     *
     * @return bool          success or fail.
     * @throws EE_Error
     * @throws ReflectionException
     * @since      4.5.0
     * @deprecated 4.9.0   Moved to EED_Messages Module
     */
    public function send_message_with_messenger_only($messenger, $message_type, $message)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        // setup for sending to new method.
        /** @type EE_Messages_Queue $queue */
        $queue = EE_Registry::instance()->load_lib('Messages_Queue');
        // make sure we have a proper message object
        if (! $message instanceof EE_Message && is_object($message) && isset($message->content)) {
            $msg = EE_Message_Factory::create(
                [
                    'MSG_messenger'    => $messenger,
                    'MSG_message_type' => $message_type,
                    'MSG_content'      => $message->content,
                    'MSG_subject'      => $message->subject,
                ]
            );
        } else {
            $msg = $message;
        }
        if (! $msg instanceof EE_Message) {
            return false;
        }
        // make sure any content in a content property (if not empty) is set on the MSG_content.
        if (! empty($msg->content)) {
            $msg->set('MSG_content', $msg->content);
        }
        $queue->add($msg);
        return EED_Messages::send_message_with_messenger_only($messenger, $message_type, $queue);
    }


    /**
     * @param         $messenger
     * @param string  $message_type message type that the templates are being created for
     * @param int     $GRP_ID
     * @param bool    $is_global
     * @return array|object if creation is successful then we return an array of info, otherwise an error_object is
     *                              returned.
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function create_new_templates($messenger, $message_type, $GRP_ID = 0, $is_global = false)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        EE_Registry::instance()->load_helper('MSG_Template');
        return EEH_MSG_Template::create_new_templates($messenger, $message_type, $GRP_ID, $is_global);
    }


    /**
     * @param string $messenger_name    name of EE_messenger
     * @param string $message_type_name name of EE_message_type
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function get_fields($messenger_name, $message_type_name)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        EE_Registry::instance()->load_helper('MSG_Template');
        return EEH_MSG_Template::get_fields($messenger_name, $message_type_name);
    }


    /**
     * @param string $type                we can indicate just returning installed message types
     *                                    or messengers (or both) via this parameter.
     * @param bool   $skip_cache          if true then we skip the cache and retrieve via files.
     * @return array                    multidimensional array of messenger and message_type objects
     *                                    (messengers index, and message_type index);
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     * @access     public
     */
    public function get_installed($type = 'all', $skip_cache = false)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        if ($skip_cache) {
            $this->_message_resource_manager->reset_active_messengers_and_message_types();
        }
        switch ($type) {
            case 'messengers':
                return [
                    'messenger' => $this->_message_resource_manager->installed_messengers(),
                ];
                break;
            case 'message_types':
                return [
                    'message_type' => $this->_message_resource_manager->installed_message_types(),
                ];
                break;
            case 'all':
            default:
                return [
                    'messenger'    => $this->_message_resource_manager->installed_messengers(),
                    'message_type' => $this->_message_resource_manager->installed_message_types(),
                ];
                break;
        }
    }


    /**
     * @return \EE_messenger[]
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function get_active_messengers()
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->active_messengers();
    }


    /**
     * @return array array of message_type references (string)
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function get_active_message_types()
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->list_of_active_message_types();
    }


    /**
     * @return EE_message_type[]
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function get_active_message_type_objects()
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->get_active_message_type_objects();
    }


    /**
     * @param string $messenger The messenger being checked
     * @return EE_message_type[]    (or empty array if none present)
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     * @since      4.5.0
     */
    public function get_active_message_types_per_messenger($messenger)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->get_active_message_types_for_messenger($messenger);
    }


    /**
     * @param string $messenger    The string should correspond to the messenger (message types are
     * @param string $message_type The string should correspond to a message type.
     * @return EE_message_type|null
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function get_active_message_type($messenger, $message_type)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->get_active_message_type_for_messenger($messenger, $message_type);
    }


    /**
     * @return array|\EE_message_type[]
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function get_installed_message_types()
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->installed_message_types();
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function get_installed_messengers()
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->installed_messengers();
    }


    /**
     * @param bool $slugs_only   Whether to return an array of just slugs and labels (true) or all contexts indexed by
     *                           message type.
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.0
     */
    public function get_all_contexts($slugs_only = true)
    {
        // EE_messages has been deprecated
        $this->_class_is_deprecated(__FUNCTION__);
        return $this->_message_resource_manager->get_all_contexts($slugs_only);
    }
}

// end EE_messages class


/**
 * Class EE_Address_Formatter
 *
 * @deprecated 4.9.0
 */
class EE_Address_Formatter extends \EventEspresso\core\services\address\formatters\AddressFormatter
{
}


/**
 * Class EE_MultiLine_Address_Formatter
 *
 * @deprecated 4.9.0
 */
class EE_MultiLine_Address_Formatter extends \EventEspresso\core\services\address\formatters\NullAddressFormatter
{
}


/**
 * Class EE_Inline_Address_Formatter
 *
 * @deprecated 4.9.0
 */
class EE_Inline_Address_Formatter extends \EventEspresso\core\services\address\formatters\InlineAddressFormatter
{
}


/**
 * Class EE_Null_Address_Formatter
 *
 * @deprecated 4.9.0
 */
class EE_Null_Address_Formatter extends \EventEspresso\core\services\address\formatters\NullAddressFormatter
{
}


/**
 * Class EE_Generic_Address
 *
 * @deprecated 4.9.0
 */
class EE_Generic_Address extends \EventEspresso\core\domain\entities\GenericAddress
{
}


add_filter(
    'FHEE__EventEspresso_modules_events_archive_EventsArchiveIframe__display__css',
    function ($event_list_iframe_css) {
        if (! has_filter('FHEE__EventsArchiveIframe__event_list_iframe__css')) {
            return $event_list_iframe_css;
        }
        deprecated_espresso_action_or_filter_doing_it_wrong(
            'FHEE__EventsArchiveIframe__event_list_iframe__css',
            'FHEE__EventEspresso_modules_events_archive_EventsArchiveIframe__display__css',
            '\EventEspresso\modules\events_archive\EventsArchiveIframe::display()',
            '4.9.14',
            '5.1.0',
            'filter'
        );
        return apply_filters(
            'FHEE__EventsArchiveIframe__event_list_iframe__css',
            $event_list_iframe_css
        );
    }
);
add_filter(
    'FHEE__EventEspresso_modules_events_archive_EventsArchiveIframe__display__js',
    function ($event_list_iframe_js) {
        if (! has_filter('FHEE__EED_Ticket_Selector__ticket_selector_iframe__js')) {
            return $event_list_iframe_js;
        }
        deprecated_espresso_action_or_filter_doing_it_wrong(
            'FHEE__EED_Ticket_Selector__ticket_selector_iframe__js',
            'FHEE__EventEspresso_modules_events_archive_EventsArchiveIframe__display__js',
            '\EventEspresso\modules\events_archive\EventsArchiveIframe::display()',
            '4.9.14',
            '5.1.0',
            'filter'
        );
        return apply_filters(
            'FHEE__EED_Ticket_Selector__ticket_selector_iframe__js',
            $event_list_iframe_js
        );
    }
);
add_action(
    'AHEE__EE_Capabilities__addCaps__complete',
    function ($capabilities_map) {
        if (! has_action('AHEE__EE_Capabilities__init_role_caps__complete')) {
            return;
        }
        deprecated_espresso_action_or_filter_doing_it_wrong(
            'AHEE__EE_Capabilities__init_role_caps__complete',
            'AHEE__EE_Capabilities__addCaps__complete',
            '\EE_Capabilities::addCaps()',
            '4.9.42',
            '5.1.0',
        );
        do_action(
            'AHEE__EE_Capabilities__init_role_caps__complete',
            $capabilities_map
        );
    }
);

add_filter(
    'FHEE_EventEspresso_core_domain_services_commands_attendee_CreateAttendeeCommandHandler__findExistingAttendee__existing_attendee',
    function ($existing_attendee, $registration, $attendee_data) {
        if (! has_filter('FHEE_EE_Single_Page_Checkout__save_registration_items__find_existing_attendee')) {
            return $existing_attendee;
        }
        deprecated_espresso_action_or_filter_doing_it_wrong(
            'FHEE_EE_Single_Page_Checkout__save_registration_items__find_existing_attendee',
            'FHEE_EventEspresso_core_domain_services_commands_attendee_CreateAttendeeCommandHandler__findExistingAttendee__existing_attendee',
            '\EventEspresso\core\domain\services\commands\attendee\CreateAttendeeCommandHandler::findExistingAttendee()',
            '4.9.34',
            '5.1.0',
            'filter'
        );
        return apply_filters(
            'FHEE_EE_Single_Page_Checkout__save_registration_items__find_existing_attendee',
            $existing_attendee,
            $registration,
            $attendee_data
        );
    },
    10,
    3
);

/**
 * Class EE_Event_List_Query
 *
 * @deprecated 4.9.40
 */
class EE_Event_List_Query extends WP_Query
{
    private $title;

    private $css_class;

    private $category_slug;


    /**
     * EE_Event_List_Query constructor.
     *
     * @param array $args
     */
    public function __construct($args = [])
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Please use \EventEspresso\core\domain\services\wp_queries\EventListQuery instead.',
                'event_espresso'
            ),
            '4.9.27',
            '5.0.0'
        );
        $this->title         = isset($args['title']) ? $args['title'] : '';
        $this->css_class     = isset($args['css_class']) ? $args['css_class'] : '';
        $this->category_slug = isset($args['category_slug']) ? $args['category_slug'] : '';
        $limit               = isset($args['limit']) && absint($args['limit']) ? $args['limit'] : 10;
        // the current "page" we are viewing
        $paged = max(1, get_query_var('paged'));
        // Force these args
        $args = array_merge(
            $args,
            [
                'post_type'              => EspressoPostType::EVENTS,
                'posts_per_page'         => $limit,
                'update_post_term_cache' => false,
                'update_post_meta_cache' => false,
                'paged'                  => $paged,
                'offset'                 => ($paged - 1) * $limit,
            ]
        );
        // run the query
        parent::__construct($args);
    }


    /**
     * event_list_title
     *
     * @param string $event_list_title
     * @return string
     */
    public function event_list_title($event_list_title = '')
    {
        if (! empty($this->title)) {
            return $this->title;
        }
        return $event_list_title;
    }


    /**
     * event_list_css
     *
     * @param string $event_list_css
     * @return string
     */
    public function event_list_css($event_list_css = '')
    {
        $event_list_css .= ! empty($event_list_css)
            ? ' '
            : '';
        $event_list_css .= ! empty($this->css_class)
            ? $this->css_class
            : '';
        $event_list_css .= ! empty($event_list_css)
            ? ' '
            : '';
        $event_list_css .= ! empty($this->category_slug)
            ? $this->category_slug
            : '';
        return $event_list_css;
    }
}


/**
 * EE_PUE
 *
 * @package        Event Espresso
 * @subpackage     includes/core/
 * @author         Darren Ethier
 * @deprecated     4.9.59.p
 */
class EE_PUE implements InterminableInterface
{
    /**
     *    class constructor
     *
     * @deprecated 4.9.59.p
     */
    public function __construct()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__('%1$s has been replaced by %2$s.', 'event_espresso'),
                __CLASS__,
                'EventEspresso\core\services\licensing\LicenseServices'
            ),
            '4.9.59.p'
        );
    }


    /**
     * The purpose of this function is to display information about Event Espresso data collection
     * and a optin selection for extra data collecting by users.
     *
     * @param bool $extra
     * @return string html.
     * @deprecated 4.9.59.p
     */
    public static function espresso_data_collection_optin_text($extra = true)
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__('%1$s has been replaced by %2$s.', 'event_espresso'),
                __METHOD__,
                'EventEspresso\core\domain\services\Stats::optinText'
            ),
            '4.9.59.p'
        );
        Stats::optinText($extra);
    }


    /**
     * This is a handy helper method for retrieving whether there is an update available for the given plugin.
     *
     * @param string $basename  Use the equivalent result from plugin_basename() for this param as WP uses that to
     *                          identify plugins. Defaults to core update
     * @return boolean           True if update available, false if not.
     * @deprecated 4.9.59.p
     */
    public static function is_update_available($basename = '')
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__('%1$s has been replaced by %2$s.', 'event_espresso'),
                __METHOD__,
                'EventEspresso\caffeinated\core\services\licensing\LicenseService::isUpdateAvailable'
            ),
            '4.9.59.p'
        );
        return LicenseService::isUpdateAvailable($basename);
    }
}

add_filter(
    'FHEE__EventEspressoBatchRequest__JobHandlers__RegistrationsReport__reg_csv_array',
    'ee_deprecated_registrations_report_csv_legacy_fields',
    10,
    2
);
/**
 * Filters the CSV row to make it appear like the old labels (which were "$pretty_name[$field_name]").
 *
 * @param $csv_row_data
 * @param $reg_row
 * @return array for CSV row
 * @throws EE_Error
 * @throws InvalidArgumentException
 * @throws InvalidDataTypeException
 * @throws InvalidInterfaceException
 * @throws ReflectionException
 * @since      4.9.69.p
 * @deprecated 4.9.69.p This only exists for backward compatibility with code snippets.
 *             See https://github.com/eventespresso/event-espresso-core/pull/675
 */
function ee_deprecated_registrations_report_csv_legacy_fields($csv_row_data, $reg_row)
{
    // no need for all this if nobody is using the deprecated filter
    if (has_filter('FHEE__EE_Export__report_registrations__reg_csv_array')) {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            sprintf(
            // EE_Error::doing_it_wrong with escape HTML, so don't escape it twice by doing it here too.
                _x(
                    'The filter "%1$s" has been deprecated. Please use "%2$s" instead.',
                    'The filter "FHEE__EE_Export__report_registrations__reg_csv_array" has been deprecated. Please use "FHEE__EventEspressoBatchRequest__JobHandlers__RegistrationsReport__reg_csv_array" instead.',
                    'event_espresso'
                ),
                'FHEE__EE_Export__report_registrations__reg_csv_array',
                'FHEE__EventEspressoBatchRequest__JobHandlers__RegistrationsReport__reg_csv_array'
            ),
            '4.9.69.p',
            '4.9.75.p'
        );
        // there's code that expected the old csv column headers/labels. Let's oblige. Put it back in the old format!
        // first: what model fields might be used as column headers? (whose format we need to change)
        $model_fields = array_merge(
            EEM_Registration::instance()->field_settings(),
            EEM_Attendee::instance()->field_settings()
        );
        // create an array that uses the legacy column headers/labels.
        $new_csv_row = [];
        foreach ($csv_row_data as $label => $value) {
            $new_label = $label;
            foreach ($model_fields as $field) {
                if ($label === EEH_Export::get_column_name_for_field($field)) {
                    // re-add the old field name
                    $new_label = $label . '[' . $field->get_name() . ']';
                    break;
                }
            }
            $new_csv_row[ $new_label ] = $value;
        }
        // before we run it through the deprecated filter, set the method `EEH_Export::get_column_name_for_field()`
        // to create the old column names, because that's what's in the row temporarily
        add_filter(
            'FHEE__EEH_Export__get_column_name_for_field__add_field_name',
            '__return_true',
            777
        );
        // now, those old filters can be run on this data. Have fun!
        /**
         * Deprecated. Use FHEE__EventEspressoBatchRequest__JobHandlers__RegistrationsReport__reg_csv_array instead.
         *
         * Filter to change the contents of each row of the registrations report CSV file.
         * This can be used to add or remote columns from the CSV file, or change their values.                 *
         * Note: it has this name because originally that's where this filter resided,
         * and we've left its name as-is for backward compatibility.
         * Note when using: all rows in the CSV should have the same columns.
         *
         * @param array $reg_csv_array keys are column-header names, and values are that columns' value
         *                             in this row
         * @param array $reg_row       is the row from the database's wp_esp_registration table
         */
        $updated_row = apply_filters(
            'FHEE__EE_Export__report_registrations__reg_csv_array',
            $new_csv_row,
            $reg_row
        );

        // ok now we can revert to normal for EEH_Export::get_column_name_for_field().
        remove_filter(
            'FHEE__EEH_Export__get_column_name_for_field__add_field_name',
            '__return_true',
            777
        );

        // great. Now that the old filters are done, we can remove the ugly square brackets from column headers/labels.
        $updated_and_restored_row = [];
        foreach ($updated_row as $label => $value) {
            $matches = [];
            if (
                preg_match(
                    '~([^\[]*)\[(.*)\]~',
                    $label,
                    $matches
                )
                && isset(
                    $matches[0],
                    $matches[1],
                    $matches[2]
                )
            ) {
                $label = $matches[1];
            }
            $updated_and_restored_row[ $label ] = $value;
        }
        $csv_row_data = $updated_and_restored_row;
    }
    return $csv_row_data;
}
