<?php

use EventEspresso\core\domain\services\registration\RegStatus;
use EventEspresso\core\services\helpers\DebugDisplay;

/**
 * Class EE_SPCO_Line_Item_Display_Strategy
 * recursively displays line item information for display in SPCO
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 */
class EE_SPCO_Line_Item_Display_Strategy implements EEI_Line_Item_Display
{
    use DebugDisplay;

    protected bool $prices_include_taxes = false;

    /**
     * array of events
     *
     * @type EE_Line_Item[] $_events
     */
    private array $_events = [];

    /**
     * whether to display the taxes row or not
     *
     * @type bool $_show_taxes
     */
    private bool $_show_taxes = false;

    /**
     * html for any tax rows
     *
     * @type string $_show_taxes
     */
    private string $_taxes_html = '';

    /**
     * total amount including tax we can bill for at this time
     *
     * @type float $_grand_total
     */
    private float $_grand_total = 0.00;

    /**
     * total number of items being billed for
     *
     * @type int $_total_items
     */
    private int $_total_items = 0;

    private bool $debug = false;   //  true  false


    public function __construct()
    {
        $this->prices_include_taxes = EE_Registry::instance()->CFG->tax_settings->prices_displayed_including_taxes;
        $this->initializeDebugDisplay();
    }


    /**
     * @return float
     */
    public function grand_total(): float
    {
        return $this->_grand_total;
    }


    /**
     * @return int
     */
    public function total_items(): int
    {
        return $this->_total_items;
    }


