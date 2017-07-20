<?php

namespace EventEspresso\core\domain\services\event;

use DomainException;
use EE_Datetime;
use EE_Error;
use EE_Event;
use EE_Ticket;
use EEM_Ticket;
use EventEspresso\core\exceptions\UnexpectedEntityException;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class EventSpacesCalculator
 * Calculates total available spaces for an event with no regard for sold tickets,
 * or spaces remaining based on "saleable" tickets.
 * This is done by looping through all of the tickets and datetimes for the event
 * and simulating the sale of available tickets until each datetime reaches its maximum capacity.
 *
 * @package EventEspresso\core\domain\services\event
 * @author  Brent Christensen
 * @since   4.9.45
 */
class EventSpacesCalculator
{

    /**
     * @var EE_Event $event
     */
    private $event;

    /**
     * @var array $datetime_query_params
     */
    private $datetime_query_params;

    /**
     * @var EE_Ticket[] $active_tickets
     */
    private $active_tickets = array();

    /**
     * @var EE_Datetime[] $datetimes
     */
    private $datetimes = array();

    /**
     * Array of Ticket IDs grouped by Datetime
     *
     * @var array $datetimes
     */
    private $datetime_tickets = array();

    /**
     * Max spaces for each Datetime (reg limit - previous sold)
     *
     * @var array $datetime_spaces
     */
    private $datetime_spaces = array();

    /**
     * Array of Datetime IDs grouped by Ticket
     *
     * @var array $ticket_datetimes
     */
    private $ticket_datetimes = array();

    /**
     * maximum ticket quantities for each ticket (adjusted for reg limit)
     *
     * @var array $ticket_quantities
     */
    private $ticket_quantities = array();

    /**
     * total quantity of sold and reserved for each ticket
     *
     * @var array $tickets_sold
     */
    private $tickets_sold = array();

    /**
     * total spaces available across all datetimes
     *
     * @var array $total_spaces
     */
    private $total_spaces = array();

    /**
     * @var boolean $debug
     */
    private $debug = false;



    /**
     * EventSpacesCalculator constructor.
     *
     * @param EE_Event $event
     * @param array    $datetime_query_params
     * @throws EE_Error
     */
    public function __construct(EE_Event $event, array $datetime_query_params = array())
    {
        $this->event = $event;
        $this->datetime_query_params = $datetime_query_params + array('order_by' => array('DTT_reg_limit' => 'ASC'));
    }



    /**
     * @return EE_Ticket[]
     * @throws EE_Error
     */
    public function getActiveTickets()
    {
        if(empty($this->active_tickets)) {
            $this->active_tickets = $this->event->tickets(
                array(
                    array(
                        'TKT_end_date' => array('>=', EEM_Ticket::instance()->current_time_for_query('TKT_end_date')),
                        'TKT_deleted'  => false,
                    ),
                    'order_by' => array('TKT_qty' => 'ASC')
                )
            );
        }
        return $this->active_tickets;
    }



    /**
     * @param EE_Ticket[] $active_tickets
     * @throws EE_Error
     * @throws DomainException
     * @throws UnexpectedEntityException
     */
    public function setActiveTickets(array $active_tickets = array())
    {
        if (! empty($active_tickets)){
            foreach ($active_tickets as $active_ticket) {
                $this->validateTicket($active_ticket);
            }
            // sort incoming array by ticket quantity (asc)
            usort(
                $active_tickets,
                function (EE_Ticket $a, EE_Ticket $b) {
                    if ($a->qty() === $b->qty()) {
                        return 0;
                    }
                    return ($a->qty() < $b->qty())
                        ? -1
                        : 1;
                }
            );
        }
        $this->active_tickets = $active_tickets;
    }



