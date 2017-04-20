###Third Party Shortcodes
If you create a shortcode and would like the documentation for it to appear under the:
**Espresso Espresso Admin** > **Help & Support** > **Shortcodes** tab
then you can do so by adding the following two hooks to your shortcode as well as a template file for the actual content.

First we need to hook into the support page to specify the name for the metabox that will hold our shortcode's documentation:

```php
add_filter('FHEE__Support_Admin_Page___shortcodes_boxes__boxes_array', 'my_addon_shortcode_settings_box');
function my_addon_shortcode_settings_box($shortcode_boxes) {
    $shortcode_boxes['my_addon'] = esc_html__('My Addon Shortcode', 'my_addon_text_domain');
    return $shortcode_boxes;
}
```

and then hook into the callback that builds the metaboxes to provide the path to our documentation template file:

```php
add_filter('FHEE__Support_Admin_Page___add_settings_metabox__my_addon_args_array', 'my_addon_args_array');
function my_addon_args_array(array $args) {
    $args['template_path'] = plugin_dir_path(__FILE__) . 'my_addon_shortcode_settings_box.template.php';
    $args['template_args'] = array();
    return $args;
}
```

then in your 'my_addon_shortcode_settings_box.template.php' file, simply provide the details regarding the shortcode usage, such as what arguments can be used:

```html
<h3>My Addon Shortcode</h3>
<h4>Basic Usage</h4>
<p>Simply add `[MY_ADDON]` to your post content.</p>
<h4>My Addon Shortcode - Arguments</h4>
<ul>
    <li>
        <p>
            <b>Argument 1</b> : `[MY_ADDON arg1=123]`<br />
            This will do something different depending on the value passed.
        </p>
        
    </li>
</ul>
```