    /**
     * @param EE_Line_Item      $line_item
     * @param array             $options
     * @param EE_Line_Item|null $parent_line_item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function display_line_item(
        EE_Line_Item $line_item,
        $options = [],
        ?EE_Line_Item $parent_line_item = null
    ): string {
        $html = '';
        // set some default options and merge with incoming
        $options += [
            'show_desc' => true,  //    true        false
            'odd'       => false,
        ];

        $this->debugLog('', 2);
        $this->debugLog(__FUNCTION__);
        $this->debugLog($line_item->name() . ': ' . $line_item->code() . ' (' . $line_item->type() . ')');
        if ($line_item->type() === EEM_Line_Item::type_total) {
            $this->debugLog('******************************************************************', 2);
        }

        switch ($line_item->type()) {
            case EEM_Line_Item::type_line_item:
                $sub_taxes         = EEH_Line_Item::get_nearest_descendant_of_type(
                    $line_item,
                    EEM_Line_Item::type_sub_tax
                );
                $show_taxes = $line_item->is_taxable() || $sub_taxes;
                $this->_show_taxes = $show_taxes ? true : $this->_show_taxes;
                $html              .= $line_item->OBJ_type() === 'Ticket'
                    ? $this->ticketRow($line_item, $options, $show_taxes)
                    : $this->itemRow($line_item, $options, $show_taxes);
                if (
                    apply_filters(
                        'FHEE__EE_SPCO_Line_Item_Display_Strategy__display_line_item__display_sub_line_items',
                        true
                    )
                ) {
                    // got any kids?
                    $child_line_items = $line_item->children();
                    if ($child_line_items) {
                        foreach ($child_line_items as $child_line_item) {
                            $html .= $this->display_line_item($child_line_item, $options, $line_item);
                        }
                    }
                }
                break;

            case EEM_Line_Item::type_sub_line_item:
                $html .= $this->subItemRow($line_item, $options, $parent_line_item);
                break;

            case EEM_Line_Item::type_sub_tax:
                $this->_show_taxes = true;
                break;

            case EEM_Line_Item::type_sub_total:
                static $sub_total = 0;
                $event_sub_total = 0;
                $text            = esc_html__('Sub-Total', 'event_espresso');
                if ($line_item->OBJ_type() === 'Event') {
                    $options['event_id'] = $line_item->OBJ_ID();
                    if (! isset($this->_events[ $options['event_id'] ])) {
                        $this->_events[ $options['event_id'] ] = 0;
                        $event                                 = EEM_Event::instance()->get_one_by_ID(
                            $options['event_id']
                        );
                        $event_name                            = $event instanceof EE_Event ? $event->name() . ' ' : '';
                        // if event has default reg status of Not Approved, then don't display info on it
                        if (
                            $event instanceof EE_Event
                            && $event->default_registration_status() === RegStatus::AWAITING_REVIEW
                        ) {
                            // unless display is forced
                            $display_event = false;
                            // unless there are registrations for it that are returning to pay
                            if (isset($options['registrations']) && is_array($options['registrations'])) {
                                foreach ($options['registrations'] as $registration) {
                                    if (! $registration instanceof EE_Registration) {
                                        continue;
                                    }
                                    $display_event = $registration->event_ID() === $options['event_id']
                                    && $registration->status_ID() !== RegStatus::AWAITING_REVIEW
                                        ? true
                                        : $display_event;
                                }
                            }
                            if (! $display_event) {
                                return '';
                            }
                        }
                        $this->_events[ $options['event_id'] ] = 0;

                        $html .= $this->eventRow($line_item);
                        $text = $event_name . esc_html__('Event Sub-Total', 'event_espresso');
                    }
                }
                $child_line_items = $line_item->children();
                // loop thru children
                foreach ($child_line_items as $child_line_item) {
                    // recursively feed children back into this method
                    $html .= $this->display_line_item($child_line_item, $options, $line_item);
                }
                if (isset($options['event_id'], $this->_events[ $options['event_id'] ])) {
                    $event_sub_total += $this->_events[ $options['event_id'] ];
                }
                $sub_total += $event_sub_total;
                $this->debugLog(' = count($child_line_items): ' . count($child_line_items), 3);
                $this->debugLog(' = count($this->_events): ' . count($this->_events), 3);
                if (
                    (
                        // event subtotals
                        $line_item->code() !== 'pre-tax-subtotal'
                        && count($child_line_items) > 1
                    ) || (
                        // pre-tax subtotals
                        $line_item->code() === 'pre-tax-subtotal'
                        && count($this->_events) > 1
                    )
                ) {
                    $options['sub_total'] = $line_item->OBJ_type() === 'Event' ? $event_sub_total : $sub_total;
                    $html                 .= $this->subTotalRow($line_item, $text, $options);
                } else {
                    $this->debugLog('NO EVENT SUBTOTAL', 3);
                }
                break;

            case EEM_Line_Item::type_tax:
                if ($this->_show_taxes) {
                    $this->_taxes_html .= $this->taxRow($line_item, $options);
                }
                break;

            case EEM_Line_Item::type_tax_sub_total:
                if ($this->_show_taxes) {
                    $child_line_items = $line_item->children();
                    // loop thru children
                    foreach ($child_line_items as $child_line_item) {
                        // recursively feed children back into this method
                        $html .= $this->display_line_item($child_line_item, $options, $line_item);
                    }
                    if ($child_line_items) {
                        $this->_taxes_html .= $this->totalTaxRow(
                            $line_item,
                            esc_html__('Tax Total', 'event_espresso')
                        );
                    }
                }
                break;

            case EEM_Line_Item::type_total:
                // get all child line items
                $children = $line_item->children();
                // loop thru all non-tax child line items
                foreach ($children as $child_line_item) {
                    if ($child_line_item->type() !== EEM_Line_Item::type_tax_sub_total) {
                        // recursively feed children back into this method
                        $html .= $this->display_line_item($child_line_item, $options, $line_item);
                    }
                }
                // now loop thru  tax child line items
                foreach ($children as $child_line_item) {
                    if ($child_line_item->type() === EEM_Line_Item::type_tax_sub_total) {
                        // recursively feed children back into this method
                        $html .= $this->display_line_item($child_line_item, $options, $line_item);
                    }
                }
                $html .= $this->_taxes_html;
                $html .= $this->totalRow($line_item, esc_html__('Total', 'event_espresso'));
                $html .= $this->paymentsAndAmountOwingRows($line_item, $options);
                break;
        }
        return $html;
    }


    /**
     * _event_row - basically a Heading row displayed once above each event's ticket rows
     *
     * @param EE_Line_Item $line_item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function eventRow(EE_Line_Item $line_item): string
    {
        $this->debugLog(' - ' . __FUNCTION__);
        // start of row
        $html = EEH_HTML::tr('', 'event-cart-total-row', 'total_tr odd');
        // event name td
        $html .= EEH_HTML::td(
            EEH_HTML::strong($line_item->name()),
            '',
            'event-header',
            '',
            ' colspan="4"'
        );
        // end of row
        $html .= EEH_HTML::trx();
        return $html;
    }


    /**
     * _ticket_row
     *
     * @param EE_Line_Item $line_item
     * @param array        $options
     * @param bool         $show_taxes
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function ticketRow(EE_Line_Item $line_item, array $options = [], bool $show_taxes = false): string
    {
        $this->debugLog(' - ' . __FUNCTION__);
        // start of row
        $row_class = $options['odd'] ? 'item odd' : 'item';
        $html      = EEH_HTML::tr('', '', $row_class);
        // name && desc
        $name_and_desc = apply_filters(
            'FHEE__EE_SPCO_Line_Item_Display_Strategy__item_row__name',
            $line_item->name(),
            $line_item
        );
        $name_and_desc .= apply_filters(
            'FHEE__EE_SPCO_Line_Item_Display_Strategy__item_row__desc',
            $options['show_desc']
                ? '<span class="line-item-desc-spn smaller-text">: ' . $line_item->desc() . '</span>'
                : '',
            $line_item,
            $options
        );
        $name_and_desc .= $show_taxes ? ' * ' : '';
        $name_and_desc = apply_filters(
            'FHEE__EE_SPCO_Line_Item_Display_Strategy___ticket_row__name_and_desc',
            $name_and_desc,
            $line_item,
            $options
        );

        // name td
        $html .= EEH_HTML::td(
            $name_and_desc,
            '',
            'item_l'
        );
        // price td
        $price = apply_filters(
            'FHEE__EE_SPCO_Line_Item_Display_Strategy___ticket_row__price',
            $line_item->unit_price_no_code(),
            $line_item
        );
        $html  .= EEH_HTML::td($price, '', 'spco-nowrap item_c jst-rght');
        // quantity td
        $html               .= EEH_HTML::td($line_item->quantity(), '', 'spco-nowrap item_l jst-rght');
        $this->_total_items += $line_item->quantity();
        // determine total for line item
        $total = apply_filters(
            'FHEE__EE_SPCO_Line_Item_Display_Strategy___ticket_row__total',
            $line_item->pretaxTotal(),
            $line_item
        );
        if (isset($this->_events[ $options['event_id'] ])) {
            $this->_events[ $options['event_id'] ] += $total;
        }
        // total td
        $html .= EEH_HTML::td(
            EEH_Template::format_currency($total, false, false),
            '',
            'spco-nowrap item_r jst-rght'
        );
        // end of row
        $html .= EEH_HTML::trx();
        return $html;
    }


    /**
     * _item_row
     *
     * @param EE_Line_Item $line_item
     * @param array        $options
     * @param bool         $show_taxes
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function itemRow(EE_Line_Item $line_item, array $options = [], bool $show_taxes = false): string
    {
        $this->debugLog(' - ' . __FUNCTION__);
        // start of row
        $row_class = $options['odd'] ? 'item odd' : 'item';
        $html      = EEH_HTML::tr('', '', $row_class);
        $obj_name  = $line_item->OBJ_type() ? $line_item->OBJ_type_i18n() . ': ' : '';
        // name && desc
        $name_and_desc = apply_filters(
            'FHEE__EE_SPCO_Line_Item_Display_Strategy__item_row__name',
            $obj_name . $line_item->name(),
            $line_item
        );
        $name_and_desc .= apply_filters(
            'FHEE__EE_SPCO_Line_Item_Display_Strategy__item_row__desc',
            (
            $options['show_desc']
                ? '<span class="line-item-desc-spn smaller-text">: ' . $line_item->desc() . '</span>'
                : ''
            ),
            $line_item,
            $options
        );
        $name_and_desc .= $show_taxes ? ' * ' : '';
        $name_and_desc = apply_filters(
            'FHEE__EE_SPCO_Line_Item_Display_Strategy___item_row__name_and_desc',
            $name_and_desc,
            $line_item,
            $options
        );

        // name td
        $html .= EEH_HTML::td($name_and_desc, '', 'item_l');
        // price td
        if ($line_item->is_percent()) {
            $html .= EEH_HTML::td($line_item->percent() . '%', '', 'spco-nowrap item_c jst-rght');
        } else {
            $html .= EEH_HTML::td($line_item->unit_price_no_code(), '', 'spco-nowrap item_c jst-rght');
        }
        // quantity td
        $html .= EEH_HTML::td($line_item->quantity(), '', 'spco-nowrap item_l jst-rght');
        // $total = $line_item->total() * $line_item->quantity();
        $total = $line_item->total();
        if (isset($options['event_id'], $this->_events[ $options['event_id'] ])) {
            $this->_events[ $options['event_id'] ] += $total;
        }
        // total td
        $html .= EEH_HTML::td(
            EEH_Template::format_currency($total, false, false),
            '',
            'spco-nowrap item_r jst-rght'
        );
        // end of row
        $html .= EEH_HTML::trx();
        return $html;
    }


    /**
     * _sub_item_row
     *
     * @param EE_Line_Item      $line_item
     * @param array             $options
     * @param EE_Line_Item|null $parent_line_item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function subItemRow(
        EE_Line_Item $line_item,
        array $options = [],
        ?EE_Line_Item $parent_line_item = null
    ): string {
        if (
            $parent_line_item instanceof EE_Line_Item
            && $line_item->children() === []
            && $line_item->name() === $parent_line_item->name()
            && apply_filters(
                'FHEE__EE_SPCO_Line_Item_Display_Strategy___sub_item_row__hide_main_sub_line_item',
                true
            )
        ) {
            return '';
        }
        $this->debugLog(' - ' . __FUNCTION__);
        // start of row
        $html = EEH_HTML::tr('', '', 'item sub-item-row');
        // name && desc
        $name_and_desc = EEH_HTML::span('', '', 'sub-item-row-bullet dashicons dashicons-arrow-right');
        $name_and_desc .= $line_item->name();
        $name_and_desc .= $options['show_desc']
            ? '<span class="line-sub-item-desc-spn smaller-text">: ' . $line_item->desc() . '</span>'
            : '';
        // name td
        $html .= EEH_HTML::td($name_and_desc, '', 'item_l sub-item');
        $qty  = $parent_line_item instanceof EE_Line_Item ? $parent_line_item->quantity() : 1;
        // discount/surcharge td
        if ($line_item->is_percent()) {
            $html .= EEH_HTML::td(
                EEH_Template::format_currency(
                    $line_item->total() / $qty,
                    false,
                    false
                ),
                '',
                'spco-nowrap item_c jst-rght'
            );
        } else {
            $html .= EEH_HTML::td($line_item->unit_price_no_code(), '', 'spco-nowrap item_c jst-rght');
        }
        // no quantity td
        $html .= EEH_HTML::td();
        // no total td
        $html .= EEH_HTML::td();
        // end of row
        $html .= EEH_HTML::trx();
        return apply_filters(
            'FHEE__EE_SPCO_Line_Item_Display_Strategy___sub_item_row__html',
            $html,
            $line_item,
            $options,
            $parent_line_item
        );
    }


    /**
     * _tax_row
     *
     * @param EE_Line_Item $line_item
     * @param array        $options
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function taxRow(EE_Line_Item $line_item, array $options = []): string
    {
        $this->debugLog(' - ' . __FUNCTION__);
        $total = $line_item->total();
        if (! $total) {
            return '';
        }
        // start of row
        $html = EEH_HTML::tr('', 'item sub-item tax-total');
        // name && desc
        $name_and_desc = $line_item->name();
        $name_and_desc .= '<span class="smaller-text lt-grey-text" style="margin:0 0 0 2em;">';
        $name_and_desc .= esc_html__(' * taxable items', 'event_espresso');
        $name_and_desc .= '</span>';
        $name_and_desc .= $options['show_desc'] ? '<br/>' . $line_item->desc() : '';
        // name td
        $html .= EEH_HTML::td( /*__FUNCTION__ .*/
            $name_and_desc,
            '',
            'item_l sub-item'
        );
        // percent td
        $html .= EEH_HTML::td($line_item->percent() . '%', '', 'spco-nowrap jst-rght');
        // empty td (price)
        $html .= EEH_HTML::td(EEH_HTML::nbsp());
        // total td
        $html .= EEH_HTML::td(
            EEH_Template::format_currency($total, false, false),
            '',
            'spco-nowrap item_r jst-rght'
        );
        // end of row
        $html .= EEH_HTML::trx();
        return $html;
    }


    /**
     * _total_row
     *
     * @param EE_Line_Item $line_item
     * @param string       $text
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function totalTaxRow(EE_Line_Item $line_item, string $text = ''): string
    {
        $this->debugLog(' - ' . __FUNCTION__);
        $html = '';
        if ($line_item->total()) {
            // start of row
            $html = EEH_HTML::tr('', '', 'total_tr odd');
            // total td
            $html .= EEH_HTML::td(
                $text,
                '',
                'total_currency total jst-rght',
                '',
                ' colspan="2"'
            );
            // empty td (price)
            $html .= EEH_HTML::td(EEH_HTML::nbsp());
            // total td
            $html .= EEH_HTML::td(
                EEH_Template::format_currency($line_item->total(), false, false),
                '',
                'spco-nowrap total jst-rght'
            );
            // end of row
            $html .= EEH_HTML::trx();
        }
        return $html;
    }


    /**
     * _total_row
     *
     * @param EE_Line_Item $line_item
     * @param string       $text
     * @param array        $options
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function subTotalRow(EE_Line_Item $line_item, string $text = '', array $options = []): string
    {
        $this->debugLog(' - ' . __FUNCTION__);
        $html = '';
        if ($line_item->total()) {
            // start of row
            $html = EEH_HTML::tr('', '', 'total_tr odd');
            // total td
            $html .= EEH_HTML::td(
                $text,
                '',
                'total_currency total jst-rght',
                '',
                ' colspan="3"'
            );
            // total td
            $html .= EEH_HTML::td(
                EEH_Template::format_currency($options['sub_total'], false, false),
                '',
                'spco-nowrap total jst-rght'
            );
            // end of row
            $html .= EEH_HTML::trx();
        }
        return $html;
    }


    /**
     * _total_row
     *
     * @param EE_Line_Item $line_item
     * @param string       $text
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function totalRow(EE_Line_Item $line_item, string $text = ''): string
    {
        $this->debugLog(' - ' . __FUNCTION__);
        // start of row
        $html = EEH_HTML::tr('', '', 'spco-grand-total total_tr odd');
        // total td
        $html .= EEH_HTML::td($text, '', 'total_currency total jst-rght', '', ' colspan="3"');
        // total td
        $html .= EEH_HTML::td(
            EEH_Template::format_currency($line_item->total(), false, false),
            '',
            'spco-nowrap total jst-rght'
        );
        // end of row
        $html .= EEH_HTML::trx();
        return $html;
    }


    /**
     * _payments_and_amount_owing_rows
     *
     * @param EE_Line_Item $line_item
     * @param array        $options
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function paymentsAndAmountOwingRows(EE_Line_Item $line_item, array $options = []): string
    {
        $this->debugLog(' - ' . __FUNCTION__);
        $html        = '';
        $owing       = $line_item->total();
        $transaction = EEM_Transaction::instance()->get_one_by_ID($line_item->TXN_ID());
        if ($transaction instanceof EE_Transaction) {
            $registration_payments = [];
            $registrations         = ! empty($options['registrations'])
                ? $options['registrations']
                : $transaction->registrations();
            foreach ($registrations as $registration) {
                if ($registration instanceof EE_Registration && $registration->owes_monies_and_can_pay()) {
                    $registration_payments += $registration->registration_payments();
                }
            }
            if (! empty($registration_payments)) {
                foreach ($registration_payments as $registration_payment) {
                    if ($registration_payment instanceof EE_Registration_Payment) {
                        $owing        -= $registration_payment->amount();
                        $payment      = $registration_payment->payment();
                        $payment_desc = '';
                        if ($payment instanceof EE_Payment) {
                            $payment_desc = sprintf(
                                esc_html__('Payment%1$s Received: %2$s', 'event_espresso'),
                                $payment->txn_id_chq_nmbr() !== ''
                                    ? ' <span class="small-text">(#' . $payment->txn_id_chq_nmbr() . ')</span> '
                                    : '',
                                $payment->timestamp()
                            );
                        }
                        // start of row
                        $html .= EEH_HTML::tr('', '', 'total_tr odd');
                        // payment desc
                        $html .= EEH_HTML::td($payment_desc, '', '', '', ' colspan="3"');
                        // total td
                        $html .= EEH_HTML::td(
                            EEH_Template::format_currency(
                                $registration_payment->amount(),
                                false,
                                false
                            ),
                            '',
                            'spco-nowrap total jst-rght'
                        );
                        // end of row
                        $html .= EEH_HTML::trx();
                    }
                }
                if ($line_item->total()) {
                    // start of row
                    $html .= EEH_HTML::tr('', '', 'total_tr odd');
                    // total td
                    $html .= EEH_HTML::td(
                        esc_html__('Amount Owing', 'event_espresso'),
                        '',
                        'total_currency total jst-rght',
                        '',
                        ' colspan="3"'
                    );
                    // total td
                    $html .= EEH_HTML::td(
                        EEH_Template::format_currency($owing, false, false),
                        '',
                        'spco-nowrap total jst-rght'
                    );
                    // end of row
                    $html .= EEH_HTML::trx();
                }
            }
        }
        $this->_grand_total = $owing;
        return $html;
    }
}
