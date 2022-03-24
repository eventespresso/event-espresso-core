<?php

namespace EventEspresso\core\domain\services\registration;

use EE_Error;
use EE_Event;
use EE_Line_Item;
use EE_Registration;
use EE_Registry;
use EE_Ticket;
use EE_Transaction;
use EEH_Line_Item;
use EEM_Registration;
use EventEspresso\core\domain\entities\RegCode;
use EventEspresso\core\domain\entities\RegUrlLink;
use EventEspresso\core\domain\services\DomainService;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use OutOfRangeException;

/**
 * Class CreateRegistrationService
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class CreateRegistrationService extends DomainService
{
    /**
     * @param EE_Event        $event
     * @param EE_Transaction  $transaction
     * @param EE_Ticket       $ticket
     * @param EE_Line_Item    $ticket_line_item
     * @param                 $reg_count
     * @param                 $reg_group_size
     * @param string          $reg_status
     * @return EE_Registration
     * @throws OutOfRangeException
     * @throws EE_Error
     * @throws UnexpectedEntityException
     */
    public function create(
        EE_Event $event,
        EE_Transaction $transaction,
        EE_Ticket $ticket,
        EE_Line_Item $ticket_line_item,
        $reg_count,
        $reg_group_size,
        $reg_status = EEM_Registration::status_id_incomplete
    ) {
        $registrations = $transaction->registrations();
        $reg_count = $reg_count ? $reg_count : count($registrations) + 1;
        $reg_url_link = new RegUrlLink($reg_count, $ticket_line_item);
        $reg_code = new RegCode($reg_url_link, $transaction, $ticket);
        // generate new EE_Registration
        $registration = EE_Registration::new_instance(
            array(
                'EVT_ID'          => $event->ID(),
                'TXN_ID'          => $transaction->ID(),
                'TKT_ID'          => $ticket->ID(),
                'STS_ID'          => $reg_status,
                'REG_final_price' => $this->resolveFinalPrice($transaction, $ticket, $ticket_line_item),
                'REG_session'     => EE_Registry::instance()->SSN->id(),
                'REG_count'       => $reg_count,
                'REG_group_size'  => $reg_group_size ? $reg_group_size : $this->incrementRegGroupSize($registrations),
                'REG_url_link'    => $reg_url_link,
                'REG_code'        => $reg_code,
            )
        );
        if (! $registration instanceof EE_Registration) {
            throw new UnexpectedEntityException($registration, 'EE_Registration');
        }
        // save registration so that we have an ID
        $registration->save();
        // track reservation on reg but don't adjust ticket and datetime reserved counts
        // because that is done as soon as the tickets are added/removed from the cart
        $registration->reserve_ticket(false, 'CreateRegistrationService:' . __LINE__);
        $registration->_add_relation_to($event, 'Event', array(), $event->ID());
        $registration->_add_relation_to($ticket, 'Ticket', array(), $ticket->ID());
        $transaction->_add_relation_to($registration, 'Registration', array(), $registration->ID());
        $registration->save();
        return $registration;
    }


    /**
     * @param EE_Transaction $transaction
     * @param EE_Ticket      $ticket
     * @param EE_Line_Item   $ticket_line_item
     * @return float
     * @throws EE_Error
     * @throws OutOfRangeException
     */
    protected function resolveFinalPrice(
        EE_Transaction $transaction,
        EE_Ticket $ticket,
        EE_Line_Item $ticket_line_item
    ) {
        $final_price = EEH_Line_Item::calculate_final_price_for_ticket_line_item(
            $transaction->total_line_item(),
            $ticket_line_item
        );
        $final_price = $final_price !== null ? $final_price : $ticket->get_ticket_total_with_taxes();
        return (float) $final_price;
    }


    /**
     * @param  EE_Registration[] $registrations
     * @param  boolean           $update_existing_registrations
     * @return int
     * @throws EE_Error
     */
    protected function incrementRegGroupSize(array $registrations, $update_existing_registrations = true)
    {
        $new_reg_group_size = count($registrations) + 1;
        if ($update_existing_registrations) {
            foreach ($registrations as $registration) {
                if ($registration instanceof EE_Registration) {
                    $registration->set_group_size($new_reg_group_size);
                    $registration->save();
                }
            }
        }
        return $new_reg_group_size;
    }
}
