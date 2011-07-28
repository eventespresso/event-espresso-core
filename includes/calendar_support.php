<?php
//Build the header for the plugin
function event_espresso_calendar_support(){ 
//Check if the Calendar plugin by Kieran O'Shea (http://www.kieranoshea.com) is active	
$using_calendar_db = is_plugin_active('calendar/calendar.php') ? 'Y' : 'N';
define("USING_CALENDAR_DB", $using_calendar_db );
}