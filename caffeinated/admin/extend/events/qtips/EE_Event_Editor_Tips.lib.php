<?php

/**
 * EE_Event_Editor_Tips
 *
 * Qtip config for the event editor.
 *
 * @package         Event Espresso
 * @subpackage      /admin_pages/events/qtips/EE_Event_Editor_Tips.helper.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_Editor_Tips extends EE_Qtip_Config
{
    protected function _set_tips_array()
    {
        $this->_qtipsa = array(
            0  => array(
                'content_id' => 'about-taxable-toggle',
                'target'     => '.TKT-taxable-checkbox',
                'content'    => $this->_get_taxable_info_content(),
                'options'    => array(
                    'show_only_once' => true,
                    'content'        => array(
                        'title' => esc_html__('Taxable Ticket Toggle', 'event_espresso'),
                        'button' => true,
                    ),
                    'show'           => array(
                        'event' => 'click',
                    ),
                    'hide'           => array(
                        'event' => false,
                    ),
                    'style'          => array(
                        'classes' => '',
                    ),
                )// defaults
            ),
            7  => array(
                'content_id' => 'tkt-status-archived',
                'target'     => '.ticket-row .tkt-status-' . EE_Ticket::archived,
                'content'    => $this->_ticket_status_legend(EE_Ticket::archived),
                'options'    => array(
                    'position' => array(
                        'target' => 'mouse',
                        'adjust' => array(
                            'mouse' => false,
                        ),
                    ),
                ),
            ),
            8  => array(
                'content_id' => 'tkt-status-expired',
                'target'     => '.ticket-row .tkt-status-' . EE_Ticket::expired,
                'content'    => $this->_ticket_status_legend(EE_Ticket::expired),
                'options'    => array(
                    'position' => array(
                        'target' => 'mouse',
                        'adjust' => array(
                            'mouse' => false,
                        ),
                    ),
                ),
            ),
            9  => array(
                'content_id' => 'tkt-status-sold_out',
                'target'     => '.ticket-row .tkt-status-' . EE_Ticket::sold_out,
                'content'    => $this->_ticket_status_legend(EE_Ticket::sold_out),
                'options'    => array(
                    'position' => array(
                        'target' => 'mouse',
                        'adjust' => array(
                            'mouse' => false,
                        ),
                    ),
                ),
            ),
            10 => array(
                'content_id' => 'tkt-status-pending',
                'target'     => '.ticket-row .tkt-status-' . EE_Ticket::pending,
                'content'    => $this->_ticket_status_legend(EE_Ticket::pending),
                'options'    => array(
                    'position' => array(
                        'target' => 'mouse',
                        'adjust' => array(
                            'mouse' => false,
                        ),
                    ),
                ),
            ),
            11 => array(
                'content_id' => 'tkt-status-onsale',
                'target'     => '.ticket-row .tkt-status-' . EE_Ticket::onsale,
                'content'    => $this->_ticket_status_legend(EE_Ticket::onsale),
                'options'    => array(
                    'position' => array(
                        'target' => 'mouse',
                        'adjust' => array(
                            'mouse' => false,
                        ),
                    ),
                ),
            ),
        );
    }


    private function _get_taxable_info_content()
    {
        $price_admin_link = EE_Admin_Page::add_query_args_and_nonce(array('action' => 'default'), PRICING_ADMIN_URL);
        return '<p>'
               . sprintf(
                   esc_html__(
                       'Clicking the taxable ticket toggle checkbox has enabled taxes for this ticket. What this means is that when a person purchases this ticket, the tax will be applied to all prices on this ticket. You can edit the existing tax price modifier that was setup in Event Espresso by going to  %sDefault Pricing Admin Page%s (labelled "Pricing" in the Event Espresso Menu)',
                       'event_espresso'
                   ),
                   '<a href="' . $price_admin_link . '" aria-label="' . esc_attr__(
                       'Pricing Admin Page',
                       'event_espresso'
                   ) . '">',
                   '</a>'
               ) . '</p>';
    }

    /**
     * output the relevant ee-status-legend with the designated status highlighted.
     *
     * @param  EE_Ticket constant $status What status is set (by class)
     * @return string         The status legend with the related status highlighted
     */
    private function _ticket_status_legend($status)
    {

        $status_array = array(
            'archived' => EE_Ticket::archived,
            'expired'  => EE_Ticket::expired,
            'sold_out' => EE_Ticket::sold_out,
            'pending'  => EE_Ticket::pending,
            'onsale'   => EE_Ticket::onsale,
        );

        return EEH_Template::status_legend($status_array, $status);
    }
}
