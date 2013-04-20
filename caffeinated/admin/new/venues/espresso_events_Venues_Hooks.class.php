<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * espresso_events_Venues_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 * 
 *
 * @package		espresso_events_Venues_Hooks
 * @subpackage	caffeinated/admin/new/venues/espresso_events_Venues_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Venues_Hooks extends EE_Admin_Hooks {


	protected $_event;


	public function __construct( EE_Admin_Page $admin_page ) {
		parent::__construct( $admin_page );
	}


	protected function _set_hooks_properties() {
		$this->_name = 'venues';
		$this->_metaboxes = array(
			0 => array(
				'page_route' => array('edit_event', 'add_event'),
				'func' => 'venue_metabox',
				'label' => __('Venue Details', 'event_espresso'),
				'priority' => 'core',
				'context' => 'normal'
				)
		);
	}


	public function venue_metabox() {
		global $org_options;
		$this->_event = $this->_adminpage_obj->get_event_object();
		$values = array(
				array('id' => true, 'text' => __('Yes', 'event_espresso')),
				array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		?>
		
		<div class="inside">
			<table class="form-table">
				<tr>
					<?php
					if ( $org_options['use_venue_manager'] ) {
						$ven_type = 'class="use-ven-manager"';

						?>
					<td valign="top" <?php echo $ven_type ?>><fieldset id="venue-manager">
								<legend><?php echo __('Venue Information', 'event_espresso') ?></legend>
								<?php if (! $this->_espresso_venue_dd()) : ?>
									<p class="info">
										<b><?php _e('You have not created any venues yet.', 'event_espresso'); ?></b>
									</p>
									<p><a href="admin.php?page=espresso_venues"><?php echo __('Add venues to the Venue Manager', 'event_espresso') ?></a></p>
								<?php else: ?>
									<?php echo $this->_espresso_venue_dd($this->_event->venue_id) ?>
								<?php endif; ?>
							</fieldset>
						</td>
						<?php
					} else {
						$ven_type = 'class="manual-venue"';
						?>
						<td valign="top" <?php echo $ven_type; ?>>

								<legend>
									<?php _e('Venue Information', 'event_espresso'); ?>
								</legend>
								<p>
									<label for="ven-title"><?php _e('Title:', 'event_espresso'); ?></label><br/>
									<input size="20"id="ven-title" tabindex="106"  type="text"  value="<?php echo stripslashes_deep($this->_event->venue_title) ?>" name="venue_title" />
								</p>
								<p>
									<label for="ven-website"><?php _e('Website:', 'event_espresso'); ?></label><br/>
									<input size="20" id="ven-website" tabindex="107"  type="text"  value="<?php echo stripslashes_deep($this->_event->venue_url) ?>" name="venue_url" />
								</p>
								<p>
									<label for="ven-phone"><?php _e('Phone:', 'event_espresso'); ?></label><br/>
									<input size="20" id="ven-phone" tabindex="108"  type="text"  value="<?php echo stripslashes_deep($this->_event->venue_phone) ?>" name="venue_phone" />
								</p>
								<p>
									<label for="ven-image"><?php _e('Image:', 'event_espresso'); ?></label><br/>
									<input size="20" id="ven-image" tabindex="110"  type="text"  value="<?php echo stripslashes_deep($this->_event->venue_image) ?>" name="venue_image" />
								</p>
						</td>
						<td valign="top" <?php echo $ven_type ?>>
							<fieldset>
								<legend><?php _e('Physical Location', 'event_espresso'); ?></legend>
								<p>
									<label for="phys-addr"><?php _e('Address:', 'event_espresso'); ?></label><br/>
									<input size="20" id="phys-addr" tabindex="100"  type="text"  value="<?php echo $this->_event->address ?>" name="address" />
								</p>
								<p>
									<label for="phys-addr-2"><?php _e('Address 2:', 'event_espresso'); ?></label><br/>
									<input size="20" id="phys-addr-2" tabindex="101"  type="text"  value="<?php echo $this->_event->address2 ?>" name="address2" />
								</p>
								<p>
									<label for="phys-city"><?php _e('City:', 'event_espresso'); ?></label><br/>
									<input size="20" id="phys-city" tabindex="102"  type="text"  value="<?php echo $this->_event->city ?>" name="city" />
								</p>
								<p>
									<label for="phys-state"><?php _e('State:', 'event_espresso'); ?></label><br/>
									<input size="20" id="phys-state" tabindex="103"  type="text"  value="<?php echo $this->_event->state ?>" name="state" />
								</p>
								<p>
									<label for="phys-country"><?php _e('Country:', 'event_espresso'); ?></label><br/>
									<input size="20" id="phys-country" tabindex="105"  type="text"  value="<?php echo $this->_event->country ?>" name="country" />
								</p>
								<p>
									<label for="zip-postal"><?php _e('Zip/Postal Code:', 'event_espresso'); ?></label><br/>
									<input size="20" id="zip-postal"  tabindex="104"  type="text"  value="<?php echo $this->_event->zip ?>" name="zip" />
								</p>
									<br/>
								<p>
									<?php _e('Google Map Link (for email):', 'event_espresso'); ?>
									<?php echo $this->_event->google_map_link; ?> 
								</p>	
									<br/>
								<p>
									<label for="enable_for_gmap">
										<?php _e('Enable event address in Google Maps? ', 'event_espresso') ?>
									</label>
									<?php echo EE_Form_Fields::select_input('enable_for_gmap', $values, isset($this->_event->event_meta['enable_for_gmap']) ? $this->_event->event_meta['enable_for_gmap'] : '', 'id="enable_for_gmap"') ?> 
								</p>

							</fieldset>
						</td>
							<?php } ?>
					<td valign="top" <?php echo $ven_type ?>>
						<fieldset id="virt-location">
							<legend>
								<?php _e('Virtual Location', 'event_espresso'); ?>
							</legend>
							<p>
								<label for="virt-phone" style="display:inline-block; width:100px;">
									<?php _e('Phone:', 'event_espresso'); ?>
								</label>
								<input size="20" id="virt-phone" type="text" tabindex="111" value="<?php echo $this->_event->phone ?>" name="phone" />
							</p>
							<p>
								<label for="url-event" style="display:inline-block; width:100px; vertical-align:top;">
									<?php _e('URL of Event:', 'event_espresso'); ?>
								</label>
								<textarea id="url-event" cols="30" rows="4" tabindex="112"  name="virtual_url"><?php echo stripslashes_deep($this->_event->virtual_url) ?></textarea>
							</p>
							<p>
								<label for="call-in-num" style="display:inline-block; width:100px;">
									<?php _e('Call in Number:', 'event_espresso'); ?>
								</label>
								<input id="call-in-num" size="20" tabindex="113"  type="text"  value="<?php echo stripslashes_deep($this->_event->virtual_phone) ?>" name="virtual_phone" />
							</p>
						</fieldset>
					</td>
				</tr>
			</table>

		</div>
		<?php
	}



	private function _espresso_venue_dd($current_value = 0) {
		global $wpdb, $espresso_manager, $espresso_wp_user;

		$WHERE = " WHERE ";
		$sql = "SELECT ev.*, el.name AS locale FROM " . EVENTS_VENUE_TABLE . " ev ";
		$sql .= " LEFT JOIN " . EVENTS_LOCALE_REL_TABLE . " lr ON lr.venue_id = ev.id ";
		$sql .= " LEFT JOIN " . EVENTS_LOCALE_TABLE . " el ON el.id = lr.locale_id ";

		if (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_group_admin' )) {
			if ($espresso_manager['event_manager_venue']) {
				//show only venues inside their assigned locales.
				$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
				$group = unserialize($group);
				$sql .= " $WHERE lr.locale_id IN (" . implode(",", $group) . ")";
				$sql .= " OR ev.wp_user = " . $espresso_wp_user;
				$WHERE = " AND ";
			}
		}
		$sql .= " GROUP BY ev.id ORDER by name";

		$venues = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;

		if ($num_rows > 0) {
			$field = '<label>' . __('Select from Venue Manager list', 'event_espresso') . '</label>';
			$field .= '<select name="venue_id[]" id="venue_id" class="chzn-select"  >\n';
			$field .= '<option value="0">' . __('Select a Venue', 'event_espresso') . '</option>';
			$div = "";
			$help_div = "";
			$i = 0;
			foreach ($venues as $venue) {

				$i++;
				$selected = $venue->id == $current_value ? 'selected="selected"' : '';
				if ($venue->locale != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->locale) . ') </option>\n';
				} else if ($venue->city != '' && $venue->state != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->city) . ', ' . stripslashes_deep($venue->state) . ') </option>\n';
				} else if ($venue->state != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->state) . ') </option>\n';
				} else {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' </option>\n';
				}

				$hidden = "display:none;";
				if ($selected)
					$hidden = '';
				$div .= "
	<fieldset id='eebox_" . $i . "' class='eebox' style='" . $hidden . "'>
		<ul class='address-view'>
			<li>
				<p><span>Address:</span> " . stripslashes($venue->address) . "<br/>
				<span></span> " . stripslashes($venue->address2) . "<br/>
				<span>City:</span> " . stripslashes($venue->city) . "<br/>
				<span>State:</span> " . stripslashes($venue->state) . "<br/>
				<span>Zip:</span> " . stripslashes($venue->zip) . "<br/>
				<span>Country:</span> " . stripslashes($venue->country) . "<br/>
				<span>Venue ID:</span> " . $venue->id . "<br/></p>
				This venues shortcode <b class='highlight'>[ESPRESSO_VENUE id='" . $venue->id . "']</b><br/>";
				$div .= '<a href="admin.php?page=espresso_venues&action=edit&id=' . $venue->id . '" target="_blank">' . __('Edit this venue', 'event_espresso') . '</a> | <a class="thickbox link" href="#TB_inline?height=300&width=400&inlineId=venue_info">Shortcode</a></li></ul>';
				$div .= "</fieldset>";
			}
			$field .= "</select>";
			ob_start();
			?>
			<script>
				jQuery("#venue_id").change( function(){
					var selected = jQuery("#venue_id option:selected");
					var rel = selected.attr("rel");
					jQuery(".eebox").hide();
					jQuery("#eebox_"+rel).show();
				});
			</script>
			<?php
			$js = ob_get_contents();
			ob_end_clean();
			$html = '<table><tr><td>' . $field . '</td></tr><tr><td>' . $div . '</td></tr></table>' . $js;
			return $html;
		}
	}

} //end espresso_events_Venues_Hooks class