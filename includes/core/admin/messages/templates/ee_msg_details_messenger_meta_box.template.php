<div class="<?php echo $messenger; ?>-mt-content">
	<p>
		<?php _e('Below are message types that are currently inactive with this messenger.  Drag them over to the messenger box to activate them.', 'event_espresso'); ?>
	<p>
	<div<?php if ( $active ) : ?> id="inactive-message-types"<?php endif; ?> class="inactive-message-types mt-tab-container ui-widget-content-ui-state-default">
		<ul class="messenger-activation">
			<?php echo $inactive_message_types; ?>
		</ul>
		<div class="ui-helper-clearfix"></div>
	</div>
</div>