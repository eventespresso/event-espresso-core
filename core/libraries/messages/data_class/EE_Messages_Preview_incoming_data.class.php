<?php

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

/**
 * EE_Messages_Preview_incoming_data
 *
 * This prepares dummy data for all messages previews run in the back end.  The Preview Data is going to use a given
 * event id for the data.  If that event is NOT provided then we'll retrieve the first three published events from the
 * users database as a sample (or whatever is available if there aren't three).
 *
 * To assemble the preview data, I basically used the EE_Single_Page_Checkout class to server as a guide for what data
 * objects are setup etc.  Any place there is input expected from registrants we just setup some dummy inputs.
 * Remember none of this is actually saved to the database.  It is all one time use for any generated previews.
 *
 * @package        Event Espresso
 * @subpackage     includes/core/messages/data_class/EE_Messages_Preview_incoming_data.core.php
 * @author         Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Messages_Preview_incoming_data extends EE_Messages_incoming_data
{
    
    //some specific properties we need for this class
    private $_events = array();
    private $_attendees = array();
    private $_registrations = array();
    
    
    /**
     * For the constructor of this special preview class.  We're either looking for an event id or empty data.  If we
     * have an event id (or ids) then we'll use that as the source for the "dummy" data.  If the data is empty then
     * we'll get the first three published events from the users database and use that as a source.
     *
     * @param array $data
     */
    public function __construct($data = array())
    {
        $this->_data = isset($data['event_ids']) ? $data['event_ids'] : array();
        $this->_setup_attendees_events();
        parent::__construct($data);
    }
    
    
    /**
     * Returns database safe representation of the data later used to when instantiating this object.
     *
     * @param array $data The incoming data to be prepped.
     *
     * @return array   The prepped data for db
     */
    static public function convert_data_for_persistent_storage($data)
    {
        return $data;
    }
    
    
    /**
     * Data that has been stored in persistent storage that was prepped by _convert_data_for_persistent_storage
     * can be sent into this method and converted back into the format used for instantiating with this data handler.
     *
     * @param array $data
     *
     * @return array
     */
    static public function convert_data_from_persistent_storage($data)
    {
        return $data;
    }
    
    
    /**
     * This will just setup the _events property in the expected format.
     *
     * @throws \EE_Error
     */
    private function _setup_attendees_events()
    {
        
        //setup some attendee objects
        $attendees = $this->_get_some_attendees();
        
        //if empty $data we'll do a query to get some events from the server. otherwise we'll retrieve the event data for the given ids.
        $events = $this->_get_some_events($this->_data);
        
        $answers_n_questions = $this->_get_some_q_and_as();
        
        if (count($events) < 1) {
            throw new EE_Error(__('We can\'t generate a preview for you because there are no active events in your database',
                'event_espresso'));
        }
        
        
        //now let's loop and set up the _events property.  At the same time we'll set up attendee properties.
        
        
        //we'll actually use the generated line_item identifiers for our loop
        $dtts = $tkts = array();
        foreach ($events as $id => $event) {
            if ( ! $event instanceof EE_Event) {
                continue;
            }
            $this->_events[$id]['ID']       = $id;
            $this->_events[$id]['name']     = $event->get('EVT_name');
            $datetime                       = $event->get_first_related('Datetime');
            $tickets                        = $datetime instanceof EE_Datetime ? $datetime->get_many_related('Ticket',
                array('default_where_conditions' => 'none')) : array();
            $this->_events[$id]['event']    = $event;
            $this->_events[$id]['reg_objs'] = array();
            $this->_events[$id]['tkt_objs'] = $tickets;
            $this->_events[$id]['dtt_objs'] = array();
            
            $dttcache = array();
            $tkts     = array();
            foreach ($tickets as $ticket) {
                if ( ! $ticket instanceof EE_Ticket) {
                    continue;
                }
                $reldatetime                     = $ticket->datetimes();
                $tkts[$ticket->ID()]             = array();
                $tkts[$ticket->ID()]['ticket']   = $ticket;
                $tkts[$ticket->ID()]['dtt_objs'] = $reldatetime;
                $tkts[$ticket->ID()]['att_objs'] = $attendees;
                $tkts[$ticket->ID()]['count']    = count($attendees);
                $tkts[$ticket->ID()]['EE_Event'] = $event;
                foreach ($reldatetime as $datetime) {
                    if ($datetime instanceof EE_Datetime && ! isset($dtts[$datetime->ID()])) {
                        $this->_events[$id]['dtt_objs'][$datetime->ID()] = $datetime;
                        $dtts[$datetime->ID()]['datetime']               = $datetime;
                        $dtts[$datetime->ID()]['tkt_objs'][]             = $ticket;
                        $dtts[$datetime->ID()]['evt_objs'][]             = $event;
                        $dttcache[$datetime->ID()]                       = $datetime;
                    }
                }
            }
            
            $this->_events[$id]['total_attendees'] = count($attendees);
            $this->_events[$id]['att_objs']        = $attendees;
            
            //let's also setup the dummy attendees property!
            foreach ($attendees as $att_key => $attendee) {
                if ( ! $attendee instanceof EE_Attendee) {
                    continue;
                }
                $this->_attendees[$att_key]['line_ref'][] = $id;  //so later it can be determined what events this attendee registered for!
                $this->_attendees[$att_key]['evt_objs'][] = $event;
                $this->_attendees[$att_key]['att_obj']    = $attendee;
                //$this->_attendees[$att_key]['registration_id'] = 0;
                $this->_attendees[$att_key]['attendee_email'] = $attendee->email();
                $this->_attendees[$att_key]['tkt_objs']       = $tickets;
                if ($att_key == 999999991) {
                    $this->_attendees[$att_key]['ans_objs'][999]  = $answers_n_questions['answers'][999];
                    $this->_attendees[$att_key]['ans_objs'][1002] = $answers_n_questions['answers'][1002];
                    $this->_attendees[$att_key]['ans_objs'][1005] = $answers_n_questions['answers'][1005];
                } elseif ($att_key == 999999992) {
                    $this->_attendees[$att_key]['ans_objs'][1000] = $answers_n_questions['answers'][1000];
                    $this->_attendees[$att_key]['ans_objs'][1003] = $answers_n_questions['answers'][1003];
                    $this->_attendees[$att_key]['ans_objs'][1006] = $answers_n_questions['answers'][1006];
                } elseif ($att_key == 999999993) {
                    $this->_attendees[$att_key]['ans_objs'][1001] = $answers_n_questions['answers'][1001];
                    $this->_attendees[$att_key]['ans_objs'][1004] = $answers_n_questions['answers'][1004];
                    $this->_attendees[$att_key]['ans_objs'][1007] = $answers_n_questions['answers'][1007];
                }
            }
        }
        
        $this->tickets            = $tkts;
        $this->datetimes          = $dtts;
        $this->answers            = $answers_n_questions['answers'];
        $this->questions          = $answers_n_questions['questions'];
        $this->total_ticket_count = count($tkts) * count($this->_attendees);
        
    }
    
    
    /**
     * This just returns an array of dummy attendee objects that we'll use to attach to events for our preview data
     *
     * @access private
     * @return array an array of attendee objects
     */
    private function _get_some_attendees()
    {
        //let's just setup a dummy array of various attendee details
        $dummy_attendees = array(
            0 => array(
                'Luke',
                'Skywalker',
                'farfaraway@galaxy.sp',
                '804 Bantha Dr.',
                'Complex 8',
                'Mos Eisley',
                32,
                'US',
                'f0r3e',
                '222-333-4763',
                false,
                '999999991'
            ),
            1 => array(
                'Princess',
                'Leia',
                'buns@fcn.al',
                '1456 Valley Way Boulevard',
                'Suite 9',
                'Alderaan',
                15,
                'US',
                'c1h2c',
                '78-123-111-1111',
                false,
                '999999992'
            ),
            2 => array(
                'Yoda',
                'I Am',
                'arrivenot@emailbad.fr',
                '4th Tree',
                '5th Knot',
                'Marsh',
                22,
                'US',
                'l18n',
                '999-999-9999',
                false,
                '999999993'
            ),
        );
        
        //let's generate the attendee objects
        $attendees = array();
        $var_array = array(
            'fname',
            'lname',
            'email',
            'address',
            'address2',
            'city',
            'staid',
            'cntry',
            'zip',
            'phone',
            'deleted',
            'attid'
        );
        
        //EE_Registry::instance()->load_class( 'Attendee', array(), FALSE, false, TRUE );
        foreach ($dummy_attendees as $dummy) {
            $att = array_combine($var_array, $dummy);
            extract($att);
            /** @var $fname string */
            /** @var $lname string */
            /** @var $address string */
            /** @var $address2 string */
            /** @var $city string */
            /** @var $staid string */
            /** @var $cntry string */
            /** @var $zip string */
            /** @var $email string */
            /** @var $phone string */
            /** @var $attid string */
            $attendees[$attid] = EE_Attendee::new_instance(
                array(
                    'ATT_fname'    => $fname,
                    'ATT_lname'    => $lname,
                    'ATT_address'  => $address,
                    'ATT_address2' => $address2,
                    'ATT_city'     => $city,
                    'STA_ID'       => $staid,
                    'CNT_ISO'      => $cntry,
                    'ATT_zip'      => $zip,
                    'ATT_email'    => $email,
                    'ATT_phone'    => $phone,
                    'ATT_ID'       => $attid
                )
            );
        }
        
        return $attendees;
    }
    
    
    /**
     * Return an array of dummy question objects indexed by answer id and dummy answer objects indexed by answer id.
     * This will be used in our dummy data setup
     * @return array
     */
    private function _get_some_q_and_as()
    {
        
        
        $quests_array = array(
            0 => array(
                555,
                __('What is your favorite planet?', 'event_espresso'),
                0
            ),
            1 => array(
                556,
                __('What is your favorite food?', 'event_espresso'),
                0
            ),
            2 => array(
                557,
                __('How many lightyears have you travelled', 'event_espresso'),
                0
            )
        );
        
        
        $ans_array = array(
            0 => array(
                999,
                555,
                'Tattoine'
            ),
            1 => array(
                1000,
                555,
                'Alderaan'
            ),
            2 => array(
                1001,
                555,
                'Dantooine'
            ),
            3 => array(
                1002,
                556,
                'Fish Fingers'
            ),
            4 => array(
                1003,
                556,
                'Sushi'
            ),
            5 => array(
                1004,
                556,
                'Water'
            ),
            6 => array(
                1005,
                557,
                'A lot',
            ),
            7 => array(
                1006,
                557,
                "That's none of your business."
            ),
            8 => array(
                1007,
                557,
                "People less travel me then."
            )
        );
        
        $qst_columns = array('QST_ID', 'QST_display_text', 'QST_system');
        $ans_columns = array('ANS_ID', 'QST_ID', 'ANS_value');
        
        //EE_Registry::instance()->load_class( 'Question', array(), FALSE, TRUE, TRUE );
        //EE_Registry::instance()->load_class( 'Answer', array(), FALSE, TRUE, TRUE );
        
        $qsts = array();
        //first the questions
        foreach ($quests_array as $qst) {
            $qstobj                  = array_combine($qst_columns, $qst);
            $qsts[$qstobj['QST_ID']] = EE_Question::new_instance($qstobj);
        }
        
        //now the answers (and we'll setup our arrays)
        $q_n_as = array();
        foreach ($ans_array as $ans) {
            $ansobj                             = array_combine($ans_columns, $ans);
            $ansobj                             = EE_Answer::new_instance($ansobj);
            $q_n_as['answers'][$ansobj->ID()]   = $ansobj;
            $q_n_as['questions'][$ansobj->ID()] = $qsts[$ansobj->get('QST_ID')];
        }
        
        return $q_n_as;
        
    }
    
    
    /**
     * Return an array of event objects from the database
     *
     * If event ids are not included then we'll just retrieve the first published event from the database.
     *
     * @param  array $event_ids if set, this will be an array of event ids to obtain events for.
     *
     * @return array    An array of event objects from the db.
     */
    private function _get_some_events($event_ids = array())
    {
        
        //HEY, if we have an evt_id then we want to make sure we use that for the preview (because a specific event template is being viewed);
        $event_ids = isset($_REQUEST['evt_id']) && ! empty($_REQUEST['evt_id'])
            ? array($_REQUEST['evt_id'])
            : $event_ids;
        
        $limit = ! empty($event_ids)
            ? null
            : apply_filters('FHEE__EE_Messages_Preview_incoming_data___get_some_events__limit', '0,1');
        
        $where = ! empty($event_ids)
            ? array(
                'EVT_ID'                 => array('IN', $event_ids),
                'Datetime.Ticket.TKT_ID' => array('>', 1)
            )
            : array('Datetime.Ticket.TKT_ID' => array('>', 1));
        
        $events = EE_Registry::instance()->load_model('Event')->get_all(array($where, 'limit' => $limit));
        
        return $events;
    }
    
    
    protected function _setup_data()
    {
        
        //need to figure out the running total for test purposes so... we're going to create a temp cart and add the tickets to it!
        if (EE_Registry::instance()->SSN instanceof EE_Session) {
            EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
            $session = EE_Registry::instance()->SSN;
        } else {
            $session = EE_Registry::instance()->load_core('Session');
        }
        $cart = EE_Cart::instance(null, $session);
        
        
        //add tickets to cart
        foreach ($this->tickets as $ticket) {
            $cart->add_ticket_to_cart($ticket['ticket']);
        }
        
        
        //setup txn property
        $this->txn = EE_Transaction::new_instance(
            array(
                'TXN_timestamp'    => time(), //unix timestamp
                'TXN_total'        => 0, //txn_total
                'TXN_paid'         => 0, //txn_paid
                'STS_ID'           => EEM_Transaction::incomplete_status_code, //sts_id
                'TXN_session_data' => null, //dump of txn session object (we're just going to leave blank here)
                'TXN_hash_salt'    => null, //hash salt blank as well
                'TXN_ID'           => 999999
            )
        );
        
        
        //setup reg_objects
        //note we're setting up a reg object for each attendee in each event but ALSO adding to the reg_object array.
        $this->reg_objs = array();
        $regid          = 9999990;
        foreach ($this->_attendees as $key => $attendee) {
            //note we need to setup reg_objects for each event this attendee belongs to
            $regatt = $attendee['att_obj'] instanceof EE_Attendee ? $attendee['att_obj']->ID() : null;
            $regtxn = $this->txn->ID();
            $regcnt = 1;
            foreach ($attendee['line_ref'] as $evtid) {
                foreach ($this->_events[$evtid]['tkt_objs'] as $ticket) {
                    if ( ! $ticket instanceof EE_Ticket) {
                        continue;
                    }
                    $reg_array                                        = array(
                        'EVT_ID'           => $evtid,
                        'ATT_ID'           => $regatt,
                        'TXN_ID'           => $regtxn,
                        'TKT_ID'           => $ticket->ID(),
                        'STS_ID'           => EEM_Registration::status_id_pending_payment,
                        'REG_date'         => time(),
                        'REG_final_price'  => $ticket->get('TKT_price'),
                        'REG_session'      => 'dummy_session_id',
                        'REG_code'         => $regid . '-dummy-generated-code',
                        'REG_url_link'     => $regcnt . '-daafpapasdlfakasdfpqasdfasdf',
                        'REG_count'        => $regcnt,
                        'REG_group_size'   => $this->_events[$evtid]['total_attendees'],
                        'REG_att_is_going' => true,
                        'REG_ID'           => $regid
                    );
                    $REG_OBJ                                          = EE_Registration::new_instance($reg_array);
                    $this->_attendees[$key]['reg_objs'][$regid]       = $REG_OBJ;
                    $this->_events[$evtid]['reg_objs'][]              = $REG_OBJ;
                    $this->reg_objs[]                                 = $REG_OBJ;
                    $this->tickets[$ticket->ID()]['reg_objs'][$regid] = $REG_OBJ;
                    
                    $regcnt++;
                    $regid++;
                }
            }
        }
        
        
        //setup line items!
        $line_item_total = EEH_Line_Item::create_total_line_item($this->txn);
        
        //add tickets
        foreach ($this->tickets as $tktid => $item) {
            $qty    = $item['count'];
            $ticket = $item['ticket'];
            EEH_Line_Item::add_ticket_purchase($line_item_total, $ticket, $qty);
        }
        
        $shipping_line_item = EE_Line_Item::new_instance(array(
            'LIN_name'       => __('Shipping Surcharge', 'event_espresso'),
            'LIN_desc'       => __('Sent via Millenium Falcon', 'event_espresso'),
            'LIN_unit_price' => 20,
            'LIN_quantity'   => 1,
            'LIN_is_taxable' => true,
            'LIN_total'      => 20,
            'LIN_type'       => EEM_Line_Item::type_line_item
        ));
        EEH_Line_Item::add_item($line_item_total, $shipping_line_item);
        $this->additional_line_items = array($shipping_line_item);
        
        //now let's add taxes
        EEH_Line_Item::apply_taxes($line_item_total);
        
        //now we should be able to get the items we need from this object
        $event_line_items = EEH_Line_Item::get_pre_tax_subtotal($line_item_total)->children();
        $line_items       = array();
        foreach ($event_line_items as $line_id => $line_item) {
            if ( ! $line_item instanceof EE_Line_Item || $line_item->OBJ_type() !== 'Event') {
                continue;
            }
            $ticket_line_items = EEH_Line_Item::get_ticket_line_items($line_item);
            foreach ($ticket_line_items as $ticket_line_id => $ticket_line_item) {
                if ( ! $ticket_line_item instanceof EE_Line_Item) {
                    continue;
                }
                $this->tickets[$ticket_line_item->OBJ_ID()]['line_item']      = $ticket_line_item;
                $this->tickets[$ticket_line_item->OBJ_ID()]['sub_line_items'] = $ticket_line_item->children();
                $line_items[$ticket_line_item->ID()]['children']              = $ticket_line_item->children();
                $line_items[$ticket_line_item->ID()]['EE_Ticket']             = $this->tickets[$ticket_line_item->OBJ_ID()]['ticket'];
            }
        }
        
        $this->line_items_with_children = $line_items;
        $this->tax_line_items           = $line_item_total->tax_descendants();
        
        //add proper total to transaction object.
        $grand_total                 = $line_item_total->recalculate_total_including_taxes();
        $this->grand_total_line_item = $line_item_total;
        $this->txn->set_total($grand_total);
        
        
        //add additional details for each registration
        foreach ($this->reg_objs as $reg) {
            if ( ! $reg instanceof EE_Registration) {
                continue;
            }
            $this->_registrations[$reg->ID()]['tkt_obj']  = $this->tickets[$reg->get('TKT_ID')]['ticket'];
            $this->_registrations[$reg->ID()]['evt_obj']  = $this->_events[$reg->get('EVT_ID')]['event'];
            $this->_registrations[$reg->ID()]['reg_obj']  = $reg;
            $this->_registrations[$reg->ID()]['ans_objs'] = $this->_attendees[$reg->get('ATT_ID')]['ans_objs'];
            $this->_registrations[$reg->ID()]['att_obj']  = $this->_attendees[$reg->get('ATT_ID')]['att_obj'];
            $this->_registrations[$reg->ID()]['dtt_objs'] = $this->tickets[$reg->get('TKT_ID')]['dtt_objs'];
        }
        
        
        //events and attendees
        $this->events        = $this->_events;
        $this->attendees     = $this->_attendees;
        $this->registrations = $this->_registrations;
        
        $attendees_to_shift = $this->_attendees;
        
        //setup primary attendee property
        $this->primary_attendee_data = array(
            'fname' => $this->_attendees[999999991]['att_obj'] instanceof EE_Attendee
                ? $this->_attendees[999999991]['att_obj']->fname()
                : '',
            
            'lname' => $this->_attendees[999999991]['att_obj'] instanceof EE_Attendee
                ? $this->_attendees[999999991]['att_obj']->lname()
                : '',
            
            'email' => $this->_attendees[999999991]['att_obj'] instanceof EE_Attendee
                ? $this->_attendees[999999991]['att_obj']->email()
                : '',
            
            'att_obj' => $this->_attendees[999999991]['att_obj'],
            
            'reg_obj' => array_shift($attendees_to_shift[999999991]['reg_objs'])
        );
        
        //reg_info property
        //note this isn't referenced by any shortcode parsers so we'll ignore for now.
        $this->reg_info = array();
        
        //let's set a reg_obj for messengers expecting one.
        $this->reg_obj = array_pop($this->_attendees[999999991]['reg_objs']);
        
        
        //the below are just dummy items.
        $this->user_id     = 1;
        $this->ip_address  = '192.0.2.1';
        $this->user_agent  = '';
        $this->init_access = time();
        $this->last_access = time();
    }
    
} //end EE_Messages_Preview_incoming_data class
