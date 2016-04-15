# EE Model Objects and Custom Post Types

## Using WP_Query

In Event Espresso 4 (EE4), events, venues, and even attendees are Custom Post Types (although the latter is, by default, a non-publicly-queryable one). This means you can of course use normal [WP_Query](https://codex.wordpress.org/Class_Reference/WP_Query) functions to query for them and will receive normal post data. However, you may also want to utilize some of the EE4 model objects' functions (eg, easily getting an event's datetimes using the EE_Event's datetimes() function), and access the corresponding EE4 model object. We simplified that by automatically attaching the corresponding EE4 object to the post variable returned from WP_Query queries when you specify the post type.

Example:

a wp query like the following:

```php
$posts = get_posts(array('post_type'=>'espresso_events','suppress_filters'=>false));
var_dump($posts);
```

You will notice that attached to each WP_Post result, there is a bunch of extra Event Espresso data (from the wp_esp_event_meta table), and an EE_Event object:

```php
array (size=1)
  0 => 
    object(WP_Post)[113]
      public 'ID' => int 55
      public 'post_author' => string '1' (length=1)
      public 'post_date' => string '2014-04-03 22:50:45' (length=19)
      public 'post_date_gmt' => string '2014-04-03 22:50:45' (length=19)
      public 'post_content' => string '' (length=0)
      public 'post_title' => string 'power moneky' (length=12)
      public 'post_excerpt' => string '' (length=0)
      public 'post_status' => string 'publish' (length=7)
      public 'comment_status' => string 'open' (length=4)
      public 'ping_status' => string 'open' (length=4)
      public 'post_password' => string '' (length=0)
      public 'post_name' => string 'power-moneky' (length=12)
      public 'to_ping' => string '' (length=0)
      public 'pinged' => string '' (length=0)
      public 'post_modified' => string '2014-04-10 23:11:21' (length=19)
      public 'post_modified_gmt' => string '2014-04-10 23:11:21' (length=19)
      public 'post_content_filtered' => string '' (length=0)
      public 'post_parent' => int 0
      public 'guid' => string 'http://localhost/Wordpress2/?post_type=espresso_events&#038;p=55' (length=64)
      public 'menu_order' => int 0
      public 'post_type' => string 'espresso_events' (length=15)
      public 'post_mime_type' => string '' (length=0)
      public 'comment_count' => string '0' (length=1)
      public 'filter' => string 'raw' (length=3)
      public 'DTT_ID' => string '1' (length=1)
      public 'EVT_ID' => string '55' (length=2)
      public 'DTT_name' => string '' (length=0)
      public 'DTT_description' => string '' (length=0)
      public 'DTT_EVT_start' => string '2014-05-03 08:00:00' (length=19)
      public 'DTT_EVT_end' => string '2014-05-03 17:00:00' (length=19)
      public 'DTT_reg_limit' => string '-1' (length=2)
      public 'DTT_sold' => string '14' (length=2)
      public 'DTT_is_primary' => string '0' (length=1)
      public 'DTT_order' => string '1' (length=1)
      public 'DTT_parent' => string '0' (length=1)
      public 'DTT_deleted' => string '0' (length=1)
      public 'EVTM_ID' => string '1' (length=1)
      public 'EVT_display_desc' => string '0' (length=1)
      public 'EVT_display_ticket_selector' => string '1' (length=1)
      public 'EVT_visible_on' => string '2014-04-03 22:50:45' (length=19)
      public 'EVT_default_registration_status' => string 'RPP' (length=3)
      public 'EVT_phone' => string '' (length=0)
      public 'EVT_additional_limit' => string '10' (length=2)
      public 'EVT_member_only' => string '0' (length=1)
      public 'EVT_allow_overflow' => string '0' (length=1)
      public 'EVT_timezone_string' => string '' (length=0)
      public 'EVT_external_URL' => string '' (length=0)
      public 'EVT_donations' => string '0' (length=1)
      public 'EE_Event' => 
        object(EE_Event)[111]
          protected '_Registration' => null
          protected '_Datetime' => null
          protected '_Primary_Datetime' => null
          protected '_Question_Group' => null
          protected '_Venue' => null
          protected '_Term_Taxonomy' => null
          protected '_Promotion_Object' => null
          protected '_Message_Template_Group' => null
          protected '_EVT_ID' => int 55
          protected '_EVT_name' => string 'power moneky' (length=12)
          protected '_EVT_desc' => string '' (length=0)
          protected '_EVT_slug' => string 'power-moneky' (length=12)
          protected '_EVT_created' => int 1396565445
          protected '_EVT_short_desc' => string '' (length=0)
          protected '_EVT_modified' => int 1397171481
          protected '_EVT_wp_user' => int 1
          protected '_EVT_order' => int 0
          protected '_EVT_display_desc' => int 0
          protected '_EVT_display_ticket_selector' => int 1
          protected '_EVT_visible_on' => int 1396565445
          protected '_EVT_additional_limit' => int 10
          protected '_EVT_member_only' => int 0
          protected '_EVT_phone' => string '' (length=0)
          protected '_EVT_allow_overflow' => int 0
          protected '_EVT_timezone_string' => string '' (length=0)
          protected '_EVT_external_URL' => string '' (length=0)
          protected '_EVT_donations' => int 0
          protected '_EVT_default_registration_status' => string 'RPP' (length=3)
          protected '_feature_image' => 
            array (size=0)
              ...
          protected '_post_type' => string '' (length=0)
          protected '_parent' => int 0
          protected '_status' => string 'publish' (length=7)
          private '_props_n_values_provided_in_constructor' (EE_Base_Class) => 
            array (size=22)
              ...
          protected '_timezone' => string 'Africa/Abidjan' (length=14)
          protected '_dt_frmt' => string 'F j, Y' (length=6)
          protected '_tm_frmt' => string 'g:i a' (length=5)
          protected '_cached_properties' => 
            array (size=0)
              ...
          protected '_Extra_Meta' => null
```

So if you wanted to utilize that EE_Event object, you could use code like the following

```php
$posts = get_posts(array('post_type'=>'espresso_events','suppress_filters'=>false));
		foreach($posts as $post){
			$event_obj = $post->EE_Event;
			$link = $event_obj->get_permalink();
			echo "<a href='$link'>{$event_obj->name()}</a>";
			$datetimes = $event_obj->datetimes_ordered();
			echo "has ".count($datetimes)." datetimes";
		}
```

-----

#### Related

- [Using EE4 Model Objects](using-ee4-model-objects.md)
- [EE_Event](https://github.com/eventespresso/event-espresso-core/blob/master/core/db_classes/EE_Event.class.php)