<div class="changelog point-releases">
	<h3><?php echo _n( 'Major Release', 'Major Releases', 1 ); ?></h3>
	<p><?php printf( __( '<strong>Version %1$s</strong> is the initial release of the brand new EE4 codebase.', 'event_espresso'), EVENT_ESPRESSO_VERSION ); ?>
		<?php printf( __( 'For more information, see <a href="%s">the release notes</a>.' ), 'http://eventespresso.com/wiki/change-log#4.1' ); ?>
 	</p>
</div>

<div class="changelog">
	<?php
	//maintenance mode on?
	if ( EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_2_complete_maintenance ) {
		?>
		<div class="ee-attention">
			<h2 class="ee-maintenance-mode-callout"><?php  _e('Event Espresso is in full maintenance mode.' , 'event_espresso'); ?></h2>
			<p>
			<?php 
				printf( 
					__('A previous version of Event Espresso has detected. But before anything else can happen, we need to know whether or not to migrate (copy over) your existing event data so that it can be utilized by EE4. For more instructions on what to do, please visit the %sEvent Espresso Maintenance%s page.', 'event_espresso'), 
					'<a href="admin.php?page=espresso_maintenance_settings">', 
					'</a>' 
				); 
			?>
			</p> 
		</div>
		<?php
	}
	?>	
	<h2 class="about-headline-callout"><?php _e('Introducing the most powerful decaf* version of Event Espresso yet!', 'event_espresso'); ?></h2>
	<img class="about-overview-img" src="<?php echo EE_ABOUT_ASSETS_URL; ?>eventeditor-screen.jpg" />
	<span class="small-text lt-grey-text"><?php _e('The decaf version of Event Espresso is our free community edition.', 'event_espresso'); ?></span>

</div>