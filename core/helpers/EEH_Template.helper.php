<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}
/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 *
 * @package           Event Espresso
 * @author            Event Espresso
 * @copyright      (c)2009-2012 Event Espresso All Rights Reserved.
 * @license           http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link              http://www.eventespresso.com
 * @version           4.0
 */


if ( ! function_exists('espresso_get_template_part')) {
    /**
     * espresso_get_template_part
     * basically a copy of the WordPress get_template_part() function but uses EEH_Template::locate_template() instead, and doesn't add base versions of files
     * so not a very useful function at all except that it adds familiarity PLUS filtering based off of the entire template part name
     *
     * @param string $slug The slug name for the generic template.
     * @param string $name The name of the specialised template.
     * @return string        the html output for the formatted money value
     */
    function espresso_get_template_part($slug = null, $name = null)
    {
        EEH_Template::get_template_part($slug, $name);
    }
}


if ( ! function_exists('espresso_get_object_css_class')) {
    /**
     * espresso_get_object_css_class - attempts to generate a css class based on the type of EE object passed
     *
     * @param EE_Base_Class $object the EE object the css class is being generated for
     * @param  string       $prefix added to the beginning of the generated class
     * @param  string       $suffix added to the end of the generated class
     * @return string
     */
    function espresso_get_object_css_class($object = null, $prefix = '', $suffix = '')
    {
        return EEH_Template::get_object_css_class($object, $prefix, $suffix);
    }
}


/**
 * class EEH_Template
 * This is a helper utility class that provides different helpers related to template files.
 *
 * @package           Event Espresso
 * @subpackage        /helpers/EEH_Template.helper.php
 * @author            Darren Ethier, Brent Christensen
 */
class EEH_Template
{

    private static $_espresso_themes = array();


    /**
     *    is_espresso_theme - returns TRUE or FALSE on whether the currently active WP theme is an espresso theme
     *
     * @return boolean
     */
    public static function is_espresso_theme()
    {
        return wp_get_theme()->get('TextDomain') == 'event_espresso' ? true : false;
    }

    /**
     *    load_espresso_theme_functions - if current theme is an espresso theme, or uses ee theme template parts, then
     *    load it's functions.php file ( if not already loaded )
     *
     * @return void
     */
    public static function load_espresso_theme_functions()
    {
        if ( ! defined('EE_THEME_FUNCTIONS_LOADED')) {
            if (is_readable(EE_PUBLIC . EE_Config::get_current_theme() . DS . 'functions.php')) {
                require_once(EE_PUBLIC . EE_Config::get_current_theme() . DS . 'functions.php');
            }
        }
    }


    /**
     *    get_espresso_themes - returns an array of Espresso Child themes located in the /templates/ directory
     *
     * @return array
     */
    public static function get_espresso_themes()
    {
        if (empty(EEH_Template::$_espresso_themes)) {
            $espresso_themes = glob(EE_PUBLIC . '*', GLOB_ONLYDIR);
            if (empty($espresso_themes)) {
                return array();
            }
            if (($key = array_search('global_assets', $espresso_themes)) !== false) {
                unset($espresso_themes[$key]);
            }
            EEH_Template::$_espresso_themes = array();
            foreach ($espresso_themes as $espresso_theme) {
                EEH_Template::$_espresso_themes[basename($espresso_theme)] = $espresso_theme;
            }
        }
        return EEH_Template::$_espresso_themes;
    }


    /**
     * EEH_Template::get_template_part
     * basically a copy of the WordPress get_template_part() function but uses EEH_Template::locate_template() instead,
     * and doesn't add base versions of files so not a very useful function at all except that it adds familiarity PLUS
     * filtering based off of the entire template part name
     *
     * @param string $slug The slug name for the generic template.
     * @param string $name The name of the specialised template.
     * @param array  $template_args
     * @param bool   $return_string
     * @return string        the html output for the formatted money value
     */
    public static function get_template_part(
        $slug = null,
        $name = null,
        $template_args = array(),
        $return_string = false
    ) {
        do_action("get_template_part_{$slug}-{$name}", $slug, $name);
        $templates = array();
        $name      = (string)$name;
        if ($name != '') {
            $templates[] = "{$slug}-{$name}.php";
        }
        // allow template parts to be turned off via something like: add_filter( 'FHEE__content_espresso_events_tickets_template__display_datetimes', '__return_false' );
        if (apply_filters("FHEE__EEH_Template__get_template_part__display__{$slug}_{$name}", true)) {
            EEH_Template::locate_template($templates, $template_args, true, $return_string);
        }
    }


