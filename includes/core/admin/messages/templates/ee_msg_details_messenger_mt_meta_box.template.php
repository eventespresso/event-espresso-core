<div class="<?php echo $messenger; ?>-content">
	<?php echo $content; ?>
	<p>
		<?php _e('Below are message types that are currently <strong>active</strong> with this messenger.  Drag them over to the "Inactive Message Types" box to deactivate them.', 'event_espresso'); ?>
	<p>
	<div <?php if ( $active ) : ?> id="active-message-types"<?php endif; ?> class="mt-tab-container">
		<ul class="messenger-activation">	
			<?php echo $active_message_types; ?>
		</ul>
		<div class="ui-helper-clearfix"></div>
	</div>
</div>