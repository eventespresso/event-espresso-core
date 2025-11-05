<?php

/**
 * EEH_Parse_Shortcodes
 * Utility class for parsing EE shortcodes in given data.
 *
 * @package        Event Espresso
 * @subpackage     includes/core
 * @author         Darren Ethier
 */
class EEH_Parse_Shortcodes
{
    /**
     * holds the template
     *
     * @access private
     * @var mixed (string|array)
     */
    private $_template;


    /**
     * holds the incoming data object
     *
     * @access private
     * @var object
     */
    private $_data;


    /**
     * will hold an array of EE_Shortcodes library objects.
     *
     * @access private
     * @var EE_Shortcodes[]
     */
    private $_shortcode_objs = array();


    /**
     * This kicks off the parsing of shortcodes in message templates
     *
     * @param  string                $template         This is the incoming string to be parsed
     * @param  EE_Messages_Addressee $data             This is the incoming data object
     * @param  array                 $valid_shortcodes An array of strings that correspond to EE_Shortcode libraries
     * @param EE_message_type        $message_type     The message type that called the parser
     * @param EE_messenger           $messenger        The active messenger for this parsing session.
     * @param EE_Message             $message
     * @return string                   The parsed template string
     */
    public function parse_message_template(
        $template,
        EE_Messages_Addressee $data,
        $valid_shortcodes,
        EE_message_type $message_type,
        EE_messenger $messenger,
        EE_Message $message
    ) {
        $extra_data = array(
            'messenger'    => $messenger,
            'message_type' => $message_type,
            'message'      => $message,
        );
        $this->_init_data($template, $data, $valid_shortcodes, $extra_data);
        $this->_template = is_array($template) ? $template['main'] : $template;
        return $this->_parse_message_template();
    }


    public function parse_attendee_list_template(
        $template,
        EE_Registration $registration,
        $valid_shortcodes,
        $extra_data = array()
    ) {
        $this->_init_data($template, $registration, $valid_shortcodes, $extra_data);
        $this->_template = is_array($template) ? $template['attendee_list'] : $template;
        return $this->_parse_message_template();
    }

    public function parse_event_list_template($template, EE_Event $event, $valid_shortcodes, $extra_data = array())
    {
        $this->_init_data($template, $event, $valid_shortcodes, $extra_data);
        $this->_template = is_array($template) ? $template['event_list'] : $template;
        return $this->_parse_message_template();
    }


    public function parse_ticket_list_template($template, EE_Ticket $ticket, $valid_shortcodes, $extra_data = array())
    {
        $this->_init_data($template, $ticket, $valid_shortcodes, $extra_data);
        $this->_template = is_array($template) ? $template['ticket_list'] : $template;
        return $this->_parse_message_template();
    }


    public function parse_line_item_list_template(
        $template,
        EE_Line_Item $line_item,
        $valid_shortcodes,
        $extra_data = array()
    ) {
        $this->_init_data($template, $line_item, $valid_shortcodes, $extra_data);
        $this->_template = is_array($template) ? $template['ticket_line_item_no_pms'] : $template;
        return $this->_parse_message_template();
    }


    public function parse_payment_list_template(
        $template,
        EE_Payment $payment_item,
        $valid_shortcodes,
        $extra_data = array()
    ) {
        $this->_init_data($template, $payment_item, $valid_shortcodes, $extra_data);
        $this->_template = is_array($template) ? $template['payment_list'] : $template;
        return $this->_parse_message_template();
    }


    public function parse_datetime_list_template(
        $template,
        EE_Datetime $datetime,
        $valid_shortcodes,
        $extra_data = array()
    ) {
        $this->_init_data($template, $datetime, $valid_shortcodes, $extra_data);
        $this->_template = is_array($template) ? $template['datetime_list'] : $template;
        return $this->_parse_message_template();
    }


    public function parse_question_list_template($template, EE_Answer $answer, $valid_shortcodes, $extra_data = array())
    {
        $this->_init_data($template, $answer, $valid_shortcodes, $extra_data);
        $this->_template = is_array($template) ? $template['question_list'] : $template;
        return $this->_parse_message_template();
    }


    private function _init_data($template, $data, $valid_shortcodes, $extra_data = array())
    {
        $this->_reset_props();
        $this->_data['template']   = $template;
        $this->_data['data']       = $data;
        $this->_data['extra_data'] = $extra_data;
        $this->_set_shortcodes($valid_shortcodes);
    }


    private function _reset_props()
    {
        $this->_template       = $this->_data = null;
        $this->_shortcode_objs = array();
    }


