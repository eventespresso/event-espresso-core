<div class="<?php echo $messenger; ?>-content">
	<?php echo $content; ?>
	<?php if (  empty( $inactive_message_types ) && empty( $active_message_types )  ) : echo '<p>' . __('This messenger is not currently used with any message types for templates but merely adds to the shortcodes available for templates on other messenger and message types.') . '</p>'; else : ?>
		<p class="active-on-message <?php echo $hide_on_message; ?>">
			<?php printf( __('Below are message types that are currently %sactive%s with this messenger. Drag them over to the "Inactive Message Types" box to deactivate them.', 'event_espresso'), '<strong>', '</strong>' ); ?>
		<p>
		<div <?php if ( $active ) : ?> id="active-message-types"<?php endif; ?> class="mt-tab-container <?php echo $hide_on_message; ?>">
			<ul class="messenger-activation">
				<?php echo $active_message_types; ?>
			</ul>
			<div class="ui-helper-clearfix"></div>
		</div>
	<?php endif; ?>
</div>
