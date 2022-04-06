<?php

/**
 * @var EE_Price_Type $price_type
 * @var string $base_type_select
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div style="padding:1em;">

    <table class="form-table">
        <tbody>

        <tr>
            <th>
                <label for="basic_type"><?php esc_html_e('Basic Type', 'event_espresso'); ?></label>
            </th>
            <td>
                <?php echo wp_kses($base_type_select, AllowedTags::getWithFormTags()); ?><br/>
                <p class="description">
                    <?php
                    printf(
                        esc_html__(
                            'Choosing a basic type allows us to quickly configure a bunch of other options for you.%1$sAll events need to have at least one Base Price type option.%1$sDiscounts reduce the price of an event, Surcharges increase the price.%1$sTaxes are applied to the final total.',
                            'event_espresso'
                        ),
                        '<br/>'
                    ); ?>
                </p>
            </td>
        </tr>

        <tr>
            <th>
                <label for="PRT_name"><?php esc_html_e('Price Type Name', 'event_espresso'); ?></label>
            </th>
            <td>
                <input class="regular-text" type="text" id="PRT_name" name="PRT_name"
                       value="<?php echo htmlentities($price_type->name()); ?>"/>
                <p class="description"><?php esc_html_e('A name for this Price Type.', 'event_espresso'); ?></p>
            </td>
        </tr>

        <tr>
            <th>
                <label><?php esc_html_e('Percentage or Fixed Amount?', 'event_espresso'); ?></label>
            </th>
            <td>
                <?php $yes_checked = $price_type->is_percent() ? 'checked' : ''; ?>
                <label style="margin-right:15px;"><input type="radio" name="PRT_is_percent"
                                                         value="1" <?php echo esc_attr($yes_checked); ?> style="margin-right:5px;">
                    <?php esc_html_e('Percentage', 'event_espresso'); ?>
                </label>
                <?php $no_checked = $price_type->is_percent() ? '' : 'checked'; ?>
                <label style="margin-right:15px;"><input type="radio" name="PRT_is_percent"
                                                         value="0" <?php echo esc_attr($no_checked); ?> style="margin-right:5px;">
                    <?php esc_html_e('Fixed', 'event_espresso'); ?>
                </label>
                <p class="description"><?php
                    esc_html_e(
                        'Whether this Price Type will be applied as a percentage or applied as a set fixed amount.',
                        'event_espresso'
                    ); ?></p>
                <?php if ($price_type->base_type() == EEM_Price_Type::base_type_tax) :
                    // base type is tax so let's just let the user know that taxes are always percentage.
                    ?>
                    <p class="description" style="color:#E44064">
                        <?php
                            esc_html_e(
                                'The selected base type for this price type is "Tax".  Taxes are always assumed to be a percentage.  If you want to use a fixed value for a tax then please change the base type to a surcharge.',
                                'event_espresso'
                            );
                        ?></p>
                <?php endif; ?>
            </td>
        </tr>
        <tr>
            <th>
                <label for="PRT_order"><?php esc_html_e('Order of Application ', 'event_espresso'); ?></label>
            </th>
            <td>
                <input class="small-text" type="text" id="PRT_order" name="PRT_order"
                       value="<?php echo esc_attr($price_type->order()); ?>"/>
                <p class="description">
                    <?php esc_html_e('The order that Price Types are applied.', 'event_espresso'); ?></p>
                <p class="description">
                    <?php
                    printf(
                        esc_html__(
                            'Price types are applied sequentially according to their Order, where higher ordered Price Types will affect lower ordered Price Types.%1$sPrice types with equal Orders will be applied in parallel to whatever total precedes them and will not affect each other. Actual Prices will be set to "0" so that they are processed first. Taxes will be always be applied last but their order will still determine if they are applied in parallel or as compound taxes (one tax on top of the other).',
                            'event_espresso'
                        ),
                        '<br/>'
                    ); ?>
                </p>
            </td>
        </tr>

        </tbody>
    </table>

</div>



