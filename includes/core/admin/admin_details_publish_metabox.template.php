<?php echo $publish_box_extra_content; ?>
<div class="submitbox" id="submitpost">
	<div id="delete-action">
			<?php echo $publish_delete_link; ?>
	</div>
	<div class="hidden-fields">
		<!-- any hidden fields -->
		<?php echo $publish_hidden_fields; ?>
	</div>
	<br/>
	<?php
		echo $save_buttons;
	?>
</div> <!-- end #submitpost -->