    /**
     * @param $ticket
     * @throws DomainException
     * @throws EE_Error
     * @throws UnexpectedEntityException
     */
    private function validateTicket($ticket)
    {
        if (! $ticket instanceof EE_Ticket) {
            throw new DomainException(
                esc_html__(
                    'Invalid Ticket. Only EE_Ticket objects can be used to calculate event space availability.',
                    'event_espresso'
                )
            );
        }
        if ($ticket->get_event_ID() !== $this->event->ID()) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'An EE_Ticket for Event %1$d was supplied while calculating event space availability for Event %2$d.',
                        'event_espresso'
                    ),
                    $ticket->get_event_ID(),
                    $this->event->ID()
                )
            );
        }
    }



    /**
     * @return EE_Datetime[]
     */
    public function getDatetimes()
    {
        return $this->datetimes;
    }



    /**
     * @param EE_Datetime $datetime
     * @throws EE_Error
     * @throws DomainException
     */
    public function setDatetime(EE_Datetime $datetime)
    {
        if ($datetime->event()->ID() !== $this->event->ID()) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'An EE_Datetime for Event %1$d was supplied while calculating event space availability for Event %2$d.',
                        'event_espresso'
                    ),
                    $datetime->event()->ID(),
                    $this->event->ID()
                )
            );
        }
        $this->datetimes[$datetime->ID()] = $datetime;
    }



    /**
     * calculate spaces remaining based on "saleable" tickets
     *
     * @return float|int
     * @throws EE_Error
     * @throws DomainException
     * @throws UnexpectedEntityException
     */
    public function spacesRemaining()
    {
        $this->initialize();
        return $this->calculate();
    }



    /**
     * calculates total available spaces for an event with no regard for sold tickets
     *
     * @return int|float
     * @throws EE_Error
     * @throws DomainException
     * @throws UnexpectedEntityException
     */
    public function totalSpacesAvailable()
    {
        $this->initialize();
        return $this->calculate(false);
    }



    /**
     * Loops through the active tickets for the event
     * and builds a series of data arrays that will be used for calculating
     * the total maximum available spaces, as well as the spaces remaining.
     * Because ticket quantities affect datetime spaces and vice versa,
     * we need to be constantly updating these data arrays as things change,
     * which is the entire reason for their existence.
     *
     * @throws EE_Error
     * @throws DomainException
     * @throws UnexpectedEntityException
     */
    private function initialize()
    {
        if ($this->debug) {
            echo "\n\n" . __LINE__ . ') ' . strtoupper(__METHOD__) . '()';
        }
        $this->datetime_tickets = array();
        $this->datetime_spaces = array();
        $this->ticket_datetimes = array();
        $this->ticket_quantities = array();
        $this->tickets_sold = array();
        $this->total_spaces = array();
        $active_tickets = $this->getActiveTickets();
        if (! empty($active_tickets)) {
            foreach ($active_tickets as $ticket) {
                $this->validateTicket($ticket);
                // we need to index our data arrays using strings for the purpose of sorting,
                // but we also need them to be unique, so  we'll just prepend a letter T to the ID
                $ticket_identifier = "T{$ticket->ID()}";
                // to start, we'll just consider the raw qty to be the maximum availability for this ticket
                $max_tickets = $ticket->qty();
                // but we'll adjust that after looping over each datetime for the ticket and checking reg limits
                $ticket_datetimes = $ticket->datetimes($this->datetime_query_params);
                foreach ($ticket_datetimes as $datetime) {
                    // save all datetimes
                    $this->setDatetime($datetime);
                    $datetime_identifier = "D{$datetime->ID()}";
                    $reg_limit = $datetime->reg_limit();
                    // ticket quantity can not exceed datetime reg limit
                    $max_tickets = min($max_tickets, $reg_limit);
                    // as described earlier, because we need to be able to constantly adjust numbers for things,
                    // we are going to move all of our data into the following arrays:
                    // datetime spaces initially represents the reg limit for each datetime,
                    // but this will get adjusted as tickets are accounted for
                    $this->datetime_spaces[$datetime_identifier] = $reg_limit;
                    // just an array of ticket IDs grouped by datetime
                    $this->datetime_tickets[$datetime_identifier][] = $ticket_identifier;
                    // and an array of datetime IDs grouped by ticket
                    $this->ticket_datetimes[$ticket_identifier][] = $datetime_identifier;
                }
                // total quantity of sold and reserved for each ticket
                $this->tickets_sold[$ticket_identifier] = $ticket->sold() + $ticket->reserved();
                // and the maximum ticket quantities for each ticket (adjusted for reg limit)
                $this->ticket_quantities[$ticket_identifier] = $max_tickets;
            }
        }
        // sort datetime spaces by reg limit, but maintain our string indexes
        asort($this->datetime_spaces, SORT_NUMERIC);
        // datetime tickets need to be sorted in the SAME order as the above array...
        // so we'll just use array_merge() to take the structure of datetime_spaces
        // but overwrite all of the data with that from datetime_tickets
        $this->datetime_tickets = array_merge(
            $this->datetime_spaces,
            $this->datetime_tickets
        );
        if ($this->debug) {
            \EEH_Debug_Tools::printr($this->datetime_spaces, 'datetime_spaces', __FILE__, __LINE__);
            \EEH_Debug_Tools::printr($this->datetime_tickets, 'datetime_tickets', __FILE__, __LINE__);
            \EEH_Debug_Tools::printr($this->ticket_quantities, 'ticket_quantities', __FILE__, __LINE__);
        }
    }



    /**
     * performs calculations on initialized data
     *
     * @param bool $consider_sold
     * @return int|float
     */
    private function calculate($consider_sold = true)
    {
        if ($this->debug) {
            echo "\n\n" . __LINE__ . ') ' . strtoupper(__METHOD__) . '()';
        }
        foreach ($this->datetime_tickets as $datetime_identifier => $tickets) {
            $this->trackAvailableSpacesForDatetimes($datetime_identifier, $tickets);
        }
        // total spaces available is just the sum of the spaces available for each datetime
        $spaces_remaining = array_sum($this->total_spaces);
        if($consider_sold) {
            // less the sum of all tickets sold for these datetimes
            $spaces_remaining -= array_sum($this->tickets_sold);
        }
        if ($this->debug) {
            \EEH_Debug_Tools::printr($this->total_spaces, '$this->total_spaces', __FILE__, __LINE__);
            \EEH_Debug_Tools::printr($this->tickets_sold, '$this->tickets_sold', __FILE__, __LINE__);
            \EEH_Debug_Tools::printr($spaces_remaining, '$spaces_remaining', __FILE__, __LINE__);
        }
        return $spaces_remaining;
    }



    /**
     * @param string $datetime_identifier
     * @param array  $tickets
     */
    private function trackAvailableSpacesForDatetimes($datetime_identifier, array $tickets)
    {
        // make sure a reg limit is set for the datetime
        $reg_limit = isset($this->datetime_spaces[$datetime_identifier])
            ? $this->datetime_spaces[$datetime_identifier]
            : 0;
        // and bail if it is not
        if (! $reg_limit) {
            if ($this->debug) {
                echo "\n . {$datetime_identifier} AT CAPACITY";
            }
            return;
        }
        if ($this->debug) {
            echo "\n\n{$datetime_identifier}";
            echo "\n . " . 'REG LIMIT: ' . $reg_limit;
        }
        // set default number of available spaces
        $available_spaces = 0;
        $this->total_spaces[$datetime_identifier] = 0;
        foreach ($tickets as $ticket_identifier) {
            $available_spaces = $this->calculateAvailableSpacesForTicket(
                $datetime_identifier,
                $reg_limit,
                $ticket_identifier,
                $available_spaces
            );
        }
        // spaces can't be negative
        $available_spaces = max($available_spaces, 0);
        if ($available_spaces) {
            // track any non-zero values
            $this->total_spaces[$datetime_identifier] += $available_spaces;
            if ($this->debug) {
                echo "\n . spaces: {$available_spaces}";
            }
        } else {
            if ($this->debug) {
                echo "\n . NO TICKETS AVAILABLE FOR DATETIME";
            }
        }
        if ($this->debug) {
            \EEH_Debug_Tools::printr($this->total_spaces[$datetime_identifier], '$spaces_remaining', __FILE__, __LINE__);
            \EEH_Debug_Tools::printr($this->ticket_quantities, '$ticket_quantities', __FILE__, __LINE__);
            \EEH_Debug_Tools::printr($this->datetime_spaces, 'datetime_spaces', __FILE__, __LINE__);
        }
    }



    /**
     * @param string $datetime_identifier
     * @param int    $reg_limit
     * @param string $ticket_identifier
     * @param int    $available_spaces
     * @return int
     */
    private function calculateAvailableSpacesForTicket($datetime_identifier, $reg_limit,$ticket_identifier, $available_spaces)
    {
        if ($this->debug) {
            echo "\n . {$ticket_identifier}";
        }
        // make sure ticket quantity is set
        $ticket_quantity = isset($this->ticket_quantities[$ticket_identifier])
            ? $this->ticket_quantities[$ticket_identifier]
            : 0;
        if ($ticket_quantity) {
            if ($this->debug) {
                echo "\n . . available_spaces ({$available_spaces}) <= reg_limit ({$reg_limit}) = ";
                echo ($available_spaces <= $reg_limit)
                    ? 'true'
                    : 'false';
            }
            // if the datetime is NOT at full capacity yet
            if ($available_spaces <= $reg_limit) {
                // then the maximum ticket quantity we can allocate is the lowest value of either:
                //  the number of remaining spaces for the datetime, which is the limit - spaces already taken
                //  or the maximum ticket quantity
                $ticket_quantity = min(($reg_limit - $available_spaces), $ticket_quantity);
                // adjust the available quantity in our tracking array
                $this->ticket_quantities[$ticket_identifier] -= $ticket_quantity;
                // and increment spaces allocated for this datetime
                $available_spaces += $ticket_quantity;
                if ($this->debug) {
                    echo "\n . . ticket quantity: {$ticket_quantity} ({$ticket_identifier})";
                    echo "\n . . . allocate {$ticket_quantity} tickets ({$ticket_identifier})";
                    if ($available_spaces >= $reg_limit) {
                        echo "\n . {$datetime_identifier} AT CAPACITY";
                    }
                }
                // now adjust all other datetimes that allow access to this ticket
                $this->adjustDatetimes(
                    $datetime_identifier,
                    $available_spaces,
                    $reg_limit,
                    $ticket_identifier,
                    $ticket_quantity
                );
            }
        }
        return $available_spaces;
    }



    /**
     * subtracts ticket amounts from all datetime reg limits
     * that allow access to the ticket specified,
     * because that ticket could be used
     * to attend any of the datetimes it has access to
     *
     * @param string $datetime_identifier
     * @param int    $available_spaces
     * @param int    $reg_limit
     * @param string $ticket_identifier
     * @param int    $ticket_quantity
     */
    private function adjustDatetimes($datetime_identifier, $available_spaces, $reg_limit, $ticket_identifier, $ticket_quantity)
    {
        foreach ($this->datetime_tickets as $datetime_ID => $datetime_tickets) {
            // if the supplied ticket has access to this datetime
            if (in_array($ticket_identifier, $datetime_tickets, true)) {
                // and datetime has spaces available
                if (isset($this->datetime_spaces[$datetime_ID])) {
                    // then decrement the available spaces for the datetime
                    $this->datetime_spaces[$datetime_ID] -= $ticket_quantity;
                    // but don't let quantities go below zero
                    $this->datetime_spaces[$datetime_ID] = max(
                        $this->datetime_spaces[$datetime_ID],
                        0
                    );
                    if ($this->debug) {
                        echo "\n . . . " . $datetime_ID . " capacity reduced by {$ticket_quantity}";
                        echo " because it allows access to {$ticket_identifier}";
                    }
                }
                // if this datetime is at full capacity
                if ($datetime_ID === $datetime_identifier && $available_spaces >= $reg_limit) {
                    // then all of it's tickets are now unavailable
                    foreach ($datetime_tickets as $datetime_ticket) {
                        // so  set any tracked available quantities to zero
                        if (isset($this->ticket_quantities[$datetime_ticket])) {
                            $this->ticket_quantities[$datetime_ticket] = 0;
                        }
                        if ($this->debug) {
                            echo "\n . . . " . $datetime_ticket . ' unavailable: ';
                        }
                    }
                }
            }
        }
    }

}
// Location: EventSpacesCalculator.php
