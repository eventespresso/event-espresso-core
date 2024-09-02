<?php

use EventEspresso\core\domain\entities\contexts\Context;
use EventEspresso\core\domain\entities\contexts\ContextInterface;
use EventEspresso\core\domain\services\registration\RegStatus;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;

require_once __DIR__ . '/EE_Processor_Base.class.php';

/**
 * Class EE_Registration_Processor
 * Provides method for manipulating and processing changes in regard to an EE_Registration
 *
 * @package     Event Espresso
 * @subpackage  core
 * @author      Brent Christensen
 * @since       4.6.0
 */
class EE_Registration_Processor extends EE_Processor_Base
{
    private static ?EE_Registration_Processor $_instance = null;

    protected RequestInterface $request;

    /**
     * initial reg status at the beginning of this request.
     * indexed by registration ID
     *
     * @var array
     */
    protected array $_old_reg_status = [];

    /**
     * reg status at the end of the request after all processing.
     * indexed by registration ID
     *
     * @var array
     */
    protected array $_new_reg_status = [];

    /**
     * amounts paid at the end of the request after all processing.
     * indexed by registration ID
     *
     * @var array
     */
    protected static array $_amount_paid = [];


    /**
     * @singleton method used to instantiate class object
     * @param RequestInterface|null $request
     * @return EE_Registration_Processor instance
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function instance(RequestInterface $request = null): EE_Registration_Processor
    {
        // check if class object is instantiated
        if (! self::$_instance instanceof EE_Registration_Processor) {
            if (! $request instanceof RequestInterface) {
                $request = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\request\Request');
            }
            self::$_instance = new self($request);
        }
        return self::$_instance;
    }


    /**
     * EE_Registration_Processor constructor.
     *
     * @param RequestInterface $request
     */
    public function __construct(RequestInterface $request)
    {
        $this->request = $request;
    }


    /**
     * @param int $REG_ID
     * @return string
     */
    public function old_reg_status(int $REG_ID): ?string
    {
        return $this->_old_reg_status[ $REG_ID ] ?? null;
    }


    /**
     * @param int    $REG_ID
     * @param string $old_reg_status
     */
    public function set_old_reg_status(int $REG_ID, string $old_reg_status)
    {
        // only set the first time
        if (! isset($this->_old_reg_status[ $REG_ID ])) {
            $this->_old_reg_status[ $REG_ID ] = $old_reg_status;
        }
    }


    /**
     * @param int $REG_ID
     * @return string
     */
    public function new_reg_status(int $REG_ID): ?string
    {
        return $this->_new_reg_status[ $REG_ID ] ?? null;
    }


    /**
     * @param int    $REG_ID
     * @param string $new_reg_status
     */
    public function set_new_reg_status(int $REG_ID, string $new_reg_status)
    {
        $this->_new_reg_status[ $REG_ID ] = $new_reg_status;
    }


    /**
     * @param int $REG_ID
     * @return bool
     */
    public function reg_status_updated(int $REG_ID): bool
    {
        return $this->new_reg_status($REG_ID) !== $this->old_reg_status($REG_ID);
    }


