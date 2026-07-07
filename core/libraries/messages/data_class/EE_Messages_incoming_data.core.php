<?php

use EventEspresso\core\exceptions\EntityNotFoundException;

/**
 * EE_Messages_incoming_data
 * This is the parent class for all incoming data to EE_messages objects.  We create different data handlers for
 * different incoming data depending on the message types set requirements.
 *
 * @package        Event Espresso
 * @subpackage     includes/core/messages/data_class/EE_Messages_incoming_data.core.php
 * @author         Darren Ethier
 */
abstract class EE_Messages_incoming_data
{
    /**
     * user id for logged-in user when data collected
     *
     * @var string $user_id
     */
    public $user_id;

    /**
     * IP Address of browser used
     *
     * @var string $ip_address
     */
    public $ip_address;

    /**
     * browser
     *
     * @var string $user_agent
     */
    public $user_agent;

    /**
     * Unix timestamp
     *
     * @var string $init_access
     */
    public $init_access;

    /**
     * Unix timestamp
     *
     * @var string $last_access
     */
    public $last_access;

    /**
     * The registrations details from the cart
     *
     * @var array $reg_info
     */
    public $reg_info;

    /**
     * Some data handlers can set what reg status all the registrations are filtered by.
     * The status should match a EEM_Registration status constant.
     *
     * @var string $filtered_reg_status
     */
    public $filtered_reg_status;

    /**
     * will hold an array of events assembled from $reg_info
     *
     * @var EE_Event[] $events
     */
    public $events;

    /**
     * holds an array of datetimes assembled from the incoming data.
     *
     * @var EE_Datetime[] $datetimes
     */
    public $datetimes;

    /**
     * holds an array of tickets assembled from the incoming data.
     *
     * @var EE_Ticket[] $tickets
     */
    public $tickets;

    /**
     * holds an array with a key of parent line item and values are an array of children of that line item.
     *
     * @var EE_Line_Item[] $line_items_with_children
     * @since 4.5.0
     */
    public $line_items_with_children;

    /**
     * will hold an array of attendees assembled from the $reg_info
     *
     * @var EE_Attendee[] $attendees
     */
    public $attendees;

    /**
     * will hold an array of cached registration objects and info assembled from reg_info
     *
     * @var array $registrations
     */
    public $registrations;

    /**
     * will hold an array of answers assembled from the $reg_info
     *
     * @var EE_Answer[] $answers
     */
    public $answers;

    /**
     * will hold an array of questions assembled from the $reg_info (indexed by Answer ID);
     *
     * @var EE_Question[] $questions
     */
    public $questions;

    /**
     * Will hold billing data assembled from $billing_info (if present)
     *
     * @var mixed (array|null) $billing
     */
    public $billing;

    /**
     * The total amount of tax for the transaction
     *
     * @var float $taxes
     */
    public $taxes;

    /**
     * Holds the line items related to taxes
     *
     * @var EE_Line_Item[] $tax_line_items
     * @since 4.5.0
     */
    public $tax_line_items;

    /**
     * Hold the line items which aren't taxes and don't relate
     * to tickets. So: promotions and miscellaneous charges
     *
     * @var EE_Line_Item[] $additional_line_items
     * @since 4.5
     */
    public $additional_line_items;

    /**
     * Holds the grand total EE_Line_Item
     *
     * @var EE_Line_Item $grand_total_line_item
     */
    public $grand_total_line_item;

    /**
     * holds the grand total price object
     * currently not used.
     *
     * @var null $grand_total_price_object
     */
    public $grand_total_price_object;

    /**
     * total number of tickets
     *
     * @var int $total_ticket_count
     */
    public $total_ticket_count;

    /**
     * Will hold the final transaction object (EE_Transaction)
     *
     * @var EE_Transaction $txn
     */
    public $txn;

    /**
     * Holds the payments related to a transaction
     *
     * @var EE_Payment[] $payments
     * @since 4.5.0
     */
    public $payments;

