<?php

/**
 * Used to initialize all EE messages caffeinated functionality.
 *
 * @package          Event Espresso
 * @subpackage       messages
 * @since            4.3.2
 * @author           Darren Ethier
 */
class EE_Caf_Messages
{
    /**
     * Contains all the hooks and filters for setting up caffeinated messages functionality.
     */
    public function __construct()
    {
        add_filter('FHEE__EED_Messages___set_messages_paths___MSG_PATHS', [$this, 'messages_autoload_paths'], 5);
        add_filter(
            'FHEE__EE_Email_messenger__get_validator_config',
            [$this, 'email_messenger_validator_config'],
            5
        );
        add_filter(
            'FHEE__EE_Email_messenger__get_template_fields',
            [$this, 'email_messenger_template_fields'],
            5
        );
        add_filter(
            'FHEE__EE_Html_messenger__get_template_fields',
            [$this, 'html_messenger_template_fields'],
            5
        );
        add_filter(
            'FHEE__EE_Html_messenger__get_validator_config',
            [$this, 'html_messenger_validator_config'],
            5
        );
        add_filter(
            'FHEE__EE_Pdf_messenger__get_template_fields',
            [$this, 'pdf_messenger_template_fields'],
            5
        );
        add_filter(
            'FHEE__EE_Pdf_messenger__get_validator_config',
            [$this, 'pdf_messenger_validator_config'],
            5
        );
        add_filter(
            'FHEE__EE_Messages_Template_Pack__get_specific_template__contents',
            [$this, 'new_default_templates'],
            5,
            7
        );
        add_filter(
            'FHEE__EE_Messages_Base__get_valid_shortcodes',
            [$this, 'message_types_valid_shortcodes'],
            5,
            2
        );

        // shortcode parsers
        add_filter(
            'FHEE__EE_Attendee_Shortcodes__shortcodes',
            [$this, 'additional_attendee_shortcodes'],
            5
        );
        add_filter(
            'FHEE__EE_Attendee_Shortcodes__parser_after',
            [$this, 'additional_attendee_parser'],
            5,
            4
        );
        add_filter(
            'FHEE__EE_Recipient_List_Shortcodes__shortcodes',
            [$this, 'additional_recipient_details_shortcodes'],
            5
        );
        add_filter(
            'FHEE__EE_Recipient_List_Shortcodes__parser_after',
            [$this, 'additional_recipient_details_parser'],
            5,
            5
        );
        add_filter(
            'FHEE__EE_Primary_Registration_List_Shortcodes__shortcodes',
            [$this, 'additional_primary_registration_details_shortcodes'],
            5
        );
        add_filter(
            'FHEE__EE_Primary_Registration_List_Shortcodes__parser_after',
            [$this, 'additional_primary_registration_details_parser'],
            5,
            5
        );

        /**
         * @since 4.2.0
         */
        add_filter('FHEE__EE_Datetime_Shortcodes__shortcodes', [$this, 'additional_datetime_shortcodes']);
        add_filter(
            'FHEE__EE_Datetime_Shortcodes__parser_after',
            [$this, 'additional_datetime_parser'],
            10,
            3
        );

        /**
         * @since 4.3.0
         */
        // eat our own dog food!
        add_action('EE_Brewing_Regular___messages_caf', [$this, 'register_caf_message_types']);
        add_action('EE_Brewing_Regular___messages_caf', [$this, 'register_caf_shortcodes']);
        do_action('EE_Brewing_Regular___messages_caf');
    }


    /**
     * This just allows us to add additional paths to the autoloader (EED_Messages::autoload_messages()) for the
     * messages' system.
     *
     * @param array $dir_ref original array of paths
     *
     * @return array           appended paths
     */
    public function messages_autoload_paths(array $dir_ref): array
    {
        $dir_ref[] = EE_CAF_LIBRARIES . 'shortcodes/';

        return $dir_ref;
    }


    public function email_messenger_validator_config($validator_config): array
    {
        $validator_config['attendee_list'] = [
            'shortcodes' => ['attendee', 'event_list', 'ticket_list', 'question_list'],
            'required'   => ['[ATTENDEE_LIST]'],
        ];
        $validator_config['question_list'] = [
            'shortcodes' => ['question'],
            'required'   => ['[QUESTION_LIST]'],
        ];

        return $validator_config;
    }


