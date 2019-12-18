<?php

/**
 * Class EED_Ticket_Sales_Monitor_Mock
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class EED_Ticket_Sales_Monitor_Mock extends EED_Ticket_Sales_Monitor
{
    public static function release_reservations_for_tickets(
        array $tickets_with_reservations,
        array $valid_reserved_ticket_line_items = array(),
        $source = ''
    ) {
        return parent::release_reservations_for_tickets(
            $tickets_with_reservations,
            $valid_reserved_ticket_line_items,
            $source
        );
    }

}
// End of file EED_Ticket_Sales_Monitor_Mock.php
// Location: ${NAMESPACE}/EED_Ticket_Sales_Monitor_Mock.php
