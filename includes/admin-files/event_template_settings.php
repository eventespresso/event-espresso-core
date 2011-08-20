        <li>
          <label for="display_short_description_in_event_list">
            <?php _e('Display short descriptions in the event listings? (Be sure to use the "More..." tag in your event description)','event_espresso'); ?>
          </label>
          <?php echo select_input('display_short_description_in_event_list', $values, isset($org_options['display_short_description_in_event_list']) ? $org_options['display_short_description_in_event_list'] : ''); ?>
					</li>
        <?php if (get_option('event_espresso_multi_reg_active') == 1){?>
        
					<li>
          <label for="display_description_on_multi_reg_page">
            <?php _e('Display event descriptions in the multiple event registration pages?','event_espresso'); ?>
          </label>
          <?php echo select_input('display_description_on_multi_reg_page', $values, isset($org_options['display_description_on_multi_reg_page']) ? $org_options['display_description_on_multi_reg_page'] : ''); ?> 
					</li>
        <?php } ?>
        
					<li>
          <label for="display_address_in_event_list">
            <?php _e('Display addresses in the event listings?','event_espresso'); ?>
          </label>
          <?php echo select_input('display_address_in_event_list', $values, isset($org_options['display_address_in_event_list']) ? $org_options['display_address_in_event_list'] : ''); ?>
					</li>
        
					<li>
          <label for="display_address_in_regform">
            <?php _e('Display the address in the registration form? Disable the address if you are using the venue manager shortcodes in your event description.','event_espresso'); ?>
          </label>
          <?php echo select_input('display_address_in_regform', $values, isset($org_options['display_address_in_regform']) ? $org_options['display_address_in_regform'] : ''); ?> 
					</li>
        
					<li>
          <label for="use_custom_post_types">
            <?php _e('Use the custom post types feature?','event_espresso'); ?>
          </label>
          <?php echo select_input('use_custom_post_types', $values, isset($org_options['use_custom_post_types']) ? $org_options['use_custom_post_types']: ''); ?> 
					</li>
 				
	