    /**
     *    locate_template
     *    locate a template file by looking in the following places, in the following order:
     *        <server path up to>/wp-content/themes/<current active WordPress theme>/
     *        <assumed full absolute server path>
     *        <server path up to>/wp-content/uploads/espresso/templates/<current EE theme>/
     *        <server path up to>/wp-content/uploads/espresso/templates/
     *        <server path up to>/wp-content/plugins/<EE4 folder>/public/<current EE theme>/
     *        <server path up to>/wp-content/plugins/<EE4 folder>/core/templates/<current EE theme>/
     *        <server path up to>/wp-content/plugins/<EE4 folder>/
     *    as soon as the template is found in one of these locations, it will be returned or loaded
     *        Example:
     *          You are using the WordPress Twenty Sixteen theme,
     *        and you want to customize the "some-event.template.php" template,
     *          which is located in the "/relative/path/to/" folder relative to the main EE plugin folder.
     *          Assuming WP is installed on your server in the "/home/public_html/" folder,
     *        EEH_Template::locate_template() will look at the following paths in order until the template is found:
     *        /home/public_html/wp-content/themes/twentysixteen/some-event.template.php
     *        /relative/path/to/some-event.template.php
     *        /home/public_html/wp-content/uploads/espresso/templates/Espresso_Arabica_2014/relative/path/to/some-event.template.php
     *        /home/public_html/wp-content/uploads/espresso/templates/relative/path/to/some-event.template.php
     *        /home/public_html/wp-content/plugins/event-espresso-core-reg/public/Espresso_Arabica_2014/relative/path/to/some-event.template.php
     *        /home/public_html/wp-content/plugins/event-espresso-core-reg/core/templates/Espresso_Arabica_2014/relative/path/to/some-event.template.php
     *        /home/public_html/wp-content/plugins/event-espresso-core-reg/relative/path/to/some-event.template.php
     *          Had you passed an absolute path to your template that was in some other location,
     *        ie: "/absolute/path/to/some-event.template.php"
     *          then the search would have been :
     *        /home/public_html/wp-content/themes/twentysixteen/some-event.template.php
     *        /absolute/path/to/some-event.template.php
     *          and stopped there upon finding it in the second location
     *
     * @param array|string $templates       array of template file names including extension (or just a single string)
     * @param  array       $template_args   an array of arguments to be extracted for use in the template
     * @param  boolean     $load            whether to pass the located template path on to the
     *                                      EEH_Template::display_template() method or simply return it
     * @param  boolean     $return_string   whether to send output immediately to screen, or capture and return as a
     *                                      string
     * @param boolean      $check_if_custom If TRUE, this flags this method to return boolean for whether this will
     *                                      generate a custom template or not. Used in places where you don't actually
     *                                      load the template, you just want to know if there's a custom version of it.
     * @return mixed
     */
    public static function locate_template(
        $templates = array(),
        $template_args = array(),
        $load = true,
        $return_string = true,
        $check_if_custom = false
    ) {
        // first use WP locate_template to check for template in the current theme folder
        $template_path = locate_template($templates);

        if ($check_if_custom && ! empty($template_path)) {
            return true;
        }

        // not in the theme
        if (empty($template_path)) {
            // not even a template to look for ?
            if (empty($templates)) {
                // get post_type
                $post_type = EE_Registry::instance()->REQ->get('post_type');
                // get array of EE Custom Post Types
                $EE_CPTs = EE_Register_CPTs::get_CPTs();
                // build template name based on request
                if (isset($EE_CPTs[$post_type])) {
                    $archive_or_single = is_archive() ? 'archive' : '';
                    $archive_or_single = is_single() ? 'single' : $archive_or_single;
                    $templates         = $archive_or_single . '-' . $post_type . '.php';
                }
            }
            // currently active EE template theme
            $current_theme = EE_Config::get_current_theme();

            // array of paths to folders that may contain templates
            $template_folder_paths = array(
                // first check the /wp-content/uploads/espresso/templates/(current EE theme)/  folder for an EE theme template file
                EVENT_ESPRESSO_TEMPLATE_DIR . $current_theme,
                // then in the root of the /wp-content/uploads/espresso/templates/ folder
                EVENT_ESPRESSO_TEMPLATE_DIR,
            );

            //add core plugin folders for checking only if we're not $check_if_custom
            if ( ! $check_if_custom) {
                $core_paths            = array(
                    // in the  /wp-content/plugins/(EE4 folder)/public/(current EE theme)/ folder within the plugin
                    EE_PUBLIC . $current_theme,
                    // in the  /wp-content/plugins/(EE4 folder)/core/templates/(current EE theme)/ folder within the plugin
                    EE_TEMPLATES . $current_theme,
                    // or maybe relative from the plugin root: /wp-content/plugins/(EE4 folder)/
                    EE_PLUGIN_DIR_PATH,
                );
                $template_folder_paths = array_merge($template_folder_paths, $core_paths);
            }

            // now filter that array
            $template_folder_paths = apply_filters('FHEE__EEH_Template__locate_template__template_folder_paths',
                $template_folder_paths);
            $templates             = is_array($templates) ? $templates : array($templates);
            $template_folder_paths = is_array($template_folder_paths) ? $template_folder_paths : array($template_folder_paths);
            // array to hold all possible template paths
            $full_template_paths = array();

            // loop through $templates
            foreach ($templates as $template) {
                // normalize directory separators
                $template                      = EEH_File::standardise_directory_separators($template);
                $file_name                     = basename($template);
                $template_path_minus_file_name = substr($template, 0, (strlen($file_name) * -1));
                // while looping through all template folder paths
                foreach ($template_folder_paths as $template_folder_path) {
                    // normalize directory separators
                    $template_folder_path = EEH_File::standardise_directory_separators($template_folder_path);
                    // determine if any common base path exists between the two paths
                    $common_base_path = EEH_Template::_find_common_base_path(
                        array($template_folder_path, $template_path_minus_file_name)
                    );
                    if ($common_base_path !== '') {
                        // both paths have a common base, so just tack the filename onto our search path
                        $resolved_path = EEH_File::end_with_directory_separator($template_folder_path) . $file_name;
                    } else {
                        // no common base path, so let's just concatenate
                        $resolved_path = EEH_File::end_with_directory_separator($template_folder_path) . $template;
                    }
                    // build up our template locations array by adding our resolved paths
                    $full_template_paths[] = $resolved_path;
                }
                // if $template is an absolute path, then we'll tack it onto the start of our array so that it gets searched first
                array_unshift($full_template_paths, $template);
                // path to the directory of the current theme: /wp-content/themes/(current WP theme)/
                array_unshift($full_template_paths, get_stylesheet_directory() . DS . $file_name);
            }
            // filter final array of full template paths
            $full_template_paths = apply_filters('FHEE__EEH_Template__locate_template__full_template_paths',
                $full_template_paths, $file_name);
            // now loop through our final array of template location paths and check each location
            foreach ((array)$full_template_paths as $full_template_path) {
                if (is_readable($full_template_path)) {
                    $template_path = str_replace(array('\\', '/'), DIRECTORY_SEPARATOR, $full_template_path);
                    break;
                }
            }
        }

        // hook that can be used to display the full template path that will be used
        do_action('AHEE__EEH_Template__locate_template__full_template_path', $template_path);

        // if we got it and you want to see it...
        if ($template_path && $load && ! $check_if_custom) {
            if ($return_string) {
                return EEH_Template::display_template($template_path, $template_args, true);
            } else {
                EEH_Template::display_template($template_path, $template_args, false);
            }
        }
        return $check_if_custom && ! empty($template_path) ? true : $template_path;
    }


