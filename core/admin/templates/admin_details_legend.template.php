<?php
//this displays any legends with an array of $items that are indexed by id for each item and each item itself is an array of 'icon' and 'desc'.

//figure out the columns based on the count of items (we want a max of 6 items per column).
$per_col = isset( $per_column ) ? $per_column : 5;
$count = 1;
?>
<div class="ee-list-table-legend-container">
	<h3><?php _e('Legend', 'event_espresso'); ?></h3>
	<dl class="alignleft ee-list-table-legend">
		<?php foreach ( $items as $item => $details ) : ?>
			<?php if ( $per_col < $count ) : ?>
				</dl>
				<dl class="alignleft ee-list-table-legend">
			<?php $count = 1; endif; ?>
			<dt id="ee-legend-item-<?php echo $item; ?>">
				<?php $class = ! empty( $details['class'] ) ? $details['class'] : 'ee-legend-img-container'; ?>
				<?php if ( strpos( $details[ 'class' ], '<span' ) !== false ) {
					echo $class;
				} else { ?>
				<span class="<?php echo $class; ?>">
					<?php if ( ! empty( $details[ 'icon' ] ) ) : ?>
						<img src="<?php echo $details[ 'icon' ]; ?>" class="ee-legend-icon" alt="<?php echo esc_attr( $details[ 'desc' ] ); ?>"/>
					<?php endif; ?>
				</span>
				<?php } ?>
				<span class="ee-legend-description"><?php echo $details['desc']; ?></span>
			</dt>
		<?php $count++; endforeach; ?>
	</dl>
	<div style="clear:both"></div>
</div>
