<?php

namespace EventEspresso\modules\ticket_selector;

use EE_Datetime;
use EE_Error;
use EE_Ticket;
use EEM_Datetime;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;

/**
 * Class TicketDatetimeAvailabilityTracker
 * keeps track of event datetime ticket availability for the Ticket Selector
 * when multiple tickets are being added to the cart
 *
 * @package EventEspresso\modules\ticket_selector
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class TicketDatetimeAvailabilityTracker
{

    /**
     * array of datetimes and the spaces available for them
     *
     * @var array[][]
     */
    private $available_spaces = array();

    /**
     * @var EEM_Datetime $datetime_model
     */
    private $datetime_model;


    /**
     * TicketDatetimeAvailabilityTracker constructor.
     *
     * @param EEM_Datetime $datetime_model
     */
    public function __construct(EEM_Datetime $datetime_model)
    {
        $this->datetime_model = $datetime_model;
    }


    /**
     * ticketDatetimeAvailability
     * creates an array of tickets plus all of the datetimes available to each ticket
     * and tracks the spaces remaining for each of those datetimes
     *
     * @param EE_Ticket $ticket - selected ticket
     * @param bool      $get_original_ticket_spaces
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function ticketDatetimeAvailability(EE_Ticket $ticket, $get_original_ticket_spaces = false)
    {
        // if the $_available_spaces array has not been set up yet...
        if (! isset($this->available_spaces['tickets'][ $ticket->ID() ])) {
            $this->setInitialTicketDatetimeAvailability($ticket);
        }
        $available_spaces = $ticket->qty() - $ticket->sold();
        if (isset($this->available_spaces['tickets'][ $ticket->ID() ])) {
            // loop thru tickets, which will ALSO include individual ticket records AND a total
            foreach ($this->available_spaces['tickets'][ $ticket->ID() ] as $DTD_ID => $spaces) {
                // if we want the original datetime availability BEFORE we started subtracting tickets ?
                if ($get_original_ticket_spaces) {
                    // then grab the available spaces from the "tickets" array
                    // and compare with the above to get the lowest number
                    $available_spaces = min(
                        $available_spaces,
                        $this->available_spaces['tickets'][ $ticket->ID() ][ $DTD_ID ]
                    );
                } else {
                    // we want the updated ticket availability as stored in the "datetimes" array
                    $available_spaces = min($available_spaces, $this->available_spaces['datetimes'][ $DTD_ID ]);
                }
            }
        }
        return $available_spaces;
    }


    /**
     * @param EE_Ticket $ticket
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    private function setInitialTicketDatetimeAvailability(EE_Ticket $ticket)
    {
        // first, get all of the datetimes that are available to this ticket
        $datetimes = $ticket->get_many_related(
            'Datetime',
            array(
                array(
                    'DTT_EVT_end' => array(
                        '>=',
                        $this->datetime_model->current_time_for_query('DTT_EVT_end'),
                    ),
                ),
                'order_by' => array('DTT_EVT_start' => 'ASC'),
            )
        );
        if (! empty($datetimes)) {
            // now loop thru all of the datetimes
            foreach ($datetimes as $datetime) {
                if ($datetime instanceof EE_Datetime) {
                    // the number of spaces available for the datetime without considering individual ticket quantities
                    $spaces_remaining = $datetime->spaces_remaining();
                    // save the total available spaces ( the lesser of the ticket qty minus the number of tickets sold
                    // or the datetime spaces remaining) to this ticket using the datetime ID as the key
                    $this->available_spaces['tickets'][ $ticket->ID() ][ $datetime->ID() ] = min(
                        $ticket->qty() - $ticket->sold(),
                        $spaces_remaining
                    );
                    // if the remaining spaces for this datetime is already set,
                    // then compare that against the datetime spaces remaining, and take the lowest number,
                    // else just take the datetime spaces remaining, and assign to the datetimes array
                    $this->available_spaces['datetimes'][ $datetime->ID() ] = isset(
                        $this->available_spaces['datetimes'][ $datetime->ID() ]
                    )
                        ? min($this->available_spaces['datetimes'][ $datetime->ID() ], $spaces_remaining)
                        : $spaces_remaining;
                }
            }
        }
    }


    /**
     * @param    EE_Ticket $ticket
     * @param    int       $qty
     * @return    void
     * @throws EE_Error
     */
    public function recalculateTicketDatetimeAvailability(EE_Ticket $ticket, $qty = 0)
    {
        if (isset($this->available_spaces['tickets'][ $ticket->ID() ])) {
            // loop thru tickets, which will ALSO include individual ticket records AND a total
            foreach ($this->available_spaces['tickets'][ $ticket->ID() ] as $DTD_ID => $spaces) {
                // subtract the qty of selected tickets from each datetime's available spaces this ticket has access to,
                $this->available_spaces['datetimes'][ $DTD_ID ] -= $qty;
            }
        }
    }


    /**
     * @param EE_Ticket $ticket
     * @param           $qty
     * @param int       $total_ticket_count
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function processAvailabilityError(EE_Ticket $ticket, $qty, $total_ticket_count = 1)
    {
        // tickets can not be purchased but let's find the exact number left
        // for the last ticket selected PRIOR to subtracting tickets
        $available_spaces = $this->ticketDatetimeAvailability($ticket, true);
        // greedy greedy greedy eh?
        if ($available_spaces > 0) {
            if (apply_filters(
                'FHEE__EE_Ticket_Selector___add_ticket_to_cart__allow_display_availability_error',
                true,
                $ticket,
                $qty,
                $available_spaces
            )) {
                $this->availabilityError(
                    $available_spaces,
                    $total_ticket_count
                );
            }
        } else {
            EE_Error::add_error(
                esc_html__(
                    'We\'re sorry, but there are no available spaces left for this event at this particular date and time.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
    }


    /**
     * @param int $available_spaces
     * @param int $total_ticket_count
     */
    private function availabilityError($available_spaces = 1, $total_ticket_count = 1)
    {
        // add error messaging - we're using the _n function that will generate
        // the appropriate singular or plural message based on the number of $available_spaces
        if ($total_ticket_count) {
            $msg = sprintf(
                esc_html(
                    _n(
                        'We\'re sorry, but there is only %1$s available space left for this event at this particular date and time. Please select a different number (or different combination) of tickets by cancelling the current selection and choosing again, or proceed to registration.',
                        'We\'re sorry, but there are only %1$s available spaces left for this event at this particular date and time. Please select a different number (or different combination) of tickets by cancelling the current selection and choosing again, or proceed to registration.',
                        $available_spaces,
                        'event_espresso'
                    )
                ),
                $available_spaces,
                '<br />'
            );
        } else {
            $msg = sprintf(
                esc_html(
                    _n(
                        'We\'re sorry, but there is only %1$s available space left for this event at this particular date and time. Please select a different number (or different combination) of tickets.',
                        'We\'re sorry, but there are only %1$s available spaces left for this event at this particular date and time. Please select a different number (or different combination) of tickets.',
                        $available_spaces,
                        'event_espresso'
                    )
                ),
                $available_spaces,
                '<br />'
            );
        }
        EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
    }
}
