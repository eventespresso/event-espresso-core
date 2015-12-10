<?php
/* @var $config EE_REST_API_Config */
?>
<div class="padding">
	<h4>
		<?php _e('REST_API Settings', 'event_espresso'); ?>
	</h4>
	<table class="form-table">
		<tbody>
			<tr>
				<th><?php _e("Debug Mode?", 'event_espresso');?></th>
				<td>
					<?php echo EEH_Form_Fields::select( __('API Debug Mode?', 'event_espresso'), $rest_api_config->api_debug_mode, $yes_no_values, 'rest_api[api_debug_mode]', 'rest-api-api-debug-mode' ); ?><br/>
					<span class="description">
						<?php _e('Set to \'Yes\' to set the EE4 API in Debug Mode. This will provide debug information to API Clients that is helpful during development, but inconvenient on live servers.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			<tr>
				<th><?php _e("Reset REST_API Settings?", 'event_espresso');?></th>
				<td>
					<?php echo EEH_Form_Fields::select( __('Reset REST_API Settings?', 'event_espresso'), 0, $yes_no_values, 'reset_rest_api', 'reset_rest_api' ); ?><br/>
					<span class="description">
						<?php _e('Set to \'Yes\' and then click \'Save\' to confirm reset all basic and advanced Event Espresso REST_API settings to their plugin defaults.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

		</tbody>
	</table>

</div>

<input type='hidden' name="return_action" value="<?php echo $return_action?>">

