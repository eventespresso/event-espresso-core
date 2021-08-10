<?php
/**
 * @var string $vnu_capacity
 * @var string $vnu_phone
 * @var string $vnu_url
 */
?>

<div class="misc-pub-section">
    <label>
        <span class='ee-icon ee-icon-venue ee-icon-color-grey ee-icon-size-18'></span>&nbsp;
        <?php esc_html_e('Capacity', 'event_espresso'); ?>: &nbsp;
        <input name="vnu_capacity" type="text" class="small-text" value="<?php echo esc_html($vnu_capacity); ?>" />
    </label>
</div>
<div class="misc-pub-section">
    <label>
        <span class="ee-icon ee-icon-external-link ee-icon-color-grey ee-icon-size-18"></span>&nbsp;
        <?php esc_html_e('Venue Website', 'event_espresso'); ?>: &nbsp;
        <input name="vnu_url" type="text" class="all-options" value="<?php echo esc_url($vnu_url); ?>" />
    </label>
</div>
<div class="misc-pub-section">
    <label>
        <span class="ee-dashicons dashicons-phone ee-icon-color-grey ee-icon-size-18"></span>
        <?php esc_html_e('Venue Phone #', 'event_espresso'); ?>: &nbsp;
        <input name="vnu_phone" type="text" class="all-options" value="<?php echo esc_html($vnu_phone); ?>" />
    </label>
</div>