    /**
     * @param EE_Registration $registration
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    public function update_registration_status_and_trigger_notifications(EE_Registration $registration)
    {
        $this->toggle_incomplete_registration_status_to_default(
            $registration,
            false,
            new Context(
                __METHOD__,
                esc_html__(
                    'Executed when the registration status is updated during the registration process just prior to triggering notifications.',
                    'event_espresso'
                )
            )
        );
        $this->toggle_registration_status_for_default_approved_events($registration, false);
        $this->toggle_registration_status_if_no_monies_owing($registration, false);
        $registration->save();
        // trigger notifications
        $this->trigger_registration_update_notifications($registration);
    }


    /**
     * @param EE_Registration $registration
     * @param string          $new_reg_status
     * @param bool            $save            TRUE will save the registration if the status is updated,
     *                                         FALSE will leave that up to client code
     * @return bool
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    public function manually_update_registration_status(
        EE_Registration $registration,
        string $new_reg_status = '',
        bool $save = true
    ): bool {
        // set initial REG_Status
        $this->set_old_reg_status($registration->ID(), $registration->status_ID());
        // set incoming REG_Status
        $this->set_new_reg_status($registration->ID(), $new_reg_status);
        // toggle reg status but only if it has changed and the user can do so
        if (
            $this->reg_status_updated($registration->ID())
            && (
                (! $this->request->isAdmin() || $this->request->isFrontAjax())
                || EE_Registry::instance()->CAP->current_user_can(
                    'ee_edit_registration',
                    'toggle_registration_status',
                    $registration->ID()
                )
            )
        ) {
            // change status to new value
            $updated = $registration->set_status(
                $this->new_reg_status($registration->ID()),
                false,
                new Context(
                    __METHOD__,
                    esc_html__(
                        'Executed when the registration status is manually updated during the reg process.',
                        'event_espresso'
                    )
                )
            );
            if ($updated && $save) {
                $registration->save();
            }
            return true;
        }
        return false;
    }


    /**
     * changes any incomplete registrations to either the event or global default registration status
     *
     * @param EE_Registration       $registration
     * @param bool                  $save           TRUE will save the registration if the status is updated,
     *                                              FALSE will leave that up to client code
     * @param ContextInterface|null $context
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws EntityNotFoundException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function toggle_incomplete_registration_status_to_default(
        EE_Registration $registration,
        bool $save = true,
        ?ContextInterface $context = null
    ) {
        $existing_reg_status = $registration->status_ID();
        // set initial REG_Status
        $this->set_old_reg_status($registration->ID(), $existing_reg_status);
        // is the registration currently incomplete ?
        if ($registration->status_ID() === RegStatus::INCOMPLETE) {
            // grab default reg status for the event, if set
            $event_default_registration_status = $registration->defaultRegistrationStatus();
            // if no default reg status is set for the event, then use the global value
            $STS_ID = ! empty($event_default_registration_status)
                ? $event_default_registration_status
                : EE_Registry::instance()->CFG->registration->default_STS_ID;
            // if the event default reg status is approved, then downgrade temporarily to payment pending to ensure that payments are triggered
            $STS_ID = $STS_ID === RegStatus::APPROVED
                ? RegStatus::PENDING_PAYMENT
                : $STS_ID;
            // set incoming REG_Status
            $this->set_new_reg_status($registration->ID(), $STS_ID);
            $context = $context instanceof ContextInterface
                ? $context
                : new Context(
                    __METHOD__,
                    esc_html__(
                        'Executed when the registration status is updated to the default reg status during the registration process.',
                        'event_espresso'
                    )
                );
            $registration->set_status($STS_ID, false, $context);
            if ($save) {
                $registration->save();
            }
            // don't trigger notifications during IPNs because they will get triggered by
            // EventEspresso\core\services\payments\PostPaymentProcessor
            if (! EE_Processor_Base::$IPN) {
                // otherwise, send out notifications
                add_filter('FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_true');
            }
            // DEBUG LOG
            // $this->log(
            //     __CLASS__,
            //     __FUNCTION__,
            //     __LINE__,
            //     $registration->transaction(),
            //     array(
            //         'IPN' => EE_Processor_Base::$IPN,
            //         'deliver_notifications' => has_filter(
            //             'FHEE__EED_Messages___maybe_registration__deliver_notifications'
            //         ),
            //     )
            // );
        }
    }


    /**
     * @param EE_Registration $registration
     * @param bool            $save         TRUE will save the registration if the status is updated,
     *                                      FALSE will leave that up to client code
     * @return bool
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    public function toggle_registration_status_for_default_approved_events(
        EE_Registration $registration,
        bool $save = true
    ): bool {
        $reg_status = $registration->status_ID();
        // set initial REG_Status
        $this->set_old_reg_status($registration->ID(), $reg_status);
        // if not already, toggle reg status to approved IF the event default reg status is approved
        // ( as long as the registration wasn't cancelled or declined at some point )
        if (
            $reg_status !== RegStatus::CANCELLED
            && $reg_status !== RegStatus::DECLINED
            && $reg_status !== RegStatus::APPROVED
            && $registration->defaultRegistrationStatus() === RegStatus::APPROVED
        ) {
            // set incoming REG_Status
            $this->set_new_reg_status($registration->ID(), RegStatus::APPROVED);
            // toggle status to approved
            $registration->set_status(
                RegStatus::APPROVED,
                false,
                new Context(
                    __METHOD__,
                    esc_html__(
                        'Executed when the registration status is updated for events with a default reg status of RegStatus::APPROVED.',
                        'event_espresso'
                    )
                )
            );
            if ($save) {
                $registration->save();
            }
            // don't trigger notifications during IPNs because they will get triggered by
            // EventEspresso\core\services\payments\PostPaymentProcessor
            if (! EE_Processor_Base::$IPN) {
                // otherwise, send out notifications
                add_filter('FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_true');
            }
            // DEBUG LOG
            // $this->log(
            //     __CLASS__,
            //     __FUNCTION__,
            //     __LINE__,
            //     $registration->transaction(),
            //     array(
            //         'IPN' => EE_Processor_Base::$IPN,
            //         'deliver_notifications' => has_filter(
            //             'FHEE__EED_Messages___maybe_registration__deliver_notifications'
            //         ),
            //     )
            // );
            return true;
        }
        return false;
    }


    /**
     *    toggle_registration_statuses_if_no_monies_owing
     *
     * @param EE_Registration $registration
     * @param bool            $save                 TRUE will save the registration if the status is updated,
     *                                              FALSE will leave that up to client code
     * @param array           $additional_details
     * @return bool
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    public function toggle_registration_status_if_no_monies_owing(
        EE_Registration $registration,
        bool $save = true,
        array $additional_details = []
    ): bool {
        // set initial REG_Status
        $this->set_old_reg_status($registration->ID(), $registration->status_ID());
        // was a payment just made ?
        $payment    = isset($additional_details['payment_updates'], $additional_details['last_payment'])
        && $additional_details['payment_updates']
        && $additional_details['last_payment'] instanceof EE_Payment
            ? $additional_details['last_payment']
            : null;
        $total_paid = array_sum(self::$_amount_paid);
        // toggle reg status to approved IF
        if (
            // REG status is pending payment
            $registration->status_ID() === RegStatus::PENDING_PAYMENT
            // AND no monies are owing
            && (
                (
                    $registration->transaction()->is_completed()
                    || $registration->transaction()->is_overpaid()
                    || $registration->transaction()->is_free()
                    || apply_filters(
                        'FHEE__EE_Registration_Processor__toggle_registration_status_if_no_monies_owing',
                        false,
                        $registration
                    )
                )
                || (
                    $payment instanceof EE_Payment && $payment->is_approved()
                    // this specific registration has not yet been paid for
                    && ! isset(self::$_amount_paid[ $registration->ID() ])
                    // payment amount, less what we have already attributed to other registrations,
                    // is greater than this registration's final price
                    && $payment->amount() - $total_paid >= $registration->final_price()
                )
            )
        ) {
            // mark as paid
            self::$_amount_paid[ $registration->ID() ] = $registration->final_price();
            // track new REG_Status
            $this->set_new_reg_status($registration->ID(), RegStatus::APPROVED);
            // toggle status to approved
            $registration->set_status(
                RegStatus::APPROVED,
                false,
                new Context(
                    __METHOD__,
                    esc_html__(
                        'Executed when the registration status is updated to RegStatus::APPROVED when no monies are owing.',
                        'event_espresso'
                    )
                )
            );
            if ($save) {
                $registration->save();
            }
            // don't trigger notifications during IPNs because they will get triggered by
            // EventEspresso\core\services\payments\PostPaymentProcessor
            if (! EE_Processor_Base::$IPN) {
                // otherwise, send out notifications
                add_filter('FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_true');
            }
            // DEBUG LOG
            // $this->log(
            //     __CLASS__,
            //     __FUNCTION__,
            //     __LINE__,
            //     $registration->transaction(),
            //     array(
            //         'IPN' => EE_Processor_Base::$IPN,
            //         'deliver_notifications' => has_filter(
            //             'FHEE__EED_Messages___maybe_registration__deliver_notifications'
            //         ),
            //     )
            // );
            return true;
        }
        return false;
    }


    /**
     * @param EE_Registration|null $registration
     * @param array                $additional_details
     * @return void
     */
    public function trigger_registration_update_notifications(
        ?EE_Registration $registration,
        array $additional_details = []
    ) {
        try {
            if (! $registration instanceof EE_Registration) {
                throw new EE_Error(
                    esc_html__('An invalid registration was received.', 'event_espresso')
                );
            }
            // EE_Registry::instance()->load_helper('Debug_Tools');
            // EEH_Debug_Tools::log(
            //     __CLASS__,
            //     __FUNCTION__,
            //     __LINE__,
            //     array($registration->transaction(), $additional_details),
            //     false,
            //     'EE_Transaction: ' . $registration->transaction()->ID()
            // );
            if (
                ! $this->request->getRequestParam('non_primary_reg_notification', 0, 'int')
                && ! $registration->is_primary_registrant()
            ) {
                return;
            }
            do_action(
                'AHEE__EE_Registration_Processor__trigger_registration_update_notifications',
                $registration,
                $additional_details
            );
        } catch (Exception $e) {
            EE_Error::add_error($e->getMessage(), $e->getFile(), 'unknown_function_from_exception', $e->getLine());
        }
    }