    /**
     * Holds the first related payment related for a transaction
     *
     * @var EE_Payment $payment
     * @since 4.5.0
     */
    public $payment;

    /**
     * Will hold the label for the txn status
     *
     * @var string $txn_status
     */
    public $txn_status;

    /**
     * Will hold the final registration object (EE_Registration)
     *
     * @var EE_Registration[] $reg_objs
     */
    public $reg_objs;

    /**
     * Will hold an array of primary attendee data (if present)
     *
     * @var array $primary_attendee_data
     */
    public $primary_attendee_data;

    /**
     * This is just an internal object used for passing around the incoming data.
     *
     * @var mixed $_data
     */
    protected $_data;

    /**
     * This is just an internal object used for passing around the incoming data.
     *
     * @var mixed $incoming_data
     */
    public $incoming_data;

    /**
     * hold objects that might be created
     *
     * @type EE_Registration $reg_obj
     */
    public $reg_obj;


    /**
     * @param mixed $data incoming data object|array.
     *                    Suggested that child classes use type hinting for expected data object.
     *                    But here parent will be generic because we don't know what's coming in.
     */
    public function __construct($data)
    {
        $this->_data = $data;
        $this->_setup_data();
    }


    /**
     * Every child class has to set up the data object !
     *
     * @return void
     */
    abstract protected function _setup_data();


    /**
     * Returns database safe representation of the data later used to when instantiating this object.
     *
     * @param mixed $data The incoming data to be prepped.
     * @return mixed   The prepped data for db
     */
    public static function convert_data_for_persistent_storage($data)
    {
        return $data;
    }


    /**
     * Data that has been stored in persistent storage that was prepped by _convert_data_for_persistent_storage
     * can be sent into this method and converted back into the format used for instantiating with this data handler.
     *
     * @param $data
     * @return mixed
     */
    public static function convert_data_from_persistent_storage($data)
    {
        return $data;
    }


    /**
     * only purpose is to return the data
     *
     * @return mixed the formatted data object!
     */
    public function data()
    {
        return $this->_data;
    }


