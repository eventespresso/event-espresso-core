<div id="ee-status-container" style="display:none;">
	<span id="cur_status"><?php echo $cur_status_label; ?></span>
	<select name='ee_post_status' id='ee_post_status'>
 	<?php foreach ( $statuses as $status => $label ) : ?>
		<option<?php selected( $cur_status, $status ); ?> value='<?php echo $status; ?>'><?php echo $label; ?></option>
	<?php
	endforeach;
	?>
	</select>
</div>