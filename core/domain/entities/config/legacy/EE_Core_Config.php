<?php

/**
 * Class for defining what's in the EE_Config relating to registration settings
 */
class EE_Core_Config extends EE_Config_Base
{
    const OPTION_NAME_UXIP = 'ee_ueip_optin';


    public int $current_blog_id = 1;

    public $ee_ueip_optin;

    public $ee_ueip_has_notified;

    /**
     * Not to be confused with the 4 critical page variables (See
     * get_critical_pages_array()), this is just an array of wp posts that have EE
     * shortcodes in them. Keys are slugs, values are arrays with only 1 element: where the key is the shortcode
     * in the page, and the value is the page's ID. The key 'posts' is basically a duplicate of this same array.
     *
     * @var array
     */
    public array $post_shortcodes = [];

    public array $module_route_map = [];

    public array $module_forward_map = [];

    public array $module_view_map = [];

    /**
     * The next 4 vars are the IDs of critical EE pages.
     *
     * @var int
     */
    public int $reg_page_id = 0;

    public int $txn_page_id = 0;

    public int $thank_you_page_id = 0;

    public int $cancel_page_id = 0;

    /**
     * The next 4 vars are the URLs of critical EE pages.
     *
     * @var string
     */
    public string $reg_page_url = '';

    public string $txn_page_url = '';

    public string $thank_you_page_url = '';

    public string $cancel_page_url = '';

    /**
     * The next vars relate to the custom slugs for EE CPT routes
     */
    public string $event_cpt_slug;

    /**
     * This caches the _ee_ueip_option in case this config is reset in the same
     * request across blog switches in a multisite context.
     * Avoids extra queries to the db for this option.
     *
     * @var bool|null
     */
    public static $ee_ueip_option = null;


    public function __construct()
    {
        // set default organization settings
        $this->current_blog_id      = get_current_blog_id() ?: 1;
        $this->ee_ueip_optin        = $this->_get_main_ee_ueip_optin();
        $this->ee_ueip_has_notified = is_main_site() ? get_option('ee_ueip_has_notified', false) : true;
        // cpt slugs
        $this->event_cpt_slug = esc_html__('events', 'event_espresso');
        // ueip constant check
        if (defined('EE_DISABLE_UXIP') && EE_DISABLE_UXIP) {
            $this->ee_ueip_optin        = false;
            $this->ee_ueip_has_notified = true;
        }
    }


    /**
     * @return array
     */
    public function get_critical_pages_array(): array
    {
        return [
            $this->reg_page_id,
            $this->txn_page_id,
            $this->thank_you_page_id,
            $this->cancel_page_id,
        ];
    }


    /**
     * @return array
     */
    public function get_critical_pages_shortcodes_array(): array
    {
        return [
            $this->reg_page_id       => 'ESPRESSO_CHECKOUT',
            $this->txn_page_id       => 'ESPRESSO_TXN_PAGE',
            $this->thank_you_page_id => 'ESPRESSO_THANK_YOU',
            $this->cancel_page_id    => 'ESPRESSO_CANCELLED',
        ];
    }


    /**
     *  gets/returns URL for EE reg_page
     *
     * @return string
     */
    public function reg_page_url(): string
    {
        if (! $this->reg_page_url) {
            $this->reg_page_url = add_query_arg(
                ['uts' => time()],
                get_permalink($this->reg_page_id)
            ) . '#checkout';
        }
        return $this->reg_page_url;
    }


    /**
     *  gets/returns URL for EE txn_page
     *
     * @param array $query_args like what gets passed to add_query_arg() as the first argument
     * @return string
     */
    public function txn_page_url(array $query_args = []): string
    {
        if (! $this->txn_page_url) {
            $this->txn_page_url = get_permalink($this->txn_page_id);
        }
        if ($query_args) {
            return add_query_arg($query_args, $this->txn_page_url);
        }
        return $this->txn_page_url;
    }


