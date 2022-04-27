<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * @var boolean   $display_ticket_price
 * @var EE_Ticket $ticket
 */

if (! function_exists('espressoSubtotalRow')) {
    function espressoSubtotalRow(float $running_total, bool $show = true): string
    {
        return $show
            ? '
                <tr>
                    <td colspan="2" class="jst-rght small-text sbttl">
                        <b>' . esc_html__('subtotal', 'event_espresso') . '</b>
                    </td>
                    <td data-th="' . esc_html__('subtotal', 'event_espresso') . '" class="jst-rght small-text">
                        <b>' . EEH_Template::format_currency($running_total) . '</b>
                    </td>
                </tr>
            '
            : '';
    }
}

if ($display_ticket_price) { ?>
    <section class="tckt-slctr-tkt-price-sctn">
        <h5><?php echo esc_html(
            apply_filters(
                'FHEE__ticket_selector_chart_template__ticket_details_price_breakdown_heading',
                __('Price', 'event_espresso')
            )
        ); ?></h5>
        <div class="tckt-slctr-tkt-details-tbl-wrap-dv">
            <table class="tckt-slctr-tkt-details-tbl">
                <thead>
                    <tr>
                        <th class="ee-third-width">
                            <span class="small-text"> <?php esc_html_e('Name', 'event_espresso'); ?></span>
                        </th>
                        <th class="jst-cntr">
                        <span class="small-text">
                            <?php esc_html_e('Description', 'event_espresso'); ?></span>
                        </th>
                        <th class="ee-fourth-width jst-rght">
                        <span class="small-text">
                            <?php esc_html_e('Amount', 'event_espresso'); ?></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if ($ticket->base_price() instanceof EE_Price) { ?>
                        <tr>
                            <td data-th="<?php esc_html_e('Name', 'event_espresso'); ?>" class="small-text" colspan="2">
                                <b>
                                    <?php echo wp_kses($ticket->base_price()->name(), AllowedTags::getAllowedTags()); ?>
                                </b>
                            </td>
                            <td data-th="<?php esc_html_e('Amount', 'event_espresso'); ?>" class="jst-rght small-text">
                                <?php echo wp_kses($ticket->base_price()->pretty_price(), AllowedTags::getAllowedTags()); ?>
                            </td>
                        </tr>
                        <?php
                        $running_total = $ticket->base_price()->amount();
                    } else {
                        $running_total = 0;
                    }
                    $pretax_total     = $running_total;
                    $display_subtotal = true;
                    // now add price modifiers
                    foreach ($ticket->price_modifiers() as $price_mod) {
                        if ($price_mod->is_tax()) {
                            echo espressoSubtotalRow($running_total, $display_subtotal);
                            $display_subtotal = false;
                            $new_sub_total    = $pretax_total * ($price_mod->amount() / 100);
                        } elseif ($price_mod->is_percent()) {
                            $new_sub_total = $running_total * ($price_mod->amount() / 100);
                        } else {
                            $new_sub_total = $price_mod->amount();
                        }
                        $new_sub_total = $price_mod->is_discount()
                            ? $new_sub_total * -1
                            : $new_sub_total;
                        $description   = $price_mod->desc() . ' ';
                        $description   .= $price_mod->is_percent()
                            ? $price_mod->amount() . '%'
                            : EEH_Template::format_currency($price_mod->amount());
                        ?>
                        <tr>
                            <td data-th="<?php esc_html_e('Name', 'event_espresso'); ?>"
                                class="jst-rght small-text"
                            >
                            <?php echo wp_kses($price_mod->name(), AllowedTags::getAllowedTags()); ?>
                            </td>
                            <td data-th="<?php esc_html_e('Description', 'event_espresso'); ?>" class="small-text">
                                <?php echo wp_kses($description, AllowedTags::getAllowedTags()); ?>
                            </td>
                            <td data-th="<?php esc_html_e('Amount', 'event_espresso'); ?>" class="jst-rght small-text">
                                <?php echo wp_kses(
                                    EEH_Template::format_currency($new_sub_total),
                                    AllowedTags::getAllowedTags()
                                ); ?>
                            </td>
                            <?php $pretax_total += ! $price_mod->is_tax() ? $new_sub_total : 0; ?>
                            <?php $running_total += $new_sub_total; ?>
                        </tr>
                    <?php } ?>
                    <?php if ($ticket->taxable()) {
                        echo espressoSubtotalRow($running_total);
                        foreach ($ticket->get_ticket_taxes_for_admin() as $tax) { ?>
                            <tr>
                                <td data-th="<?php esc_html_e('Name', 'event_espresso'); ?>"
                                    class="jst-rght small-text"
                                >
                                    <?php echo wp_kses($tax->name(), AllowedTags::getAllowedTags()); ?>
                                </td>
                                <td data-th="<?php esc_html_e('Description', 'event_espresso'); ?>"
                                    class="jst-rght small-text"
                                >
                                    <?php echo wp_kses($tax->desc(), AllowedTags::getAllowedTags()); ?>%
                                </td>
                                    <?php $tax_amount = $pretax_total * ($tax->amount() / 100); ?>
                                <td data-th="<?php esc_html_e('Amount', 'event_espresso'); ?>"
                                    class="jst-rght small-text"
                                >
                                    <?php echo wp_kses(
                                        EEH_Template::format_currency($tax_amount),
                                        AllowedTags::getAllowedTags()
                                    ); ?>
                                </td>
                                <?php $running_total += $tax_amount; ?>
                            </tr>
                        <?php } ?>
                    <?php } ?>
                    <tr>
                        <td colspan="2" class="jst-rght small-text ttl-lbl-td">
                            <b>
                                <?php echo esc_html(
                                    apply_filters(
                                        'FHEE__ticket_selector_chart_template__ticket_details_total_price',
                                        __('Total', 'event_espresso')
                                    )
                                ); ?>
                            </b>
                        </td>
                        <td data-th="<?php echo esc_html(
                            apply_filters(
                                'FHEE__ticket_selector_chart_template__ticket_details_total_price',
                                __('Total', 'event_espresso')
                            )
                        ); ?>" class="jst-rght small-text"
                        >
                            <b><?php  wp_kses(
                                EEH_Template::format_currency($running_total),
                                AllowedTags::getAllowedTags()
                            ); ?></b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <br />
<?php }
