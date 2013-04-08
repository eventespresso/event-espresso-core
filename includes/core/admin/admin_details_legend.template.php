<?php
//this displays any legends with an array of $items that are indexed by id for each item and each item itself is an array of 'icon' and 'desc'.

//figure out the columns based on the count of items (we want a max of 6 items per column).
$columns = ceil(count( $items )/6);
$count = 1;
?>
<div class="ee-list-table-legend-container">
	<h4><?php _e('Legend', 'event_espresso'); ?></h4>
	<dl class="alignleft ee-list-table-legend">
		<?php foreach ( $items as $item => $details ) : ?>
			<?php if ( $columns%$count == $columns) : ?>
				</dl>
				<dl class="alignleft ee-list-table-legend">
			<?php endif; ?>
			<dt id="ee-legend-item-<?php echo $item; ?>">
				<span class="ee-legend-img-container"><img src="<?php echo $details['icon']; ?>" class="ee-legend-icon" alt="<?php echo $details['desc']; ?>" /></span>
				<span class="ee-legend-description"><?php echo $details['desc']; ?></span>
			</dt>
		<?php endforeach; ?>
	</dl>
	<div style="clear:both"></div>
</div>