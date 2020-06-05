<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * variables used in template
 *
 * @var boolean $display_taxes
 * @var boolean $display_ticket_price
 * @var boolean $is_valid_base_price
 * @var string $pre_tax_subtotal
 * @var stdClass[] $taxes
 * @var string $ticket_base_price_name
 * @var string $ticket_base_price_pretty_price
 * @var stdClass[] $ticket_price_modifiers
 * @var string $ticket_total
 * @var EE_Ticket $ticket
 */

if ($display_ticket_price) { ?>
<section class="tckt-slctr-tkt-price-sctn">
    <h5>
        <?php echo apply_filters(
            'FHEE__ticket_selector_chart_template__ticket_details_price_breakdown_heading',
            esc_html__('Price', 'event_espresso')
        ) ?>
    </h5>
    <div class="tckt-slctr-tkt-details-tbl-wrap-dv">
        <table class="tckt-slctr-tkt-details-tbl">
            <thead>
            <tr>
                <th class="ee-third-width">
                    <span class="small-text">
                        <?php esc_html_e('Name', 'event_espresso'); ?>
                    </span>
                </th>
                <th class="jst-cntr">
                    <span class="small-text">
                        <?php esc_html_e('Description', 'event_espresso'); ?>
                    </span>
                </th>
                <th class="ee-fourth-width jst-rght">
                    <span class="small-text">
                        <?php esc_html_e('Amount', 'event_espresso'); ?>
                    </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <?php if ($is_valid_base_price) { ?>
                <tr>
                    <td data-th="<?php esc_html_e('Name', 'event_espresso'); ?>" class="small-text" colspan="2">
                        <strong>
                            <?php echo wp_kses($ticket_base_price_name, AllowedTags::getAllowedTags()); ?>
                        </strong>
                    </td>
                    <td data-th="<?php esc_html_e('Amount', 'event_espresso'); ?>" class="jst-rght small-text">
                        <?php echo wp_kses($ticket_base_price_pretty_price, AllowedTags::getAllowedTags()); ?>
                    </td>
                </tr>
            <?php }
            // now add price modifiers
            foreach ($ticket_price_modifiers as $price_modifier) { ?>
                <tr>
                    <td data-th="<?php esc_html_e('Name', 'event_espresso'); ?>" class="jst-rght small-text">
                        <?php echo wp_kses($price_modifier->name, AllowedTags::getAllowedTags()); ?>
                    </td>
                    <td data-th="<?php esc_html_e('Description', 'event_espresso'); ?>" class="small-text">
                        <?php echo wp_kses($price_modifier->desc, AllowedTags::getAllowedTags()); ?>
                    </td>
                    <td data-th="<?php esc_html_e('Amount', 'event_espresso'); ?>" class="jst-rght small-text">
                        <?php echo wp_kses($price_modifier->sub_total, AllowedTags::getAllowedTags()); ?>
                    </td>
                </tr>
            <?php } ?>
            <?php if ($display_taxes) { ?>
                <tr>
                    <td colspan="2" class="jst-rght small-text sbttl">
                        <strong>
                            <?php esc_html_e('subtotal', 'event_espresso'); ?>
                        </strong>
                    </td>
                    <td data-th="<?php esc_html_e('subtotal', 'event_espresso'); ?>" class="jst-rght small-text">
                        <strong>
                            <?php echo wp_kses($pre_tax_subtotal, AllowedTags::getAllowedTags()); ?>
                        </strong>
                    </td>
                </tr>

                <?php foreach ($taxes as $tax) { ?>
                    <tr>
                        <td data-th="<?php esc_html_e('Name', 'event_espresso'); ?>" class="jst-rght small-text">
                            <?php echo wp_kses($tax->name, AllowedTags::getAllowedTags()); ?>
                        </td>
                        <td data-th="<?php esc_html_e('Description', 'event_espresso'); ?>" class="jst-rght small-text">
                            <?php echo wp_kses($tax->rate, AllowedTags::getAllowedTags()); ?>
                        </td>
                        <td data-th="<?php esc_html_e('Amount', 'event_espresso'); ?>" class="jst-rght small-text">
                            <?php echo wp_kses($tax->amount, AllowedTags::getAllowedTags()); ?>
                        </td>
                    </tr>
                <?php } ?>
            <?php } ?>
            <tr>
                <td colspan="2" class="jst-rght small-text ttl-lbl-td">
                    <strong>
                        <?php echo apply_filters(
                            'FHEE__ticket_selector_chart_template__ticket_details_total_price',
                            esc_html__('Total', 'event_espresso')
                        ); ?>
                    </strong>
                </td>
                <td data-th="<?php echo apply_filters(
                    'FHEE__ticket_selector_chart_template__ticket_details_total_price',
                    esc_html__('Total', 'event_espresso')
                ); ?>" class="jst-rght small-text">
                    <strong>
                        <?php echo wp_kses($ticket_total, AllowedTags::getAllowedTags()); ?>
                    </strong>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</section>
<br/>
<?php }