    /**
     * _find_common_base_path
     * given two paths, this determines if there is a common base path between the two
     *
     * @param array $paths
     * @return string
     */
    protected static function _find_common_base_path($paths)
    {
        $last_offset      = 0;
        $common_base_path = '';
        while (($index = strpos($paths[0], DS, $last_offset)) !== false) {
            $dir_length = $index - $last_offset + 1;
            $directory  = substr($paths[0], $last_offset, $dir_length);
            foreach ($paths as $path) {
                if (substr($path, $last_offset, $dir_length) != $directory) {
                    return $common_base_path;
                }
            }
            $common_base_path .= $directory;
            $last_offset = $index + 1;
        }
        return substr($common_base_path, 0, -1);
    }


    /**
     * load and display a template
     *
     * @param bool|string $template_path server path to the file to be loaded, including file name and extension
     * @param  array      $template_args an array of arguments to be extracted for use in the template
     * @param  boolean    $return_string whether to send output immediately to screen, or capture and return as a string
     * @param bool        $throw_exceptions if set to true, will throw an exception if the template is either
     *                                      not found or is not readable
     * @return mixed string
     * @throws \DomainException
     */
	public static function display_template(
        $template_path    = false,
        $template_args    = array(),
        $return_string    = false,
        $throw_exceptions = false
    ) {

        /**
         * These two filters are intended for last minute changes to templates being loaded and/or template arg
         * modifications.  NOTE... modifying these things can cause breakage as most templates running through
         * the display_template method are templates we DON'T want modified (usually because of js
         * dependencies etc).  So unless you know what you are doing, do NOT filter templates or template args
         * using this.
         *
         * @since 4.6.0
         */
        $template_path = (string) apply_filters('FHEE__EEH_Template__display_template__template_path', $template_path);
        $template_args = (array) apply_filters('FHEE__EEH_Template__display_template__template_args', $template_args);

        // you gimme nuttin - YOU GET NUTTIN !!
        if ( ! $template_path || ! is_readable($template_path)) {
            return '';
        }
        // if $template_args are not in an array, then make it so
        if ( ! is_array($template_args) && ! is_object($template_args)) {
            $template_args = array($template_args);
        }
        extract( $template_args, EXTR_SKIP );
        // ignore whether template is accessible ?
        if ( $throw_exceptions && ! is_readable( $template_path ) ) {
            throw new \DomainException(
                    esc_html__(
                            'Invalid, unreadable, or missing file.',
                            'event_espresso'
                    )
            );
        }


        if ($return_string) {
            // because we want to return a string, we are going to capture the output
            ob_start();
            include($template_path);
            return ob_get_clean();
        } else {
            include($template_path);
        }
        return '';
    }


