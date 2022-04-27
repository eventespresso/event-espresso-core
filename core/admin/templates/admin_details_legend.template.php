<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * displays legends with an array of $items
 * that are indexed by id for each item
 * where each item itself is an array of 'icon' and 'desc'.
 *
 * @var string[][] $items
 */

?>

<div class="ee-list-table-legend-container">
    <h3><?php esc_html_e('Legend', 'event_espresso'); ?></h3>
    <?php
    if (isset($status_change_notice)) {
        echo  wp_kses($status_change_notice, AllowedTags::getAllowedTags());
    }
    ?>
    <div class="ee-list-table-legend-wrap">
        <dl class="ee-list-table-legend">
            <?php foreach ($items as $item => $details) : ?>
            <dt id="ee-legend-item-<?php echo esc_attr($item); ?>">
                <?php $class = ! empty($details['class']) ? $details['class'] : 'ee-legend-img-container'; ?>
                <span class="ee-legend-item-wrap">
                <?php
                if (strpos($details['class'], '<span') !== false) {
                    echo wp_kses($class, AllowedTags::getWithFormTags());
                } else { ?>
                <span class="<?php echo esc_attr($class); ?>">
                    <?php if (! empty($details['icon'])) : ?>
                        <img alt="<?php echo esc_attr($details['desc']); ?>"
                             class="ee-legend-icon"
                             src="<?php echo esc_url_raw($details['icon']); ?>"
                        />
                    <?php endif; ?>
                </span>
                    <?php
                } ?>
                </span>
                <span class="ee-legend-description"><?php echo esc_html($details['desc']); ?></span>
            </dt>
            <?php endforeach; ?>
        </dl>
    </div>
    <div style="clear:both"></div>
</div>
