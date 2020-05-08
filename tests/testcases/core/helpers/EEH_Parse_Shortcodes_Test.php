<?php
/**
 * Contains test class for /core/helpers/EEH_Parse_Shortcodes.helper.php
 *
 * @since          4.6
 * @package        Event Espresso
 * @subpackage     tests
 */


/**
 * All tests for the EEH_Parse_Shortcodes class.
 * The tests here are more integration type tests than pure unit tests due to the nature of the
 * messages system.
 *
 * @since          4.6
 * @package        Event Espresso
 * @subpackage     tests
 * @group          messages
 * @group          agg
 */
class EEH_Parse_Shortcodes_Test extends EE_UnitTestCase
{


    /**
     * This will hold the created event object on setup, which can then be used to grab expected
     * data from.
     *
     * @var EE_Event
     */
    protected $_event;


    /**
     * This will hold the created datetime object on setup which can then be used to grab
     * expected data from.
     *
     * @var EE_Datetime
     */
    protected $_datetime;


    /**
     * This will hold the created ticket object on setup which can then be used to grab expected
     * data from.
     *
     * @var null
     */
    protected $_ticket;


    /**
     * Holds the mock class for EEH_Parse_Shortcodes
     *
     * @var EEH_Parse_Shortcodes_Mock
     */
    protected $_parse_shortcodes_helper_mock;


    public function setUp()
    {
        parent::setUp();

        //all shortcode parse tests will require a full event to be setup with some datetimes and tickets.
        $price         = $this->factory->price_chained->create_object(array(
            'PRC_name'   => 'Not Free Price',
            'PRC_amount' => '125.00',
        ));
        $this->_ticket = $this->factory->ticket_chained->create_object(array('PRC_ID' => $price->ID()));
        //update ticket price
        $this->_ticket->set('TKT_price', '125.00');
        $this->_ticket->set('TKT_name', 'Podracing Entry');
        $this->_ticket->set('TKT_description', 'One entry in the event.');
        $this->_datetime = $this->_ticket->first_datetime();
        $this->_event    = $this->_datetime->event();

        //set the author of the event
        $this->_event->set('EVT_wp_user', 1);
        require_once EE_TESTS_DIR . 'mocks/core/helpers/EEH_Parse_Shortcodes_Mock.php';
        $this->_parse_shortcodes_helper_mock = new EEH_Parse_Shortcodes_Mock;
    }


    /**
     * This grabs an EE_Messages_Addressee object for the Preview data handler.
     *
     * @param string $context
     * @return \EE_Messages_Addressee
     */
    protected function _get_addressee($context = 'primary_attendee')
    {
        $aee  = array();
        $data = new EE_Messages_Preview_incoming_data(array('event_ids' => array($this->_event->ID())));
        /**
         * @see EE_message_type::_set_defautl_addressee_data()
         */
        $addressee_data = array(
            'billing'                  => $data->billing,
            'taxes'                    => $data->taxes,
            'tax_line_items'           => $data->tax_line_items,
            'additional_line_items'    => $data->additional_line_items,
            'grand_total_line_item'    => $data->grand_total_line_item,
            'txn'                      => $data->txn,
            'payments'                 => $data->payments,
            'payment'                  => isset($data->payment) ? $data->payment : null,
            'reg_objs'                 => $data->reg_objs,
            'registrations'            => $data->registrations,
            'datetimes'                => $data->datetimes,
            'tickets'                  => $data->tickets,
            'line_items_with_children' => $data->line_items_with_children,
            'questions'                => $data->questions,
            'answers'                  => $data->answers,
            'txn_status'               => $data->txn_status,
            'total_ticket_count'       => $data->total_ticket_count,
        );

        if (is_array($data->primary_attendee_data)) {
            $addressee_data                    = array_merge($addressee_data, $data->primary_attendee_data);
            $addressee_data['primary_att_obj'] = $data->primary_attendee_data['att_obj'];
            $addressee_data['primary_reg_obj'] = $data->primary_attendee_data['reg_obj'];
        }

        /**
         * @see EE_message_type::_process_data()
         */
        switch ($context) {
            case 'primary_attendee'  :
            case 'purchaser' :
                $aee              = $addressee_data;
                $aee['events']    = $data->events;
                $aee['attendees'] = $data->attendees;
                break;
            case 'attendee' :
                //for the purpose of testing we're just going to do ONE attendee
                $attendee = reset($data->attendees);
                foreach ($attendee as $item => $value) {
                    $aee[$item] = $value;
                    if ($item == 'line_ref') {
                        foreach ($value as $event_id) {
                            $aee['events'][$event_id] = $data->events[$event_id];
                        }
                    }
                }
                $aee['reg_obj']   = array_shift($attendee['reg_objs']);
                $aee['attendees'] = $data->attendees;
                break;
            case 'admin' :
                //for the purpose of testing we're only setting up for the event we have active for testing.
                $aee['user_id']   = $this->_event->get('EVT_wp_user');
                $aee['events']    = $data->events;
                $aee['attendees'] = $data->attendees;
        }
        return new EE_Messages_Addressee($aee);
    }


