<?php
namespace EventEspresso\core\services\shortcodes;

interface ShortcodeInterface
{

    /**
     * the actual shortcode tag that gets registered with WordPress
     *
     * @return string
     */
    public function getTag();

    /**
     * the length of time in seconds to cache the results of the processShortcode() method
     * 0 means the processShortcode() results will NOT be cached at all
     *
     * @return int
     */
    public function cacheExpiration();

    /**
     * a place for adding any initialization code that needs to run prior to wp_header().
     * this may be required for shortcodes that utilize a corresponding module,
     * and need to enqueue assets for that module
     *
     * !!! IMPORTANT !!!
     * After performing any logic within this method required for initialization
     *         $this->shortcodeHasBeenInitialized();
     * should be called to ensure that the shortcode is setup correctly.
     *
     * @return void
     */
    public function initializeShortcode();

    /**
     * callback that runs when the shortcode is encountered in post content.
     * IMPORTANT !!!
     * remember that shortcode content should be RETURNED and NOT echoed out
     *
     * @param array $attributes
     * @return string
     */
    public function processShortcode($attributes = array());



    /**
     * Returns whether or not this shortcode class has already been initialized
     * @return boolean
     */
    public function initialized();
}