    /**
     *  gets/returns URL for EE thank_you_page
     *
     * @param array $query_args like what gets passed to
     *                          add_query_arg() as the first argument
     * @return string
     */
    public function thank_you_page_url(array $query_args = []): string
    {
        if (! $this->thank_you_page_url) {
            $this->thank_you_page_url = get_permalink($this->thank_you_page_id);
        }
        if ($query_args) {
            return add_query_arg($query_args, $this->thank_you_page_url);
        }
        return $this->thank_you_page_url;
    }


    /**
     *  gets/returns URL for EE cancel_page
     *
     * @return string
     */
    public function cancel_page_url(): string
    {
        if (! $this->cancel_page_url) {
            $this->cancel_page_url = get_permalink($this->cancel_page_id);
        }
        return $this->cancel_page_url;
    }


    /**
     * Resets all critical page urls to their original state.  Used primarily by the __sleep() magic method currently.
     *
     * @since 4.7.5
     */
    protected function _reset_urls()
    {
        $this->reg_page_url       = '';
        $this->txn_page_url       = '';
        $this->cancel_page_url    = '';
        $this->thank_you_page_url = '';
    }


    /**
     * Used to return what the optin value is set for the EE User Experience Program.
     * This accounts for multisite and this value being requested for a subsite.  In multisite, the value is set
     * on the main site only.
     *
     * @return bool
     */
    protected function _get_main_ee_ueip_optin()
    {
        // if this is the main site then we can just bypass our direct query.
        if (is_main_site()) {
            return get_option(self::OPTION_NAME_UXIP, false);
        }
        // is this already cached for this request?  If so use it.
        if (EE_Core_Config::$ee_ueip_option !== null) {
            return EE_Core_Config::$ee_ueip_option;
        }
        global $wpdb;
        $current_network_main_site = is_multisite() ? get_current_site() : null;
        $current_main_site_id      = $current_network_main_site instanceof WP_Network
            ? $current_network_main_site->blog_id
            : 1;
        $option                    = self::OPTION_NAME_UXIP;
        // set correct table for query
        $table_name = $wpdb->get_blog_prefix($current_main_site_id) . 'options';
        // rather than getting blog option for the $current_main_site_id, we do a direct $wpdb query because
        // get_blog_option() does a switch_to_blog and that could cause infinite recursion because EE_Core_Config might be
        // re-constructed on the blog switch.  Note, we are still executing any core wp filters on this option retrieval.
        // this bit of code is basically a direct copy of get_option without any caching because we are NOT switched to the blog
        // for the purpose of caching.
        $pre = apply_filters('pre_option_' . $option, false, $option);
        if ($pre !== false) {
            EE_Core_Config::$ee_ueip_option = $pre;
            return EE_Core_Config::$ee_ueip_option;
        }
        $row = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT option_value FROM $table_name WHERE option_name = %s LIMIT 1",
                $option
            )
        );
        if (is_object($row)) {
            $value = $row->option_value;
        } else { // option does not exist so use default.
            EE_Core_Config::$ee_ueip_option = apply_filters('default_option_' . $option, false, $option);
            return EE_Core_Config::$ee_ueip_option;
        }
        EE_Core_Config::$ee_ueip_option = apply_filters('option_' . $option, maybe_unserialize($value), $option);
        return EE_Core_Config::$ee_ueip_option;
    }


    /**
     * Utility function for escaping the value of a property and returning.
     *
     * @param string $property property name (checks to see if exists).
     * @return mixed if a detected type found return the escaped value, otherwise just the raw value is returned.
     * @throws EE_Error
     */
    public function get_pretty(string $property)
    {
        if ($property === self::OPTION_NAME_UXIP) {
            return $this->ee_ueip_optin ? 'yes' : 'no';
        }
        return parent::get_pretty($property);
    }


    /**
     * Currently used to ensure critical page urls have initial values saved to the db instead of any current set values
     * on the object.
     *
     * @return array
     */
    public function __sleep()
    {
        // reset all url properties
        $this->_reset_urls();
        // return what to save to db
        return array_keys(get_object_vars($this));
    }
}