    /**
     * This helper returns parsed content from the parser to be used for tests using the given params.
     *
     * @param string                $messenger       The slug for the messenger being tested.
     * @param string                $message_type    The slug for the message type being tested.
     * @param string                $field           The field being tested.
     * @param string                $context         The context being tested.
     * @param array|string          $append          Append content to a default template for testing with.  If
     *                                               you want to append to multiple fields, then include an
     *                                               array indexed by field.  Otherwise the string will be
     *                                               appended to the field sent in with the $field param.
     * @param EE_Messages_Addressee $addressee       Optionally include a
     *                                               messages addressee object if you do not wish
     *                                               to use the default one generated.  This is
     *                                               useful for simulating exceptions and failures.
     * @return string The parsed content.
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_parsed_content($messenger, $message_type, $field, $context, $append = '', $addressee = null)
    {
        //grab the correct template  @see EE_message_type::_get_templates()
        /** @type EE_Message_Template_Group $mtpg */
        $mtpg          = EEM_Message_Template_Group::instance()->get_one(array(
            array(
                'MTP_messenger'    => $messenger,
                'MTP_message_type' => $message_type,
                'MTP_is_global'    => true,
            ),
        ));
        $all_templates = $mtpg instanceof EE_Message_Template_Group ? $mtpg->context_templates() : array();
        $templates     = array();
        foreach ($all_templates as $t_context => $template_fields) {
            foreach ($template_fields as $template_field => $template_obj) {
                $templates[$template_field][$t_context] = $template_obj->get('MTP_content');
            }
        }

        //instantiate messenger and message type objects
        $msg_class = 'EE_' . str_replace(' ', '_', ucwords(str_replace('_', ' ', $messenger))) . '_messenger';
        $mt_class  = 'EE_' . str_replace(' ', '_', ucwords(str_replace('_', ' ', $message_type))) . '_message_type';
        /** @type EE_messenger $messenger */
        $messenger = new $msg_class();
        /** @type EE_message_type $message_type */
        $message_type = new $mt_class();

        //grab valid shortcodes and setup for parser.
        $m_shortcodes  = $messenger->get_valid_shortcodes();
        $mt_shortcodes = $message_type->get_valid_shortcodes();

        //just sending in the content field and primary_attendee context/data for testing.
        $template = isset($templates[$field][$context]) ? $templates[$field][$context] : array();

        /**
         * if empty template then its possible that the requested field is inside the "content"
         * field array.
         */
        if (empty($template)) {
            $template = isset($templates['content'][$context]) ? $templates['content'][$context] : array();
            //verify the requested field is present
            if (! empty($template) && is_array($template) && ! isset($template[$field])) {
                return '';
            }
        }

        //if $template is still empty then return an empty string
        if (empty($template)) {
            return '';
        }

        // any appends?
        if (! empty($append)) {
            if (is_array($template)) {
                //we've already done a check for the presence of field above.
                if (is_array($append)) {
                    foreach ($append as $a_field => $string) {
                        if (isset($template[$a_field])) {
                            $template[$a_field] = $template[$a_field] . $string;
                        }
                    }
                } else {
                    $template[$field] = $template[$field] . $append;
                }
            } else {
                //only append if $append is not an array because the $template is not an array.
                if (! is_array($append)) {
                    $template .= $append;
                }

            }
        }


        $valid_shortcodes = isset($m_shortcodes[$field]) ? $m_shortcodes[$field] : $mt_shortcodes[$context];
        $data             = $addressee instanceof EE_Messages_Addressee ? $addressee : $this->_get_addressee();

