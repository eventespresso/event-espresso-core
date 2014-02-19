<table class="form-table">
	<tr>
		<td valign="top" class="use-ven-manager">
		<label><?php _e('Select from Venue Manager List', 'event_espresso'); ?></label>
		<?php echo $venue_selector; ?>
		<?php foreach ( $venues as $venue ) :
			$selected = $evt_venue_id == $venue->ID() ? '' : ' style="display:none;"';
			$edit_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action' => 'edit', 'post' => $venue->ID() ), EE_VENUES_ADMIN_URL );
			$state_name = is_object( $venue->state_obj() ) ? $venue->state_obj()->name() : NULL;
			$country_name = is_object( $venue->country_obj() ) ? $venue->country_obj()->name() : NULL;
			?>
			<fieldset id="eebox_<?php echo $venue->ID(); ?>" class="eebox"<?php echo $selected; ?>>
				<ul class="address-view">
					<li>
						<p><span><?php _e('Address:', 'event_espresso'); ?></span> <?php echo $venue->address(); ?><br />
							<span></span> <?php echo $venue->address2(); ?><br />
							<span><?php _e('City:', 'event_espresso'); ?></span> <?php echo $venue->city(); ?><br />
							<span><?php _e('State:', 'event_espresso'); ?></span> <?php echo $state_name; ?><br />
							<span><?php _e('Country:', 'event_espresso'); ?></span> <?php echo $country_name; ?><br />
							<span><?php _e('Venue ID:', 'event_espresso'); ?></span> <?php echo $venue->ID(); ?><br /></p>
							<!-- <?php printf( __('This venue\'s shortcode: %s[ESPRESSO_VENUE id="%d"]%s', 'event_espresso'), '<strong class="highlight">', $venue->ID(), '</strong>' ); ?><br /> -->
							<a href="<?php echo $edit_url; ?>" target="_blank"><?php _e('Edit this Venue', 'event_espresso'); ?></a>
					</li>	
				</ul>
			</fieldset>
		<?php endforeach; ?>
		</td>
	</tr>
</table>