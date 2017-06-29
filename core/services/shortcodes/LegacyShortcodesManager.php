<?php
namespace EventEspresso\core\services\shortcodes;

use EE_Config;
use EE_Error;
use EE_Front_controller;
use EE_Registry;
use ReflectionClass;
use WP;
use WP_Query;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class LegacyShortcodesManager
 * Legacy code extracted from EE_Config, will be deprecated sometime in the future.
 * Please use the ShortcodesManager for registering shortcodes
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class LegacyShortcodesManager
{

    /**
     * @var EE_Registry $registry
     */
    private $registry;




    /**
     * LegacyShortcodesManager constructor.
     *
     * @param \EE_Registry $registry
     */
    public function __construct(EE_Registry $registry)
    {
        $this->registry = $registry;
    }



    /**
     * @return EE_Registry
     */
    public function registry()
    {
        return $this->registry;
    }



    /**
     * registerShortcodes
     *
     * @return void
     */
    public function registerShortcodes()
    {
        $this->registry->shortcodes = $this->getShortcodes();
    }



    /**
     * getShortcodes
     *
     * @return array
     */
    public function getShortcodes()
    {
        // previously this method would glob the shortcodes directory
        // then filter that list of shortcodes to register,
        // but now we are going to just supply an empty array.
        // this allows any shortcodes that have not yet been converted to the new system
        // to still get loaded and processed, albeit using the same legacy logic as before
        $shortcodes_to_register = apply_filters(
            'FHEE__EE_Config__register_shortcodes__shortcodes_to_register',
            array()
        );
        if ( ! empty($shortcodes_to_register)) {
            // cycle thru shortcode folders
            foreach ($shortcodes_to_register as $shortcode_path) {
                // add to list of installed shortcode modules
                $this->registerShortcode($shortcode_path);
            }
        }
        // filter list of installed modules
        return apply_filters(
            'FHEE__EE_Config___register_shortcodes__installed_shortcodes',
            ! empty($this->registry->shortcodes)
                ? $this->registry->shortcodes
                : array()
        );
    }



    /**
     *    register_shortcode - makes core aware of this shortcode
     *
     * @access    public
     * @param    string $shortcode_path - full path up to and including shortcode folder
     * @return    bool
     */
    public function registerShortcode($shortcode_path = null)
    {
        do_action('AHEE__EE_Config__register_shortcode__begin', $shortcode_path);
        $shortcode_ext = '.shortcode.php';
        // make all separators match
        $shortcode_path = str_replace(array('\\', '/'), DS, $shortcode_path);
        // does the file path INCLUDE the actual file name as part of the path ?
        if (strpos($shortcode_path, $shortcode_ext) !== false) {
            // grab shortcode file name from directory name and break apart at dots
            $shortcode_file = explode('.', basename($shortcode_path));
            // take first segment from file name pieces and remove class prefix if it exists
            $shortcode = strpos($shortcode_file[0], 'EES_') === 0
                ? substr($shortcode_file[0], 4)
                : $shortcode_file[0];
            // sanitize shortcode directory name
            $shortcode = sanitize_key($shortcode);
            // now we need to rebuild the shortcode path
            $shortcode_path = explode(DS, $shortcode_path);
            // remove last segment
            array_pop($shortcode_path);
            // glue it back together
            $shortcode_path = implode(DS, $shortcode_path) . DS;
        } else {
            // we need to generate the filename based off of the folder name
            // grab and sanitize shortcode directory name
            $shortcode = sanitize_key(basename($shortcode_path));
            $shortcode_path = rtrim($shortcode_path, DS) . DS;
        }
        // create classname from shortcode directory or file name
        $shortcode = str_replace(' ', '_', ucwords(str_replace('_', ' ', $shortcode)));
        // add class prefix
        $shortcode_class = 'EES_' . $shortcode;
        // does the shortcode exist ?
        if ( ! is_readable($shortcode_path . DS . $shortcode_class . $shortcode_ext)) {
            $msg = sprintf(
                esc_html__(
                    'The requested %s shortcode file could not be found or is not readable due to file permissions. It should be in %s',
                    'event_espresso'
                ),
                $shortcode_class,
                $shortcode_path . DS . $shortcode_class . $shortcode_ext
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // load the shortcode class file
        require_once($shortcode_path . $shortcode_class . $shortcode_ext);
        // verify that class exists
        if ( ! class_exists($shortcode_class)) {
            $msg = sprintf(
                esc_html__('The requested %s shortcode class does not exist.', 'event_espresso'),
                $shortcode_class
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        $shortcode = strtoupper($shortcode);
        // add to array of registered shortcodes
        $this->registry->shortcodes->{$shortcode} = $shortcode_path . $shortcode_class . $shortcode_ext;
        return true;
    }



    /**
     *    _initialize_shortcodes
     *    allow shortcodes to set hooks for the rest of the system
     *
     * @access private
     * @return void
     */
    public function addShortcodes()
    {
        // cycle thru shortcode folders
        foreach ($this->registry->shortcodes as $shortcode => $shortcode_path) {
            // add class prefix
            $shortcode_class = 'EES_' . $shortcode;
            // fire the shortcode class's set_hooks methods in case it needs to hook into other parts of the system
            // which set hooks ?
            if (is_admin()) {
                // fire immediately
                call_user_func(array($shortcode_class, 'set_hooks_admin'));
            } else {
                // delay until other systems are online
                add_action(
                    'AHEE__EE_System__set_hooks_for_shortcodes_modules_and_addons',
                    array($shortcode_class, 'set_hooks')
                );
                // convert classname to UPPERCASE and create WP shortcode.
                $shortcode_tag = strtoupper($shortcode);
                // but first check if the shortcode has already
                // been added before assigning 'fallback_shortcode_processor'
                if ( ! shortcode_exists($shortcode_tag)) {
                    // NOTE: this shortcode declaration will get overridden if the shortcode
                    // is successfully detected in the post content in initializeShortcode()
                    add_shortcode($shortcode_tag, array($shortcode_class, 'fallback_shortcode_processor'));
                }
            }
        }
    }



    /**
     * callback for the WP "get_header" hook point
     * checks posts for EE shortcodes, and initializes them,
     * then toggles filter switch that loads core default assets
     *
     * @param \WP_Query $wp_query
     * @return void
     */
    public function initializeShortcodes(WP_Query $wp_query)
    {
        if (empty($this->registry->shortcodes) || ! $wp_query->is_main_query() || is_admin()) {
            return;
        }
        global $wp;
        /** @var EE_Front_controller $Front_Controller */
        $Front_Controller = $this->registry->load_core('Front_Controller', array(), false);
        do_action('AHEE__EE_Front_Controller__initialize_shortcodes__begin', $wp, $Front_Controller);
        $Front_Controller->Request_Handler()->set_request_vars();
        // grab post_name from request
        $current_post = apply_filters(
            'FHEE__EE_Front_Controller__initialize_shortcodes__current_post_name',
            $Front_Controller->Request_Handler()->get('post_name')
        );
        $show_on_front = get_option('show_on_front');
        // if it's not set, then check if frontpage is blog
        if (empty($current_post)) {
            // yup.. this is the posts page, prepare to load all shortcode modules
            $current_post = 'posts';
            // unless..
            if ($show_on_front === 'page') {
                // some other page is set as the homepage
                $page_on_front = get_option('page_on_front');
                if ($page_on_front) {
                    // k now we need to find the post_name for this page
                    global $wpdb;
                    $page_on_front = $wpdb->get_var(
                        $wpdb->prepare(
                            "SELECT post_name from {$wpdb->posts} WHERE post_type='page' AND post_status NOT IN ('auto-draft', 'inherit', 'trash') AND ID=%d",
                            $page_on_front
                        )
                    );
                    // set the current post slug to what it actually is
                    $current_post = $page_on_front ? $page_on_front : $current_post;
                }
            }
        }
        // in case $current_post is hierarchical like: /parent-page/current-page
        $current_post = basename($current_post);
        if (
            // is current page/post the "blog" page ?
            $current_post === EE_Config::get_page_for_posts()
            // or are we on a category page?
            || (
                is_array(term_exists($current_post, 'category'))
                || array_key_exists('category_name', $wp->query_vars)
            )
        ) {
            // initialize all legacy shortcodes
            $load_assets = $this->parseContentForShortcodes('', true);
        } else {
            global $wpdb;
            $post_content = $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT post_content from {$wpdb->posts} WHERE post_status NOT IN ('auto-draft', 'inherit', 'trash') AND post_name=%s",
                    $current_post
                )
            );
            $load_assets = $this->parseContentForShortcodes($post_content);
        }
        if ($load_assets) {
            $this->registry->REQ->set_espresso_page(true);
            add_filter('FHEE_load_css', '__return_true');
            add_filter('FHEE_load_js', '__return_true');
        }
        do_action('AHEE__EE_Front_Controller__initialize_shortcodes__end', $Front_Controller);
    }



    /**
     * checks supplied content against list of legacy shortcodes,
     * then initializes any found shortcodes, and returns true.
     * returns false if no shortcodes found.
     *
     * @param string $content
     * @param bool   $load_all if true, then ALL active legacy shortcodes will be initialized
     * @return bool
     */
    public function parseContentForShortcodes($content = '', $load_all = false)
    {
        $has_shortcode = false;
        foreach ($this->registry->shortcodes as $shortcode_class => $shortcode) {
            if ($load_all || has_shortcode($content, $shortcode_class) ) {
                // load up the shortcode
                $this->initializeShortcode($shortcode_class);
                $has_shortcode = true;
            }
        }
        return $has_shortcode;
    }



    /**
     * given a shortcode name, will instantiate the shortcode and call it's run() method
     *
     * @param string $shortcode_class
     * @param WP     $wp
     */
    public function initializeShortcode($shortcode_class = '', WP $wp = null)
    {
        // don't do anything if shortcode is already initialized
        if (
            empty($this->registry->shortcodes->{$shortcode_class})
            || ! is_string($this->registry->shortcodes->{$shortcode_class})
        ) {
            return;
        }
        // let's pause to reflect on this...
        $sc_reflector = new ReflectionClass(LegacyShortcodesManager::addShortcodeClassPrefix($shortcode_class));
        // ensure that class is actually a shortcode
        if (
            defined('WP_DEBUG')
            && WP_DEBUG === true
            && ! $sc_reflector->isSubclassOf('EES_Shortcode')
        ) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'The requested %s shortcode is not of the class "EES_Shortcode". Please check your files.',
                        'event_espresso'
                    ),
                    $shortcode_class
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            add_filter('FHEE_run_EE_the_content', '__return_true');
            return;
        }
        global $wp;
        // and pass the request object to the run method
        $this->registry->shortcodes->{$shortcode_class} = $sc_reflector->newInstance();
        // fire the shortcode class's run method, so that it can activate resources
        $this->registry->shortcodes->{$shortcode_class}->run($wp);
    }



    /**
     * get classname, remove EES_prefix, and convert to UPPERCASE
     *
     * @param string $class_name
     * @return string
     */
    public static function generateShortcodeTagFromClassName($class_name)
    {
        return strtoupper(str_replace('EES_', '', $class_name));
    }



    /**
     * add EES_prefix and Capitalize words
     *
     * @param string $tag
     * @return string
     */
    public static function generateShortcodeClassNameFromTag($tag)
    {
        // order of operation runs from inside to out
        // 5) maybe add prefix
        return LegacyShortcodesManager::addShortcodeClassPrefix(
        // 4) find spaces, replace with underscores
            str_replace(
                ' ',
                '_',
                // 3) capitalize first letter of each word
                ucwords(
                // 2) also change to lowercase so ucwords() will work
                    strtolower(
                    // 1) find underscores, replace with spaces so ucwords() will work
                        str_replace(
                            '_',
                            ' ',
                            $tag
                        )
                    )
                )
            )
        );
    }



    /**
     * maybe add EES_prefix
     *
     * @param string $class_name
     * @return string
     */
    public static function addShortcodeClassPrefix($class_name)
    {
        return strpos($class_name, 'EES_') === 0 ? $class_name : 'EES_' . $class_name;
    }



    /**
     * @return array
     */
    public function getEspressoShortcodeTags()
    {
        static $shortcode_tags = array();
        if (empty($shortcode_tags)) {
            $shortcode_tags = array_keys((array)$this->registry->shortcodes);
        }
        return $shortcode_tags;
    }



    /**
     * @param string $content
     * @return string
     */
    public function doShortcode($content)
    {
        foreach ($this->getEspressoShortcodeTags() as $shortcode_tag) {
            if (strpos($content, $shortcode_tag) !== false) {
                $shortcode_class = LegacyShortcodesManager::generateShortcodeClassNameFromTag($shortcode_tag);
                $this->initializeShortcode($shortcode_class);
            }
        }
        return do_shortcode($content);
    }




}
// End of file LegacyShortcodesManager.php
// Location: EventEspresso\core\services\shortcodes/LegacyShortcodesManager.php