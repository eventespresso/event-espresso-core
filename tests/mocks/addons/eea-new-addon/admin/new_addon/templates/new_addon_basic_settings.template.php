<?php
/* @var $config EE_New_Addon_Config */
?>
<div class="padding">
	<h4>
		<?php esc_html_e('New Addon Settings', 'event_espresso'); ?>
	</h4>
	<table class="form-table">
		<tbody>

			<tr>
				<th><?php esc_html_e("Reset New Addon Settings?", 'event_espresso');?></th>
				<td>
					<?php echo EEH_Form_Fields::select( esc_html__('Reset New Addon Settings?', 'event_espresso'), 0, $yes_no_values, 'reset_new_addon', 'reset_new_addon' ); ?><br/>
					<span class="description">
						<?php esc_html_e('Set to \'Yes\' and then click \'Save\' to confirm reset all basic and advanced Event Espresso New Addon settings to their plugin defaults.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

		</tbody>
	</table>

</div>

<input type='hidden' name="return_action" value="<?php echo $return_action?>">

