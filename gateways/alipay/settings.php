<?php
function event_espresso_alipay_settings(){

    global $org_options;
    
	if (isset($_POST['update_alipay'])) {


$alipay_settings['alipay_partner_id'] =  $_POST['alipay_partner_id'];
$alipay_settings['alipay_security_code'] =  $_POST['alipay_security_code'];

$alipay_settings['button_url'] = $_POST['button_url'];

		update_option('event_espresso_alipay_settings', $alipay_settings);
		echo '<div id="message" class="updated fade"><p><strong>'.__('Alipay settings saved.','event_espresso').'</strong></p></div>';
                
	}
?>
<div class="metabox-holder">
<div class="postbox">
<h3>
  <?php _e('Alipay Settings','event_espresso'); ?>
</h3>
<?php
				if ($_REQUEST['activate_alipay'] == 'true'){
					add_option("events_alipay_active", 'true', '', 'yes');
					add_option("event_espresso_alipay_settings", '', '', 'yes');
				}
				if ($_REQUEST['reactivate_alipay'] == 'true'){
					update_option( 'events_alipay_active', 'true');
				}
				if ($_REQUEST['deactivate_alipay'] == 'true'){
					update_option( 'events_alipay_active', 'false');
				}
				echo '<ul>';
				switch (get_option('events_alipay_active')){
					case 'false':
						echo '<li>'. __('Alipay Gateway is Installed.', 'event_espresso') .'</li>';
						echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_alipay=true\';" class="green_alert pointer"><strong>' . __('Activate Alipay Gateway?','event_espresso') . '</strong></li>';
					break;
					case 'true':
						echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_alipay=true\';" class="red_alert pointer"><strong>' . __('Deactivate Alipay Gateway?','event_espresso') . '</strong></li>';
						event_espresso_display_alipay_settings();
					break;
					default:
						echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_alipay=true\';" class="yellow_alert pointer"><strong>' . __('The Alipay gateway is installed. Would you like to activate it?','event_espresso') . '</strong></li>';
					break;
				}
				echo '</ul>';
?>
</div>
</div>
<?php
}
//Authorize.net Settings Form
function event_espresso_display_alipay_settings(){
	$alipay_settings = get_option('event_espresso_alipay_settings');
	$org_options = get_option('events_organization_settings');
      
	//Get the current button URL
	if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/new_logo.jpg")){
		$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/new_logo.jpg";
	}else{
		$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/alipay/new_logo.jpg";
	}
?>
<form method="post" action="<?php echo $_SERVER['REQUEST_URI']?>">
  <table width="99%" border="0">
    <tr>
      <td valign="top"><ul>
          <li>
            <label for="alipay_login_id">
              <?php _e('Alipay partner I.D.','event_espresso'); ?>
            </label>
            <br />
            <input type="text" name="alipay_partner_id" size="35" value="<?php echo $alipay_settings['alipay_partner_id'];?>">
          </li>
          <li>
            <label for="alipay_transaction_key">
              <?php _e('Alipay security code','event_espresso'); ?>
            </label>
            <br />
            <input type="text" name="alipay_security_code" size="35" value="<?php echo $alipay_settings['alipay_security_code'];?>">
          </li>

          <li>
            <label for="button_url">
              <?php _e('Button Image URL: ','event_espresso'); ?>
            </label>
            <br />
            <input type="text" name="button_url" size="34" value="<?php echo (($alipay_settings['button_url'] == '') ? $button_url : $alipay_settings['button_url'] ) ;?>" />
            <a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a></li>

        </ul></td>

    </tr>
  </table>
  <p>
    <input type="hidden" name="update_alipay" value="update_alipay">
    <input class="button-primary" type="submit" name="Submit" value="<?php  _e('Update Alipay Settings','event_espresso') ?>" id="save_alipay_settings" />
  </p>
</form>


<?php
}
