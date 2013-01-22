<?php echo $publish_box_extra_content; ?>

<div class="submitbox" id="submitpost">

	<div class="hidden-fields">
		<!-- hidden fields -->
		<?php echo $publish_hidden_fields; ?>
	</div>
	
	<?php echo $save_buttons; ?>
	
	<?php if ( $publish_delete_link ) : ?>
	<div id="delete-action">
		<?php echo $publish_delete_link; ?>
	</div>
	<?php endif; ?>
	
</div> <!-- end #submitpost -->