<?php

use EventEspresso\core\domain\entities\contexts\Context;
use EventEspresso\core\domain\entities\contexts\ContextInterface;
use EventEspresso\core\domain\entities\RegCode;
use EventEspresso\core\domain\services\registration\RegStatus;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * EE_Registration class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Registration.class.php
 * @author                Mike Nelson, Brent Christensen
 */
class EE_Registration extends EE_Soft_Delete_Base_Class implements EEI_Registration, EEI_Admin_Links
{
    /**
     * Used to reference when a registration has never been checked in.
     *
     * @deprecated use \EE_Checkin::status_checked_never instead
     * @type int
     */
    const checkin_status_never = 2;

    /**
     * Used to reference when a registration has been checked in.
     *
     * @deprecated use \EE_Checkin::status_checked_in instead
     * @type int
     */
    const checkin_status_in = 1;

    /**
     * Used to reference when a registration has been checked out.
     *
     * @deprecated use \EE_Checkin::status_checked_out instead
     * @type int
     */
    const checkin_status_out = 0;

    /**
     * extra meta key for tracking reg status os trashed registrations
     *
     * @type string
     */
    const PRE_TRASH_REG_STATUS_KEY = 'pre_trash_registration_status';

    /**
     * extra meta key for tracking if registration has reserved ticket
     *
     * @type string
     */
    const HAS_RESERVED_TICKET_KEY = 'has_reserved_ticket';