    /**
     * takes the given template and parses it with the $_shortcodes property
     *
     * @return string
     */
    private function _parse_message_template(): string
    {
        // now let's get a list of shortcodes that are found in the given template
        preg_match_all(EE_Shortcodes::REGEX_SHORTCODE_FULL, $this->_template, $matches);
        $shortcodes = $matches[0]; // this should be an array of shortcodes in the template string.

        $matched_code = array();
        $sc_values    = array();

        $list_type_shortcodes = array(
            '[ATTENDEE_LIST]',
            '[EVENT_LIST]',
            '[TICKET_LIST]',
            '[DATETIME_LIST]',
            '[QUESTION_LIST]',
            '[RECIPIENT_QUESTION_LIST]',
            '[PRIMARY_REGISTRANT_QUESTION_LIST]',
            '[RECIPIENT_TICKET_LIST]',
            '[PRIMARY_REGISTRANT_TICKET_LIST]',
            '[RECIPIENT_DATETIME_LIST]',
            '[PRIMARY_REGISTRANT_DATETIME_LIST]',
            '[TICKET_LINE_ITEM_LIST]',
            '[TAX_LINE_ITEM_LIST]',
            '[ADDITIONAL_LINE_ITEM_LIST]',
            '[PRICE_MODIFIER_LINE_ITEM_LIST]',
            '[PAYMENT_LIST_*]',
        );

        $list_type_shortcodes = apply_filters(
            'FHEE__EEH_Parse_Shortcodes___parse_message_template__list_type_shortcodes',
            $list_type_shortcodes
        );

        // now lets go ahead and loop through our parsers for each shortcode and set up the values
        foreach ($shortcodes as $shortcode) {
            // truncate full shortcode to shortcode name only (ie: remove attributes and dynamic portions)
            preg_match_all(EE_Shortcodes::REGEX_SHORTCODE_NAME_ONLY, $shortcode, $matches);
            // ensure shortcode ends with closing ]
            $short_code_name = rtrim(reset($matches[0]), ']') . ']';

            foreach ($this->_shortcode_objs as $sc_obj) {
                if (! $sc_obj instanceof EE_Shortcodes) {
                    continue;
                }
                // check if the given shortcode is in this object, if not, move on
                if (! array_key_exists($short_code_name, $sc_obj->get_shortcodes())) {
                    continue;
                }

                // if this isn't  a "list" type shortcode then we'll send along the data vanilla instead of in an array.
                if (! in_array($shortcode, $list_type_shortcodes)) {
                    $data_send = ! is_object($this->_data) && isset($this->_data['data']) ? $this->_data['data'] : $this->_data;
                } else {
                    $data_send = $this->_data;
                }

                // is this a conditional type shortcode?  If it is then we actually parse the template here.
                if ($this->_is_conditional_shortcode($shortcode)) {
                    // most shortcode parsers are not going to have a match for this shortcode
                    // and will return an empty string so we need to make sure that we're only replacing
                    // the template when there is a non-empty string.
                    $parsed = $sc_obj->parser($shortcode, $data_send, $this->_data['extra_data']);
                    if ($parsed) {
                        $this->_template = $parsed;
                    }
                }

                $parsed = $sc_obj->parser($shortcode, $data_send, $this->_data['extra_data']);

                $matched_code[] = $shortcode;
                $sc_values[]    = $parsed;
            }
        }

        // now we've got parsed values for all the shortcodes in the template so we can go ahead and swap the shortcodes out.
        return str_replace(array_values($matched_code), array_values($sc_values), $this->_template);
    }


    /**
     * Simply returns whether the given shortcode matches the structure for a conditional shortcode.
     *
     * Does it match this format: `[IF_`
     *
     * @param $shortcode
     * @return bool
     */
    protected function _is_conditional_shortcode($shortcode): bool
    {
        return strpos($shortcode, '[IF_') === 0;
    }


    /**
     * This sets the shortcodes property from the incoming array of valid shortcodes that corresponds to names of
     * various EE_Shortcode library objects
     *
     * @param array $valid_shortcodes an array of strings corresponding to EE_Shortcode Library objects
     * @return void
     */
    private function _set_shortcodes(array $valid_shortcodes)
    {
        foreach ($valid_shortcodes as $shortcode_ref) {
            $ref       = ucwords(str_replace('_', ' ', $shortcode_ref));
            $ref       = str_replace(' ', '_', $ref);
            $classname = 'EE_' . $ref . '_Shortcodes';
            if (class_exists($classname) && ! isset($this->_shortcode_objs[ $classname ])) {
                $this->_shortcode_objs[ $classname ] = new $classname();
            }
        }
    }
}
