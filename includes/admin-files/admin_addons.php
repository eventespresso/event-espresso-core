<?php
function event_espresso_addons_mnu(){
	global $wpdb;
?>

<div id="event_reg_theme" class="wrap">
  <div id="icon-options-event" class="icon32"></div>
  <h2><?php echo _e('Manage Addons', 'event_espresso') ?></h2>
  <div id="poststuff" class="metabox-holder has-right-sidebar">
  <?php do_meta_boxes('event-espresso_page_admin_addons', 'side', null);?>
  <div id="post-body">
<div id="post-body-content">
  <div class="metabox-holder">
	<div class="postbox">
	  <h3>
		<?php _e('Recurring Events Manager','event_espresso'); ?>
	  </h3>
	  <div class="inside">
	  <ul>
	  <li>The <a href="http://eventespresso.com/download/plugins-and-addons/recurring-events-manager/" target="_blank">Recurring Events Manager</a> for Event Espresso adds an even more power to this amazing event registration and management system for WordPress. It can automatically create repeating events and classes that practically manage themselves. Just install this addon in conjunction with Event Espresso and start creating classes, meetings, and conferences for months (and even years) to come.</li>
		<?php
	if (function_exists('recurring_days')){
		echo '<li>';
		echo '<strong style="padding:5px;" class="green_alert">' . __('Installed','event_espresso') . '</strong>';
		echo '</li>';
	}else{
		echo '<li><a href="https://www.e-junkie.com/ecom/gb.php?c=cart&i=ESPRESSO-REM&cl=113214&ejc=2" target="ej_ejc" class="ec_ejc_thkbx" onClick="javascript:return EJEJC_lc(this);"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/add-to-cart.gif" border="0" alt="Add to Cart"/></a> <a href="https://www.e-junkie.com/ecom/gb.php?c=cart&cl=113214&ejc=2" target="ej_ejc" class="ec_ejc_thkbx" onClick="javascript:return EJEJC_lc(this);"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/checkout-button.gif" border="0" alt="View Cart"/></a></li>';
	}
?>
	  </ul>
	  </div>
	</div>
  </div>
  <div class="metabox-holder">
	<div class="postbox">
	  <h3>
		<?php _e('Groupon Integration Module','event_espresso'); ?>
	  </h3>
	  <div class="inside">
	  <ul>
	  <li>Did your site get featured on <a href="http://www.groupon.com/" target="_blank">Groupon.com</a>? Now you can easily accept Groupon codes to your events! Once installed, just upload all of your Groupon codes to the database and your ready to go. How easy is that?</li>
		<li><strong><?php _e('About Groupon','event_espresso'); ?></strong><a href="http://www.groupon.com/" target="_blank"><img style="padding:0 10px;" align="right" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/groupon_logo.png" width="149" height="70" alt="GROUPON" /></a></li>
		<li><a href="http://www.groupon.com/" target="_blank">Groupon</a> is a deal-of-the-day website that is localized to major markets in the United States. The first market for Groupon was Chicago, followed soon thereafter by Boston and New York City. As of January 2010, Groupon serves more than 40 markets. Groupon debuted in November 2008 as part of The Point, a platform for collective action.</li>

		<?php
	if (function_exists('event_espresso_groupon_config_mnu')){
		echo '<li>';
		echo '<strong style="padding:5px;" class="green_alert">' . __('Installed','event_espresso') . '</strong>';
		echo '</li>';
	}else{
		echo '<li><a href="https://www.e-junkie.com/ecom/gb.php?c=cart&i=ESPRESSO-GROUPON&cl=113214&ejc=2" target="ej_ejc" class="ec_ejc_thkbx" onClick="javascript:return EJEJC_lc(this);"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/add-to-cart.gif" border="0" alt="Add to Cart"/></a> <a href="https://www.e-junkie.com/ecom/gb.php?c=cart&cl=113214&ejc=2" target="ej_ejc" class="ec_ejc_thkbx" onClick="javascript:return EJEJC_lc(this);"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/checkout-button.gif" border="0" alt="View Cart"/></a></li>';
	}
?>
	  </ul>
	  </div>
	</div>
  </div>
  <div class="metabox-holder">
	<div class="postbox">

	  <h3>
		<?php _e('Members Integration Module','event_espresso'); ?>
	  </h3><div class="inside">
	  <ul>
		<?php
		echo '<li>The "Member Integration Module" allows you to take full advantage of the WordPress user system. </li>';
		echo '<li><p><strong>Member Pricing</strong><br />Allows you to override event prices when your members are logged in. <a class="ev_reg_event_info" href="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/member-setup-screen.jpg">Sample Screen</a></p></li>';
		echo '<li><p><strong>Member Profiles</strong><br />Members can store personal information into the WordPress databse allowing your members to quickly register for events by auto-filling in the personal information on the event registration form. Your users can also view past events, pay for events, and cancel registrations to current events.  <a class="ev_reg_event_info" href="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/member-event-management-scr.jpg">My Events Screen</a> | <a class="ev_reg_event_info" href="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/events-profile-screen.jpg">Profile Screen</a></p></li>';
		echo '<li><p><strong>Roles and Capabilites</strong><br />If you are already using the "<a href="http://wordpress.org/extend/plugins/members/" target="_blank">Members</a>" plugin by <a href="Justin Tadlock" target="_blank">Justin Tadlock</a>. Your custom roles will be stored as well. With a little customization, you will be able to display events by user role, membership level, etc.</p></li>';
	if (function_exists('event_espresso_member_only_pricing')){
		echo '<li>';
		echo '<strong style="padding:5px;" class="green_alert">' . __('Installed','event_espresso') . '</strong>';

		echo '</li>';
	}else{
		echo '<li><a href="https://www.e-junkie.com/ecom/gb.php?c=cart&i=ESPRESSO-MEM-ADDON&cl=113214&ejc=2" target="ej_ejc" class="ec_ejc_thkbx" onClick="javascript:return EJEJC_lc(this);"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/add-to-cart.gif" border="0" alt="Add to Cart"/></a> <a href="https://www.e-junkie.com/ecom/gb.php?c=cart&cl=113214&ejc=2" target="ej_ejc" class="ec_ejc_thkbx" onClick="javascript:return EJEJC_lc(this);"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/checkout-button.gif" border="0" alt="View Cart"/></a></li>';
	}
?>
	  </ul>
	  </div>
	</div>
  </div>

  <div class="metabox-holder">
	<div class="postbox">
	  <h3>
		<?php _e('Custom Files','event_espresso'); ?>
	  </h3>
	  <div class="inside">
	  <ul>
	  <li><?php _e('These files offer support for custom templates, functions, and shortcodes. Virtually allowing you to customize the plugin to your needs and making your custom changes future proof.','event_espresso'); ?></li>
	 <?php  if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "custom_includes.php") || file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "custom_functions.php") || file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "custom_shortcodes.php")){?>
				<?php if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "custom_includes.php")){ ?><li><strong style="color:#090">custom_includes.php <?php _e(' - Installed','event_espresso'); ?></strong></li><?php }else{?><li><strong style="color:#F00">custom_includes.php <?php _e(' - Not Installed','event_espresso'); ?></strong></li><?php }?>
			   <?php if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "custom_functions.php")){ ?><li><strong style="color:#090">custom_functions.php <?php _e(' - Installed','event_espresso'); ?></strong></li><?php }else{?><li><strong style="color:#F00">custom_functions.php <?php _e(' - Not Installed','event_espresso'); ?></strong></li><?php }?>
				<?php if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "custom_shortcodes.php")){ ?><li><strong style="color:#090">custom_shortcodes.php <?php _e(' - Installed','event_espresso'); ?></strong></li><?php }else{?><li><strong style="color:#F00">custom_shortcodes.php <?php _e(' - Not Installed','event_espresso'); ?></strong></li><?php }?>
		<?php }else{
			echo '<li><a href="https://www.e-junkie.com/ecom/gb.php?c=cart&i=AERPRO-CF-ADDON&cl=113214&ejc=2" target="ej_ejc" class="ec_ejc_thkbx" onClick="javascript:return EJEJC_lc(this);"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/add-to-cart.gif" border="0" alt="Add to Cart"/></a> <a href="https://www.e-junkie.com/ecom/gb.php?c=cart&cl=113214&ejc=2" target="ej_ejc" class="ec_ejc_thkbx" onClick="javascript:return EJEJC_lc(this);"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/checkout-button.gif" border="0" alt="View Cart"/></a></li>'; }?>
	  </ul>
	  </div>
	</div>
  </div>
</div>
</div>
</div>
</div>

<script language="javascript" type="text/javascript">
<!--
function EJEJC_lc(th) { return false; }
// -->
</script>
<script src='http://www.e-junkie.com/ecom/box.js' type='text/javascript'></script>
<?php
}