    /**
     * get_object_css_class - attempts to generate a css class based on the type of EE object passed
     *
     * @param EE_Base_Class $object the EE object the css class is being generated for
     * @param  string       $prefix added to the beginning of the generated class
     * @param  string       $suffix added to the end of the generated class
     * @return string
     */
    public static function get_object_css_class($object = null, $prefix = '', $suffix = '')
    {
        // in the beginning...
        $prefix = ! empty($prefix) ? rtrim($prefix, '-') . '-' : '';
        // da muddle
        $class = '';
        // the end
        $suffix = ! empty($suffix) ? '-' . ltrim($suffix, '-') : '';
        // is the passed object an EE object ?
        if ($object instanceof EE_Base_Class) {
            // grab the exact type of object
            $obj_class = get_class($object);
            // depending on the type of object...
            switch ($obj_class) {
                // no specifics just yet...
                default :
                    $class = strtolower(str_replace('_', '-', $obj_class));
                    $class .= method_exists($obj_class, 'name') ? '-' . sanitize_title($object->name()) : '';

            }
        }
        return $prefix . $class . $suffix;
    }



    /**
     * EEH_Template::format_currency
     * This helper takes a raw float value and formats it according to the default config country currency settings, or
     * the country currency settings from the supplied country ISO code
     *
     * @param  float   $amount       raw money value
     * @param  boolean $return_raw   whether to return the formatted float value only with no currency sign or code
     * @param  boolean $display_code whether to display the country code (USD). Default = TRUE
     * @param string   $CNT_ISO      2 letter ISO code for a country
     * @param string   $cur_code_span_class
     * @return string        the html output for the formatted money value
     * @throws \EE_Error
     */
    public static function format_currency(
        $amount = null,
        $return_raw = false,
        $display_code = true,
        $CNT_ISO = '',
        $cur_code_span_class = 'currency-code'
    ) {
        // ensure amount was received
        if ($amount === null) {
            $msg = __('In order to format currency, an amount needs to be passed.', 'event_espresso');
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return '';
        }
        //ensure amount is float
        $amount  = apply_filters('FHEE__EEH_Template__format_currency__raw_amount', (float)$amount);
        $CNT_ISO = apply_filters('FHEE__EEH_Template__format_currency__CNT_ISO', $CNT_ISO, $amount);
        // filter raw amount (allows 0.00 to be changed to "free" for example)
        $amount_formatted = apply_filters('FHEE__EEH_Template__format_currency__amount', $amount, $return_raw);
        // still a number or was amount converted to a string like "free" ?
        if (is_float($amount_formatted)) {
            // was a country ISO code passed ? if so generate currency config object for that country
            $mny = $CNT_ISO !== '' ? new EE_Currency_Config($CNT_ISO) : null;
            // verify results
            if ( ! $mny instanceof EE_Currency_Config) {
                // set default config country currency settings
                $mny = EE_Registry::instance()->CFG->currency instanceof EE_Currency_Config
                    ? EE_Registry::instance()->CFG->currency
                    : new EE_Currency_Config();
            }
            // format float
            $amount_formatted = number_format($amount, $mny->dec_plc, $mny->dec_mrk, $mny->thsnds);
            // add formatting ?
            if ( ! $return_raw) {
                // add currency sign
                if ($mny->sign_b4) {
                    if ($amount >= 0) {
                        $amount_formatted = $mny->sign . $amount_formatted;
                    } else {
                        $amount_formatted = '-' . $mny->sign . str_replace('-', '', $amount_formatted);
                    }

                } else {
                    $amount_formatted = $amount_formatted . $mny->sign;
                }

                // filter to allow global setting of display_code
                $display_code = apply_filters('FHEE__EEH_Template__format_currency__display_code', $display_code);

                // add currency code ?
                $amount_formatted = $display_code ? $amount_formatted . ' <span class="' . $cur_code_span_class . '">(' . $mny->code . ')</span>' : $amount_formatted;
            }
            // filter results
            $amount_formatted = apply_filters('FHEE__EEH_Template__format_currency__amount_formatted',
                $amount_formatted, $mny, $return_raw);
        }
        // clean up vars
        unset($mny);
        // return formatted currency amount
        return $amount_formatted;
    }