    /**
     * sets reg status based either on passed param or on transaction status and event pre-approval setting
     *
     * @param EE_Registration $registration
     * @param array           $additional_details
     * @return bool
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    public function update_registration_after_checkout_or_payment(
        EE_Registration $registration,
        array $additional_details = []
    ): bool {
        // set initial REG_Status
        $this->set_old_reg_status($registration->ID(), $registration->status_ID());
        // if the registration status gets updated, then save the registration
        if (
            $this->toggle_registration_status_for_default_approved_events($registration, false)
            || $this->toggle_registration_status_if_no_monies_owing(
                $registration,
                false,
                $additional_details
            )
        ) {
            $registration->save();
        }
        // set new  REG_Status
        $this->set_new_reg_status($registration->ID(), $registration->status_ID());
        return $this->reg_status_updated($registration->ID())
            && $this->new_reg_status($registration->ID()) === RegStatus::APPROVED;
    }


    /**
     * Updates the registration' final prices based on the current line item tree (taking into account
     * discounts, taxes, and other line items unrelated to tickets.)
     *
     * @param EE_Transaction $transaction
     * @param boolean        $save_regs whether to immediately save registrations in this function or not
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RuntimeException
     * @throws ReflectionException
     */
    public function update_registration_final_prices(EE_Transaction $transaction, bool $save_regs = true)
    {
        $reg_final_price_per_ticket_line_item = EEH_Line_Item::calculate_reg_final_prices_per_line_item(
            $transaction->total_line_item()
        );
        foreach ($transaction->registrations() as $registration) {
            /** @var EE_Line_Item $line_item */
            $line_item = EEM_Line_Item::instance()->get_line_item_for_registration($registration);
            if (isset($reg_final_price_per_ticket_line_item[ $line_item->ID() ])) {
                $registration->set_final_price($reg_final_price_per_ticket_line_item[ $line_item->ID() ]);
                if ($save_regs) {
                    $registration->save();
                }
            }
        }
        // and make sure there's no rounding problem
        $this->fix_reg_final_price_rounding_issue($transaction);
    }