    public function html_messenger_validator_config($validator_config): array
    {
        $validator_config['attendee_list'] = [
            'shortcodes' => ['attendee', 'question_list'],
            'required'   => ['[ATTENDEE_LIST]'],
        ];
        $validator_config['question_list'] = [
            'shortcodes' => ['question'],
            'required'   => ['[QUESTION_LIST]'],
        ];

        return $validator_config;
    }


    public function pdf_messenger_validator_config($validator_config): array
    {
        $validator_config['attendee_list'] = [
            'shortcodes' => ['attendee', 'event_list', 'ticket_list', 'question_list'],
            'required'   => ['[ATTENDEE_LIST]'],
        ];
        $validator_config['question_list'] = [
            'shortcodes' => ['question'],
            'required'   => ['[QUESTION_LIST]'],
        ];

        return $validator_config;
    }


    public function email_messenger_template_fields($template_fields): array
    {
        $template_fields['extra']['content']['question_list'] = [
            'input'               => 'textarea',
            'label'               => '[QUESTION_LIST]',
            'type'                => 'string',
            'required'            => false,
            'validation'          => true,
            'format'              => '%s',
            'css_class'           => 'large-text',
            'rows'                => '5',
            'shortcodes_required' => ['[QUESTION_LIST]'],
        ];

        return $template_fields;
    }


    public function html_messenger_template_fields($template_fields): array
    {
        $template_fields['extra']['content']['question_list'] = [
            'input'               => 'textarea',
            'label'               => '[QUESTION_LIST]',
            'type'                => 'string',
            'required'            => false,
            'validation'          => true,
            'format'              => '%s',
            'css_class'           => 'large-text',
            'rows'                => '5',
            'shortcodes_required' => ['[QUESTION_LIST]'],
        ];

        return $template_fields;
    }


    public function pdf_messenger_template_fields($template_fields): array
    {
        $template_fields['extra']['content']['question_list'] = [
            'input'               => 'textarea',
            'label'               => '[QUESTION_LIST]',
            'type'                => 'string',
            'required'            => false,
            'validation'          => true,
            'format'              => '%s',
            'css_class'           => 'large-text',
            'rows'                => '5',
            'shortcodes_required' => ['[QUESTION_LIST]'],
        ];

        return $template_fields;
    }


    public function new_default_templates(
        string $contents,
        string $actual_path,
        EE_messenger $messenger,
        EE_message_type $message_type,
        string $field,
        string $context,
        EE_Messages_Template_Pack $template_pack
    ): string {
        // we're only modifying templates for the default template pack
        if (! $template_pack instanceof EE_Messages_Template_Pack_Default) {
            return $contents;
        }

        // the template file name we're replacing contents for.
        $template_file_prefix = $field . '_' . $context;
        $msg_prefix           = $messenger->name . '_' . $message_type->name . '_';

        $base_path = EE_CAF_LIBRARIES . 'messages/defaults/default/';

        if ($messenger->name == 'email' && $message_type->name == 'registration') {
            switch ($template_file_prefix) {
                case 'question_list_admin':
                case 'question_list_attendee':
                case 'question_list_primary_attendee':
                    $path     = $base_path . $msg_prefix . 'question_list.template.php';
                    $contents = EEH_Template::display_template($path, [], true);
                    break;

                case 'attendee_list_primary_attendee':
                    $path     = $base_path . $msg_prefix . 'attendee_list.template.php';
                    $contents = EEH_Template::display_template($path, [], true);
                    break;

                case 'attendee_list_admin':
                    $path     = $base_path . $msg_prefix . 'attendee_list_admin.template.php';
                    $contents = EEH_Template::display_template(
                        $path,
                        [],
                        true
                    );
                    break;

                case 'attendee_list_attendee':
                    $contents = '';
                    break;

                case 'event_list_attendee':
                    $path     = $base_path . $msg_prefix . 'event_list_attendee.template.php';
                    $contents = EEH_Template::display_template($path, [], true);
                    break;
            }
        } elseif ($messenger->name == 'email' && $message_type->name == 'newsletter') {
            switch ($template_file_prefix) {
                case 'content_attendee':
                    $path     = $base_path . $msg_prefix . 'content.template.php';
                    $contents = EEH_Template::display_template($path, [], true);
                    break;

                case 'newsletter_content_attendee':
                    $path     = $base_path . $msg_prefix . 'newsletter_content.template.php';
                    $contents = EEH_Template::display_template($path, [], true);
                    break;

                case 'newsletter_subject_attendee':
                    $path     = $base_path . $msg_prefix . 'subject.template.php';
                    $contents = EEH_Template::display_template($path, [], true);
                    break;
            }
        } elseif (
            $messenger->name == 'html'
            && $message_type->name == 'receipt'
            && $template_file_prefix == 'attendee_list_purchaser'
        ) {
            $path     = $base_path . $msg_prefix . 'attendee_list.template.php';
            $contents = EEH_Template::display_template($path, [], true);
        }

        return $contents;
    }


