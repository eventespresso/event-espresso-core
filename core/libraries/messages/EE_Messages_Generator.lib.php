<?php

/**
 * This class is used for generating EE_Message objects with given info.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Messages_Generator
{


    /**
     * @type EE_Messages_Data_Handler_Collection
     */
    protected $_data_handler_collection;

    /**
     * @type  EE_Message_Template_Group_Collection
     */
    protected $_template_collection;

    /**
     * This will hold the data handler for the current EE_Message being generated.
     *
     * @type EE_Messages_incoming_data
     */
    protected $_current_data_handler;

    /**
     * This holds the EE_Messages_Queue that contains the messages to generate.
     *
     * @type EE_Messages_Queue
     */
    protected $_generation_queue;

    /**
     * This holds the EE_Messages_Queue that will store the generated EE_Message objects.
     *
     * @type EE_Messages_Queue
     */
    protected $_ready_queue;

    /**
     * This is a container for any error messages that get created through the generation
     * process.
     *
     * @type array
     */
    protected $_error_msg = array();

    /**
     * Flag used to set when the current EE_Message in the generation queue has been verified.
     *
     * @type bool
     */
    protected $_verified = false;

    /**
     * This will hold the current messenger object corresponding with the current EE_Message in the generation queue.
     *
     * @type EE_messenger
     */
    protected $_current_messenger;

    /**
     * This will hold the current message type object corresponding with the current EE_Message in the generation queue.
     *
     * @type EE_message_type
     */
    protected $_current_message_type;

    /**
     * @type EEH_Parse_Shortcodes
     */
    protected $_shortcode_parser;


    /**
     * @param EE_Messages_Queue                     $generation_queue
     * @param \EE_Messages_Queue                    $ready_queue
     * @param \EE_Messages_Data_Handler_Collection  $data_handler_collection
     * @param \EE_Message_Template_Group_Collection $template_collection
     * @param \EEH_Parse_Shortcodes                 $shortcode_parser
     */
    public function __construct(
        EE_Messages_Queue $generation_queue,
        EE_Messages_Queue $ready_queue,
        EE_Messages_Data_Handler_Collection $data_handler_collection,
        EE_Message_Template_Group_Collection $template_collection,
        EEH_Parse_Shortcodes $shortcode_parser
    ) {
        $this->_generation_queue        = $generation_queue;
        $this->_ready_queue             = $ready_queue;
        $this->_data_handler_collection = $data_handler_collection;
        $this->_template_collection     = $template_collection;
        $this->_shortcode_parser        = $shortcode_parser;
    }


    /**
     * @return EE_Messages_Queue
     */
    public function generation_queue()
    {
        return $this->_generation_queue;
    }


    /**
     *  This iterates through the provided queue and generates the EE_Message objects.
     *  When iterating through the queue, the queued item that served as the base for generating other EE_Message
     *  objects gets removed and the new EE_Message objects get added to a NEW queue.  The NEW queue is then returned
     *  for the caller to decide what to do with it.
     *
     * @param   bool $save Whether to save the EE_Message objects in the new queue or just return.
     * @return EE_Messages_Queue The new queue for holding generated EE_Message objects.
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generate($save = true)
    {
        // iterate through the messages in the queue, generate, and add to new queue.
        $this->_generation_queue->get_message_repository()->rewind();
        while ($this->_generation_queue->get_message_repository()->valid()) {
            // reset "current" properties
            $this->_reset_current_properties();

            /** @type EE_Message $msg */
            $msg = $this->_generation_queue->get_message_repository()->current();

            /**
             * need to get the next object and capture it for setting manually after deletes.  The reason is that when
             * an object is removed from the repo then valid for the next object will fail.
             */
            $this->_generation_queue->get_message_repository()->next();
            $next_msg = $this->_generation_queue->get_message_repository()->current();
            // restore pointer to current item
            $this->_generation_queue->get_message_repository()->set_current($msg);

            // skip and delete if the current $msg is NOT incomplete (queued for generation)
            if ($msg->STS_ID() !== EEM_Message::status_incomplete) {
                // we keep this item in the db just remove from the repo.
                $this->_generation_queue->get_message_repository()->remove($msg);
                // next item
                $this->_generation_queue->get_message_repository()->set_current($next_msg);
                continue;
            }

            if ($this->_verify()) {
                // let's get generating!
                $this->_generate();
            }

            // don't persist debug_only messages if the messages system is not in debug mode.
            if ($msg->STS_ID() === EEM_Message::status_debug_only
                && ! EEM_Message::debug()
            ) {
                do_action(
                    'AHEE__EE_Messages_Generator__generate__before_debug_delete',
                    $msg,
                    $this->_error_msg,
                    $this->_current_messenger,
                    $this->_current_message_type,
                    $this->_current_data_handler
                );
                $this->_generation_queue->get_message_repository()->delete();
                $this->_generation_queue->get_message_repository()->set_current($next_msg);
                continue;
            }

            // if there are error messages then let's set the status and the error message.
            if ($this->_error_msg) {
                // if the status is already debug only, then let's leave it at that.
                if ($msg->STS_ID() !== EEM_Message::status_debug_only) {
                    $msg->set_STS_ID(EEM_Message::status_failed);
                }
                do_action(
                    'AHEE__EE_Messages_Generator__generate__processing_failed_message',
                    $msg,
                    $this->_error_msg,
                    $this->_current_messenger,
                    $this->_current_message_type,
                    $this->_current_data_handler
                );
                $msg->set_error_message(
                    esc_html__('Message failed to generate for the following reasons: ', 'event_espresso')
                    . "\n"
                    . implode("\n", $this->_error_msg)
                );
                $msg->set_modified(time());
            } else {
                do_action(
                    'AHEE__EE_Messages_Generator__generate__before_successful_generated_message_delete',
                    $msg,
                    $this->_error_msg,
                    $this->_current_messenger,
                    $this->_current_message_type,
                    $this->_current_data_handler
                );
                // remove from db
                $this->_generation_queue->get_message_repository()->delete();
            }
            // next item
            $this->_generation_queue->get_message_repository()->set_current($next_msg);
        }

        // generation queue is ALWAYS saved to record any errors in the generation process.
        $this->_generation_queue->save();

        /**
         * save _ready_queue if flag set.
         * Note: The EE_Message objects have values set via the EE_Base_Class::set_field_or_extra_meta() method.  This
         * means if a field was added that is not a valid database column.  The EE_Message was already saved to the db
         * so a EE_Extra_Meta entry could be created and attached to the EE_Message.  In those cases the save flag is
         * irrelevant.
         */
        if ($save) {
            $this->_ready_queue->save();
        }

        // final reset of properties
        $this->_reset_current_properties();

        return $this->_ready_queue;
    }


    /**
     * This resets all the properties used for holding "current" values corresponding to the current EE_Message object
     * in the generation queue.
     */
    protected function _reset_current_properties()
    {
        $this->_verified = false;
        // make sure any _data value in the current message type is reset
        if ($this->_current_message_type instanceof EE_message_type) {
            $this->_current_message_type->reset_data();
        }
        $this->_current_messenger = $this->_current_message_type = $this->_current_data_handler = null;
    }


    /**
     * This proceeds with the actual generation of a message.  By the time this is called, there should already be a
     * $_current_data_handler set and all incoming information should be validated for the current EE_Message in the
     * _generating_queue.
     *
     * @return bool Whether the message was successfully generated or not.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    protected function _generate()
    {
        // double check verification has run and that everything is ready to work with (saves us having to validate
        // everything again).
        if (! $this->_verified) {
            return false; // get out because we don't have a valid setup to work with.
        }


        try {
            $addressees = $this->_current_message_type->get_addressees(
                $this->_current_data_handler,
                $this->_generation_queue->get_message_repository()->current()->context()
            );
        } catch (EE_Error $e) {
            $this->_error_msg[] = $e->getMessage();
            return false;
        }


        // if no addressees then get out because there is nothing to generation (possible bad data).
        if (! $this->_valid_addressees($addressees)) {
            do_action(
                'AHEE__EE_Messages_Generator___generate__invalid_addressees',
                $this->_generation_queue->get_message_repository()->current(),
                $addressees,
                $this->_current_messenger,
                $this->_current_message_type,
                $this->_current_data_handler
            );
            $this->_generation_queue->get_message_repository()->current()->set_STS_ID(
                EEM_Message::status_debug_only
            );
            $this->_error_msg[] = esc_html__(
                'This is not a critical error but an informational notice. Unable to generate messages EE_Messages_Addressee objects.  There were no attendees prepared by the data handler. Sometimes this is because messages only get generated for certain registration statuses. For example, the ticket notice message type only goes to approved registrations.',
                'event_espresso'
            );
            return false;
        }

        $message_template_group = $this->_get_message_template_group();

        // in the unlikely event there is no EE_Message_Template_Group available, get out!
        if (! $message_template_group instanceof EE_Message_Template_Group) {
            $this->_error_msg[] = esc_html__(
                'Unable to get the Message Templates for the Message being generated.  No message template group accessible.',
                'event_espresso'
            );
            return false;
        }

        // get formatted templates for using to parse and setup EE_Message objects.
        $templates = $this->_get_templates($message_template_group);


        // setup new EE_Message objects (and add to _ready_queue)
        return $this->_assemble_messages($addressees, $templates, $message_template_group);
    }


    /**
     * Retrieves the message template group being used for generating messages.
     * Note: this also utilizes the EE_Message_Template_Group_Collection to avoid having to hit the db multiple times.
     *
     * @return EE_Message_Template_Group|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    protected function _get_message_template_group()
    {
        // first see if there is a specific message template group requested (current message in the queue has a specific
        // GRP_ID
        $message_template_group = $this->_specific_message_template_group_from_queue();
        if ($message_template_group instanceof EE_Message_Template_Group) {
            return $message_template_group;
        }

        // get event_ids from the datahandler so we can check to see if there's already a message template group for them
        // in the collection.
        $event_ids              = $this->_get_event_ids_from_current_data_handler();
        $message_template_group = $this->_template_collection->get_by_key(
            $this->_template_collection->getKey(
                $this->_current_messenger->name,
                $this->_current_message_type->name,
                $event_ids
            )
        );

        // if we have a message template group then no need to hit the database, just return it.
        if ($message_template_group instanceof EE_Message_Template_Group) {
            return $message_template_group;
        }

        // okay made it here, so let's get the global group first for this messenger and message type to ensure
        // there is no override set.
        $global_message_template_group =
            $this->_get_global_message_template_group_for_current_messenger_and_message_type();

        if ($global_message_template_group instanceof EE_Message_Template_Group
            && $global_message_template_group->get('MTP_is_override')
        ) {
            return $global_message_template_group;
        }

        // if we're still here, that means there was no message template group for the events in the collection and
        // the global message template group for the messenger and message type is not set for override.  So next step is
        // to see if there is a common shared custom message template group for this set of events.
        $message_template_group = $this->_get_shared_message_template_for_events($event_ids);
        if ($message_template_group instanceof EE_Message_Template_Group) {
            return $message_template_group;
        }

        // STILL here?  Okay that means the fallback is to just use the global message template group for this event set.
        // So we'll cache the global group for this event set (so this logic doesn't have to be repeated in this request)
        // and return it.
        if ($global_message_template_group instanceof EE_Message_Template_Group) {
            $this->_template_collection->add(
                $global_message_template_group,
                $event_ids
            );
            return $global_message_template_group;
        }

        // if we land here that means there's NO active message template group for this set.
        // TODO this will be a good target for some optimization down the road.  Whenever there is no active message
        // template group for a given event set then cache that result so we don't repeat the logic.  However, for now,
        // this should likely bit hit rarely enough that it's not a significant issue.
        return null;
    }


    /**
     * This checks the current message in the queue and determines if there is a specific Message Template Group
     * requested for that message.
     *
     * @return EE_Message_Template_Group|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    protected function _specific_message_template_group_from_queue()
    {
        // is there a GRP_ID already on the EE_Message object?  If there is, then a specific template has been requested
        // so let's use that.
        $GRP_ID = $this->_generation_queue->get_message_repository()->current()->GRP_ID();

        if ($GRP_ID) {
            // attempt to retrieve from repo first
            $message_template_group = $this->_template_collection->get_by_ID($GRP_ID);
            if ($message_template_group instanceof EE_Message_Template_Group) {
                return $message_template_group;  // got it!
            }

            // nope don't have it yet.  Get from DB then add to repo if its not here, then that means the current GRP_ID
            // is not valid, so we'll continue on in the code assuming there's NO GRP_ID.
            $message_template_group = EEM_Message_Template_Group::instance()->get_one_by_ID($GRP_ID);
            if ($message_template_group instanceof EE_Message_Template_Group) {
                $this->_template_collection->add($message_template_group);
                return $message_template_group;
            }
        }
        return null;
    }


    /**
     * Returns whether the event ids passed in all share the same message template group for the current message type
     * and messenger.
     *
     * @param array $event_ids
     * @return bool true means they DO share the same message template group, false means they don't.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    protected function _queue_shares_same_message_template_group_for_events(array $event_ids)
    {
        foreach ($this->_current_data_handler->events as $event) {
            $event_ids[ $event['ID'] ] = $event['ID'];
        }
        $count_of_message_template_groups = EEM_Message_Template_Group::instance()->count(
            array(
                array(
                    'Event.EVT_ID'           => array('IN', $event_ids),
                    'MTP_messenger'    => $this->_current_messenger->name,
                    'MTP_message_type' => $this->_current_message_type->name,
                ),
            ),
            'GRP_ID',
            true
        );
        return $count_of_message_template_groups === 1;
    }


    /**
     * This will get the shared message template group for events that are in the current data handler but ONLY if
     * there's a single shared message template group among all the events.  Otherwise it returns null.
     *
     * @param array $event_ids
     * @return EE_Message_Template_Group|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    protected function _get_shared_message_template_for_events(array $event_ids)
    {
        $message_template_group = null;
        if ($this->_queue_shares_same_message_template_group_for_events($event_ids)) {
            $message_template_group = EEM_Message_Template_Group::instance()->get_one(
                array(
                    array(
                        'Event.EVT_ID'           => array('IN', $event_ids),
                        'MTP_messenger'    => $this->_current_messenger->name,
                        'MTP_message_type' => $this->_current_message_type->name,
                        'MTP_is_active'    => true,
                    ),
                    'group_by' => 'GRP_ID',
                )
            );
            // store this in the collection if its valid
            if ($message_template_group instanceof EE_Message_Template_Group) {
                $this->_template_collection->add(
                    $message_template_group,
                    $event_ids
                );
            }
        }
        return $message_template_group;
    }


    /**
     * Retrieves the global message template group for the current messenger and message type.
     *
     * @return EE_Message_Template_Group|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    protected function _get_global_message_template_group_for_current_messenger_and_message_type()
    {
        // first check the collection (we use an array with 0 in it to represent global groups).
        $global_message_template_group = $this->_template_collection->get_by_key(
            $this->_template_collection->getKey(
                $this->_current_messenger->name,
                $this->_current_message_type->name,
                array(0)
            )
        );

        // if we don't have a group lets hit the db.
        if (! $global_message_template_group instanceof EE_Message_Template_Group) {
            $global_message_template_group = EEM_Message_Template_Group::instance()->get_one(
                array(
                    array(
                        'MTP_messenger'    => $this->_current_messenger->name,
                        'MTP_message_type' => $this->_current_message_type->name,
                        'MTP_is_active'    => true,
                        'MTP_is_global'    => true,
                    ),
                )
            );
            // if we have a group, add it to the collection.
            if ($global_message_template_group instanceof EE_Message_Template_Group) {
                $this->_template_collection->add(
                    $global_message_template_group,
                    array(0)
                );
            }
        }
        return $global_message_template_group;
    }


    /**
     * Returns an array of event ids for all the events within the current data handler.
     *
     * @return array
     */
    protected function _get_event_ids_from_current_data_handler()
    {
        $event_ids = array();
        foreach ($this->_current_data_handler->events as $event) {
            $event_ids[ $event['ID'] ] = $event['ID'];
        }
        return $event_ids;
    }


    /**
     *  Retrieves formatted array of template information for each context specific to the given
     *  EE_Message_Template_Group
     *
     * @param EE_Message_Template_Group $message_template_group
     * @return array The returned array is in this structure:
     *                          array(
     *                          'field_name' => array(
     *                          'context' => 'content'
     *                          )
     *                          )
     * @throws EE_Error
     */
    protected function _get_templates(EE_Message_Template_Group $message_template_group)
    {
        $templates         = array();
        $context_templates = $message_template_group->context_templates();
        foreach ($context_templates as $context => $template_fields) {
            foreach ($template_fields as $template_field => $template_obj) {
                if (! $template_obj instanceof EE_Message_Template) {
                    continue;
                }
                $templates[ $template_field ][ $context ] = $template_obj->get('MTP_content');
            }
        }
        return $templates;
    }


    /**
     * Assembles new fully generated EE_Message objects and adds to _ready_queue
     *
     * @param array                     $addressees  Array of EE_Messages_Addressee objects indexed by message type
     *                                               context.
     * @param array                     $templates   formatted array of templates used for parsing data.
     * @param EE_Message_Template_Group $message_template_group
     * @return bool true if message generation went a-ok.  false if some sort of exception occurred.  Note: The
     *                                               method will attempt to generate ALL EE_Message objects and add to
     *                                               the _ready_queue.  Successfully generated messages get added to the
     *                                               queue with EEM_Message::status_idle, unsuccessfully generated
     *                                               messages will get added to the queue as EEM_Message::status_failed.
     *                                               Very rarely should "false" be returned from this method.
     * @throws EE_Error
     */
    protected function _assemble_messages($addressees, $templates, EE_Message_Template_Group $message_template_group)
    {

        // if templates are empty then get out because we can't generate anything.
        if (! $templates) {
            $this->_error_msg[] = esc_html__(
                'Unable to assemble messages because there are no templates retrieved for generating the messages with',
                'event_espresso'
            );
            return false;
        }

        // We use this as the counter for generated messages because don't forget we may be executing this inside of a
        // generation_queue.  So _ready_queue may have generated EE_Message objects already.
        $generated_count = 0;
        foreach ($addressees as $context => $recipients) {
            foreach ($recipients as $recipient) {
                $message = $this->_setup_message_object($context, $recipient, $templates, $message_template_group);
                if ($message instanceof EE_Message) {
                    $this->_ready_queue->add(
                        $message,
                        array(),
                        $this->_generation_queue->get_message_repository()->is_preview(),
                        $this->_generation_queue->get_message_repository()->is_test_send()
                    );
                    $generated_count++;
                }

                // if the current MSG being generated is for a test send then we'll only use ONE message in the
                // generation.
                if ($this->_generation_queue->get_message_repository()->is_test_send()) {
                    break 2;
                }
            }
        }

        // if there are no generated messages then something else fatal went wrong.
        return $generated_count > 0;
    }


    /**
     * @param string                    $context   The context for the generated message.
     * @param EE_Messages_Addressee     $recipient
     * @param array                     $templates formatted array of templates used for parsing data.
     * @param EE_Message_Template_Group $message_template_group
     * @return bool|EE_Message
     * @throws EE_Error
     */
    protected function _setup_message_object(
        $context,
        EE_Messages_Addressee $recipient,
        $templates,
        EE_Message_Template_Group $message_template_group
    ) {
        // stuff we already know
        $transaction_id = $recipient->txn instanceof EE_Transaction ? $recipient->txn->ID() : 0;
        $transaction_id = empty($transaction_id) && $this->_current_data_handler->txn instanceof EE_Transaction
            ? $this->_current_data_handler->txn->ID()
            : $transaction_id;
        $message_fields = array(
            'GRP_ID'           => $message_template_group->ID(),
            'TXN_ID'           => $transaction_id,
            'MSG_messenger'    => $this->_current_messenger->name,
            'MSG_message_type' => $this->_current_message_type->name,
            'MSG_context'      => $context,
        );

        // recipient id and type should be on the EE_Messages_Addressee object but if this is empty, let's try to grab
        // the info from the att_obj found in the EE_Messages_Addressee object.
        if (empty($recipient->recipient_id) || empty($recipient->recipient_type)) {
            $message_fields['MSG_recipient_ID']   = $recipient->att_obj instanceof EE_Attendee
                ? $recipient->att_obj->ID()
                : 0;
            $message_fields['MSG_recipient_type'] = 'Attendee';
        } else {
            $message_fields['MSG_recipient_ID']   = $recipient->recipient_id;
            $message_fields['MSG_recipient_type'] = $recipient->recipient_type;
        }
        $message = EE_Message_Factory::create($message_fields);

        // grab valid shortcodes for shortcode parser
        $mt_shortcodes = $this->_current_message_type->get_valid_shortcodes();
        $m_shortcodes  = $this->_current_messenger->get_valid_shortcodes();

        // if the 'to' field is empty or the context is inactive we skip EXCEPT if we're previewing
        if ((
                (
                    empty($templates['to'][ $context ])
                    && ! $this->_current_messenger->allow_empty_to_field()
                )
                || ! $message_template_group->is_context_active($context)
            )
            && ! $this->_generation_queue->get_message_repository()->is_preview()
        ) {
            // we silently exit here and do NOT record a fail because the message is "turned off" by having no "to"
            // field.
            return false;
        }
        $error_msg = array();
        foreach ($templates as $field => $field_context) {
            $error_msg = array();
            // let's setup the valid shortcodes for the incoming context.
            $valid_shortcodes = $mt_shortcodes[ $context ];
            // merge in valid shortcodes for the field.
            $shortcodes = isset($m_shortcodes[ $field ]) ? $m_shortcodes[ $field ] : $valid_shortcodes;
            if (isset($templates[ $field ][ $context ])) {
                // prefix field.
                $column_name = 'MSG_' . $field;
                try {
                    $content = $this->_shortcode_parser->parse_message_template(
                        $templates[ $field ][ $context ],
                        $recipient,
                        $shortcodes,
                        $this->_current_message_type,
                        $this->_current_messenger,
                        $message
                    );
                    // the model field removes slashes when setting (usually necessary when the input is from the
                    // request) but this value is from another model and has no slashes. So add them so it matchces
                    // what the field expected (otherwise slashes will have been stripped from this an extra time)
                    $message->set_field_or_extra_meta($column_name, addslashes($content));
                } catch (EE_Error $e) {
                    $error_msg[] = sprintf(
                        esc_html__(
                            'There was a problem generating the content for the field %s: %s',
                            'event_espresso'
                        ),
                        $field,
                        $e->getMessage()
                    );
                    $message->set_STS_ID(EEM_Message::status_failed);
                }
            }
        }

        if ($message->STS_ID() === EEM_Message::status_failed) {
            $error_msg = esc_html__('There were problems generating this message:', 'event_espresso')
                         . "\n"
                         . implode("\n", $error_msg);
            $message->set_error_message($error_msg);
        } else {
            $message->set_STS_ID(EEM_Message::status_idle);
        }
        return $message;
    }


    /**
     * This verifies that the incoming array has a EE_messenger object and a EE_message_type object and sets appropriate
     * error message if either is missing.
     *
     * @return bool true means there were no errors, false means there were errors.
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _verify()
    {
        // reset error message to an empty array.
        $this->_error_msg = array();
        $valid            = true;
        $valid            = $valid ? $this->_validate_messenger_and_message_type() : $valid;
        $valid            = $valid ? $this->_validate_and_setup_data() : $valid;

        // set the verified flag so we know everything has been validated.
        $this->_verified = $valid;

        return $valid;
    }


    /**
     * This accepts an array and validates that it is an array indexed by context with each value being an array of
     * EE_Messages_Addressee objects.
     *
     * @param array $addressees Keys correspond to contexts for the message type and values are EE_Messages_Addressee[]
     * @return bool
     */
    protected function _valid_addressees($addressees)
    {
        if (! $addressees || ! is_array($addressees)) {
            return false;
        }

        foreach ($addressees as $addressee_array) {
            foreach ($addressee_array as $addressee) {
                if (! $addressee instanceof EE_Messages_Addressee) {
                    return false;
                }
            }
        }
        return true;
    }


    /**
     * This validates the messenger, message type, and presences of generation data for the current EE_Message in the
     * queue. This process sets error messages if something is wrong.
     *
     * @return bool   true is if there are no errors.  false is if there is.
     */
    protected function _validate_messenger_and_message_type()
    {

        // first are there any existing error messages?  If so then return.
        if ($this->_error_msg) {
            return false;
        }
        /** @type EE_Message $message */
        $message = $this->_generation_queue->get_message_repository()->current();
        try {
            $this->_current_messenger = $message->valid_messenger(true)
                ? $message->messenger_object()
                : null;
        } catch (Exception $e) {
            $this->_error_msg[] = $e->getMessage();
        }
        try {
            $this->_current_message_type = $message->valid_message_type(true)
                ? $message->message_type_object()
                : null;
        } catch (Exception $e) {
            $this->_error_msg[] = $e->getMessage();
        }

        /**
         * Check if there is any generation data, but only if this is not for a preview.
         */
        if (! $this->_generation_queue->get_message_repository()->get_generation_data()
            && (
                ! $this->_generation_queue->get_message_repository()->is_preview()
                && $this->_generation_queue->get_message_repository()->get_data_handler()
                   !== 'EE_Messages_Preview_incoming_data'
            )
        ) {
            $this->_error_msg[] = esc_html__(
                'There is no generation data for this message. Unable to generate.',
                'event_espresso'
            );
        }

        return empty($this->_error_msg);
    }


    /**
     * This method retrieves the expected data handler for the message type and validates the generation data for that
     * data handler.
     *
     * @return bool true means there are no errors.  false means there were errors (and handler did not get setup).
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _validate_and_setup_data()
    {

        // First, are there any existing error messages?  If so, return because if there were errors elsewhere this can't
        // be used anyways.
        if ($this->_error_msg) {
            return false;
        }

        $generation_data = $this->_generation_queue->get_message_repository()->get_generation_data();

        /** @type EE_Messages_incoming_data $data_handler_class_name - well not really... just the class name actually*/
        $data_handler_class_name = $this->_generation_queue->get_message_repository()->get_data_handler()
            ? $this->_generation_queue->get_message_repository()->get_data_handler()
            : 'EE_Messages_' . $this->_current_message_type->get_data_handler($generation_data) . '_incoming_data';

        // If this EE_Message is for a preview, then let's switch out to the preview data handler.
        if ($this->_generation_queue->get_message_repository()->is_preview()) {
            $data_handler_class_name = 'EE_Messages_Preview_incoming_data';
        }

        // First get the class name for the data handler (and also verifies it exists.
        if (! class_exists($data_handler_class_name)) {
            $this->_error_msg[] = sprintf(
                esc_html__(
                    'The included data handler class name does not match any valid, accessible, "%1$s" classes.  Looking for %2$s.',
                    'event_espresso'
                ),
                'EE_Messages_incoming_data',
                $data_handler_class_name
            );
            return false;
        }

        // convert generation_data for data_handler_instantiation.
        $generation_data = $data_handler_class_name::convert_data_from_persistent_storage($generation_data);

        // note, this may set error messages as well.
        $this->_set_data_handler($generation_data, $data_handler_class_name);

        return empty($this->_error_msg);
    }


    /**
     * Sets the $_current_data_handler property that is used for generating the current EE_Message in the queue, and
     * adds it to the _data repository.
     *
     * @param mixed  $generating_data           This is data expected by the instantiated data handler.
     * @param string $data_handler_class_name   This is the reference string indicating what data handler is being
     *                                          instantiated.
     * @return void .
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _set_data_handler($generating_data, $data_handler_class_name)
    {
        // valid classname for the data handler.  Now let's setup the key for the data handler repository to see if there
        // is already a ready data handler in the repository.
        $this->_current_data_handler = $this->_data_handler_collection->get_by_key(
            $this->_data_handler_collection->get_key(
                $data_handler_class_name,
                $generating_data
            )
        );
        if (! $this->_current_data_handler instanceof EE_Messages_incoming_data) {
            // no saved data_handler in the repo so let's set one up and add it to the repo.
            try {
                $this->_current_data_handler = new $data_handler_class_name($generating_data);
                $this->_data_handler_collection->add($this->_current_data_handler, $generating_data);
            } catch (EE_Error $e) {
                $this->_error_msg[] = $e->get_error();
            }
        }
    }


    /**
     * The queued EE_Message for generation does not save the data used for generation as objects
     * because serialization of those objects could be problematic if the data is saved to the db.
     * So this method calls the static method on the associated data_handler for the given message_type
     * and that preps the data for later instantiation when generating.
     *
     * @param EE_Message_To_Generate $message_to_generate
     * @param bool                   $preview Indicate whether this is being used for a preview or not.
     * @return mixed Prepped data for persisting to the queue.  false is returned if unable to prep data.
     */
    protected function _prepare_data_for_queue(EE_Message_To_Generate $message_to_generate, $preview)
    {
        /** @type EE_Messages_incoming_data $data_handler - well not really... just the class name actually */
        $data_handler = $message_to_generate->get_data_handler_class_name($preview);
        if (! $message_to_generate->valid()) {
            return false; // unable to get the data because the info in the EE_Message_To_Generate class is invalid.
        }
        return $data_handler::convert_data_for_persistent_storage($message_to_generate->data());
    }


    /**
     * This sets up a EEM_Message::status_incomplete EE_Message object and adds it to the generation queue.
     *
     * @param EE_Message_To_Generate $message_to_generate
     * @param bool                   $test_send Whether this is just a test send or not.  Typically used for previews.
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function create_and_add_message_to_queue(EE_Message_To_Generate $message_to_generate, $test_send = false)
    {
        // prep data
        $data = $this->_prepare_data_for_queue($message_to_generate, $message_to_generate->preview());

        $message = $message_to_generate->get_EE_Message();

        // is there a GRP_ID in the request?
        if ($GRP_ID = EE_Registry::instance()->REQ->get('GRP_ID')) {
            $message->set_GRP_ID($GRP_ID);
        }

        if ($data === false) {
            $message->set_STS_ID(EEM_Message::status_failed);
            $message->set_error_message(
                esc_html__(
                    'Unable to prepare data for persistence to the database.',
                    'event_espresso'
                )
            );
        } else {
            // make sure that the data handler is cached on the message as well
            $data['data_handler_class_name'] = $message_to_generate->get_data_handler_class_name();
        }

        $this->_generation_queue->add($message, $data, $message_to_generate->preview(), $test_send);
    }
}