    /**
     * This function is used for outputting the localized label for a given status id in the schema requested (and
     * possibly plural).  The intended use of this function is only for cases where wanting a label outside of a
     * related status model or model object (i.e. in documentation etc.)
     *
     * @param  string  $status_id Status ID matching a registered status in the esp_status table.  If there is no
     *                            match, then 'Unknown' will be returned.
     * @param  boolean $plural    Whether to return plural or not
     * @param  string  $schema    'UPPER', 'lower', or 'Sentence'
     * @return string             The localized label for the status id.
     */
    public static function pretty_status($status_id, $plural = false, $schema = 'upper')
    {
        /** @type EEM_Status $EEM_Status */
        $EEM_Status = EE_Registry::instance()->load_model('Status');
        $status     = $EEM_Status->localized_status(array($status_id => __('unknown', 'event_espresso')), $plural,
            $schema);
        return $status[$status_id];
    }


    /**
     * This helper just returns a button or link for the given parameters
     *
     * @param  string $url   the url for the link
     * @param  string $label What is the label you want displayed for the button
     * @param  string $class what class is used for the button (defaults to 'button-primary')
     * @param string  $icon
     * @param string  $title
     * @return string the html output for the button
     */
    public static function get_button_or_link($url, $label, $class = 'button-primary', $icon = '', $title = '')
    {
        $icon_html = '';
        if ( ! empty($icon)) {
            $dashicons = preg_split("(ee-icon |dashicons )", $icon);
            $dashicons = array_filter($dashicons);
            $count     = count($dashicons);
            $icon_html .= $count > 1 ? '<span class="ee-composite-dashicon">' : '';
            foreach ($dashicons as $dashicon) {
                $type = strpos($dashicon, 'ee-icon') !== false ? 'ee-icon ' : 'dashicons ';
                $icon_html .= '<span class="' . $type . $dashicon . '"></span>';
            }
            $icon_html .= $count > 1 ? '</span>' : '';
        }
        $label  = ! empty($icon) ? $icon_html . $label : $label;
        $button = '<a id="' . sanitize_title_with_dashes($label) . '" href="' . $url . '" class="' . $class . '" title="' . $title . '">' . $label . '</a>';
        return $button;
    }


    /**
     * This returns a generated link that will load the related help tab on admin pages.
     *
     * @param  string     $help_tab_id the id for the connected help tab
     * @param bool|string $page        The page identifier for the page the help tab is on
     * @param bool|string $action      The action (route) for the admin page the help tab is on.
     * @param bool|string $icon_style  (optional) include css class for the style you want to use for the help icon.
     * @param bool|string $help_text   (optional) send help text you want to use for the link if default not to be used
     * @return string              generated link
     */
    public static function get_help_tab_link(
        $help_tab_id,
        $page = false,
        $action = false,
        $icon_style = false,
        $help_text = false
    ) {

        if ( ! $page) {
            $page = isset($_REQUEST['page']) && ! empty($_REQUEST['page']) ? sanitize_key($_REQUEST['page']) : $page;
        }

        if ( ! $action) {
            $action = isset($_REQUEST['action']) && ! empty($_REQUEST['action']) ? sanitize_key($_REQUEST['action']) : $action;
        }

        $action = empty($action) ? 'default' : $action;


        $help_tab_lnk = $page . '-' . $action . '-' . $help_tab_id;
        $icon         = ! $icon_style ? ' dashicons-editor-help' : $icon_style;
        $help_text    = ! $help_text ? '' : $help_text;
        return '<a id="' . $help_tab_lnk . '" class="ee-clickable dashicons espresso-help-tab-lnk ee-icon-size-22' . $icon . '" title="' . esc_attr__('Click to open the \'Help\' tab for more information about this feature.',
                'event_espresso') . '" > ' . $help_text . ' </a>';
    }


