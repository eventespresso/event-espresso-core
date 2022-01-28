<?php
/**
 * displays legends with an array of $items
 * that are indexed by id for each item
 * where each item itself is an array of 'icon' and 'desc'.
 *
 * @var string[][] $items
 * @var int|null $per_column
 */

// figure out the columns based on the count of items (we want a max of 6 items per column).
$per_col = isset($per_column) ? absint($per_column) : 5;
$count = 1;
?>

<div class="ee-list-table-legend-container">
    <h3><?php esc_html_e('Legend', 'event_espresso'); ?></h3>
    <?php
    if (isset($status_change_notice)) {
        echo $status_change_notice;
    }
    ?>
    <dl class="alignleft ee-list-table-legend">
        <?php foreach ($items as $item => $details) :
            if ($per_col < $count) : ?>
    </dl>
    <dl class="alignleft ee-list-table-legend">
                <?php $count = 1;
            endif; ?>
        <dt id="ee-legend-item-<?php echo esc_attr($item); ?>">
            <?php $class = ! empty($details['class']) ? $details['class'] : 'ee-legend-img-container'; ?>
            <span class="ee-legend-item-wrap">
            <?php
            if (strpos($details['class'], '<span') !== false) {
                echo $class; // already escaped
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
            <span class="ee-legend-description"><?php echo esc_html($details['desc']); ?></span>
        </dt>
            <?php $count++;
        endforeach; ?>
    </dl>
    <div style="clear:both"></div>
</div>
