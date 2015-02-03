<div class="<?php echo $messenger; ?>-content">
	<?php if (  empty( $inactive_message_types ) && empty( $active_message_types )  ) : echo '<p>' . __('This messenger is not currently used with any message types for templates but merely adds to the shortcodes available for templates on other messenger and message types.') . '</p>'; else : ?>
		<p class="inactive-on-message <?php echo $hide_on_message; ?>">
			<?php _e('Below are message types that are currently inactive with this messenger.  Drag them over to the messenger box to activate them.', 'event_espresso'); ?>
		<p>
		<p class="inactive-off-message <?php echo $hide_off_message; ?>">
			<?php _e('This messenger is currently inactive.  Once the messenger is activated any inactive message types associated with the messenger will be shown here.', 'event_espresso'); ?>
		</p>
		<div<?php if ( $active ) : ?> id="inactive-message-types"<?php endif; ?> class="inactive-message-types mt-tab-container ui-widget-content-ui-state-default <?php echo $hide_on_message; ?>">
			<ul class="messenger-activation">
				<?php echo $inactive_message_types; ?>
			</ul>
			<div class="ui-helper-clearfix"></div>
		</div>
	<?php endif; ?>
</div>