    /**
     * This helper generates the html structure for the jquery joyride plugin with the given params.
     *
     * @link http://zurb.com/playground/jquery-joyride-feature-tour-plugin
     * @see  EE_Admin_Page->_stop_callback() for the construct expected for the $stops param.
     * @param EE_Help_Tour
     * @return string         html
     */
    public static function help_tour_stops_generator(EE_Help_Tour $tour)
    {
        $id    = $tour->get_slug();
        $stops = $tour->get_stops();

        $content = '<ol style="display:none" id="' . $id . '">';

        foreach ($stops as $stop) {
            $data_id    = ! empty($stop['id']) ? ' data-id="' . $stop['id'] . '"' : '';
            $data_class = empty($data_id) && ! empty($stop['class']) ? ' data-class="' . $stop['class'] . '"' : '';

            //if container is set to modal then let's make sure we set the options accordingly
            if (empty($data_id) && empty($data_class)) {
                $stop['options']['modal']  = true;
                $stop['options']['expose'] = true;
            }

            $custom_class  = ! empty($stop['custom_class']) ? ' class="' . $stop['custom_class'] . '"' : '';
            $button_text   = ! empty($stop['button_text']) ? ' data-button="' . $stop['button_text'] . '"' : '';
            $inner_content = isset($stop['content']) ? $stop['content'] : '';

            //options
            if (isset($stop['options']) && is_array($stop['options'])) {
                $options = ' data-options="';
                foreach ($stop['options'] as $option => $value) {
                    $options .= $option . ':' . $value . ';';
                }
                $options .= '"';
            } else {
                $options = '';
            }

            //let's put all together
            $content .= '<li' . $data_id . $data_class . $custom_class . $button_text . $options . '>' . $inner_content . '</li>';
        }

        $content .= '</ol>';
        return $content;
    }


    /**
     * This is a helper method to generate a status legend for a given status array.
     * Note this will only work if the incoming statuses have a key in the EEM_Status->localized_status() methods
     * status_array.
     *
     * @param  array  $status_array  array of statuses that will make up the legend. In format:
     *                               array(
     *                               'status_item' => 'status_name'
     *                               )
     * @param  string $active_status This is used to indicate what the active status is IF that is to be highlighted in
     *                               the legend.
     * @throws EE_Error
     * @return string               html structure for status.
     */
    public static function status_legend($status_array, $active_status = '')
    {
        if ( ! is_array($status_array)) {
            throw new EE_Error(esc_html__('The EEH_Template::status_legend helper required the incoming status_array argument to be an array!',
                'event_espresso'));
        }

        $setup_array = array();
        foreach ($status_array as $item => $status) {
            $setup_array[$item] = array(
                'class'  => 'ee-status-legend ee-status-legend-' . $status,
                'desc'   => EEH_Template::pretty_status($status, false, 'sentence'),
                'status' => $status,
            );
        }

        $content = '<div class="ee-list-table-legend-container">' . "\n";
        $content .= '<h4 class="status-legend-title">' . esc_html__('Status Legend', 'event_espresso') . '</h4>' . "\n";
        $content .= '<dl class="ee-list-table-legend">' . "\n\t";
        foreach ($setup_array as $item => $details) {
            $active_class = $active_status == $details['status'] ? ' class="ee-is-active-status"' : '';
            $content .= '<dt id="ee-legend-item-tooltip-' . $item . '"' . $active_class . '>' . "\n\t\t";
            $content .= '<span class="' . $details['class'] . '"></span>' . "\n\t\t";
            $content .= '<span class="ee-legend-description">' . $details['desc'] . '</span>' . "\n\t";
            $content .= '</dt>' . "\n";
        }
        $content .= '</dl>' . "\n";
        $content .= '</div>' . "\n";
        return $content;
    }


