<?php

namespace EETests\bootstrap;

use EE_Dependency_Map;
use EE_Registry;
use EEH_Activation;
use EE_Psr4AutoloaderInit;
use EventEspresso\core\services\loaders\LoaderFactory;

class CoreLoader
{
    public function init()
    {
        $this->setConstants();
        $this->preLoadWPandEE();
        $this->loadWP();
        $this->postLoadWPandEE();
        $this->requireTestCaseParents();
        $this->bootstrapMockAddon();
        $this->onShutdown();
        \EventEspresso\core\services\Benchmark::writeResultsAtShutdown(
            EVENT_ESPRESSO_UPLOAD_DIR . 'logs/benchmarking-master.html',  false
        );
    }

    protected function setConstants()
    {
        if (! defined('EE_TESTS_DIR')) {
            if (getenv('EE_TESTS_DIR')) {
                define('EE_TESTS_DIR', getenv('EE_TESTS_DIR'));
                define('EE_PLUGIN_DIR', dirname(dirname(EE_TESTS_DIR)) . '/');
            } else {
                define('EE_PLUGIN_DIR', dirname(dirname(dirname(__FILE__))) . '/');
                define('EE_TESTS_DIR', EE_PLUGIN_DIR . 'tests/');
            }

            define('EE_MOCKS_DIR', EE_TESTS_DIR . 'mocks/');
            $_tests_dir = getenv('WP_TESTS_DIR');
            if (! $_tests_dir) {
                $_tests_dir = '/tmp/wordpress-tests-lib';
            }
            if (file_exists($_tests_dir . '/includes/functions.php')) {
                define('WP_TESTS_DIR', $_tests_dir);
            } else {
                define(
                    'WP_TESTS_DIR',
                    dirname(
                        dirname(
                            dirname(
                                dirname(
                                    dirname(
                                        dirname(
                                            __DIR__
                                        )
                                    )
                                )
                            )
                        )
                    ) . '/tests/phpunit'
                );
            }
            // define('EE_REST_API_DEBUG_MODE', true);
        }
    }


    protected function preLoadWPandEE()
    {
        //if WordPress test suite isn't found then we can't do anything.
        if (! is_readable(WP_TESTS_DIR . '/includes/functions.php')) {
            die("The WordPress PHPUnit test suite could not be found.\n");
        }
        require_once WP_TESTS_DIR . '/includes/functions.php';
        require_once EE_PLUGIN_DIR . 'core/Psr4Autoloader.php';
        //set filter for bootstrapping EE which needs to happen BEFORE loading WP.
        tests_add_filter('muplugins_loaded', array($this, 'setupAndLoadEE'));
    }


    protected function loadWP()
    {
        require WP_TESTS_DIR . '/includes/bootstrap.php';
    }


    public function setupAndLoadEE()
    {
        tests_add_filter('FHEE__EE_System__detect_if_activation_or_upgrade__testsbypass', '__return_true');
        //make sure EE_session does not load
        tests_add_filter('FHEE_load_EE_Session', '__return_false');
        // and don't set cookies
        tests_add_filter('FHEE__EE_Error__get_error__show_normal_exceptions', '__return_true');
        // we need to add these filters BEFORE the Registry is instantiated
        tests_add_filter(
            'FHEE__EE_Registry____construct___class_abbreviations',
            function ($class_abbreviations = array()) {
                $class_abbreviations['EE_Session_Mock'] = 'SSN';
                return $class_abbreviations;
            }
        );
        tests_add_filter(
            'FHEE__EE_Registry__load_core__core_paths',
            function ($core_paths = array()) {
                $core_paths[] = EE_TESTS_DIR . 'mocks' . DS . 'core' . DS;
                return $core_paths;
            }
        );
        // and this stuff needs to happen just AFTER the Registry initializes
        tests_add_filter(
            'EE_Load_Espresso_Core__handle_request__initialize_core_loading',
            array($this, 'setupDependencyMap'),
            15
        );
        // Bootstrap EE
        require EE_PLUGIN_DIR . 'espresso.php';
        //save wpdb queries in case we want to know what queries ran during a test
        if (! defined('SAVEQUERIES')) {
            define('SAVEQUERIES', true);
        }
        add_action(
            'AHEE__EE_System__core_loaded_and_ready',
            function ()
            {
                LoaderFactory::getLoader()->getShared(
                    'EventEspresso\core\services\notifications\PersistentAdminNoticeManager'
                );
            }
        );
    }


    /**
     * @throws \DomainException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     */
    public function setupDependencyMap()
    {
        EE_Dependency_Map::register_class_loader('EE_Session_Mock');
        EE_Dependency_Map::register_dependencies(
            'EE_Session_Mock',
            array(
                'EventEspresso\core\services\cache\TransientCacheStorage'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\values\session\SessionLifespan' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'              => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\session\SessionStartHandler'  => EE_Dependency_Map::load_from_cache,
                'EE_Encryption'                                            => EE_Dependency_Map::load_from_cache,
            )
        );
        EE_Dependency_Map::register_dependencies(
            'EventEspresso\core\services\cache\BasicCacheManager',
            array(
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
                'EE_Session_Mock' => EE_Dependency_Map::load_from_cache
            ),
            true
        );
        EE_Dependency_Map::register_dependencies(
            'EventEspresso\core\services\cache\PostRelatedCacheManager',
            array(
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
                'EE_Session_Mock' => EE_Dependency_Map::load_from_cache
            ),
            true
        );
    }


    public function postLoadWPandEE()
    {
        // ensure date and time formats are set
        if (! get_option('date_format')) {
            update_option('date_format', 'F j, Y');
        }
        if (! get_option('time_format')) {
            update_option('time_format', 'g:i a');
        }
        EE_Registry::instance()->SSN = EE_Registry::instance()->load_core('EE_Session_Mock');
    }



    protected function requireTestCaseParents()
    {
        //Load the EE_specific testing tools
        require EE_TESTS_DIR . 'includes/EE_UnitTestCase.class.php';
        require EE_TESTS_DIR . 'includes/EE_REST_TestCase.php';
    }


    protected function bootstrapMockAddon()
    {
        require_once EE_TESTS_DIR . 'mocks/addons/eea-new-addon/eea-new-addon.php';
        remove_action('AHEE__EE_System__load_espresso_addons', 'load_espresso_new_addon');
    }



    protected function onShutdown()
    {
        //nuke all EE4 data once the tests are done, so that it doesn't carry over to the next time we run tests
        register_shutdown_function(
            function () {
                EEH_Activation::delete_all_espresso_tables_and_data();
            }
        );
    }


    /**
     * @param array $maps
     */
    public function registerPsr4Path(array $maps)
    {
        foreach ($maps as $prefix => $base_dir) {
            EE_Psr4AutoloaderInit::psr4_loader()->addNamespace(
                $prefix,
                $base_dir
            );
        }
    }
}
