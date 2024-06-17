<?php
/**
 * @var string $vnu_capacity
 * @var string $vnu_phone
 * @var string $vnu_url
 */

?>
<br>
<div class="ee-layout-stack">
    <div>
    <label for="vnu_capacity">
        <span class='ee-icon ee-icon-venue ee-icon-color-grey ee-icon-size-18'></span>&nbsp;
        <?php esc_html_e('Capacity', 'event_espresso'); ?>: &nbsp;
    </label>
    <input type="number"
           id="vnu_capacity"
           name="vnu_capacity"
           class="ee-input-width--small"
           value="<?php echo esc_attr($vnu_capacity); ?>"
    />
    </div>

    <div>
    <label for="vnu_phone">
        <span class="dashicons dashicons-phone ee-icon-color-grey ee-icon-size-18"></span>&nbsp;
        <?php esc_html_e('Venue Phone #', 'event_espresso'); ?>: &nbsp;
    </label>
    <input type="text"
           id="vnu_phone"
           name="vnu_phone"
           class="ee-input-width--reg"
           value="<?php echo esc_attr($vnu_phone); ?>"
    />
    </div>

    <div>
    <label for="vnu_url">
        <span class="dashicons dashicons-external ee-icon-color-grey ee-icon-size-18"></span>&nbsp;
        <?php esc_html_e('Venue Website', 'event_espresso'); ?>: &nbsp;
    </label>
    <input id="vnu_url"
           name="vnu_url"
           type="text"
           class="ee-input-width--big"
           value="<?php echo esc_url($vnu_url); ?>"
    />
    </div>
</div>
