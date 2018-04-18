<?php

/**
 * TestCase parent for any unit test classes that use the rest server.
 *
 * @package    Event Espress
 * @subpackage unit tests
 * @author     Darren Ethier
 * @since      4.9.32.rc.001
 */
abstract class EE_REST_TestCase extends EE_UnitTestCase
{
    protected $server;

    public function setUp()
    {
        //let's know about any errors
        if (!defined('EE_REST_API_DEBUG_MODE')) {
            define('EE_REST_API_DEBUG_MODE', true);
        }
        parent::setUp();
        if (! class_exists('WP_Rest_Request')
            || ! class_exists('Spy_REST_Server')) {
            $this->markTestSkipped(
                'Test being run on a version of WP that does not have the REST framework installed'
            );
        }

        if (! function_exists('rest_validate_value_from_schema')) {
            $this->markTestSkipped(
                'Test being run on a version of WP that does not have the `rest_validate_value_from_schema` function available.'
            );
        }

        add_filter('rest_url', array($this, 'filter_rest_url_for_leading_slash'), 10, 2);
        /** @var WP_REST_Server $wp_rest_server */
        global $wp_rest_server;
        $this->server = $wp_rest_server = new \Spy_REST_Server;
        do_action('rest_api_init');
    }

    public function tearDown()
    {
        parent::tearDown();
        remove_filter('rest_url', array($this, 'test_rest_url_for_leading_slash'), 10, 2);
        /** @var WP_REST_Server $wp_rest_server */
        global $wp_rest_server;
        $this->server = $wp_rest_server = null;
    }

    public function filter_rest_url_for_leading_slash($url, $path)
    {
        if (is_multisite()) {
            return $url;
        }

        // Make sure path for rest_url has a leading slash for proper resolution.
        $this->assertTrue(0 === strpos($path, '/'), 'REST API URL should have a leading slash.');

        return $url;
    }

    /**
     * Creates a new wp admin user and sets them to the new current user
     *
     * @global \WP_User $current_user
     * @return \WP_User
     */
    public function authenticate_as_admin()
    {
        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();
        return $current_user;
    }
}