    public function message_types_valid_shortcodes(array $valid_shortcodes, EE_Messages_Base $msg): array
    {
        // make sure question_list and question are ONLY added for the core message types.
        // any other message types will have to explicitly set question_list as a valid shortcode.
        $include_with = [
            'registration',
            'cancelled_registration',
            'declined_registration',
            'not_approved_registration',
            'payment_declined',
            'payment_failed',
            'payment_cancelled',
            'payment',
            'payment_reminder',
            'pending_approval',
            'registration_summary',
            'invoice',
            'receipt',
        ];
        if ($msg instanceof EE_message_type && in_array($msg->name, $include_with)) {
            $contexts = array_keys($msg->get_contexts());
            foreach ($contexts as $context) {
                $valid_shortcodes[ $context ][] = 'question_list';
                $valid_shortcodes[ $context ][] = 'question';
            }
        }

        return $valid_shortcodes;
    }


    public function additional_attendee_shortcodes($shortcodes)
    {
        $shortcodes['[ANSWER_*]'] = esc_html__(
            'This is a special dynamic shortcode. Right after the "*", add the exact text of a existing question, and if there is an answer for that question for this registrant, that will take the place of this shortcode.',
            'event_espresso'
        );

        return $shortcodes;
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function additional_attendee_parser(string $parsed, string $shortcode, $data, $extra_data)
    {
        if (
            strpos($shortcode, '[ANSWER_*') === false
            || ! isset($extra_data['data']->questions)
            || ! isset($extra_data['data']->registrations)
        ) {
            return $parsed;
        }

        // let's get the question from the code.
        $shortcode = str_replace('[ANSWER_*', '', $shortcode);
        $shortcode = trim(str_replace(']', '', $shortcode));

        $registration = $data instanceof EE_Registration ? $data : null;
        $registration = ! $registration instanceof EE_Registration
            && isset($extra_data['data'])
            && $extra_data['data'] instanceof EE_Registration
                ? $extra_data['data']
                : $registration;

        $aee = $data instanceof EE_Messages_Addressee ? $data : null;
        $aee = ! $aee instanceof EE_Messages_Addressee && isset($extra_data['data'])
            ? $extra_data['data']
            : $aee;

        if (! $registration instanceof EE_Registration || ! $aee instanceof EE_Messages_Addressee) {
            return $parsed;
        }

        // now let's figure out which question has this text.
        foreach ($aee->questions as $ANS_ID => $question) {
            if (
                $question instanceof EE_Question
                && trim($question->display_text()) == trim($shortcode)
                && isset($aee->registrations[ $registration->ID() ]['ans_objs'][ $ANS_ID ])
            ) {
                return $aee->registrations[ $registration->ID() ]['ans_objs'][ $ANS_ID ]->get_pretty(
                    'ANS_value',
                    'no_wpautop'
                );
            }
        }

        // nothing!
        return $parsed;
    }


    /**
     * Callback for additional shortcodes filter for adding additional datetime shortcodes.
     *
     * @param array $shortcodes array of shortcodes and descriptions
     * @return array            array of shortcodes and descriptions
     * @since  4.2
     *
     */
    public function additional_datetime_shortcodes(array $shortcodes): array
    {
        $shortcodes['[DTT_NAME]']          = esc_html__(
            'This will be parsed to the Title given for a Datetime',
            'event_espresso'
        );
        $shortcodes['[DTT_DESCRIPTION]']   = esc_html__(
            'This will be parsed to the description for a Datetime',
            'event_espresso'
        );
        $shortcodes['[DTT_NAME_OR_DATES]'] = esc_html__(
            'When parsed, if the Datetime has a name, it is used, otherwise a formatted string including the start date and end date will be used.',
            'event_espresso'
        );

        return $shortcodes;
    }


    /**
     * Callback for additional shortcodes parser filter used for adding parser for new
     * Datetime shortcodes
     *
     * @param string               $parsed    The finished parsed string for the given shortcode.
     * @param string               $shortcode The shortcode being parsed.
     * @param EE_Base_Class|object $data      The incoming data object for the Shortcode Parser.
     * @return string                         The new parsed string.
     * @throws EE_Error
     * @throws ReflectionException
     * @since  4.2
     */
    public function additional_datetime_parser(string $parsed, string $shortcode, $data): string
    {
        if (! $data instanceof EE_Datetime) {
            return ''; // get out because we can only parse with the datetime object.
        }

        switch ($shortcode) {
            case '[DTT_NAME]':
                return $data->name();
            case '[DTT_DESCRIPTION]':
                return $data->description();
            case '[DTT_NAME_OR_DATES]':
                return $data->get_dtt_display_name(true);
            default:
                return $parsed;
        }
    }


    public function additional_recipient_details_shortcodes($shortcodes)
    {
        $shortcodes['[RECIPIENT_QUESTION_LIST]'] = esc_html__(
            'This is used to indicate where you want the list of questions and answers to show for the person receiving the message.',
            'event_espresso'
        );

        return $shortcodes;
    }


    /**
     * Callback for FHEE__EE_Recipient_List_Shortcodes__parser_after filter (dynamic filter).
     *
     * @param string        $parsed           The original parsed content for the shortcode
     * @param string        $shortcode        The shortcode being parsed
     * @param array         $data             The shortcode parser data array
     * @param array         $extra_data       The shortcode parser extra data array
     * @param EE_Shortcodes $shortcode_parser Shortcode parser.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function additional_recipient_details_parser(
        string $parsed,
        string $shortcode,
        array $data,
        array $extra_data,
        EE_Shortcodes $shortcode_parser
    ): string {
        $recipient = $this->getMessageRecipient($parsed, $data, $extra_data);
        if (! $recipient instanceof EE_Messages_Addressee) {
            return $parsed;
        }

        switch ($shortcode) {
            case '[RECIPIENT_QUESTION_LIST]':
                $att                       = $recipient->att_obj;
                $registrations_on_attendee = $att instanceof EE_Attendee
                    ? $recipient->attendees[ $att->ID() ]['reg_objs']
                    : [];
                $registrations_on_attendee = empty($registrations_on_attendee)
                    && $recipient->reg_obj instanceof EE_Registration
                        ? [$recipient->reg_obj]
                        : $registrations_on_attendee;
                $answers                   = [];

                $template         = is_array($data['template']) && isset($data['template']['question_list'])
                    ? $data['template']['question_list']
                    : $extra_data['template']['question_list'];
                $valid_shortcodes = ['question'];

                // if the context is main_content then get all answers for all registrations on this attendee
                if ($data['data'] instanceof EE_Messages_Addressee) {
                    foreach ($registrations_on_attendee as $reg) {
                        if ($reg instanceof EE_Registration) {
                            $ans_objs = ! empty($recipient->registrations[ $reg->ID() ]['ans_objs'])
                                ? $recipient->registrations[ $reg->ID() ]['ans_objs']
                                : [];
                            foreach ($ans_objs as $ans_obj) {
                                if ($ans_obj instanceof EE_Answer) {
                                    $answers[ $ans_obj->ID() ] = $ans_obj;
                                }
                            }
                        }
                    }
                }

                // if the context is the event list parser, then let's return just the answers for all registrations attached to the recipient for that event.
                if ($data['data'] instanceof EE_Event) {
                    $event = $data['data'];
                    foreach ($registrations_on_attendee as $reg) {
                        if ($reg instanceof EE_Registration && $reg->event_ID() == $event->ID()) {
                            $ans_objs = ! empty($recipient->registrations[ $reg->ID() ]['ans_objs'])
                                ? $recipient->registrations[ $reg->ID() ]['ans_objs']
                                : [];
                            foreach ($ans_objs as $ans_obj) {
                                if ($ans_obj instanceof EE_Answer) {
                                    $answers[ $ans_obj->ID() ] = $ans_obj;
                                }
                            }
                        }
                    }
                }

                $questions = $recipient->questions ?? [];

                // if $extra_data does not have a 'data' key then let's make sure we add it and set the EE_Messages_Addressee
                // object on it.
                if (! isset($extra_data['data'])) {
                    $extra_data['data'] = $recipient;
                }

                return $this->_parse_question_list_for_primary_or_recipient_registration(
                    $shortcode_parser,
                    $questions,
                    $answers,
                    $template,
                    $valid_shortcodes,
                    $extra_data
                );

            default:
                return $parsed;
        }
    }


    public function additional_primary_registration_details_shortcodes(array $shortcodes): array
    {
        $shortcodes['[PRIMARY_REGISTRANT_QUESTION_LIST]'] = esc_html__(
            'This is used to indicate the questions and answers for the primary_registrant. It should be placed in the "[attendee_list]" field',
            'event_espresso'
        );
        return $shortcodes;
    }


    /**
     * Callback for FHEE__EE_Primary_Registration_List_Shortcodes__parser_after filter (dynamic filter).
     *
     * @param string        $parsed           The original parsed content for the shortcode
     * @param string        $shortcode        The shortcode being parsed
     * @param array         $data             The shortcode parser data array
     * @param array         $extra_data       The shortcode parser extra data array
     * @param EE_Shortcodes $shortcode_parser Shortcode parser.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function additional_primary_registration_details_parser(
        string $parsed,
        string $shortcode,
        array $data,
        array $extra_data,
        EE_Shortcodes $shortcode_parser
    ): string {
        $recipient = $this->getMessageRecipient($parsed, $data, $extra_data);
        if (! $recipient instanceof EE_Messages_Addressee) {
            return $parsed;
        }

        switch ($shortcode) {
            case '[PRIMARY_REGISTRANT_QUESTION_LIST]':
                if (! $recipient->primary_att_obj instanceof EE_Attendee || ! $recipient->primary_reg_obj instanceof EE_Registration) {
                    return '';
                }
                $registration = $recipient->primary_reg_obj;
                $answers      = isset($recipient->registrations[ $registration->ID() ]['ans_objs'])
                    ? $recipient->registrations[ $registration->ID() ]['ans_objs']
                    : [];
                if (empty($answers)) {
                    return '';
                }
                $template         = is_array($data['template']) && isset($data['template']['question_list'])
                    ? $data['template']['question_list']
                    : $extra_data['template']['question_list'];
                $valid_shortcodes = ['question'];
                $answers          = $recipient->registrations[ $registration->ID() ]['ans_objs'];
                $questions        = $recipient->questions ?? [];
                // if $extra_data does not have a 'data' key then let's make sure we add it and set the EE_Messages_Addressee
                // object on it.
                if (! isset($extra_data['data'])) {
                    $extra_data['data'] = $recipient;
                }
                return $this->_parse_question_list_for_primary_or_recipient_registration(
                    $shortcode_parser,
                    $questions,
                    $answers,
                    $template,
                    $valid_shortcodes,
                    $extra_data
                );

            default:
                return $parsed;
        }
    }


    /**
     * Takes care of registering the message types that are only available in caffeinated EE.
     *
     * @return  void
     * @throws EE_Error
     * @since   4.3.2
     */
    public function register_caf_message_types()
    {
        // register newsletter message type
        EE_Register_Message_Type::register(
            'newsletter',
           [
               'mtfilename'                                       => 'EE_Newsletter_message_type.class.php',
               'autoloadpaths'                                    => [
                   EE_CAF_LIBRARIES . 'messages/message_type/newsletter/'
               ],
               'messengers_to_activate_with'                      => ['email'],
               'messengers_to_validate_with'                      => ['email'],
               'messengers_supporting_default_template_pack_with' => ['email'],
           ]
        );

        // register payment reminder message type
        EE_Register_Message_Type::register(
            'payment_reminder',
            [
                'mtfilename'                                       => 'EE_Payment_Reminder_message_type.class.php',
                'autoloadpaths'                                    => [EE_CAF_LIBRARIES . 'messages/message_type/payment_reminder/'],
                'messengers_to_activate_with'                      => ['email'],
                'messengers_to_validate_with'                      => ['email'],
                'messengers_supporting_default_template_pack_with' => ['email'],
            ]
        );

        // register payment declined message type
        EE_Register_Message_Type::register(
            'payment_declined',
            [
                'mtfilename'                                       => 'EE_Payment_Declined_message_type.class.php',
                'autoloadpaths'                                    => [EE_CAF_LIBRARIES . 'messages/message_type/payment_declined/'],
                'messengers_to_activate_with'                      => ['email'],
                'messengers_to_validate_with'                      => ['email'],
                'messengers_supporting_default_template_pack_with' => ['email'],
            ]
        );

        // register registration declined message type
        EE_Register_Message_Type::register(
            'declined_registration',
            [
                'mtfilename'                                       => 'EE_Declined_Registration_message_type.class.php',
                'autoloadpaths'                                    => [EE_CAF_LIBRARIES . 'messages/message_type/declined_registration/'],
                'messengers_to_activate_with'                      => ['email'],
                'messengers_to_validate_with'                      => ['email'],
                'messengers_supporting_default_template_pack_with' => ['email'],
            ]
        );

        // register registration cancelled message type
        EE_Register_Message_Type::register(
            'cancelled_registration',
            [
                'mtfilename'                                       => 'EE_Cancelled_Registration_message_type.class.php',
                'autoloadpaths'                                    => [EE_CAF_LIBRARIES . 'messages/message_type/cancelled_registration/'],
                'messengers_to_activate_with'                      => ['email'],
                'messengers_to_validate_with'                      => ['email'],
                'messengers_supporting_default_template_pack_with' => ['email'],
            ]
        );

        // register payment failed message type
        EE_Register_Message_Type::register(
            'payment_failed',
            [
                'mtfilename'                                       => 'EE_Payment_Failed_message_type.class.php',
                'autoloadpaths'                                    => [EE_CAF_LIBRARIES . 'messages/message_type/payment_failed/'],
                'messengers_to_activate_with'                      => ['email'],
                'messengers_to_validate_with'                      => ['email'],
                'messengers_supporting_default_template_pack_with' => ['email'],
            ]
        );

        // register payment declined message type
        EE_Register_Message_Type::register(
            'payment_cancelled',
            [
                'mtfilename'                                       => 'EE_Payment_Cancelled_message_type.class.php',
                'autoloadpaths'                                    => [EE_CAF_LIBRARIES . 'messages/message_type/payment_cancelled/'],
                'messengers_to_activate_with'                      => ['email'],
                'messengers_to_validate_with'                      => ['email'],
                'messengers_supporting_default_template_pack_with' => ['email'],
            ]
        );
    }


    /**
     * Takes care of registering the shortcode libraries implemented with caffeinated EE and set up related items.
     *
     * @return void
     * @throws EE_Error
     * @since   4.3.2
     */
    public function register_caf_shortcodes()
    {
        EE_Register_Messages_Shortcode_Library::register(
            'newsletter',
            [
                'autoloadpaths'                 => [EE_CAF_LIBRARIES . 'shortcodes/'],
                'msgr_validator_callback'       => ['EE_Newsletter_Shortcodes', 'messenger_validator_config'],
                'msgr_template_fields_callback' => ['EE_Newsletter_Shortcodes', 'messenger_template_fields'],
                'list_type_shortcodes'          => ['[NEWSLETTER_CONTENT]'],
            ]
        );
    }


    /**
     * Parses a question list shortcode using given data and template
     *
     * @param EE_Shortcodes $shortcode_parser
     * @param EE_Question[] $questions        An array of questions indexed by answer id.
     * @param EE_Answer[]   $answers          An array of answer objects
     * @param string        $template         Template content to be parsed.
     * @param array         $valid_shortcodes Valid shortcodes for the template being parsed.
     * @param array         $extra_data       Extra data that might be used when parsing the template.
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _parse_question_list_for_primary_or_recipient_registration(
        EE_Shortcodes $shortcode_parser,
        array $questions,
        array $answers,
        string $template,
        array $valid_shortcodes,
        array $extra_data
    ): string {
        $question_list    = '';
        $shortcode_helper = $shortcode_parser->get_shortcode_helper();
        foreach ($answers as $answer) {
            if ($answer instanceof EE_Answer) {
                // first see if the question is in our $questions array.
                // if not then try to get from the answer object.
                $question = isset($questions[ $answer->ID() ]) ? $questions[ $answer->ID() ] : null;
                $question = ! $question instanceof EE_Question ? $answer->question() : $question;
                if (! $question instanceof EE_Question || $question->admin_only()) {
                    continue;
                }
                $question_list_item = $shortcode_helper->parse_question_list_template(
                    $template,
                    $answer,
                    $valid_shortcodes,
                    $extra_data
                );

                $question_list .= apply_filters(
                    'FHEE__EE_Caf_Messages___parse_question_list_for_primary_or_recipient_registration__question_list_item',
                    $question_list_item,
                    $question,
                    $answer,
                    $template
                );
            }
        }
        return $question_list;
    }


    /**
     * @param string $parsed
     * @param array  $data
     * @param array  $extra_data
     * @return EE_Messages_Addressee|string|null
     * @since 5.0.57
     */
    private function getMessageRecipient(string $parsed, array $data, array $extra_data)
    {
        if (! isset($data['data'])) {
            return $parsed;
        }

        if ($data['data'] instanceof EE_Messages_Addressee) {
            return $data['data'];
        }

        return isset($extra_data['data']) && $extra_data['data'] instanceof EE_Messages_Addressee
            ? $extra_data['data']
            : null;
    }
}
