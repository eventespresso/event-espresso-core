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

    private bool $revisit;

    private array $tickets = [];

    private static array $ticket_line_item_options = [
        'extra_css' => [
            'row' => 'ee-ticket-details-row',
            'name' => 'ee-ticket-details-name',
            'qty' => 'ee-ticket-details-qty',
            'price' => 'ee-ticket-details-price',
            'total' => 'ee-ticket-details-total',
        ]
    ];


    /**
     * @param EE_Line_Item $cart_grand_total
     * @param EE_Line_Item_Display $line_item_display
     * @param bool      $revisit
     */
    public function __construct(EE_Line_Item $cart_grand_total, EE_Line_Item_Display $line_item_display, bool $revisit)
    {
        $this->cart_grand_total = $cart_grand_total;
        $this->line_item_display = $line_item_display;
        $this->revisit = $revisit;
        parent::__construct();
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function addTicket(EE_Ticket $ticket): void
    {
        if (! isset($this->tickets[ $ticket->ID() ])) {
            $this->tickets[ $ticket->ID() ] = $ticket;
        }
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function get_html(): string
    {
        if ($this->revisit) {
            return '';
        }
        $table_rows = '';
        foreach ($this->tickets as $ticket) {
            $table_rows .= $this->generateTicketDetailsTableRow($ticket);
        }
        return $this->generateTicketDetailsTable($table_rows);
    }


    /**
     * @param string $table_rows
     * @return string
     */
    private function generateTicketDetailsTable(string $table_rows): string
    {

        return EEH_HTML::div(
            EEH_HTML::table(
                EEH_HTML::thead(
                    EEH_HTML::tr(
                        EEH_HTML::th('', '', 'ee-ticket-details-name jst-left')
                        . EEH_HTML::th(esc_html__('Qty', 'event_espresso'), '', 'ee-ticket-details-qty jst-rght')
                        . EEH_HTML::th(esc_html__('Price', 'event_espresso'), '', 'ee-ticket-details-price jst-rght')
                        . EEH_HTML::th(esc_html__('Total', 'event_espresso'), '', 'ee-ticket-details-total jst-rght'),
                    )
                )
                . EEH_HTML::tbody($table_rows),
                '',
                'spco-ticket-details'
            ),
            '',
            'spco-ticket-info-dv'
        );
    }


    /**
     * @param EE_Ticket $ticket
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function generateTicketDetailsTableRow(EE_Ticket $ticket): string
    {
        $ticket_line_item = EEH_Line_Item::get_line_items_by_object_type_and_IDs(
            $this->cart_grand_total,
            'Ticket',
            [$ticket->ID()]
        );
        $ticket_line_item = ! empty($ticket_line_item) ? reset($ticket_line_item) : $ticket_line_item;

        $ticket_line_item_options = self::$ticket_line_item_options;
        $ticket_line_item_options['extra_css']['row'] = "ticket-details-{$ticket->ID()}";


        return $ticket_line_item instanceof EE_Line_Item
            ? $this->line_item_display->display_line_item($ticket_line_item, $ticket_line_item_options)
            : '';
    }
}
