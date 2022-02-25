<?php
/**
 * @var EE_Price $price
 * @var array    $price_types
 * @var bool $default_base_price
 * @var string $attributes
 */

?>
<div class="padding">
    <h3><?php esc_html_e('Default Price Details', 'event_espresso'); ?></h3>
    <table class="form-table">
        <tbody>
            <tr>
                <th>
                    <label for="PRT_ID">
                        <?php esc_html_e('Type', 'event_espresso'); ?>
                        <?php echo EEH_Template::get_help_tab_link('type_field_info'); ?>
                    </label>
                </th>
                <td>
                    <?php echo EEH_Form_Fields::select_input(
                            $default_base_price ? 'PRT_ID' : '',
                            $price_types,
                            $price->type(),
                            $attributes
                    ); ?>
                    <?php if ($default_base_price) : ?>
                        <!--<p><strong>--><?php //esc_html_e('Price', 'event_espresso'); ?><!--</strong></p>-->
                        <input type='hidden' name='PRT_ID' id='PRT_ID' value="<?php echo $price->type(); ?>" />
                        <p class="description">
                            <?php
                            esc_html_e(
                                    'This is the default base price. Every new ticket created will start off with this base price.',
                                    'event_espresso'
                            );
                            ?>
                        </p>
                    <?php else : ?>
                        <p class="description">
                            <?php
                            esc_html_e(
                                    'Price Modifier. Default items will apply to ALL new events you create.',
                                    'event_espresso'
                            );
                            ?>
                        </p>
                    <?php endif; ?>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="PRC_name">
                        <?php esc_html_e('Name', 'event_espresso'); ?>
                        <?php echo EEH_Template::get_help_tab_link('name_field_info'); ?>
                    </label>
                </th>
                <td>
                    <input id="PRC_name"
                           name="PRC_name"
                           type="text"
                           value="<?php $price->f('PRC_name'); ?>"
                    />
                </td>
            </tr>
            <tr>
                <th>
                    <label for="PRC_desc">
                        <?php esc_html_e('Description', 'event_espresso'); ?>
                        <?php echo EEH_Template::get_help_tab_link('description_field_info'); ?>
                    </label>
                </th>
                <td>
                    <textarea id="PRC_desc" name="PRC_desc" rows="5">
                        <?php $price->f('PRC_desc'); ?>
                    </textarea>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="PRC_amount">
                        <?php esc_html_e('Amount', 'event_espresso'); ?>
                        <?php echo EEH_Template::get_help_tab_link('amount_field_info'); ?>
                    </label>
                </th>
                <td>
                    <input class="small-text ee-numeric"
                           id="PRC_amount"
                           name="PRC_amount"
                           type="text"
                           value="<?php echo $price->amount(); ?>"
                    />
                </td>
            </tr>
        </tbody>
    </table>
</div>
