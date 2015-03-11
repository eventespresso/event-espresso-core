<?php
/**
 * Template for General Settings Template Tab
 */
EE_Registry::instance()->load_helper('Event_View');
EE_Registry::instance()->load_helper('Form_Fields');
?>
<div class="padding">

	<?php do_action( 'AHEE__template_settings__template__before_settings_form' ); ?>

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Event Slug', 'event_espresso'); ?>
	</h4>
	<p><?php printf( __('This allows you to configure what slug is used for the url of all event pages. The default is %s.', 'event_espresso'), EEH_Event_View::event_archive_url() ); ?></p>
	<p><?php echo site_url() . '/ ' . EEH_Form_Fields::text( 'not_used', EE_Registry::instance()->CFG->core->event_cpt_slug, 'event_cpt_slug', 'event_cpt_slug', 'regular' ); ?></p>
</div>