        //parser needs EE_Message object
        $message = EE_Message_Factory::create(
            array(
                'MSG_messenger'    => $messenger->name,
                'MSG_message_type' => $message_type->name,
                'MSG_context'      => $context,
                'GRP_ID'           => $mtpg->ID(),
            )
        );
        $parser  = new EEH_Parse_Shortcodes();
        return $parser->parse_message_template($template, $data, $valid_shortcodes, $message_type, $messenger,
            $message);
    }


    /**
     * Tests parsing the message template for email messenger, payment received message
     * type.
     *
     * @group 7585
     * @throws EE_Error
     * @throws EE_Error
     * @throws EE_Error
     * @since 4.6
     */
    public function test_parsing_email_payment_received()
    {
        $parsed = $this->_get_parsed_content('email', 'payment', 'content', 'primary_attendee');

        //now that we have parsed let's test the results, note for the purpose of this test we are verifying transaction shortcodes and ticket shortcodes.

        //testing [PRIMARY_REGISTRANT_FNAME], [PRIMARY_REGISTRANT_LNAME]
        $this->assertContains('Luke Skywalker', $parsed);

        //testing [PAYMENT_STATUS]
        $this->assertContains('Incomplete', $parsed);

        //testing [TXN_ID]
        $this->assertContains('999999', $parsed);

        //testing [TOTAL_COST] and [AMOUNT_DUE]  (should be $125*3 + 20 shipping charge + taxes)
        $total_cost = EEH_Template::format_currency('398.00');
        $this->assertContains($total_cost, $parsed);
        //but we should also have a count of TWO for this string
        $this->assertEquals(2, substr_count($parsed, $total_cost));

        //testing [AMOUNT_PAID]
        $amount_paid = EEH_Template::format_currency('0');
        $this->assertContains($amount_paid, $parsed);


        //testing [TICKET_NAME]
        $this->assertContains('Podracing Entry', $parsed);

        //testing [TICKET_DESCRIPTION]
        $this->assertContains('One entry in the event.', $parsed);

        //testing [TICKET_PRICE]
        $this->assertContains(EEH_Template::format_currency('125.00'), $parsed);


        //testing [TKT_QTY_PURCHASED]
        $expected = '<strong>Quantity Purchased:</strong> 3';
        $this->assertContains($expected, $parsed,
            '[TKT_QTY_PURCHASED] shortcode was not parsed correctly to the expected value which is 3');

    }


    /**
     * Test parsing the html receipt message templates.
     *
     * @since 4.6
     * @group 7623
     */
    public function test_parsing_html_receipt()
    {
        //see https://events.codebasehq.com/projects/event-espresso/tickets/9337, I think when running all tests, html
        //messenger is getting stuck deactivated and thus the generated message template for this test will be missing some
        //info.
        EE_Registry::instance()->load_lib('Message_Resource_Manager')->ensure_messenger_is_active('html');
        //currently with @group 7623 just testing if there are any error notices.
        $parsed = $this->_get_parsed_content('html', 'receipt', 'content', 'purchaser');

        //testing [PAYMENT_GATEWAY]
        $this->assertContains('Invoice', $parsed);
    }


    /**
     * Test parsing the email registration message templates (registration approved).
     *
     * @since 4.6
     * @group 7613
     */
    public function test_parsing_email_registration()
    {
        //add in shortcodes for testing [ANSWER_*] as a part of the [ATTENDEE_LIST] parsing from the [EVENT_LIST] context.
        $test_answer_attendee_list_event_list_append = array(
            'event_list'    => '[ATTENDEE_LIST]',
            'attendee_list' => 'Custom Answer: [ANSWER_* What is your favorite planet?]',
            'ticket_list'   => '[ATTENDEE_LIST]',
            'main'          => '[ATTENDEE_LIST]',
        );

        $parsed = $this->_get_parsed_content('email', 'registration', 'attendee_list', 'attendee',
            $test_answer_attendee_list_event_list_append);

        //testing [ATTENDEE_LIST] and [ANSWER_*] which should appear three times (because [ATTENDEE_LIST] was added to three fields),
        $this->assertEquals(3, substr_count($parsed, 'Custom Answer: Tattoine'));
    }


    /**
     * This test is for testing an exception is thrown when invalid attendee
     * object in the data sent to the parsers.
     *
     * @group 7659
     */
    public function test_invalid_attendee_obj_EE_Attendee_Shortcodes()
    {
        $addressee = $this->_get_addressee();

        //manipulate to remove data
        $addressee->registrations = array();

        // Expecting an exception for invalid EE_Attendee Object
        $this->expectException('Exception');
        $this->expectExceptionCode(0);
        $parsed_content = $this->_get_parsed_content(
            'email',
            'registration',
            'content',
            'admin',
            '',
            $addressee
        );
        $this->assertNotEmpty($parsed_content);
    }


    /**
     * @group 10561
     */
    public function test_is_conditional_shortcode()
    {
        //test is conditional shortcode
        $this->assertTrue($this->_parse_shortcodes_helper_mock->is_conditional_shortcode('[IF_something_* id=10]'));

        $non_conditional_expectations = array(
            '[SOMETHING]',
            '[WHEN_IF_NESTED]',
            '[if_lowercase]',
            '[/IF_CLOSING_TAG]'
        );

        foreach ($non_conditional_expectations as $non_conditional_expectation) {
            //should not be conditional shortcode
            $this->assertFalse(
                $this->_parse_shortcodes_helper_mock->is_conditional_shortcode(
                    $non_conditional_expectation
                ),
                sprintf(
                    'This shortcode pattern should not test as matching a conditional shortcode but it did: %s',
                    $non_conditional_expectation
                )
            );
        }
    }

} //end class EEH_Parse_Shortcodes_Test
