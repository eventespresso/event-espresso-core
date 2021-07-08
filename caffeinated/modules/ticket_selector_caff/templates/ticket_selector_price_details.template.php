<?php

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * variables used in template
 *
 * @var boolean    $display_taxes
 * @var boolean    $display_ticket_price
 * @var boolean    $is_valid_base_price
 * @var string     $pre_tax_subtotal
 * @var stdClass[] $taxes
 * @var string     $ticket_base_price_name
 * @var string     $ticket_base_price_pretty_price
 * @var stdClass[] $ticket_price_modifiers
 * @var string     $ticket_total
 */

// labels
$ticket_price_heading = apply_filters(
    'FHEE__ticket_selector_chart_template__ticket_details_price_breakdown_heading',
    esc_html__('Price', 'event_espresso')
);
$name_label           = esc_html__('Name', 'event_espresso');
$desc_label           = esc_html__('Description', 'event_espresso');
$amount_label         = esc_html__('Amount', 'event_espresso');
$subtotal_label       = esc_html__('subtotal', 'event_espresso');
$total_label          = apply_filters(
    'FHEE__ticket_selector_chart_template__ticket_details_total_price',
    esc_html__('Total', 'event_espresso')
);

if ($display_ticket_price) { ?>
    <section class="tckt-slctr-tkt-price-sctn">
        <h5><?php echo $ticket_price_heading ?></h5>
        <div class="tckt-slctr-tkt-details-tbl-wrap-dv">
            <table class="tckt-slctr-tkt-details-tbl">
                <thead>
                <tr>
                    <th class="ee-third-width">
                        <span class="small-text"><?php echo $name_label; ?></span>
                    </th>
                    <th class="jst-cntr">
                        <span class="small-text"><?php echo $desc_label; ?></span>
                    </th>
                    <th class="ee-fourth-width jst-rght">
                        <span class="small-text"><?php echo $amount_label; ?></span>
                    </th>
                </tr>
                </thead>
                <tbody>
                <?php if ($is_valid_base_price) { ?>
                    <tr>
                        <td data-th="<?php echo $name_label; ?>" class="small-text" colspan="2">
                            <strong>
                                <?php echo $ticket_base_price_name; ?>
                            </strong>
                        </td>
                        <td data-th="<?php echo $amount_label; ?>" class="jst-rght small-text">
                            <?php echo $ticket_base_price_pretty_price; ?>
                        </td>
                    </tr>
                <?php }
                foreach ($ticket_price_modifiers as $price_modifier) { ?>
                    <tr>
                        <td data-th="<?php echo $name_label; ?>" class="jst-rght small-text">
                            <?php echo $price_modifier->name; ?>
                        </td>
                        <td data-th="<?php echo $desc_label; ?>" class="jst-rght small-text">
                            <?php echo $price_modifier->desc; ?>
                        </td>
                        <td data-th="<?php echo $amount_label; ?>" class="jst-rght small-text">
                            <?php echo $price_modifier->sub_total; ?>
                        </td>
                    </tr>
                <?php } ?>
                <?php if ($display_taxes) { ?>
                    <tr>
                        <td colspan="2" class="jst-rght small-text sbttl">
                            <strong>
                                <?php echo $subtotal_label; ?>
                            </strong>
                        </td>
                        <td data-th="<?php echo $subtotal_label; ?>" class="jst-rght small-text">
                            <strong>
                                <?php echo $pre_tax_subtotal; ?>
                            </strong>
                        </td>
                    </tr>
                    <?php foreach ($taxes as $tax) { ?>
                        <tr>
                            <td data-th="<?php echo $name_label; ?>" class="jst-rght small-text">
                                <?php echo $tax->name; ?>
                            </td>
                            <td data-th="<?php echo $desc_label; ?>" class="jst-rght small-text">
                                <?php echo $tax->rate; ?>
                            </td>
                            <td data-th="<?php echo $amount_label; ?>" class="jst-rght small-text">
                                <?php echo $tax->amount; ?>
                            </td>
                        </tr>
                    <?php } ?>
                <?php } ?>
                <tr>
                    <td colspan="2" class="jst-rght small-text ttl-lbl-td">
                        <strong>
                            <?php echo $total_label; ?>
                        </strong>
                    </td>
                    <td data-th="<?php echo $total_label; ?>" class="jst-rght small-text">
                        <strong>
                            <?php echo $ticket_total; ?>
                        </strong>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
    <br/>
<?php }