    /**
     * @param array  $props_n_values          incoming values
     * @param string $timezone                incoming timezone (if not set the timezone set for the website will be
     *                                        used.)
     * @param array  $date_formats            incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Registration
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public static function new_instance($props_n_values = [], $timezone = '', $date_formats = [])
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object
            ?: new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string $timezone        incoming timezone as set by the model.  If not set the timezone for
     *                                the website will be used.
     * @return EE_Registration
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public static function new_instance_from_db($props_n_values = [], $timezone = '')
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     *        Set Event ID
     *
     * @param int $EVT_ID Event ID
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_event($EVT_ID = 0)
    {
        $this->set('EVT_ID', $EVT_ID);
    }


    /**
     * Overrides parent set() method so that all calls to set( 'REG_code', $REG_code ) OR set( 'STS_ID', $STS_ID ) can
     * be routed to internal methods
     *
     * @param string $field_name
     * @param mixed  $field_value
     * @param bool   $use_default
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set($field_name, $field_value, $use_default = false)
    {
        switch ($field_name) {
            case 'REG_code':
                if (! empty($field_value) && ! $this->reg_code()) {
                    $this->set_reg_code($field_value, $use_default);
                }
                break;
            case 'STS_ID':
                $this->set_status($field_value, $use_default);
                break;
            default:
                parent::set($field_name, $field_value, $use_default);
        }
    }


    /**
     * Set Status ID
     * updates the registration status and ALSO...
     * calls reserve_registration_space() if the reg status changes TO approved from any other reg status
     * calls release_registration_space() if the reg status changes FROM approved to any other reg status
     *
     * @param string                $new_STS_ID
     * @param boolean               $use_default
     * @param ContextInterface|null $context
     * @return bool
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_status(
        string $new_STS_ID = '',
        bool $use_default = false,
        ?ContextInterface $context = null
    ): bool {
        $new_STS_ID = (string) apply_filters(
            'AFEE__EE_Registration__set_status__new_STS_ID',
            $new_STS_ID,
            $context,
            $this
        );
        // get current REG_Status
        $old_STS_ID = $this->status_ID();
        // if status has changed
        if (
            $old_STS_ID !== $new_STS_ID // and that status has actually changed
            && ! empty($old_STS_ID) // and that old status is actually set
            && ! empty($new_STS_ID) // as well as the new status
            && $this->ID() // ensure registration is in the db
        ) {
            // update internal status first
            parent::set('STS_ID', $new_STS_ID, $use_default);
            // THEN handle other changes that occur when reg status changes
            // TO approved
            if ($new_STS_ID === RegStatus::APPROVED) {
                // reserve a space by incrementing ticket and datetime sold values
                $this->reserveRegistrationSpace();
                do_action('AHEE__EE_Registration__set_status__to_approved', $this, $old_STS_ID, $new_STS_ID, $context);
                // OR FROM  approved
            } elseif ($old_STS_ID === RegStatus::APPROVED) {
                // release a space by decrementing ticket and datetime sold values
                $this->releaseRegistrationSpace();
                do_action(
                    'AHEE__EE_Registration__set_status__from_approved',
                    $this,
                    $old_STS_ID,
                    $new_STS_ID,
                    $context
                );
            }
            // update status
            parent::set('STS_ID', $new_STS_ID, $use_default);
            $this->updateIfCanceledOrReinstated($new_STS_ID, $old_STS_ID, $context);
            if ($this->statusChangeUpdatesTransaction($context)) {
                $this->updateTransactionAfterStatusChange();
            }
            do_action('AHEE__EE_Registration__set_status__after_update', $this, $old_STS_ID, $new_STS_ID, $context);
            return true;
        }
        // even though the old value matches the new value, it's still good to
        // allow the parent set method to have a say
        parent::set('STS_ID', $new_STS_ID, $use_default);
        return true;
    }


    /**
     * update REGs and TXN when cancelled or declined registrations involved
     *
     * @param string                $new_STS_ID
     * @param string                $old_STS_ID
     * @param ContextInterface|null $context
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    private function updateIfCanceledOrReinstated($new_STS_ID, $old_STS_ID, ?ContextInterface $context = null)
    {
        // these reg statuses should not be considered in any calculations involving monies owing
        $closed_reg_statuses = EEM_Registration::closed_reg_statuses();
        // true if registration has been cancelled or declined
        $this->updateIfCanceled(
            $closed_reg_statuses,
            $new_STS_ID,
            $old_STS_ID,
            $context
        );
        $this->updateIfReinstated(
            $closed_reg_statuses,
            $new_STS_ID,
            $old_STS_ID,
            $context
        );
    }


    /**
     * update REGs and TXN when cancelled or declined registrations involved
     *
     * @param array                 $closed_reg_statuses
     * @param string                $new_STS_ID
     * @param string                $old_STS_ID
     * @param ContextInterface|null $context
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    private function updateIfCanceled(
        array $closed_reg_statuses,
        $new_STS_ID,
        $old_STS_ID,
        ?ContextInterface $context = null
    ) {
        // true if registration has been cancelled or declined
        if (
            in_array($new_STS_ID, $closed_reg_statuses, true)
            && ! in_array($old_STS_ID, $closed_reg_statuses, true)
        ) {
            /** @type EE_Registration_Processor $registration_processor */
            $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
            /** @type EE_Transaction_Processor $transaction_processor */
            $transaction_processor = EE_Registry::instance()->load_class('Transaction_Processor');
            // cancelled or declined registration
            $registration_processor->update_registration_after_being_canceled_or_declined(
                $this,
                $closed_reg_statuses
            );
            $transaction_processor->update_transaction_after_canceled_or_declined_registration(
                $this,
                $closed_reg_statuses,
                false
            );
            do_action(
                'AHEE__EE_Registration__set_status__canceled_or_declined',
                $this,
                $old_STS_ID,
                $new_STS_ID,
                $context
            );
            return;
        }
    }


    /**
     * update REGs and TXN when cancelled or declined registrations involved
     *
     * @param array                 $closed_reg_statuses
     * @param string                $new_STS_ID
     * @param string                $old_STS_ID
     * @param ContextInterface|null $context
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    private function updateIfReinstated(
        array $closed_reg_statuses,
        $new_STS_ID,
        $old_STS_ID,
        ?ContextInterface $context = null
    ) {
        // true if reinstating cancelled or declined registration
        if (
            in_array($old_STS_ID, $closed_reg_statuses, true)
            && ! in_array($new_STS_ID, $closed_reg_statuses, true)
        ) {
            /** @type EE_Registration_Processor $registration_processor */
            $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
            /** @type EE_Transaction_Processor $transaction_processor */
            $transaction_processor = EE_Registry::instance()->load_class('Transaction_Processor');
            // reinstating cancelled or declined registration
            $registration_processor->update_canceled_or_declined_registration_after_being_reinstated(
                $this,
                $closed_reg_statuses
            );
            $transaction_processor->update_transaction_after_reinstating_canceled_registration(
                $this,
                $closed_reg_statuses,
                false
            );
            do_action(
                'AHEE__EE_Registration__set_status__after_reinstated',
                $this,
                $old_STS_ID,
                $new_STS_ID,
                $context
            );
        }
    }


    /**
     * @param ContextInterface|null $context
     * @return bool
     */
    private function statusChangeUpdatesTransaction(?ContextInterface $context = null)
    {
        $contexts_that_do_not_update_transaction = (array) apply_filters(
            'AHEE__EE_Registration__statusChangeUpdatesTransaction__contexts_that_do_not_update_transaction',
            ['spco_reg_step_attendee_information_process_registrations'],
            $context,
            $this
        );
        return ! (
            $context instanceof ContextInterface
            && in_array($context->slug(), $contexts_that_do_not_update_transaction, true)
        );
    }


    /**
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    private function updateTransactionAfterStatusChange()
    {
        /** @type EE_Transaction_Payments $transaction_payments */
        $transaction_payments = EE_Registry::instance()->load_class('Transaction_Payments');
        $transaction_payments->recalculate_transaction_total($this->transaction(), false);
        $this->transaction()->update_status_based_on_total_paid();
    }


    /**
     * get Status ID
     *
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function status_ID()
    {
        return $this->get('STS_ID');
    }


    /**
     * Gets the ticket this registration is for
     *
     * @param boolean $include_archived whether to include archived tickets or not.
     * @return EE_Ticket|EE_Base_Class
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function ticket($include_archived = true)
    {
        return EEM_Ticket::instance()->get_one_by_ID($this->ticket_ID());
    }


    /**
     * Gets the event this registration is for
     *
     * @return EE_Event
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function event(): EE_Event
    {
        $event = $this->event_obj();
        if (! $event instanceof EE_Event) {
            throw new EntityNotFoundException('Event ID', $this->event_ID());
        }
        return $event;
    }


    /**
     * Gets the "author" of the registration.  Note that for the purposes of registrations, the author will correspond
     * with the author of the event this registration is for.
     *
     * @return int
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.5.0
     */
    public function wp_user(): int
    {
        return $this->event()->wp_user();
    }


    /**
     * increments this registration's related ticket sold and corresponding datetime sold values
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws UnexpectedEntityException
     */
    private function reserveRegistrationSpace()
    {
        // reserved ticket and datetime counts will be decremented as sold counts are incremented
        // so stop tracking that this reg has a ticket reserved
        $this->release_reserved_ticket(false, "REG: {$this->ID()} (ln:" . __LINE__ . ')');
        $ticket = $this->ticket();
        $ticket->increaseSold();
        // possibly set event status to sold out
        $this->event()->perform_sold_out_status_check();
    }


    /**
     * decrements (subtracts) this registration's related ticket sold and corresponding datetime sold values
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws UnexpectedEntityException
     */
    private function releaseRegistrationSpace()
    {
        $ticket = $this->ticket();
        $ticket->decreaseSold();
        // possibly change event status from sold out back to previous status
        $this->event()->perform_sold_out_status_check();
    }


    /**
     * tracks this registration's ticket reservation in extra meta
     * and can increment related ticket reserved and corresponding datetime reserved values
     *
     * @param bool   $update_ticket if true, will increment ticket and datetime reserved count
     * @param string $source
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function reserve_ticket($update_ticket = false, $source = 'unknown')
    {
        // only reserve ticket if space is not currently reserved
        if ((bool) $this->get_extra_meta(EE_Registration::HAS_RESERVED_TICKET_KEY, true) !== true) {
            $reserved = $this->update_extra_meta(EE_Registration::HAS_RESERVED_TICKET_KEY, true);
            if ($reserved && $update_ticket) {
                $ticket = $this->ticket();
                $ticket->increaseReserved(1, "REG: {$this->ID()} (ln:" . __LINE__ . ')');
                $this->update_extra_meta('reserve_ticket', "{$this->ticket_ID()} from {$source}");
                $ticket->save();
            }
        }
    }


    /**
     * stops tracking this registration's ticket reservation in extra meta
     * decrements (subtracts) related ticket reserved and corresponding datetime reserved values
     *
     * @param bool   $update_ticket if true, will decrement ticket and datetime reserved count
     * @param string $source
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function release_reserved_ticket($update_ticket = false, $source = 'unknown')
    {
        // only release ticket if space is currently reserved
        if ((bool) $this->get_extra_meta(EE_Registration::HAS_RESERVED_TICKET_KEY, true) === true) {
            $reserved = $this->update_extra_meta(EE_Registration::HAS_RESERVED_TICKET_KEY, false);
            if ($reserved && $update_ticket) {
                $ticket = $this->ticket();
                $ticket->decreaseReserved(1, true, "REG: {$this->ID()} (ln:" . __LINE__ . ')');
                $this->update_extra_meta('release_reserved_ticket', "{$this->ticket_ID()} from {$source}");
            }
        }
    }


    /**
     * Set Attendee ID
     *
     * @param int $ATT_ID Attendee ID
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_attendee_id($ATT_ID = 0)
    {
        $this->set('ATT_ID', $ATT_ID);
    }


    /**
     *        Set Transaction ID
     *
     * @param int $TXN_ID Transaction ID
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_transaction_id($TXN_ID = 0)
    {
        $this->set('TXN_ID', $TXN_ID);
    }


    /**
     *        Set Session
     *
     * @param string $REG_session PHP Session ID
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_session($REG_session = '')
    {
        $this->set('REG_session', $REG_session);
    }


    /**
     *        Set Registration URL Link
     *
     * @param string $REG_url_link Registration URL Link
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_reg_url_link($REG_url_link = '')
    {
        $this->set('REG_url_link', $REG_url_link);
    }


    /**
     *        Set Attendee Counter
     *
     * @param int $REG_count Primary Attendee
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_count($REG_count = 1)
    {
        $this->set('REG_count', $REG_count);
    }


    /**
     *        Set Group Size
     *
     * @param boolean $REG_group_size Group Registration
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_group_size($REG_group_size = false)
    {
        $this->set('REG_group_size', $REG_group_size);
    }


    /**
     *    is_not_approved -  convenience method that returns TRUE if REG status ID ==
     *    RegStatus::AWAITING_REVIEW
     *
     * @return        boolean
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_not_approved()
    {
        return $this->status_ID() === RegStatus::AWAITING_REVIEW;
    }


    /**
     *    is_pending_payment -  convenience method that returns TRUE if REG status ID ==
     *    RegStatus::PENDING_PAYMENT
     *
     * @return        boolean
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_pending_payment()
    {
        return $this->status_ID() === RegStatus::PENDING_PAYMENT;
    }


    /**
     *    is_approved -  convenience method that returns TRUE if REG status ID == RegStatus::APPROVED
     *
     * @return        boolean
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_approved()
    {
        return $this->status_ID() === RegStatus::APPROVED;
    }


    /**
     *    is_cancelled -  convenience method that returns TRUE if REG status ID == RegStatus::CANCELLED
     *
     * @return        boolean
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_cancelled()
    {
        return $this->status_ID() === RegStatus::CANCELLED;
    }


    /**
     *    is_declined -  convenience method that returns TRUE if REG status ID == RegStatus::DECLINED
     *
     * @return        boolean
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_declined()
    {
        return $this->status_ID() === RegStatus::DECLINED;
    }


    /**
     *    is_incomplete -  convenience method that returns TRUE if REG status ID ==
     *    RegStatus::INCOMPLETE
     *
     * @return        boolean
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_incomplete()
    {
        return $this->status_ID() === RegStatus::INCOMPLETE;
    }


    /**
     *        Set Registration Date
     *
     * @param mixed ( int or string ) $REG_date Registration Date - Unix timestamp or string representation of
     *                                                 Date
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_reg_date($REG_date = false)
    {
        $this->set('REG_date', $REG_date);
    }


    /**
     *    Set final price owing for this registration after all ticket/price modifications
     *
     * @param float $REG_final_price
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_final_price($REG_final_price = 0.00)
    {
        $this->set('REG_final_price', $REG_final_price);
    }


    /**
     *    Set amount paid towards this registration's final price
     *
     * @param float|int|string $REG_paid
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_paid($REG_paid = 0.00)
    {
        $this->set('REG_paid', (float) $REG_paid);
    }


    /**
     *        Attendee Is Going
     *
     * @param boolean $REG_att_is_going Attendee Is Going
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_att_is_going($REG_att_is_going = false)
    {
        $this->set('REG_att_is_going', $REG_att_is_going);
    }


    /**
     * Gets the related attendee
     *
     * @return EE_Attendee|EE_Base_Class
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function attendee()
    {
        return EEM_Attendee::instance()->get_one_by_ID($this->attendee_ID());
    }


    /**
     * Gets the name of the attendee.
     *
     * @param bool $apply_html_entities set to true if you want to use HTML entities.
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.10.12.p
     */
    public function attendeeName($apply_html_entities = false)
    {
        $attendee = $this->attendee();
        if ($attendee instanceof EE_Attendee) {
            $attendee_name = $attendee->full_name($apply_html_entities);
        } else {
            $attendee_name = esc_html__('Unknown', 'event_espresso');
        }
        return $attendee_name;
    }


    /**
     *        get Event ID
     */
    public function event_ID()
    {
        return $this->get('EVT_ID');
    }


    /**
     *        get Event ID
     */
    public function event_name()
    {
        $event = $this->event_obj();
        if ($event) {
            return $event->name();
        } else {
            return null;
        }
    }


    /**
     * Fetches the event this registration is for
     *
     * @return EE_Base_Class|EE_Event
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function event_obj()
    {
        return EEM_Event::instance()->get_one_by_ID($this->event_ID());
    }


    /**
     *        get Attendee ID
     */
    public function attendee_ID()
    {
        return $this->get('ATT_ID');
    }


    /**
     *        get PHP Session ID
     */
    public function session_ID()
    {
        return $this->get('REG_session');
    }


    /**
     * Gets the string which represents the URL trigger for the receipt template in the message template system.
     *
     * @param string $messenger 'pdf' or 'html'.  Default 'html'.
     * @return string
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function receipt_url($messenger = 'html')
    {
        return apply_filters('FHEE__EE_Registration__receipt_url__receipt_url', '', $this, $messenger, 'receipt');
    }


    /**
     * Gets the string which represents the URL trigger for the invoice template in the message template system.
     *
     * @param string $messenger 'pdf' or 'html'.  Default 'html'.
     * @return string
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function invoice_url($messenger = 'html')
    {
        return apply_filters('FHEE__EE_Registration__invoice_url__invoice_url', '', $this, $messenger, 'invoice');
    }


    /**
     * get Registration URL Link
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function reg_url_link()
    {
        return (string) $this->get('REG_url_link');
    }


    /**
     * Echoes out invoice_url()
     *
     * @param string $type 'download','launch', or 'html' (default is 'launch')
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function e_invoice_url($type = 'launch')
    {
        echo esc_url_raw($this->invoice_url($type));
    }


    /**
     * Echoes out payment_overview_url
     */
    public function e_payment_overview_url()
    {
        echo esc_url_raw($this->payment_overview_url());
    }


    /**
     * Gets the URL for the checkout payment options reg step
     * with this registration's REG_url_link added as a query parameter
     *
     * @param bool $clear_session Set to true when you want to clear the session on revisiting the
     *                            payment overview url.
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function payment_overview_url($clear_session = false)
    {
        return add_query_arg(
            (array) apply_filters(
                'FHEE__EE_Registration__payment_overview_url__query_args',
                [
                    'e_reg_url_link' => $this->reg_url_link(),
                    'step'           => 'payment_options',
                    'revisit'        => true,
                    'clear_session'  => (bool) $clear_session,
                ],
                $this
            ),
            EE_Registry::instance()->CFG->core->reg_page_url()
        );
    }


    /**
     * Gets the URL for the checkout attendee information reg step
     * with this registration's REG_url_link added as a query parameter
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function edit_attendee_information_url()
    {
        return add_query_arg(
            (array) apply_filters(
                'FHEE__EE_Registration__edit_attendee_information_url__query_args',
                [
                    'e_reg_url_link' => $this->reg_url_link(),
                    'step'           => 'attendee_information',
                    'revisit'        => true,
                ],
                $this
            ),
            EE_Registry::instance()->CFG->core->reg_page_url()
        );
    }


    /**
     * Simply generates and returns the appropriate admin_url link to edit this registration
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_admin_edit_url()
    {
        return EEH_URL::add_query_args_and_nonce(
            [
                'page'    => 'espresso_registrations',
                'action'  => 'view_registration',
                '_REG_ID' => $this->ID(),
            ],
            admin_url('admin.php')
        );
    }


    /**
     * is_primary_registrant?
     *
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_primary_registrant()
    {
        return (int) $this->get('REG_count') === 1;
    }


    /**
     * This returns the primary registration object for this registration group (which may be this object).
     *
     * @return EE_Registration
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_primary_registration()
    {
        if ($this->is_primary_registrant()) {
            return $this;
        }

        // k reg_count !== 1 so let's get the EE_Registration object matching this txn_id and reg_count == 1
        /** @var EE_Registration $primary_registrant */
        $primary_registrant = EEM_Registration::instance()->get_one(
            [
                [
                    'TXN_ID'    => $this->transaction_ID(),
                    'REG_count' => 1,
                ],
            ]
        );
        return $primary_registrant;
    }


    /**
     * get  Attendee Number
     *
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function count()
    {
        return $this->get('REG_count');
    }


    /**
     * get Group Size
     *
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function group_size()
    {
        return $this->get('REG_group_size');
    }


    /**
     * get Registration Date
     *
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function date()
    {
        return $this->get('REG_date');
    }


    /**
     * gets a pretty date
     *
     * @param string $date_format
     * @param string $time_format
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function pretty_date($date_format = null, $time_format = null)
    {
        return $this->get_datetime('REG_date', $date_format, $time_format);
    }


    /**
     * final_price
     * the registration's share of the transaction total, so that the
     * sum of all the transaction's REG_final_prices equal the transaction's total
     *
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function final_price(): float
    {
        return (float) $this->get('REG_final_price');
    }


    /**
     * pretty_final_price
     *  final price as formatted string, with correct decimal places and currency symbol
     *
     * @param string|null $schema
     *      Schemas:
     *      'localized_float': "3,023.00"
     *      'no_currency_code': "$3,023.00"
     *      null: "$3,023.00<span>USD</span>"
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function pretty_final_price(?string $schema = null)
    {
        return $this->get_pretty('REG_final_price', $schema);
    }


    /**
     * get paid (yeah)
     *
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function paid(): float
    {
        return (float) $this->get('REG_paid');
    }


    /**
     * pretty_paid
     *
     * @param string|null $schema
     *      Schemas:
     *      'localized_float': "3,023.00"
     *      'no_currency_code': "$3,023.00"
     *      null: "$3,023.00<span>USD</span>"
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function pretty_paid(?string $schema = null)
    {
        return $this->get_pretty('REG_paid', $schema);
    }


    /**
     * owes_monies_and_can_pay
     * whether this registration has monies owing and it's' status allows payment
     *
     * @param array $requires_payment list of registration statuses that allow a registrant to make a payment
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function owes_monies_and_can_pay(array $requires_payment = []): bool
    {
        // these reg statuses require payment (if event is not free)
        $requires_payment = ! empty($requires_payment)
            ? $requires_payment
            : EEM_Registration::reg_statuses_that_allow_payment();
        if (
            $this->final_price() !== 0.0 &&
            $this->final_price() !== $this->paid() &&
            in_array($this->status_ID(), $requires_payment)
        ) {
            return true;
        }
        return false;
    }


    /**
     * Prints out the return value of $this->pretty_status()
     *
     * @param bool $show_icons
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function e_pretty_status($show_icons = false)
    {
        echo wp_kses($this->pretty_status($show_icons), AllowedTags::getAllowedTags());
    }


    /**
     * Returns a nice version of the status for displaying to customers
     *
     * @param bool $show_icons
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function pretty_status($show_icons = false)
    {
        $status = EEM_Status::instance()->localized_status(
            [$this->status_ID() => esc_html__('unknown', 'event_espresso')],
            false,
            'sentence'
        );
        $icon   = '';
        switch ($this->status_ID()) {
            case RegStatus::APPROVED:
                $icon = $show_icons
                    ? '<span class="dashicons dashicons-star-filled ee-icon-size-16 green-text"></span>'
                    : '';
                break;
            case RegStatus::PENDING_PAYMENT:
                $icon = $show_icons
                    ? '<span class="dashicons dashicons-star-half ee-icon-size-16 orange-text"></span>'
                    : '';
                break;
            case RegStatus::AWAITING_REVIEW:
                $icon = $show_icons
                    ? '<span class="dashicons dashicons-marker ee-icon-size-16 orange-text"></span>'
                    : '';
                break;
            case RegStatus::CANCELLED:
                $icon = $show_icons
                    ? '<span class="dashicons dashicons-no ee-icon-size-16 lt-grey-text"></span>'
                    : '';
                break;
            case RegStatus::INCOMPLETE:
                $icon = $show_icons
                    ? '<span class="dashicons dashicons-no ee-icon-size-16 lt-orange-text"></span>'
                    : '';
                break;
            case RegStatus::DECLINED:
                $icon = $show_icons
                    ? '<span class="dashicons dashicons-no ee-icon-size-16 red-text"></span>'
                    : '';
                break;
            case RegStatus::WAIT_LIST:
                $icon = $show_icons
                    ? '<span class="dashicons dashicons-clipboard ee-icon-size-16 purple-text"></span>'
                    : '';
                break;
        }
        return $icon . $status[ $this->status_ID() ];
    }


    /**
     *        get Attendee Is Going
     */
    public function att_is_going()
    {
        return $this->get('REG_att_is_going');
    }


    /**
     * Gets related answers
     *
     * @param array $query_params @see
     *                            https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @return EE_Answer[]|EE_Base_Class[]
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function answers($query_params = [])
    {
        return $this->get_many_related('Answer', $query_params);
    }


    /**
     * Gets the registration's answer value to the specified question
     * (either the question's ID or a question object)
     *
     * @param EE_Question|int $question
     * @param bool            $pretty_value
     * @return array|string if pretty_value= true, the result will always be a string
     * (because the answer might be an array of answer values, so passing pretty_value=true
     * will convert it into some kind of string)
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function answer_value_to_question($question, $pretty_value = true)
    {
        $question_id = EEM_Question::instance()->ensure_is_ID($question);
        return EEM_Answer::instance()->get_answer_value_to_question($this, $question_id, $pretty_value);
    }


    /**
     * question_groups
     * returns an array of EE_Question_Group objects for this registration
     *
     * @return EE_Question_Group[]
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function question_groups()
    {
        return EEM_Event::instance()->get_question_groups_for_event($this->event_ID(), $this);
    }


    /**
     * count_question_groups
     * returns a count of the number of EE_Question_Group objects for this registration
     *
     * @return int
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function count_question_groups()
    {
        return EEM_Event::instance()->count_related(
            $this->event_ID(),
            'Question_Group',
            [
                [
                    'Event_Question_Group.'
                    . EEM_Event_Question_Group::instance()->fieldNameForContext($this->is_primary_registrant()) => true,
                ],
            ]
        );
    }


    /**
     * Returns the registration date in the 'standard' string format
     * (function may be improved in the future to allow for different formats and timezones)
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function reg_date()
    {
        return $this->get_datetime('REG_date');
    }


    /**
     * Gets the datetime-ticket for this registration (ie, it can be used to isolate
     * the ticket this registration purchased, or the datetime they have registered
     * to attend)
     *
     * @return EE_Base_Class|EE_Datetime_Ticket
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function datetime_ticket()
    {
        return $this->get_first_related('Datetime_Ticket');
    }


    /**
     * Sets the registration's datetime_ticket.
     *
     * @param EE_Datetime_Ticket $datetime_ticket
     * @return EE_Base_Class|EE_Datetime_Ticket
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_datetime_ticket($datetime_ticket)
    {
        return $this->_add_relation_to($datetime_ticket, 'Datetime_Ticket');
    }


    /**
     * Gets deleted
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function deleted()
    {
        return $this->get('REG_deleted');
    }


    /**
     * Sets deleted
     *
     * @param boolean $deleted
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function set_deleted($deleted)
    {
        if ($deleted) {
            $this->delete();
        } else {
            $this->restore();
        }
    }


    /**
     * Get the status object of this object
     *
     * @return EE_Base_Class|EE_Status
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function status_obj()
    {
        return $this->get_first_related('Status');
    }


    /**
     * Returns the number of times this registration has checked into any of the datetimes it's available for
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function count_checkins()
    {
        return $this->get_model()->count_related($this, 'Checkin');
    }


    /**
     * Returns the number of current Check-ins this registration is checked into for any of the datetimes the
     * registration is for.  Note, this is ONLY checked in (does not include checked out)
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function count_checkins_not_checkedout()
    {
        return $this->get_model()->count_related($this, 'Checkin', [['CHK_in' => 1]]);
    }


    /**
     * The purpose of this method is simply to check whether this registration can check in to the given datetime.
     *
     * @param int | EE_Datetime $DTT_OR_ID      The datetime the registration is being checked against
     * @param bool              $check_approved This is used to indicate whether the caller wants can_checkin to also
     *                                          consider registration status as well as datetime access.
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function can_checkin($DTT_OR_ID, $check_approved = true)
    {
        $DTT_ID = EEM_Datetime::instance()->ensure_is_ID($DTT_OR_ID);
        // first check registration status
        if (! $DTT_ID || ($check_approved && ! $this->is_approved())) {
            return false;
        }
        // is there a datetime ticket that matches this dtt_ID?
        if (
            ! (EEM_Datetime_Ticket::instance()->exists(
                [
                    [
                        'TKT_ID' => $this->get('TKT_ID'),
                        'DTT_ID' => $DTT_ID,
                    ],
                ]
            ))
        ) {
            return false;
        }

        // final check is against TKT_uses
        return $this->verify_can_checkin_against_TKT_uses($DTT_ID);
    }


    /**
     * This method verifies whether the user can check in for the given datetime considering the max uses value set on
     * the ticket. To do this,  a query is done to get the count of the datetime records already checked into.  If the
     * datetime given does not have a check-in record and checking in for that datetime will exceed the allowed uses,
     * then return false.  Otherwise return true.
     *
     * @param int | EE_Datetime $DTT_OR_ID The datetime the registration is being checked against
     * @return bool true means can check in.  false means cannot check in.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function verify_can_checkin_against_TKT_uses($DTT_OR_ID)
    {
        $DTT_ID = EEM_Datetime::instance()->ensure_is_ID($DTT_OR_ID);

        if (! $DTT_ID) {
            return false;
        }

        $max_uses = $this->ticket() instanceof EE_Ticket
            ? $this->ticket()->uses()
            : EE_INF;

        // if max uses is not set or equals infinity then return true
        // because it's not a factor for whether user can check in or not.
        if (! $max_uses || $max_uses === EE_INF) {
            return true;
        }

        // does this datetime have a check-in record?  If so, then the dtt count has already been verified so we can just
        // go ahead and toggle.
        if (EEM_Checkin::instance()->exists([['REG_ID' => $this->ID(), 'DTT_ID' => $DTT_ID]])) {
            return true;
        }

        // made it here so the last check is whether the number of check-ins per unique datetime on this registration
        // disallows further check-ins.
        $count_unique_dtt_checkins = EEM_Checkin::instance()->count(
            [
                [
                    'REG_ID' => $this->ID(),
                    'CHK_in' => true,
                ],
            ],
            'DTT_ID',
            true
        );
        // check-ins have already reached their max number of uses
        // so registrant can NOT check in
        if ($count_unique_dtt_checkins >= $max_uses) {
            EE_Error::add_error(
                esc_html__(
                    'Check-in denied because number of datetime uses for the ticket has been reached or exceeded.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return true;
    }


    /**
     * toggle Check-in status for this registration
     * Check-ins are toggled in the following order:
     * never checked in -> checked in
     * checked in -> checked out
     * checked out -> checked in
     *
     * @param int  $DTT_ID  include specific datetime to toggle Check-in for.
     *                      If not included or null, then it is assumed latest datetime is being toggled.
     * @param bool $verify  If true then can_checkin() is used to verify whether the person
     *                      can be checked in or not.  Otherwise this forces change in check-in status.
     * @return bool|int     the chk_in status toggled to OR false if nothing got changed.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function toggle_checkin_status($DTT_ID = null, $verify = false)
    {
        if (empty($DTT_ID)) {
            $datetime = $this->get_latest_related_datetime();
            $DTT_ID   = $datetime instanceof EE_Datetime ? $datetime->ID() : 0;
            // verify the registration can check in for the given DTT_ID
        } elseif (! $this->can_checkin($DTT_ID, $verify)) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'The given registration (ID:%1$d) can not be checked in to the given DTT_ID (%2$d), because the registration does not have access',
                        'event_espresso'
                    ),
                    $this->ID(),
                    $DTT_ID
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        $status_paths = [
            EE_Checkin::status_checked_never => EE_Checkin::status_checked_in,
            EE_Checkin::status_checked_in    => EE_Checkin::status_checked_out,
            EE_Checkin::status_checked_out   => EE_Checkin::status_checked_in,
        ];
        // start by getting the current status so we know what status we'll be changing to.
        $cur_status = $this->check_in_status_for_datetime($DTT_ID);
        $status_to  = $status_paths[ $cur_status ];
        // database only records true for checked IN or false for checked OUT
        // no record ( null ) means checked in NEVER, but we obviously don't save that
        $new_status = $status_to === EE_Checkin::status_checked_in;
        // add relation - note Check-ins are always creating new rows
        // because we are keeping track of Check-ins over time.
        // Eventually we'll probably want to show a list table
        // for the individual Check-ins so that they can be managed.
        $checkin = EE_Checkin::new_instance(
            [
                'REG_ID' => $this->ID(),
                'DTT_ID' => $DTT_ID,
                'CHK_in' => $new_status,
            ]
        );
        // if the record could not be saved then return false
        if ($checkin->save() === 0) {
            if (WP_DEBUG) {
                global $wpdb;
                $error = sprintf(
                    esc_html__(
                        'Registration check in update failed because of the following database error: %1$s%2$s',
                        'event_espresso'
                    ),
                    '<br />',
                    $wpdb->last_error
                );
            } else {
                $error = esc_html__(
                    'Registration check in update failed because of an unknown database error',
                    'event_espresso'
                );
            }
            EE_Error::add_error($error, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // Fire a checked_in and checkout_out action.
        $checked_status = $status_to === EE_Checkin::status_checked_in
            ? 'checked_in'
            : 'checked_out';
        do_action("AHEE__EE_Registration__toggle_checkin_status__{$checked_status}", $this, $DTT_ID);
        return $status_to;
    }


    /**
     * Returns the latest datetime related to this registration (via the ticket attached to the registration).
     * "Latest" is defined by the `DTT_EVT_start` column.
     *
     * @return EE_Datetime|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_latest_related_datetime(): ?EE_Datetime
    {
        return EEM_Datetime::instance()->get_one(
            [
                [
                    'Ticket.Registration.REG_ID' => $this->ID(),
                ],
                'order_by' => ['DTT_EVT_start' => 'DESC'],
            ]
        );
    }


    /**
     * Returns the earliest datetime related to this registration (via the ticket attached to the registration).
     * "Earliest" is defined by the `DTT_EVT_start` column.
     *
     * @return EE_Base_Class|EE_Soft_Delete_Base_Class|NULL
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_earliest_related_datetime()
    {
        return EEM_Datetime::instance()->get_one(
            [
                [
                    'Ticket.Registration.REG_ID' => $this->ID(),
                ],
                'order_by' => ['DTT_EVT_start' => 'ASC'],
            ]
        );
    }


    /**
     * This method simply returns the check-in status for this registration and the given datetime.
     * If neither the datetime nor the check-in values are provided as arguments,
     * then this will return the LATEST check-in status for the registration across all datetimes it belongs to.
     *
     * @param int|null        $DTT_ID  The ID of the datetime we're checking against
     *                                 (if empty we'll get the primary datetime for
     *                                 this registration (via event) and use its ID);
     * @param EE_Checkin|null $checkin If present, we use the given check-in object rather than the dtt_id.
     * @return int                     Integer representing Check-in status.
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function check_in_status_for_datetime(?int $DTT_ID = 0, ?EE_Checkin $checkin = null): int
    {
        if ($checkin instanceof EE_Checkin) {
            return $checkin->status();
        }

        if (! $DTT_ID) {
            return EE_Checkin::status_invalid;
        }

        $checkin_query_params = [
            0          => ['DTT_ID' => $DTT_ID],
            'order_by' => ['CHK_timestamp' => 'DESC'],
        ];

        $checkin = $this->get_first_related(
            'Checkin',
            $checkin_query_params
        );
        return $checkin instanceof EE_Checkin ? $checkin->status() : EE_Checkin::status_checked_never;
    }


    /**
     * This method returns a localized message for the toggled Check-in message.
     *
     * @param int|null $DTT_ID include specific datetime to get the correct Check-in message.  If not included or null,
     *                         then it is assumed Check-in for primary datetime was toggled.
     * @param bool     $error  This just flags that you want an error message returned. This is put in so that the error
     *                         message can be customized with the attendee name.
     * @return string internationalized message
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_checkin_msg(?int $DTT_ID, bool $error = false): string
    {
        // let's get the attendee first so we can include the name of the attendee
        $attendee = $this->attendee();
        if ($attendee instanceof EE_Attendee) {
            if ($error) {
                return sprintf(
                    esc_html__("%s's check-in status was not changed.", "event_espresso"),
                    $attendee->full_name()
                );
            }
            $cur_status = $this->check_in_status_for_datetime($DTT_ID);
            // what is the status message going to be?
            switch ($cur_status) {
                case EE_Checkin::status_checked_never:
                    return sprintf(
                        esc_html__('%s has been removed from Check-in records', 'event_espresso'),
                        $attendee->full_name()
                    );
                case EE_Checkin::status_checked_in:
                    return sprintf(esc_html__('%s has been checked in', 'event_espresso'), $attendee->full_name());
                case EE_Checkin::status_checked_out:
                    return sprintf(esc_html__('%s has been checked out', 'event_espresso'), $attendee->full_name());
            }
        }
        return esc_html__('The check-in status could not be determined.', 'event_espresso');
    }


    /**
     * Returns the related EE_Transaction to this registration
     *
     * @return EE_Transaction
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws ReflectionException
     */
    public function transaction(): EE_Transaction
    {
        $transaction = EEM_Transaction::instance()->get_one_by_ID($this->transaction_ID());
        if (! $transaction instanceof \EE_Transaction) {
            throw new EntityNotFoundException('Transaction ID', $this->transaction_ID());
        }
        return $transaction;
    }


    /**
     * get Registration Code
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function reg_code(): string
    {
        return $this->get('REG_code')
            ?: '';
    }


    /**
     * @return mixed
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function transaction_ID()
    {
        return $this->get('TXN_ID');
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function ticket_ID()
    {
        return $this->get('TKT_ID');
    }


    /**
     * Set Registration Code
     *
     * @param RegCode|string $REG_code Registration Code
     * @param boolean        $use_default
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_reg_code($REG_code, bool $use_default = false)
    {
        if (empty($REG_code)) {
            EE_Error::add_error(
                esc_html__('REG_code can not be empty.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return;
        }
        if (! $this->reg_code()) {
            parent::set('REG_code', $REG_code, $use_default);
        } else {
            EE_Error::doing_it_wrong(
                __CLASS__ . '::' . __FUNCTION__,
                esc_html__('Can not change a registration REG_code once it has been set.', 'event_espresso'),
                '4.6.0'
            );
        }
    }


    /**
     * Returns all other registrations in the same group as this registrant who have the same ticket option.
     * Note, if you want to just get all registrations in the same transaction (group), use:
     *    $registration->transaction()->registrations();
     *
     * @return EE_Registration[] or empty array if this isn't a group registration.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.5.0
     */
    public function get_all_other_registrations_in_group()
    {
        if ($this->group_size() < 2) {
            return [];
        }

        $query[0] = [
            'TXN_ID' => $this->transaction_ID(),
            'REG_ID' => ['!=', $this->ID()],
            'TKT_ID' => $this->ticket_ID(),
        ];
        /** @var EE_Registration[] $registrations */
        $registrations = $this->get_model()->get_all($query);
        return $registrations;
    }


    /**
     * Return the link to the admin details for the object.
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_admin_details_link()
    {
        EE_Registry::instance()->load_helper('URL');
        return EEH_URL::add_query_args_and_nonce(
            [
                'page'    => 'espresso_registrations',
                'action'  => 'view_registration',
                '_REG_ID' => $this->ID(),
            ],
            admin_url('admin.php')
        );
    }


    /**
     * Returns the link to the editor for the object.  Sometimes this is the same as the details.
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_admin_edit_link()
    {
        return $this->get_admin_details_link();
    }


    /**
     * Returns the link to a settings page for the object.
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_admin_settings_link()
    {
        return $this->get_admin_details_link();
    }


    /**
     * Returns the link to the "overview" for the object (typically the "list table" view).
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_admin_overview_link()
    {
        EE_Registry::instance()->load_helper('URL');
        return EEH_URL::add_query_args_and_nonce(
            [
                'page' => 'espresso_registrations',
            ],
            admin_url('admin.php')
        );
    }


    /**
     * @param array $query_params
     * @return EE_Base_Class[]|EE_Registration[]
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function payments($query_params = [])
    {
        return $this->get_many_related('Payment', $query_params);
    }


    /**
     * @param array $query_params
     * @return EE_Base_Class[]|EE_Registration_Payment[]
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function registration_payments($query_params = [])
    {
        return $this->get_many_related('Registration_Payment', $query_params);
    }


    /**
     * This grabs the payment method corresponding to the last payment made for the amount owing on the registration.
     * Note: if there are no payments on the registration there will be no payment method returned.
     *
     * @return EE_Payment|EE_Payment_Method|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function payment_method()
    {
        return EEM_Payment_Method::instance()->get_last_used_for_registration($this);
    }


    /**
     * @return \EE_Line_Item
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function ticket_line_item()
    {
        $ticket            = $this->ticket();
        $transaction       = $this->transaction();
        $line_item         = null;
        $ticket_line_items = \EEH_Line_Item::get_line_items_by_object_type_and_IDs(
            $transaction->total_line_item(),
            'Ticket',
            [$ticket->ID()]
        );
        foreach ($ticket_line_items as $ticket_line_item) {
            if (
                $ticket_line_item instanceof \EE_Line_Item
                && $ticket_line_item->OBJ_type() === 'Ticket'
                && $ticket_line_item->OBJ_ID() === $ticket->ID()
            ) {
                $line_item = $ticket_line_item;
                break;
            }
        }
        if (! ($line_item instanceof \EE_Line_Item && $line_item->OBJ_type() === 'Ticket')) {
            throw new EntityNotFoundException('Line Item Ticket ID', $ticket->ID());
        }
        return $line_item;
    }


    /**
     * Soft Deletes this model object.
     *
     * @param string $source function name that called this method
     * @return boolean | int
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function delete()
    {
        if ($this->update_extra_meta(EE_Registration::PRE_TRASH_REG_STATUS_KEY, $this->status_ID()) === true) {
            $this->set_status(
                RegStatus::CANCELLED,
                false,
                new Context(
                    __METHOD__,
                    esc_html__('Executed when a registration is trashed.', 'event_espresso')
                )
            );
        }
        return parent::delete();
    }


    /**
     * Restores whatever the previous status was on a registration before it was trashed (if possible)
     *
     * @param string $source function name that called this method
     * @return bool|int
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function restore()
    {
        $previous_status = $this->get_extra_meta(
            EE_Registration::PRE_TRASH_REG_STATUS_KEY,
            true,
            RegStatus::CANCELLED
        );
        if ($previous_status) {
            $this->delete_extra_meta(EE_Registration::PRE_TRASH_REG_STATUS_KEY);
            $this->set_status(
                $previous_status,
                false,
                new Context(
                    __METHOD__,
                    esc_html__('Executed when a trashed registration is restored.', 'event_espresso')
                )
            );
        }
        return parent::restore();
    }


    /**
     * possibly toggle Registration status based on comparison of REG_paid vs REG_final_price
     *
     * @param boolean $trigger_set_status_logic  EE_Registration::set_status() can trigger additional logic
     *                                           depending on whether the reg status changes to or from "Approved"
     * @return boolean whether the Registration status was updated
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    public function updateStatusBasedOnTotalPaid($trigger_set_status_logic = true)
    {
        $paid  = $this->paid();
        $price = $this->final_price();
        switch (true) {
            // overpaid or paid
            case EEH_Money::compare_floats($paid, $price, '>'):
            case EEH_Money::compare_floats($paid, $price):
                $new_status = RegStatus::APPROVED;
                break;
            //  underpaid
            case EEH_Money::compare_floats($paid, $price, '<'):
                $new_status = RegStatus::PENDING_PAYMENT;
                break;
            // uhhh Houston...
            default:
                throw new RuntimeException(
                    esc_html__('The total paid calculation for this registration is inaccurate.', 'event_espresso')
                );
        }
        if ($new_status !== $this->status_ID()) {
            if ($trigger_set_status_logic) {
                return $this->set_status(
                    $new_status,
                    false,
                    new Context(
                        __METHOD__,
                        esc_html__(
                            'Executed when the registration status is updated based on total paid.',
                            'event_espresso'
                        )
                    )
                );
            }
            parent::set('STS_ID', $new_status);
            return true;
        }
        return false;
    }


    /*************************** DEPRECATED ***************************/


    /**
     * @deprecated
     * @since     4.7.0
     */
    public function price_paid()
    {
        EE_Error::doing_it_wrong(
            'EE_Registration::price_paid()',
            esc_html__(
                'This method is deprecated, please use EE_Registration::final_price() instead.',
                'event_espresso'
            ),
            '4.7.0'
        );
        return $this->final_price();
    }


    /**
     * @param float $REG_final_price
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws DomainException
     * @deprecated
     * @since     4.7.0
     */
    public function set_price_paid($REG_final_price = 0.00)
    {
        EE_Error::doing_it_wrong(
            'EE_Registration::set_price_paid()',
            esc_html__(
                'This method is deprecated, please use EE_Registration::set_final_price() instead.',
                'event_espresso'
            ),
            '4.7.0'
        );
        $this->set_final_price($REG_final_price);
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @deprecated
     * @since 4.7.0
     */
    public function pretty_price_paid()
    {
        EE_Error::doing_it_wrong(
            'EE_Registration::pretty_price_paid()',
            esc_html__(
                'This method is deprecated, please use EE_Registration::pretty_final_price() instead.',
                'event_espresso'
            ),
            '4.7.0'
        );
        return $this->pretty_final_price();
    }


    /**
     * Gets the primary datetime related to this registration via the related Event to this registration
     *
     * @return EE_Datetime
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @deprecated 4.9.17
     */
    public function get_related_primary_datetime()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Use EE_Registration::get_latest_related_datetime() or EE_Registration::get_earliest_related_datetime()',
                'event_espresso'
            ),
            '4.9.17',
            '5.0.0'
        );
        return $this->event()->primary_datetime();
    }


    /**
     * Returns the contact's name (or "Unknown" if there is no contact.)
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.10.12.p
     */
    public function name()
    {
        return $this->attendeeName();
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function wasMoved(): bool
    {
        // only need to check 'registration-moved-to' because
        // the existence of a new REG ID means the registration was moved
        $reg_moved = $this->get_extra_meta('registration-moved-to', true, []);
        return isset($reg_moved['NEW_REG_ID']) && $reg_moved['NEW_REG_ID'];
    }


    /**
     * @param EE_Payment $payment
     * @param float|null $amount
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.8.p
     */
    public function applyPayment(EE_Payment $payment, ?float $amount = null): float
    {
        $payment_amount = $amount ?? $payment->amount();
        // ensure $payment_amount is NOT negative
        $payment_amount = (float) abs($payment_amount);
        $payment_amount = $payment->is_a_refund()
            ? $this->processRefund($payment_amount)
            : $this->processPayment($payment_amount);
        if ($payment_amount) {
            $reg_payment = EEM_Registration_Payment::instance()->get_one(
                [['REG_ID' => $this->ID(), 'PAY_ID' => $payment->ID()]]
            );
            // if existing registration payment exists
            if ($reg_payment instanceof EE_Registration_Payment) {
                // then update that record
                $reg_payment->set_amount($payment_amount);
            } else {
                // or add new relation between registration and payment and set amount
                $reg_payment = EE_Registration_Payment::new_instance(
                    [
                        'REG_ID'     => $this->ID(),
                        'PAY_ID'     => $payment->ID(),
                        'RPY_amount' => $payment_amount,
                    ]
                );
            }
            $reg_payment->save();
        }
        return $payment_amount;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function processPayment(float $payment_amount): float
    {
        $paid  = $this->paid();
        $owing = $this->final_price() - $paid;
        if ($owing <= 0) {
            return 0.0;
        }
        // don't allow payment amount to exceed the incoming amount, OR the amount owing
        $payment_amount = min($payment_amount, $owing);
        $paid           = $paid + $payment_amount;
        // calculate and set new REG_paid
        $this->set_paid($paid);
        // make it stick
        $this->save();
        return (float) $payment_amount;
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    private function processRefund(float $payment_amount): float
    {
        $paid = $this->paid();
        if ($paid <= 0) {
            return 0.0;
        }
        // don't allow refund amount to exceed the incoming amount, OR the amount paid
        $payment_amount = min($payment_amount, $paid);
        // calculate and set new REG_paid
        $paid = $paid - $payment_amount;
        $this->set_paid($paid);
        // make it stick
        $this->save();
        // convert payment amount back to a negative value for storage in the db
        return (float) $payment_amount;
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.20.p
     */
    public function defaultRegistrationStatus(): string
    {
        $default_event_reg_status = $this->event()->default_registration_status();
        $default_reg_status = (string) apply_filters(
            'AFEE__EE_Registration__defaultRegistrationStatus__default_reg_status',
            $default_event_reg_status,
            $this
        );
        return RegStatus::isValidStatus($default_reg_status, false)
            ? $default_reg_status
            : $default_event_reg_status;
    }
}
