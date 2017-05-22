<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/** @var boolean $display_ticket_price */
/** @var \EE_Ticket $ticket */

if ($display_ticket_price) { ?>
    <section class="tckt-slctr-tkt-price-sctn">
        <h5><?php echo apply_filters('FHEE__ticket_selector_chart_template__ticket_details_price_breakdown_heading',
                esc_html__('Price', 'event_espresso')); ?></h5>
        <div class="tckt-slctr-tkt-details-tbl-wrap-dv">
            <table class="tckt-slctr-tkt-details-tbl">
                <thead>
                <tr>
                    <th class="ee-third-width"><span class="small-text"><?php esc_html_e('Name', 'event_espresso'); ?></span>
                    </th>
                    <th class="jst-cntr"><span class="small-text"><?php esc_html_e('Description', 'event_espresso'); ?></span>
                    </th>
                    <th class="ee-fourth-width jst-rght"><span class="small-text"><?php esc_html_e('Amount', 'event_espresso'); ?></span></th>
                </tr>
                </thead>
                <tbody>
                <?php if ($ticket->base_price() instanceof EE_Price) { ?>
                    <tr>
                        <td data-th="<?php esc_html_e('Name', 'event_espresso'); ?>" class="small-text">
                            <b><?php echo $ticket->base_price()->name(); ?></b></td>
                        <td data-th="<?php esc_html_e('Description', 'event_espresso'); ?>"
                            class="small-text"><?php echo $ticket->base_price()->desc(); ?></td>
                        <td data-th="<?php esc_html_e('Amount', 'event_espresso'); ?>"
                            class="jst-rght small-text"><?php echo $ticket->base_price()->pretty_price(); ?></td>
                    </tr>
                    <?php
                    $running_total = $ticket->base_price()->amount();
                } else {
                    $running_total = 0;
                }
                // now add price modifiers
                foreach ($ticket->price_modifiers() as $price_mod) { ?>
                    <tr>
                        <td data-th="<?php esc_html_e('Name', 'event_espresso'); ?>"
                            class="jst-rght small-text"><?php echo $price_mod->name(); ?></td>
                        <?php if ($price_mod->is_percent()) { ?>
                            <td data-th="<?php esc_html_e('Description', 'event_espresso'); ?>"
                                class="small-text"><?php echo $price_mod->desc(); ?> <?php echo $price_mod->amount(); ?>
                                %
                            </td>
                            <?php
                            $new_sub_total = $running_total * ($price_mod->amount() / 100);
                            $new_sub_total = $price_mod->is_discount() ? $new_sub_total * -1 : $new_sub_total;
                            ?>
                        <?php } else { ?>
                            <?php $new_sub_total = $price_mod->is_discount() ? $price_mod->amount() * -1
                                : $price_mod->amount(); ?>
                            <td data-th="<?php esc_html_e('Description', 'event_espresso'); ?>"
                                class="small-text"><?php echo $price_mod->desc(); ?></td>
                            <?php $new_sub_total = $price_mod->is_discount() ? $price_mod->amount() * -1
                                : $price_mod->amount(); ?>
                        <?php } ?>
                        <td data-th="<?php esc_html_e('Amount', 'event_espresso'); ?>"
                            class="jst-rght small-text"><?php echo EEH_Template::format_currency($new_sub_total); ?></td>
                        <?php $running_total += $new_sub_total; ?>
                    </tr>
                <?php } ?>
                <?php if ($ticket->taxable()) { ?>
                    <?php //$ticket_subtotal =$ticket->get_ticket_subtotal(); ?>
                    <tr>
                        <td colspan="2" class="jst-rght small-text sbttl"><b><?php esc_html_e('subtotal',
                                    'event_espresso'); ?></b></td>
                        <td data-th="<?php esc_html_e('subtotal', 'event_espresso'); ?>" class="jst-rght small-text">
                            <b><?php echo EEH_Template::format_currency($running_total); ?></b></td>
                    </tr>

                    <?php foreach ($ticket->get_ticket_taxes_for_admin() as $tax) { ?>
                        <tr>
                            <td data-th="<?php esc_html_e('Name', 'event_espresso'); ?>"
                                class="jst-rght small-text"><?php echo $tax->name(); ?></td>
                            <td data-th="<?php esc_html_e('Description', 'event_espresso'); ?>"
                                class="jst-rght small-text"><?php echo $tax->amount(); ?>%
                            </td>
                            <?php $tax_amount = $running_total * ($tax->amount() / 100); ?>
                            <td data-th="<?php esc_html_e('Amount', 'event_espresso'); ?>"
                                class="jst-rght small-text"><?php echo EEH_Template::format_currency($tax_amount); ?></td>
                            <?php $running_total += $tax_amount; ?>
                        </tr>
                    <?php } ?>
                <?php } ?>
                <tr>
                    <td colspan="2" class="jst-rght small-text ttl-lbl-td">
                        <b><?php echo apply_filters('FHEE__ticket_selector_chart_template__ticket_details_total_price',
                                esc_html__('Total', 'event_espresso')); ?></b></td>
                    <td data-th="<?php echo apply_filters('FHEE__ticket_selector_chart_template__ticket_details_total_price',
                        esc_html__('Total', 'event_espresso')); ?>" class="jst-rght small-text">
                        <b><?php echo EEH_Template::format_currency($running_total); ?></b></td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
    <br/>
<?php } ?>

