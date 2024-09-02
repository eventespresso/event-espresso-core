<?php

require_once __DIR__ . '/EE_Processor_Base.class.php';

/**
 * Class EE_Transaction_Processor
 * This class contains business logic pertaining specifically to
 * the interaction of EE_Transaction and EE_Registration model objects
 * Provides methods for manipulating and processing changes to an EE_Transaction
 * and it's related EE_Registrations in regard to the checkout/registration process
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.6.0
 */
class EE_Transaction_Processor extends EE_Processor_Base
{
    private static ?EE_Transaction_Processor $_instance = null;

    /**
     * array of query WHERE params to use when retrieving cached registrations from a transaction
     *
     * @var array $registration_query_params
     */
    private array $_registration_query_params = [];


    /**
     * @singleton method used to instantiate class object
     * @param array $registration_query_params
     * @return EE_Transaction_Processor instance
     */
    public static function instance(array $registration_query_params = []): EE_Transaction_Processor
    {
        // check if class object is instantiated
        if (! self::$_instance instanceof EE_Transaction_Processor) {
            self::$_instance = new self($registration_query_params);
        }
        return self::$_instance;
    }


    /**
     * @param array $registration_query_params
     */
    private function __construct(array $registration_query_params = [])
    {
        // make sure some query params are set for retrieving registrations
        $this->_set_registration_query_params($registration_query_params);
    }


    /**
     * @param array $registration_query_params
     */
    private function _set_registration_query_params(array $registration_query_params)
    {
        $this->_registration_query_params = ! empty($registration_query_params)
            ? $registration_query_params
            : ['order_by' => ['REG_count' => 'ASC']];
    }


