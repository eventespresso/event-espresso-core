<?php

namespace EventEspresso\core\domain\services\registration\form\v1\subsections;

use EE_Error;
use EE_Form_Section_HTML;
use EE_Line_Item;
use EE_Line_Item_Display;
use EE_Ticket;
use EEH_HTML;
use EEH_Line_Item;
use ReflectionException;

class TicketDetailsTable extends EE_Form_Section_HTML
{
    private EE_Line_Item $cart_grand_total;
    private EE_Line_Item_Display $line_item_display;

    private static int $prev_ticket_id = 0;


    /**
     * @param EE_Line_Item $cart_grand_total
     * @param EE_Line_Item_Display $line_item_display
     * @param EE_Ticket $ticket
     * @param bool      $revisit
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(EE_Line_Item $cart_grand_total, EE_Line_Item_Display $line_item_display, EE_Ticket $ticket, bool $revisit)
    {
        $this->cart_grand_total = $cart_grand_total;
        $this->line_item_display = $line_item_display;
        parent::__construct(
            ! $revisit && $ticket->ID() !== TicketDetailsTable::$prev_ticket_id
                ? $this->generateTicketDetailsTable($ticket)
                : ''
        );
        TicketDetailsTable::$prev_ticket_id = $ticket->ID();
    }


    private function generateTicketDetailsTable(EE_Ticket $ticket): string
    {
        $ticket_line_item = EEH_Line_Item::get_line_items_by_object_type_and_IDs(
            $this->cart_grand_total,
            'Ticket',
            [$ticket->ID()]
        );
        $ticket_line_item = ! empty($ticket_line_item) ? reset($ticket_line_item) : $ticket_line_item;

        return EEH_HTML::div(
            EEH_HTML::table(
                EEH_HTML::thead(
                    EEH_HTML::tr(
                        EEH_HTML::th('', '', 'jst-left')
                        . EEH_HTML::th(esc_html__('Qty', 'event_espresso'), '', 'jst-rght')
                        . EEH_HTML::th(esc_html__('Price', 'event_espresso'), '', 'jst-rght')
                        . EEH_HTML::th(esc_html__('Total', 'event_espresso'), '', 'jst-rght'),
                    )
                )
                . EEH_HTML::tbody($this->line_item_display->display_line_item($ticket_line_item)),
                '',
                'spco-ticket-details'
            ),
            '',
            'spco-ticket-info-dv'
        );
    }
}
