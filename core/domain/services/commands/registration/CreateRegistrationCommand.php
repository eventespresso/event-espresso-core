<?php

namespace EventEspresso\core\domain\services\commands\registration;

use EE_Error;
use EE_Line_Item;
use EE_Registration;
use EE_Ticket;
use EE_Transaction;
use EEM_Registration;
use EventEspresso\core\domain\services\capabilities\CapCheck;
use EventEspresso\core\domain\services\capabilities\CapCheckInterface;
use EventEspresso\core\domain\services\capabilities\PublicCapabilities;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\Command;
use EventEspresso\core\services\commands\CommandRequiresCapCheckInterface;

/**
 * Class CreateRegistrationCommand
 * DTO for passing data to a CreateRegistrationCommandHandler
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateRegistrationCommand extends Command implements CommandRequiresCapCheckInterface
{
    /**
     * @var EE_Transaction $transaction
     */
    private $transaction;

    /**
     * @var EE_Ticket $ticket
     */
    private $ticket;

    /**
     * @var EE_Line_Item $ticket_line_item
     */
    private $ticket_line_item;

    /**
     * @var int $reg_count
     */
    private $reg_count;

    /**
     * @var int $reg_group_size
     */
    private $reg_group_size;

    /**
     * @var string $reg_status
     */
    private $reg_status;

    /**
     * @var EE_Registration $registration
     */
    protected $registration;


    /**
     * CreateRegistrationCommand constructor.
     *
     * @param EE_Transaction $transaction
     * @param EE_Line_Item   $ticket_line_item
     * @param int            $reg_count
     * @param int            $reg_group_size
     * @param string         $reg_status
     * @param EE_Ticket|null $ticket
     * @throws InvalidEntityException
     * @throws EE_Error
     */
    public function __construct(
        EE_Transaction $transaction,
        EE_Line_Item $ticket_line_item,
        $reg_count = 1,
        $reg_group_size = 0,
        $reg_status = EEM_Registration::status_id_incomplete,
        EE_Ticket $ticket = null
    ) {
        defined('EVENT_ESPRESSO_VERSION') || exit;
        $this->transaction      = $transaction;
        $this->ticket_line_item = $ticket_line_item;
        $this->reg_count        = absint($reg_count);
        $this->reg_group_size   = absint($reg_group_size);
        $this->reg_status       = $reg_status;
        // grab the related ticket object for this line_item if one wasn't already supplied
        $this->ticket = $ticket instanceof EE_Ticket ? $ticket : $this->ticket_line_item->ticket();
        if (! $this->ticket instanceof EE_Ticket) {
            throw new InvalidEntityException(
                is_object($this->ticket) ? get_class($this->ticket) : gettype($this->ticket),
                'EE_Ticket',
                sprintf(
                    esc_html__('Line item %s did not contain a valid ticket', 'event_espresso'),
                    $ticket_line_item->ID()
                )
            );
        }
    }


    /**
     * @return CapCheckInterface
     * @throws InvalidDataTypeException
     */
    public function getCapCheck()
    {
        if (! $this->cap_check instanceof CapCheckInterface) {
            // need cap for non-AJAX admin requests
            $this->cap_check = ! (defined('DOING_AJAX') && DOING_AJAX) && is_admin()
                ? new CapCheck('ee_edit_registrations', 'create_new_registration')
                : new PublicCapabilities('', 'create_new_registration');
        }
        return $this->cap_check;
    }


    /**
     * @return EE_Transaction
     */
    public function transaction()
    {
        return $this->transaction;
    }


    /**
     * @return EE_Ticket
     */
    public function ticket()
    {
        return $this->ticket;
    }


    /**
     * @return EE_Line_Item
     */
    public function ticketLineItem()
    {
        return $this->ticket_line_item;
    }


    /**
     * @return int
     */
    public function regCount()
    {
        return $this->reg_count;
    }


    /**
     * @return int
     */
    public function regGroupSize()
    {
        return $this->reg_group_size;
    }


    /**
     * @return string
     */
    public function regStatus()
    {
        return $this->reg_status;
    }


    /**
     * @return EE_Registration
     */
    public function registration()
    {
        return $this->registration;
    }
}
