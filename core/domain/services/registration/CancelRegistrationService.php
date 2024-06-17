<?php

namespace EventEspresso\core\domain\services\registration;

use EE_Error;
use EE_Registration;
use EventEspresso\core\domain\entities\contexts\Context;
use EventEspresso\core\domain\services\ticket\CancelTicketLineItemService;
use ReflectionException;

/**
 * Class CancelRegistrationService
 * Decrements and cancels a registration's related ticket line item quantity,
 * then sets the registration status to RegStatus::CANCELLED
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class CancelRegistrationService
{
    /**
     * @var CancelTicketLineItemService $cancel_ticket_line_item_service
     */
    private $cancel_ticket_line_item_service;


    /**
     * Command constructor
     *
     * @param CancelTicketLineItemService $cancel_ticket_line_item_service
     */
    public function __construct(CancelTicketLineItemService $cancel_ticket_line_item_service)
    {
        $this->cancel_ticket_line_item_service = $cancel_ticket_line_item_service;
    }


    /**
     * @param EE_Registration $registration
     * @param bool            $cancel_ticket_line_item
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function cancelRegistrationAndTicketLineItem(EE_Registration $registration, $cancel_ticket_line_item = true)
    {
        // first cancel the original line item for the registration's ticket
        if ($cancel_ticket_line_item) {
            $this->cancel_ticket_line_item_service->forRegistration($registration);
        }
        $this->cancelRegistrationOnly($registration);
    }


    /**
     * @param EE_Registration $registration
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function cancelRegistrationOnly(EE_Registration $registration)
    {
        // now cancel the registration itself
        $registration->set_status(
            RegStatus::CANCELLED,
            false,
            new Context(
                __METHOD__,
                esc_html__('Executed when a registration is cancelled.', 'event_espresso')
            )
        );
        $registration->save();
    }
}