    /**
     * This helper method can be used by any incoming data handlers to set up the data correctly.
     * All that is required is that $this->reg_objs be set.
     *
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws ReflectionException
     */
    protected function _assemble_data()
    {
        // verify that reg_objs is set
        if (
            empty($this->reg_objs)
            || ! is_array($this->reg_objs)
            || ! reset($this->reg_objs) instanceof EE_Registration
        ) {
            throw new EE_Error(
                esc_html__(
                    'In order to assemble the data correctly, the "reg_objs" property must be an array of EE_Registration objects',
                    'event_espresso'
                )
            );
        }

        $answers         = [];
        $attendees       = [];
        $datetimes       = [];
        $attendee_count  = [];
        $event_setup     = [];
        $events          = [];
        $line_items      = [];
        $questions       = [];
        $registrations   = [];
        $tickets         = [];
        $total_reg_count = 0;

        foreach ($this->reg_objs as $registration) {
            if (
                ! $registration instanceof EE_Registration
                || $this->_skip_registration_for_processing($registration)
            ) {
                continue;
            }

            // get the attendee, ticket, and event associated with the registrations in this transaction
            $attendee = $registration->attendee();
            $event    = $registration->event();
            $EVT_ID   = $registration->event_ID();
            $ticket   = $registration->ticket();
            // if none of the following entities are available,
            // then we can't set up other data reliably, so let's just skip.
            if (
                ! $ticket instanceof EE_Ticket
                || ! $attendee instanceof EE_Attendee
                || ! $event instanceof EE_Event
            ) {
                continue;
            }
            $ATT_ID           = $attendee->ID();
            $REG_ID           = $registration->ID();
            $TKT_ID           = $ticket->ID();
            $total_reg_count++;

            // event
            $event_setup[ $EVT_ID ]['evt_obj']             = $event;
            $event_setup[ $EVT_ID ]['reg_objs'][ $REG_ID ] = $registration;
            $event_setup[ $EVT_ID ]['tkt_objs'][ $TKT_ID ] = $ticket;
            $event_setup[ $EVT_ID ]['att_objs'][ $ATT_ID ] = $attendee;

            // attendees
            $attendees[ $ATT_ID ]['line_ref'][]            = $EVT_ID;
            $attendees[ $ATT_ID ]['att_obj']               = $attendee;
            $attendees[ $ATT_ID ]['reg_objs'][ $REG_ID ]   = $registration;
            $attendees[ $ATT_ID ]['attendee_email']        = $attendee->email();
            $attendees[ $ATT_ID ]['tkt_objs'][ $TKT_ID ]   = $ticket;
            $attendees[ $ATT_ID ]['evt_objs'][ $EVT_ID ]   = $event;

            $attendee_count[ $EVT_ID ] = isset($attendee_count[ $EVT_ID ])
                ? $attendee_count[ $EVT_ID ] + 1
                : 0;

            // registrations
            $registrations[ $REG_ID ]['tkt_obj'] = $ticket;
            $registrations[ $REG_ID ]['evt_obj'] = $event;
            $registrations[ $REG_ID ]['reg_obj'] = $registration;
            $registrations[ $REG_ID ]['att_obj'] = $attendee;

            // tickets
            $ticket_datetimes = $ticket->datetimes(['default_where_conditions' => 'this_model_only']);
            if (! isset($tickets[ $TKT_ID ])) {
                $tickets[ $TKT_ID ] = [];
            }
            $tickets[ $TKT_ID ]['ticket']                  = $ticket;
            $tickets[ $TKT_ID ]['att_objs'][ $ATT_ID ]     = $attendee;
            $tickets[ $TKT_ID ]['dtt_objs']                = $ticket_datetimes;
            $tickets[ $TKT_ID ]['reg_objs'][ $REG_ID ]     = $registration;
            $tickets[ $TKT_ID ]['EE_Event']                = $event;
            // total ticket count
            $tickets[ $TKT_ID ]['count'] = isset($tickets[ $TKT_ID ]['count'])
                ? $tickets[ $TKT_ID ]['count'] + 1
                : 1;

            // set up answer objects
            $registration_answers = $registration->answers();
            foreach ($registration_answers as $ANS_ID => $answer) {
                if (! isset($questions[ $ANS_ID ])) {
                    $questions[ $ANS_ID ] = $answer->question();
                }
                $answers[ $ANS_ID ]                              = $answer;
                $registrations[ $REG_ID ]['ans_objs'][ $ANS_ID ] = $answer;
            }

            /**
             * @var int         $DTT_ID
             * @var EE_Datetime $datetime
             */
            foreach ($ticket_datetimes as $DTT_ID => $datetime) {
                $event_setup[ $EVT_ID ]['dtt_objs'][ $DTT_ID ]   = $datetime;
                $registrations[ $REG_ID ]['dtt_objs'][ $DTT_ID ] = $datetime;

                if (isset($datetimes[ $DTT_ID ])) {
                    continue; // already have this info in the datetimes array.
                }

                $datetimes[ $DTT_ID ]['tkt_objs'][]          = $ticket;
                $datetimes[ $DTT_ID ]['datetime']            = $datetime;
                $datetimes[ $DTT_ID ]['evt_objs'][ $EVT_ID ] = $event;
                $datetimes[ $DTT_ID ]['reg_objs'][ $REG_ID ] = $registration;
            }
        }

        // let's loop through the unique event=>registration items and setup data on them

        if (! empty($event_setup)) {
            foreach ($event_setup as $EVT_ID => $items) {
                $ticket_line_items_for_event = [];
                if ($this->txn instanceof EE_Transaction) {
                    $ticket_line_items_for_event = EEM_Line_Item::instance()->get_all(
                        [
                            [
                                'Ticket.Datetime.EVT_ID' => $EVT_ID,
                                'TXN_ID'                 => $this->txn->ID(),
                            ],
                            'default_where_conditions' => 'none',
                        ]
                    );
                }
                $events[ $EVT_ID ] = [
                    'ID'              => $EVT_ID,
                    'event'           => $items['evt_obj'],
                    'name'            => $items['evt_obj'] instanceof EE_Event ? $items['evt_obj']->name() : '',
                    'reg_objs'        => $items['reg_objs'],
                    'tkt_objs'        => $items['tkt_objs'],
                    'att_objs'        => $items['att_objs'],
                    'dtt_objs'        => $items['dtt_objs'] ?? [],
                    'line_items'      => $ticket_line_items_for_event,
                    'total_attendees' => $attendee_count[ $EVT_ID ],
                ];

                // make sure the tickets have the line items setup for them.
                foreach ($ticket_line_items_for_event as $line_item) {
                    // only add the ticket line items if we already have this ticket in the $tickets array.
                    if (
                        ! $line_item instanceof EE_Line_Item
                        || $line_item->OBJ_type() !== EEM_Line_Item::OBJ_TYPE_TICKET
                        || ! isset($tickets[ $line_item->ticket()->ID() ])
                    ) {
                        continue;
                    }
                    $tickets[ $line_item->ticket()->ID() ]['line_item']      = $line_item;
                    $tickets[ $line_item->ticket()->ID() ]['sub_line_items'] = $line_item->children();
                    $line_items[ $line_item->ID() ]['children']              = $line_item->children();
                    $line_items[ $line_item->ID() ]['EE_Ticket']             = $line_item->ticket();
                }
            }
        }

        $this->grand_total_line_item = $this->txn instanceof EE_Transaction
            ? $this->txn->total_line_item()
            : null;

        // let's set the attendees and events properties
        $this->attendees                = $attendees;
        $this->events                   = $events;
        $this->tickets                  = $tickets;
        $this->line_items_with_children = $line_items;
        $this->datetimes                = $datetimes;
        $this->questions                = $questions;
        $this->answers                  = $answers;
        $this->total_ticket_count       = $total_reg_count;
        $this->registrations            = $registrations;

        if ($this->txn instanceof EE_Transaction) {
            $this->tax_line_items        = $this->txn->tax_items();
            $this->additional_line_items = $this->txn->non_ticket_line_items();
            $this->payments              = $this->txn->payments();

            // setup primary registration if we have a single transaction object to work with

            // let's get just the primary_attendee_data!  First we get the primary registration object.
            $primary_reg = $this->txn->primary_registration();
            // verify
            if ($primary_reg instanceof EE_Registration) {
                // get attendee object
                if ($primary_reg->attendee() instanceof EE_Attendee) {
                    // now we can set up the primary_attendee_data array
                    $this->primary_attendee_data = [
                        'registration_id' => $primary_reg->ID(),
                        'att_obj'         => $primary_reg->attendee(),
                        'reg_obj'         => $primary_reg,
                        'primary_att_obj' => $primary_reg->attendee(),
                        'primary_reg_obj' => $primary_reg,
                    ];
                } else {
                    EE_Error::add_error(
                        esc_html__(
                            'Incoming data does not have a valid Attendee object for the primary registrant.',
                            'event_espresso'
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            } else {
                EE_Error::add_error(
                    esc_html__(
                        'Incoming data does not have a valid Registration object for the primary registrant.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
    }


    /**
     * This simply considers whether the given registration should be processed or not based on comparison with the
     * filtered_reg_status property.
     *
     * @param EE_Registration $registration
     * @return bool  returning true means we DO want to skip processing.
     *               returning false means we DON'T want to skip processing
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _skip_registration_for_processing(EE_Registration $registration): bool
    {
        return ! empty($this->filtered_reg_status) && $this->filtered_reg_status !== $registration->status_ID();
    }
}
