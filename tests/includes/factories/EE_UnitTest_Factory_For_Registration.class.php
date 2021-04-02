<?php

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');

use EventEspresso\core\domain\entities\RegUrlLink;
use EventEspresso\core\domain\entities\RegCode;

/**
 * EE Factory Class for registrations
 *
 * @since          4.3.0
 * @package        Event Espresso
 * @subpackage     tests
 */
class EE_UnitTest_Factory_For_Registration extends WP_UnitTest_Factory_For_Thing
{

    /**
     * Registrations are related to a transaction - this is used when automatically generating a transaction object to
     * relate to the registration.
     *
     * @since  4.3.0
     * @var EE_Transaction
     */
    protected $_transaction;

    /**
     * Registrations are related to a ticket.
     *
     * @since 4.3.0
     * @var   EE_Ticket
     */
    protected $_ticket;

    /**
     * Registrations are related to an Attendee.
     *
     * @since 4.3.0
     * @var   EE_Attendee
     */
    protected $_attendee;

    /**
     * STS_ID for the Registration
     *
     * @since 4.3.0
     * @var string
     */
    protected $_status;

    /**
     * Used to indicate whether the generated objects are chained in the EE Model Hierarchy or not.  Note that the only
     * relations that are automatically generated and setup when the chained method is use are,  Registrations->Tickets
     * (which also means the EVT_ID is set), Registrations->transaction, Registrations->attendee,
     * Registrations->status.  Registrations to custom questions and answers are NOT set.  Also the transaction is just
     * a base transaction, there are NO relations via transaction to line items.
     *
     * @var bool
     */
    protected $_chained;


    /**
     * constructor
     *
     * @param EE_UnitTest_Factory $factory
     * @param bool                $chained This indicates that we are chaining this registrations to related objects.
     */
    public function __construct($factory = null, $chained = false)
    {
        parent::__construct($factory);
        $this->_chained = $chained;
        //default args for creating registrations
        $this->default_generation_definitions = array(
            'REG_url_link' => new WP_UnitTest_Generator_Sequence('%s-' . md5(uniqid())),
        );
    }


    /**
     * This generates the dummy relation objects for use in a new registration.
     *
     * @since 4.3.0
     * @param array $args
     * @throws EE_Error
     */
    private function _set_new_relations($args)
    {
        //transaction
        $this->_transaction = empty($args['TXN_ID'])
            ? $this->factory->transaction->create()
            : EEM_Transaction::instance()->get_one_by_ID($args['TXN_ID']);
        $this->_transaction = empty($this->_transaction) ? $this->factory->transaction->create() : $this->_transaction;
        //set line item
        $total_line_item = EEH_Line_Item::create_total_line_item($this->_transaction->ID());
        $total_line_item->save_this_and_descendants_to_txn($this->_transaction->ID());
        //ticket
        $this->_ticket = empty($args['TKT_ID'])
            ? $this->factory->ticket_chained->create()
            : EEM_Ticket::instance()->get_one_by_ID($args['TKT_ID']);
        $this->_ticket = empty($this->_ticket) ? $this->factory->ticket_chained->create() : $this->_ticket;

        //set price on ticket
        $this->_ticket->set_price(10);
        /** @var EE_Price $price */
        $price = $this->factory->price_chained->create();
        $price->set_amount(10);
        $this->_ticket->_add_relation_to($price, 'Price');
        $this->_ticket->save();
        EEH_Line_Item::add_ticket_purchase($total_line_item, $this->_ticket);
        $this->_transaction->set_total($total_line_item->total());
        $this->_transaction->save();

        //attendee
        $this->_attendee = empty($args['ATT_ID'])
            ? $this->factory->attendee->create()
            : EEM_Attendee::instance()->get_one_by_ID($args['ATT_ID']);
        $this->_attendee = empty($this->_attendee) ? $this->factory->attendee->create() : $this->_attendee;
        //status
        $this->_status = empty($args['STS_ID'])
            ? EEM_Registration::status_id_pending_payment
            : $args['STS_ID'];
    }


    /**
     * This handles connecting a registration to related items when the chained flag is true.
     *
     * @since 4.3.0
     * @param EE_Registration $registration
     * @param array           $args incoming arguments from caller for specifying overrides.
     * @return EE_Registration
     * @throws EE_Error
     * @throws RuntimeException
     */
    private function _maybe_chained(EE_Registration $registration, $args)
    {
        if ($this->_chained) {
            if (empty($this->_transaction)
                || empty($this->_ticket)
                || empty($this->_attendee)
                || empty($this->_status)
            ) {
                $this->_set_new_relations($args);
            }
            //add relation to transaction
            $registration->_add_relation_to($this->_transaction, 'Transaction');
            //add relation to ticket
            $registration->_add_relation_to($this->_ticket, 'Ticket');
            //add relation to event
            $event = $this->_ticket->get_first_related('Datetime')->get_first_related('Event');
            $registration->_add_relation_to($event, 'Event');
            //add relation to attendee
            $registration->_add_relation_to($this->_attendee, 'Attendee');
            //add relation to status (just set the registration object to have the STS_ID)
            $registration->set_status($this->_status);
            $registration->save();
            return $registration;
        }
        return $registration;
    }


    /**
     * used by factory to create registration object.
     *
     * @since 4.3.0
     * @param array $args Incoming field values to set on the new object
     * @return EE_Registration|false
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws RuntimeException
     * @throws \EventEspresso\core\exceptions\EntityNotFoundException
     */
    public function create_object($args)
    {
        static $att_nmbr = 0;
        //timezone?
        if (isset($args['timezone'])) {
            $timezone = $args['timezone'];
            unset($args['timezone']);
        } else {
            $timezone = '';
        }
        //date_formats?
        if (isset($args['formats']) && is_array($args['formats'])) {
            $formats = $args['formats'];
            unset($args['formats']);
        } else {
            $formats = array();
        }
        $registration = EE_Registration::new_instance($args, $timezone, $formats);
        //some things have to be set after the registration has been instantiated.
        $registration->set('REG_session', uniqid());
        $registrationID = $registration->save();
        $registration   = $this->_maybe_chained($registration, $args);
        //only run finalize if $chained because it requires EE_Transaction
        if ($this->_chained) {
            $att_nmbr++;
            $reg_url_link = new RegUrlLink($att_nmbr, md5('ticket' . $registrationID . time()));
            $registration->set_reg_url_link($reg_url_link);
            $registration->set_reg_code(
                new RegCode(
                    $reg_url_link,
                    $registration->transaction(),
                    $registration->ticket()
                )
            );
            $registration->save();
        }
        return $registrationID ? $registration : false;
    }


    /**
     * Update registration object for given registration.
     *
     * @since 4.3.0
     * @param int   $REG_ID      Registration ID for the registration to update
     * @param array $cols_n_data columns and values to change/update
     * @return EE_Registration|false .
     * @throws EE_Error
     */
    public function update_object($REG_ID, $cols_n_data)
    {
        //all the stuff for updating an registration.
        $registration = EEM_Registration::instance()->get_one_by_ID($REG_ID);
        if (! $registration instanceof EE_Registration) {
            return null;
        }
        foreach ($cols_n_data as $key => $val) {
            $registration->set($key, $val);
        }
        $success = $registration->save();
        return $success ? $registration : false;
    }


    /**
     * return the registration object for a given registration ID.
     *
     * @since 4.3.0
     * @param int $REG_ID the registration id for the registration to attempt to retrieve
     * @return mixed null|EE_Registration
     */
    public function get_object_by_id($REG_ID)
    {
        return EEM_Registration::instance()->get_one_by_ID($REG_ID);
    }
}