    /**
     * Makes sure there is no rounding errors for the REG_final_prices.
     * Eg, if we have 3 registrations for $1, and there is a $0.01 discount between the three of them,
     * they will each be for $0.99333333, which gets rounded to $1 again.
     * So the transaction total will be $2.99, but each registration will be for $1,
     * so if each registrant paid individually they will have overpaid by $0.01.
     * So in order to overcome this, we check for any difference, and if there is a difference
     * we just grab one registrant at random and make them responsible for it.
     * This should be used after setting REG_final_prices (it's done automatically as part of
     * EE_Registration_Processor::update_registration_final_prices())
     *
     * @param EE_Transaction $transaction
     * @return bool success verifying that there is NO difference after this method is done
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function fix_reg_final_price_rounding_issue(EE_Transaction $transaction): bool
    {
        $reg_final_price_sum = EEM_Registration::instance()->sum(
            [
                [
                    'TXN_ID' => $transaction->ID(),
                ],
            ],
            'REG_final_price'
        );
        $diff                = $transaction->total() - $reg_final_price_sum;
        // ok then, just grab one of the registrations
        if ($diff !== 0.0) {
            $a_reg = EEM_Registration::instance()->get_one(
                [
                    [
                        'TXN_ID' => $transaction->ID(),
                    ],
                ]
            );
            return $a_reg instanceof EE_Registration
                && $a_reg->save(['REG_final_price' => $a_reg->final_price() + $diff]);
        }
        return true;
    }


    /**
     * @param EE_Registration $registration
     * @param array           $closed_reg_statuses
     * @param bool            $update_reg
     * @return bool
     * @throws EE_Error
     * @throws RuntimeException
     * @throws ReflectionException
     */
    public function update_registration_after_being_canceled_or_declined(
        EE_Registration $registration,
        array $closed_reg_statuses = [],
        bool $update_reg = true
    ): bool {
        // these reg statuses should not be considered in any calculations involving monies owing
        $closed_reg_statuses = ! empty($closed_reg_statuses)
            ? $closed_reg_statuses
            : EEM_Registration::closed_reg_statuses();
        if (! in_array($registration->status_ID(), $closed_reg_statuses, true)) {
            return false;
        }
        // release a reserved ticket by decrementing ticket and datetime reserved values
        $registration->release_reserved_ticket(true, 'RegProcessor:' . __LINE__);
        $registration->set_final_price(0);
        if ($update_reg) {
            $registration->save();
        }
        return true;
    }


    /**
     * @param EE_Registration $registration
     * @param array           $closed_reg_statuses
     * @param bool            $update_reg
     * @return bool
     * @throws EE_Error
     * @throws RuntimeException
     * @throws ReflectionException
     */
    public function update_canceled_or_declined_registration_after_being_reinstated(
        EE_Registration $registration,
        array $closed_reg_statuses = [],
        bool $update_reg = true
    ): bool {
        // these reg statuses should not be considered in any calculations involving monies owing
        $closed_reg_statuses = ! empty($closed_reg_statuses) ? $closed_reg_statuses
            : EEM_Registration::closed_reg_statuses();
        if (in_array($registration->status_ID(), $closed_reg_statuses, true)) {
            return false;
        }
        $ticket = $registration->ticket();
        if (! $ticket instanceof EE_Ticket) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        'The Ticket for Registration %1$d was not found or is invalid.',
                        'event_espresso'
                    ),
                    $registration->ticket_ID()
                )
            );
        }
        $registration->set_final_price($ticket->price());
        if ($update_reg) {
            $registration->save();
        }
        return true;
    }
}