    /**
     * manually_update_registration_statuses
     *
     * @param EE_Transaction $transaction
     * @param string         $new_reg_status
     * @param array          $registration_query_params array of query WHERE params to use
     *                                                  when retrieving cached registrations from a transaction
     * @return    boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function manually_update_registration_statuses(
        EE_Transaction $transaction,
        string $new_reg_status = '',
        array $registration_query_params = []
    ): bool {
        $status_updates = $this->_call_method_on_registrations_via_Registration_Processor(
            'manually_update_registration_status',
            $transaction,
            $registration_query_params,
            $new_reg_status
        );
        // send messages
        /** @type EE_Registration_Processor $registration_processor */
        $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
        $registration_processor->trigger_registration_update_notifications(
            $transaction->primary_registration(),
            ['manually_updated' => true]
        );
        do_action(
            'AHEE__EE_Transaction_Processor__manually_update_registration_statuses',
            $transaction,
            $status_updates
        );
        return $status_updates;
    }


    /**
     * update_transaction_and_registrations_after_checkout_or_payment
     * cycles thru related registrations and calls update_registration_after_checkout_or_payment() on each
     *
     * @param EE_Transaction  $transaction
     * @param EE_Payment|null $payment
     * @param array           $registration_query_params array of query WHERE params to use
     *                                                   when retrieving cached registrations from a transaction
     * @param bool            $trigger_notifications     whether to call EE_Registration_Processor::trigger_registration_update_notifications()
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update_transaction_and_registrations_after_checkout_or_payment(
        EE_Transaction $transaction,
        ?EE_Payment $payment = null,
        array $registration_query_params = [],
        bool $trigger_notifications = true
    ): array {
        // make sure some query params are set for retrieving registrations
        $this->_set_registration_query_params($registration_query_params);
        // get final reg step status
        $finalized = $transaction->final_reg_step_completed();
        // if the 'finalize_registration' step has been initiated (has a timestamp)
        // but has not yet been fully completed (TRUE)
        if (is_int($finalized)) {
            $transaction->set_reg_step_completed('finalize_registration');
            $finalized = true;
        }
        $transaction->save();
        // array of details to aid in decision-making by systems
        $update_params = [
            'old_txn_status'  => $transaction->old_txn_status(),
            'new_txn_status'  => $transaction->status_ID(),
            'finalized'       => $finalized,
            'revisit'         => $this->_revisit,
            'payment_updates' => $payment instanceof EE_Payment,
            'last_payment'    => $payment,
        ];
        // now update the registrations and add the results to our $update_params
        $update_params['status_updates'] = $this->_call_method_on_registrations_via_Registration_Processor(
            'update_registration_after_checkout_or_payment',
            $transaction,
            $this->_registration_query_params,
            $update_params
        );
        if ($trigger_notifications) {
            // send messages
            /** @type EE_Registration_Processor $registration_processor */
            $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
            $registration_processor->trigger_registration_update_notifications(
                $transaction->primary_registration(),
                $update_params
            );
        }
        do_action(
            'AHEE__EE_Transaction_Processor__update_transaction_and_registrations_after_checkout_or_payment',
            $transaction,
            $update_params
        );
        return $update_params;
    }


    /**
     * update_transaction_after_registration_reopened
     * readjusts TXN and Line Item totals after a registration is changed from
     * cancelled or declined to another reg status such as pending payment or approved
     *
     * @param EE_Registration $registration
     * @param array           $closed_reg_statuses
     * @param bool            $update_txn
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update_transaction_after_reinstating_canceled_registration(
        EE_Registration $registration,
        array $closed_reg_statuses = [],
        bool $update_txn = true
    ): bool {
        // these reg statuses should not be considered in any calculations involving monies owing
        $closed_reg_statuses = ! empty($closed_reg_statuses)
            ? $closed_reg_statuses
            : EEM_Registration::closed_reg_statuses();
        if (in_array($registration->status_ID(), $closed_reg_statuses, true)) {
            return false;
        }
        try {
            $transaction      = $registration->transaction();
            $ticket_line_item = $this->getTicketLineItemForRegistration($registration);
            // un-cancel the ticket
            $success = EEH_Line_Item::reinstate_canceled_ticket_line_item($ticket_line_item);
        } catch (EE_Error $e) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'The Ticket Line Item for Registration %1$d could not be reinstated because :%2$s%3$s',
                        'event_espresso'
                    ),
                    $registration->ID(),
                    '<br />',
                    $e->getMessage()
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        if ($update_txn) {
            return $transaction->save()
                ? $success
                : false;
        }
        return $success;
    }


    /**
     * update_transaction_after_canceled_or_declined_registration
     * readjusts TXN and Line Item totals after a registration is cancelled or declined
     *
     * @param EE_Registration $registration
     * @param array           $closed_reg_statuses
     * @param bool            $update_txn
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update_transaction_after_canceled_or_declined_registration(
        EE_Registration $registration,
        array $closed_reg_statuses = [],
        bool $update_txn = true
    ): bool {
        // these reg statuses should not be considered in any calculations involving monies owing
        $closed_reg_statuses = ! empty($closed_reg_statuses)
            ? $closed_reg_statuses
            : EEM_Registration::closed_reg_statuses();
        if (! in_array($registration->status_ID(), $closed_reg_statuses, true)) {
            return false;
        }
        try {
            $transaction = $registration->transaction();
            if (
                apply_filters(
                    'FHEE__EE_Transaction_Processor__update_transaction_after_canceled_or_declined_registration__cancel_ticket_line_item',
                    true,
                    $registration,
                    $transaction
                )
            ) {
                $ticket_line_item = $this->getTicketLineItemForRegistration($registration);
                EEH_Line_Item::cancel_ticket_line_item($ticket_line_item);
            }
        } catch (EE_Error $e) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'The Ticket Line Item for Registration %1$d could not be cancelled because :%2$s%3$s',
                        'event_espresso'
                    ),
                    $registration->ID(),
                    '<br />',
                    $e->getMessage()
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return ! $update_txn || $transaction->save();
    }


    /**
     * @param EE_Registration $registration
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getTicketLineItemForRegistration(EE_Registration $registration): EE_Line_Item
    {
        $ticket_line_item = EEM_Line_Item::instance()->get_ticket_line_item_for_transaction(
            $registration->transaction_ID(),
            $registration->ticket_ID()
        );
        if ($ticket_line_item instanceof EE_Line_Item) {
            return $ticket_line_item;
        }
        throw new EE_Error(
            sprintf(
                esc_html__(
                    'The Line Item for Transaction %1$d and Ticket %2$d was not found or is invalid.',
                    'event_espresso'
                ),
                $registration->transaction_ID(),
                $registration->ticket_ID()
            )
        );
    }


    /**
     * cancel_transaction_if_all_registrations_canceled
     * cycles thru related registrations and checks their statuses
     * if ALL registrations are Cancelled or Declined, then this sets the TXN status to
     *
     * @param EE_Transaction $transaction
     * @param string         $new_TXN_status
     * @param array          $registration_query_params    - array of query WHERE params to use when
     *                                                     retrieving cached registrations from a transaction
     * @param array          $closed_reg_statuses
     * @param bool           $update_txn
     * @return    bool            true if TXN status was updated, false if not
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function toggle_transaction_status_if_all_registrations_canceled_or_declined(
        EE_Transaction $transaction,
        string $new_TXN_status = '',
        array $registration_query_params = [],
        array $closed_reg_statuses = [],
        bool $update_txn = true
    ): bool {
        // make sure some query params are set for retrieving registrations
        $this->_set_registration_query_params($registration_query_params);
        // these reg statuses should not be considered in any calculations involving monies owing
        $closed_reg_statuses = ! empty($closed_reg_statuses)
            ? $closed_reg_statuses
            : EEM_Registration::closed_reg_statuses();
        // loop through cached registrations
        foreach ($transaction->registrations($this->_registration_query_params) as $registration) {
            if (
                $registration instanceof EE_Registration
                && ! in_array($registration->status_ID(), $closed_reg_statuses)
            ) {
                return false;
            }
        }
        if (in_array($new_TXN_status, EEM_Transaction::txn_status_array())) {
            $transaction->set_status($new_TXN_status);
        }
        if ($update_txn) {
            return (bool) $transaction->save();
        }
        return true;
    }


    /**
     * _call_method_on_registrations_via_Registration_Processor
     * cycles thru related registrations and calls the requested method on each
     *
     * @param string            $method_name
     * @param EE_Transaction    $transaction
     * @param array             $registration_query_params array of query WHERE params to use
     *                                                     when retrieving cached registrations from a transaction
     * @param array|string|null $additional_param
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _call_method_on_registrations_via_Registration_Processor(
        string $method_name,
        EE_Transaction $transaction,
        array $registration_query_params = [],
        $additional_param = null
    ): bool {
        $response = false;
        /** @type EE_Registration_Processor $registration_processor */
        $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
        // check that method exists
        if (! method_exists($registration_processor, $method_name)) {
            throw new EE_Error(esc_html__('Method does not exist.', 'event_espresso'));
        }
        // make sure some query params are set for retrieving registrations
        $this->_set_registration_query_params($registration_query_params);
        // loop through cached registrations
        foreach ($transaction->registrations($this->_registration_query_params) as $registration) {
            if ($registration instanceof EE_Registration) {
                if ($additional_param) {
                    $response = $registration_processor->{$method_name}($registration, $additional_param)
                        ? true
                        : $response;
                } else {
                    $response = $registration_processor->{$method_name}($registration)
                        ? true
                        : $response;
                }
            }
        }
        return (bool) $response;
    }


    /**
     * set_transaction_payment_method_based_on_registration_statuses
     * sets or unsets the PMD_ID field on the TXN based on the related REG statuses
     * basically if ALL Registrations are "Not Approved", then the EE_Transaction.PMD_ID is set to null,
     * but if any Registration has a different status, then EE_Transaction.PMD_ID is set to either:
     *        the first "default" Payment Method
     *        the first active Payment Method
     *    whichever is found first.
     *
     * @param EE_Registration $edited_registration
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_transaction_payment_method_based_on_registration_statuses(
        EE_Registration $edited_registration
    ) {
        $transaction      = $edited_registration->transaction();
        $all_not_approved = true;
        foreach ($transaction->registrations() as $registration) {
            if ($registration instanceof EE_Registration) {
                // if any REG != "Not Approved" then toggle to false
                $all_not_approved = $registration->is_not_approved()
                    ? $all_not_approved
                    : false;
            }
        }
        // if ALL Registrations are "Not Approved"
        if ($all_not_approved) {
            $transaction->set_payment_method_ID(0);
            $transaction->save();
        } else {
            $available_payment_methods = EEM_Payment_Method::instance()->get_all_for_transaction(
                $transaction,
                EEM_Payment_Method::scope_cart
            );
            if (! empty($available_payment_methods)) {
                $PMD_ID = 0;
                foreach ($available_payment_methods as $available_payment_method) {
                    if (
                        $available_payment_method instanceof EE_Payment_Method
                        && $available_payment_method->open_by_default()
                    ) {
                        $PMD_ID = $available_payment_method->ID();
                        break;
                    }
                }
                if (! $PMD_ID) {
                    $first_payment_method = reset($available_payment_methods);
                    if ($first_payment_method instanceof EE_Payment_Method) {
                        $PMD_ID = $first_payment_method->ID();
                    } else {
                        EE_Error::add_error(
                            esc_html__(
                                'A valid Payment Method could not be determined. Please ensure that at least one Payment Method is activated.',
                                'event_espresso'
                            ),
                            __FILE__,
                            __LINE__,
                            __FUNCTION__
                        );
                    }
                }
                $transaction->set_payment_method_ID($PMD_ID);
                $transaction->save();
            } else {
                EE_Error::add_error(
                    esc_html__(
                        'Please activate at least one Payment Method in order for things to operate correctly.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __LINE__,
                    __FUNCTION__
                );
            }
        }
    }



    /********************************** DEPRECATED METHODS **********************************/


    /**
     * @param EE_Registration $registration
     * @return EE_Transaction
     * @throws EE_Error
     * @throws ReflectionException
     * @depecated 5.0.25.p
     */
    public function get_transaction_for_registration(EE_Registration $registration): EE_Transaction
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'This logic is no longer necessary. Please just call EE_Registration::transaction() instead.',
                'event_espresso'
            ),
            '5.0.25.p',
            '6.0.0'
        );
        return $registration->transaction();
    }


    /**
     * @param EE_Transaction  $transaction
     * @param EE_Registration $registration
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws ReflectionException
     * @depecated 5.0.25.p
     */
    public function get_ticket_line_item_for_transaction_registration(
        EE_Transaction $transaction,
        EE_Registration $registration
    ): EE_Line_Item {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'This logic been replaced by EE_Transaction_Processor::getTicketLineItemForRegistration(). Please use that method instead.',
                'event_espresso'
            ),
            '5.0.25.p',
            '6.0.0'
        );
        return $this->getTicketLineItemForRegistration($registration);
    }


    /**
     * toggle_registration_statuses_for_default_approved_events
     *
     * @param EE_Transaction $transaction
     * @param array          $registration_query_params array of query WHERE params to use
     *                                                  when retrieving cached registrations from a transaction
     * @return    boolean
     * @throws EE_Error
     * @throws ReflectionException
     * @depecated 5.0.25.p
     */
    public function toggle_registration_statuses_for_default_approved_events(
        EE_Transaction $transaction,
        array $registration_query_params = []
    ): bool {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'This logic been replaced by EE_Registration_Processor::toggle_registration_status_for_default_approved_events(). Please use that method instead.',
                'event_espresso'
            ),
            '5.0.25.p',
            '6.0.0'
        );
        $status_updates = $this->_call_method_on_registrations_via_Registration_Processor(
            'toggle_registration_status_for_default_approved_events',
            $transaction,
            $registration_query_params
        );
        do_action(
            'AHEE__EE_Transaction_Processor__toggle_registration_statuses_for_default_approved_events',
            $transaction,
            $status_updates
        );
        return $status_updates;
    }


    /**
     * toggle_registration_statuses_if_no_monies_owing
     *
     * @param EE_Transaction $transaction
     * @param array          $registration_query_params array of query WHERE params to use
     *                                                  when retrieving cached registrations from a transaction
     * @return    boolean
     * @throws EE_Error
     * @throws ReflectionException
     * @depecated 5.0.25.p
     */
    public function toggle_registration_statuses_if_no_monies_owing(
        EE_Transaction $transaction,
        array $registration_query_params = []
    ): bool {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'This logic been replaced by EE_Registration_Processor::toggle_registration_status_if_no_monies_owing(). Please use that method instead.',
                'event_espresso'
            ),
            '5.0.25.p',
            '6.0.0'
        );
        $status_updates = $this->_call_method_on_registrations_via_Registration_Processor(
            'toggle_registration_status_if_no_monies_owing',
            $transaction,
            $registration_query_params
        );
        do_action(
            'AHEE__EE_Transaction_Processor__toggle_registration_statuses_if_no_monies_owing',
            $transaction,
            $status_updates
        );
        return $status_updates;
    }
}
