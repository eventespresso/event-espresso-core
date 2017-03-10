<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 * This prepares data for message types that send messages for multiple registrations (that could span multiple
 * transactions) and handles when the incoming data is an array of EE_Registration objects.
 *
 * @package        Event Espresso
 * @subpackage     messages
 * @since          4.8.36.rc.002
 * @author         Darren Ethier
 */
class EE_Messages_Registrations_incoming_data extends EE_Messages_incoming_data
{


    /**
     * Constructor.
     *
     * @param  EE_Registration[] $data expecting an array of EE_Registration objects.
     * @throws EE_Error
     * @access protected
     */
    public function __construct($data = array())
    {

        //validate that the first element in the array is an EE_Registration object.
        if (! reset($data) instanceof EE_Registration) {
            throw new EE_Error(__('The EE_Message_Registrations_incoming_data class expects an array of EE_Registration objects.',
                'event_espresso'));
        }
        parent::__construct($data);
    }


    /**
     * setup the data.
     * Sets up the expected data object for the messages prep using incoming registration objects.
     *
     * @return void
     * @access protected
     */
    protected function _setup_data()
    {
        //we'll loop through each contact and setup the data needed.  Note that many properties will just be set as empty
        //because this data handler is for a very specific set of data (i.e. just what's related to the registration).

        $this->reg_objs = $this->data();
        $this->txn      = $this->_maybe_get_transaction();
        $this->_assemble_data();
    }


    /**
     * If the incoming registrations all share the same transaction then this will return the transaction object shared
     * among the registrations. Otherwise the transaction object is set to null because its intended to only represent
     * one transaction.
     *
     * @return EE_Transaction|null
     */
    protected function _maybe_get_transaction()
    {
        $transactions = array();
        foreach ($this->reg_objs as $registration) {
            if ($registration instanceof EE_Registration) {
                $transaction = $registration->transaction();
                if ($transaction instanceof EE_Transaction) {
                    $transactions[$transaction->ID()] = $transaction;
                }
            }
        }
        return count($transactions) === 1 ? reset($transactions) : null;
    }


    /**
     * Returns database safe representation of the data later used to when instantiating this object.
     *
     * @param array $registrations The incoming data to be prepped.
     * @return EE_Registration[]   The data being prepared for the db
     */
    static public function convert_data_for_persistent_storage($registrations)
    {
        if (
            ! is_array($registrations)
            || ! reset($registrations) instanceof EE_Registration
        ) {
            return array();
        }

        $registration_ids = array();

        $registration_ids = array_filter(
            array_map(
                function ($registration) {
                    if ($registration instanceof EE_Registration) {
                        return $registration->ID();
                    }
                    return false;
                },
                $registrations
            )
        );

        return $registration_ids;
    }


    /**
     * Data that has been stored in persistent storage that was prepped by _convert_data_for_persistent_storage
     * can be sent into this method and converted back into the format used for instantiating with this data handler.
     *
     * @param array $data
     * @return EE_Registration[]
     */
    static public function convert_data_from_persistent_storage($data)
    {
        //since this was added later, we need to account of possible back compat issues where data already queued for generation
        //is in the old format, which is an array of EE_Registration objects.  So if that's the case, then let's just return them
        //@see https://events.codebasehq.com/projects/event-espresso/tickets/10127
        if (is_array($data) && reset($data) instanceof EE_Registration) {
            return $data;
        }

        $registrations = is_array($data)
            ? EEM_Registration::instance()->get_all(array(array('REG_ID' => array('IN', $data))))
            : array();
        return $registrations;
    }
}
