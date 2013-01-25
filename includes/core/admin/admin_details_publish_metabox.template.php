<div id="minor-publishing">
<?php echo $publish_box_extra_content; ?>
</div>

<div class="submitbox" id="submitpost">

	<div class="hidden-fields">
		<!-- hidden fields -->
		<?php echo $publish_hidden_fields; ?>
	</div>
	
	<div id="event_editor_major_buttons_wrapper">
	
		<?php if ( $publish_delete_link ) : ?>
		<div id="delete-action">
			<?php echo $publish_delete_link; ?>
		</div>
		<?php endif; ?>
		
		<div class="publishing-action">
			<?php echo $save_buttons; ?>
		</div>
		<div class="clear"></div>
		
	</div>
	
	<div id="event-editor-floating-save-btns" class="hidden">
			<?php echo $save_buttons; ?>
	</div>
	
</div> <!-- end #submitpost -->