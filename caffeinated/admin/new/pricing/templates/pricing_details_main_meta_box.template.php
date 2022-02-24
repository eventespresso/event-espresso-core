<div style="padding:1em;">

    <table class="form-table">
        <tbody>
        <tr valign="top">
            <th><label for="PRT_ID"><?php
                    esc_html_e(
                        'Type',
                        'event_espresso'
                    ); ?></label> <?php echo EEH_Template::get_help_tab_link('type_field_info'); ?></th>
            <td>
                <?php if ($price->type_obj() && $price->type_obj()->base_type() === 1) : ?>
                    <input type="hidden" name="PRT_ID" id="PRT_ID" value="<?php echo esc_attr($price->type()); ?>"/>
                    <p><strong><?php esc_html_e('Price', 'event_espresso'); ?></strong></p>
                    <p class="description">
                        <?php
                        esc_html_e(
                            'This is the default base price. Every new ticket created will start off with this base price.',
                            'event_espresso'
                        );
                        ?>
                    </p>
                <?php else : ?>
                    <?php echo EEH_Form_Fields::select_input('PRT_ID', $price_types, $price->type(), 'id="PRT_ID"'); ?>
                    <p class="description">
                        <?php
                            esc_html_e(
                                'Price Modifier. Default items will apply to ALL new events you create.',
                                'event_espresso'
                            );
                        ?></p>
                <?php endif; ?>
            </td>
        </tr>
        <tr valign="top">
            <th><label for="PRC_name"><?php
                    esc_html_e(
                        'Name',
                        'event_espresso'
                    ); ?></label> <?php echo EEH_Template::get_help_tab_link('name_field_info'); ?></th>
            <td>
                <input class="regular-text" type="text" id="PRC_name" name="PRC_name"
                       value="<?php $price->f('PRC_name'); ?>"/>
            </td>
        </tr>
        <tr valign="top">
            <th><label for="PRC_desc"><?php
                    esc_html_e(
                        'Description',
                        'event_espresso'
                    ); ?></label> <?php echo EEH_Template::get_help_tab_link('description_field_info'); ?></th>
            <td>
                    <textarea class="regular-text" id="PRC_desc" name="PRC_desc" rows="5"><?php
                        $price->f('PRC_desc');
                    ?></textarea><br/>
            </td>
        </tr>
        <tr valign="top">
            <th><label for="PRC_amount"><?php
                    esc_html_e(
                        'Amount',
                        'event_espresso'
                    ); ?><?php echo EEH_Template::get_help_tab_link('amount_field_info'); ?></label></th>
            <td>
                <input class="small-text ee-numeric" type="text" id="PRC_amount" name="PRC_amount"
                       value="<?php echo esc_attr($price->amount()); ?>"/>
            </td>
        </tr>
        </tbody>
    </table>

    <div class="clear"></div>

</div>