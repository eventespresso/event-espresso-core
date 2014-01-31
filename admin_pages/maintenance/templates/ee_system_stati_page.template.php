<?php

/*
* To change this template, choose Tools | Templates
* and open the template in the editor.
*/

function ee_resurse_into_array($data) {
	if (is_object($data)) {
		$data = (array)$data;
	}
	if (is_array($data)) {
		if (EEH_Array::is_associative_array($data)) {
			?>
			<table class="widefat">
				<tbody>
					<?php
					foreach ($data as $data_key => $data_values) {
						?>
						<tr>
							<td>
								<?php echo $data_key;?>
							</td>
							<td>
								<?php ee_resurse_into_array($data_values);?>
							</td>
						</tr>
						<?php
					}?>
				</tbody>
			</table>
			<?php
		}
		else {
			?>
			<ul>
				<?php
				foreach ($data as $datum) {
					echo "<li>";ee_resurse_into_array($datum);echo "</li>";
				}?>
			</ul>
			<?php
		}
	}
	else {
		//simple value
		echo $data;
	}
}
?>
<h1>
	<?php _e("System Status", "event_espresso");?>
</h1>
<div class="padding">
	<h3>
		<?php _e("Raw System Data", "event_espresso");?>
	</h3>
	<textarea class="system_status_info">
		<?php print_r($system_stati)?>
	</textarea>
	<table class="widefat">
		<?php
		foreach ($system_stati as $status_category_slug => $data) {
			if (is_object($data)) {
				$data = (array)$data;
			}
			?>
			<thead>
				<tr>
					<th colspan=2>
						<?php echo $status_category_slug?>
					</th>
				</tr>
			</thead>
			<tbody>
				<?php
				if (is_array($data)) {
				foreach ($data as $data_key => $data_values) {
					?>
					<tr>
						<td>
							<?php echo $data_key?>
						</td>
						<td>
							<?php ee_resurse_into_array($data_values)?>
						</td>
					</tr>
					<?php
				}?>
			</tbody>
			<?php
			}
			else {
				?>
				<tbody>
					<tr>
						<td colspan=2>
							<?php echo $data?>
						</td>
					</tr>
				</tbody>
				<?php
			}
		}
		?>
	</table>
	<br/><br/><br/><br/><br/>
	
	<h3><?php _e('Delete ALL Event Espresso Tables and Data', 'event_espresso');?></h3>
	<p><?php _e('If you know for certain that you will no longer be using Event Espresso and you wish to remove ALL traces of the plugin from your system, then perform the following steps. Please note that this is permanent and can NOT be undone.', 'event_espresso');?><br/></p>
	<ol>
		<li><?php printf( __('first click this button to %sPermanently Delete All Event Espresso Tables, Records and Options%s  from your database', 'event_espresso'), '<a href="' . $delete_db_url . '" id="delete-all-data-btn" class="button-primary">', '</a>' );?><br/><br/></li>
		<li><?php printf( __('then go to the %sWordPress Plugins page%s click the delete link within the Event Espresso plugin listing', 'event_espresso'), '<a href="' . admin_url('plugins.php') . '">', '</a>' );?><br/><br/></li>
		<li><?php _e('follow the rest of the WordPress steps Event Espresso plugin listing', 'event_espresso');?></li>
	</ol>
</div>