    /**
     * Gets HTML for laying out a deeply-nested array (and objects) in a format
     * that's nice for presenting in the wp admin
     *
     * @param mixed $data
     * @return string
     */
    public static function layout_array_as_table($data)
    {
        if (is_object($data) || $data instanceof __PHP_Incomplete_Class) {
            $data = (array)$data;
        }
        ob_start();
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
                                <?php echo $data_key; ?>
                            </td>
                            <td>
                                <?php echo self::layout_array_as_table($data_values); ?>
                            </td>
                        </tr>
                        <?php
                    } ?>
                    </tbody>
                </table>
                <?php
            } else {
                ?>
                <ul>
                    <?php
                    foreach ($data as $datum) {
                        echo "<li>";
                        echo self::layout_array_as_table($datum);
                        echo "</li>";
                    } ?>
                </ul>
                <?php
            }
        } else {
            //simple value
            echo esc_html($data);
        }
        return ob_get_clean();
    }


    /**
     * wrapper for self::get_paging_html() that simply echos the generated paging html
     *
     * @since 4.4.0
     * @see   self:get_paging_html() for argument docs.
     * @param        $total_items
     * @param        $current
     * @param        $per_page
     * @param        $url
     * @param bool   $show_num_field
     * @param string $paged_arg_name
     * @param array  $items_label
     * @return string
     */
    public static function paging_html(
        $total_items,
        $current,
        $per_page,
        $url,
        $show_num_field = true,
        $paged_arg_name = 'paged',
        $items_label = array()
    ) {
        echo self::get_paging_html($total_items, $current, $per_page, $url, $show_num_field, $paged_arg_name,
            $items_label);
    }


    /**
     * A method for generating paging similar to WP_List_Table
     *
     * @since    4.4.0
     * @see      wp-admin/includes/class-wp-list-table.php WP_List_Table::pagination()
     * @param  integer $total_items     How many total items there are to page.
     * @param  integer $current         What the current page is.
     * @param  integer $per_page        How many items per page.
     * @param  string  $url             What the base url for page links is.
     * @param  boolean $show_num_field  Whether to show the input for changing page number.
     * @param  string  $paged_arg_name  The name of the key for the paged query argument.
     * @param  array   $items_label     An array of singular/plural values for the items label:
     *                                  array(
     *                                  'single' => 'item',
     *                                  'plural' => 'items'
     *                                  )
     * @return  string
     */
    public static function get_paging_html(
        $total_items,
        $current,
        $per_page,
        $url,
        $show_num_field = true,
        $paged_arg_name = 'paged',
        $items_label = array()
    ) {
        $page_links     = array();
        $disable_first  = $disable_last = '';
        $total_items    = (int)$total_items;
        $per_page       = (int)$per_page;
        $current        = (int)$current;
        $paged_arg_name = empty($paged_arg_name) ? 'paged' : sanitize_key($paged_arg_name);

        //filter items_label
        $items_label = apply_filters(
            'FHEE__EEH_Template__get_paging_html__items_label',
            $items_label
        );

        if (empty($items_label)
            || ! is_array($items_label)
            || ! isset($items_label['single'])
            || ! isset($items_label['plural'])
        ) {
            $items_label = array(
                'single' => __('1 item', 'event_espresso'),
                'plural' => __('%s items', 'event_espresso'),
            );
        } else {
            $items_label = array(
                'single' => '1 ' . esc_html($items_label['single']),
                'plural' => '%s ' . esc_html($items_label['plural']),
            );
        }

        $total_pages = ceil($total_items / $per_page);

        if ($total_pages <= 1) {
            return '';
        }

        $item_label = $total_items > 1 ? sprintf($items_label['plural'], $total_items) : $items_label['single'];

        $output = '<span class="displaying-num">' . $item_label . '</span>';

        if ($current === 1) {
            $disable_first = ' disabled';
        }
        if ($current == $total_pages) {
            $disable_last = ' disabled';
        }

        $page_links[] = sprintf("<a class='%s' title='%s' href='%s'>%s</a>",
            'first-page' . $disable_first,
            esc_attr__('Go to the first page'),
            esc_url(remove_query_arg($paged_arg_name, $url)),
            '&laquo;'
        );

        $page_links[] = sprintf(
            '<a class="%s" title="%s" href="%s">%s</a>',
            'prev-page' . $disable_first,
            esc_attr__('Go to the previous page'),
            esc_url(add_query_arg($paged_arg_name, max(1, $current - 1), $url)),
            '&lsaquo;'
        );

        if ( ! $show_num_field) {
            $html_current_page = $current;
        } else {
            $html_current_page = sprintf("<input class='current-page' title='%s' type='text' name=$paged_arg_name value='%s' size='%d' />",
                esc_attr__('Current page'),
                $current,
                strlen($total_pages)
            );
        }

        $html_total_pages = sprintf(
            '<span class="total-pages">%s</span>',
            number_format_i18n($total_pages)
        );
        $page_links[]     = sprintf(
            _x('%3$s%1$s of %2$s%4$s', 'paging'),
            $html_current_page,
            $html_total_pages,
            '<span class="paging-input">',
            '</span>'
        );

        $page_links[] = sprintf(
            '<a class="%s" title="%s" href="%s">%s</a>',
            'next-page' . $disable_last,
            esc_attr__('Go to the next page'),
            esc_url(add_query_arg($paged_arg_name, min($total_pages, $current + 1), $url)),
            '&rsaquo;'
        );

        $page_links[] = sprintf(
            '<a class="%s" title="%s" href="%s">%s</a>',
            'last-page' . $disable_last,
            esc_attr__('Go to the last page'),
            esc_url(add_query_arg($paged_arg_name, $total_pages, $url)),
            '&raquo;'
        );

        $output .= "\n" . '<span class="pagination-links">' . join("\n", $page_links) . '</span>';
        // set page class
        if ($total_pages) {
            $page_class = $total_pages < 2 ? ' one-page' : '';
        } else {
            $page_class = ' no-pages';
        }

        return '<div class="tablenav"><div class="tablenav-pages' . $page_class . '">' . $output . '</div></div>';
    }


    /**
     * @param string $wrap_class
     * @param string $wrap_id
     * @return string
     */
    public static function powered_by_event_espresso($wrap_class = '', $wrap_id = '', array $query_args = array())
    {
        $admin = is_admin() && ! (defined('DOING_AJAX') && DOING_AJAX);
        if (
            ! $admin &&
            ! apply_filters(
                'FHEE__EEH_Template__powered_by_event_espresso__show_reg_footer',
                EE_Registry::instance()->CFG->admin->show_reg_footer
            )
        ) {
            return '';
        }
        $tag        = $admin ? 'span' : 'div';
        $attributes = ! empty($wrap_id) ? " id=\"{$wrap_id}\"" : '';
        $wrap_class = $admin ? "{$wrap_class} float-left" : $wrap_class;
        $attributes .= ! empty($wrap_class)
            ? " class=\"{$wrap_class} powered-by-event-espresso-credit\""
            : ' class="powered-by-event-espresso-credit"';
        $query_args = array_merge(
            array(
                'ap_id'        => EE_Registry::instance()->CFG->admin->affiliate_id(),
                'utm_source'   => 'powered_by_event_espresso',
                'utm_medium'   => 'link',
                'utm_campaign' => 'powered_by',
            ),
            $query_args
        );
        $powered_by = apply_filters('FHEE__EEH_Template__powered_by_event_espresso_text',
            $admin ? 'Event Espresso - ' . EVENT_ESPRESSO_VERSION : 'Event Espresso');
        $url        = add_query_arg($query_args, 'https://eventespresso.com/');
        $url        = apply_filters('FHEE__EEH_Template__powered_by_event_espresso__url', $url);
        return (string)apply_filters(
            'FHEE__EEH_Template__powered_by_event_espresso__html',
            sprintf(
                esc_html_x(
                    '%3$s%1$sOnline event registration and ticketing powered by %2$s%3$s',
                    'Online event registration and ticketing powered by [link to eventespresso.com]',
                    'event_espresso'
                ),
                "<{$tag}{$attributes}>",
                "<a href=\"{$url}\" target=\"_blank\" rel=\"nofollow\">{$powered_by}</a></{$tag}>",
                $admin ? '' : '<br />'
            ),
            $wrap_class,
            $wrap_id
        );
    }


} //end EEH_Template class




if ( ! function_exists('espresso_pagination')) {
    /**
     *    espresso_pagination
     *
     * @access    public
     * @return    void
     */
    function espresso_pagination()
    {
        global $wp_query;
        $big        = 999999999; // need an unlikely integer
        $pagination = paginate_links(
            array(
                'base'         => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                'format'       => '?paged=%#%',
                'current'      => max(1, get_query_var('paged')),
                'total'        => $wp_query->max_num_pages,
                'show_all'     => true,
                'end_size'     => 10,
                'mid_size'     => 6,
                'prev_next'    => true,
                'prev_text'    => __('&lsaquo; PREV', 'event_espresso'),
                'next_text'    => __('NEXT &rsaquo;', 'event_espresso'),
                'type'         => 'plain',
                'add_args'     => false,
                'add_fragment' => '',
            )
        );
        echo ! empty($pagination) ? '<div class="ee-pagination-dv clear">' . $pagination . '</div>' : '';
    }
}