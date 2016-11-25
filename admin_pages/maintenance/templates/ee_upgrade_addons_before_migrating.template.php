<?php

?>
<h1><?php esc_html_e("You must upgrade your Event Espresso Add-ons before Migrating", "event_espresso");?></h1>
<p><?php printf(esc_html__("Please %s visit the plugins page%s and update all Event Espresso addon plugins before updating your database.", "event_espresso"), "<a href='".admin_url('/plugins.php')."'>","</a>");?></p>
<p><?php esc_html_e("You can also deactivate the addons, but all of their data will be lost when your database is migrated", "event_espresso");?></p>