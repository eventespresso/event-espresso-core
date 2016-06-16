<li id="<?php echo $slug_id; ?>" class="ui-widget-content ui-corner-tr mt-tab <?php echo $class; ?>">
	<div id="<?php echo $slug_id; ?>-handle" class="mt-handlediv no-drag" title="<?php esc_attr_e( 'Click to toggle', 'event_espresso' ); ?>"><br></div>
	<strong class="ui-widget-header"><?php echo $label; ?></strong>
	<?php echo $content; ?>
	<span class="mt_nonce hidden"><?php echo $mt_nonce; ?></span>
</li>
