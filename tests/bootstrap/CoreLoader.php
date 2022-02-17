<?php

namespace EventEspresso\tests\bootstrap;

use DomainException;
use EE_Dependency_Map;
use EE_Error;
use EE_Registry;
use EEH_Activation;
use EE_Psr4AutoloaderInit;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\Benchmark;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\tests\mocks\core\domain\entities\routing\handlers\shared\GQLRequestsMock;
use EventEspresso\tests\mocks\core\services\request\RequestMock;
use InvalidArgumentException;
use ReflectionException;

class CoreLoader
{

    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function init()
    {
        echo "\nINITIALIZING EVENT ESPRESSO UNIT TESTS";
        echo "\n--------------------------------------";
        $this->setConstants();
        $this->preLoadWPandEE();
        $this->loadWP();
        $this->postLoadWPandEE();
        $this->requireTestCaseParents();
        $this->bootstrapMockAddon();
        $this->onShutdown();
        Benchmark::writeResultsAtShutdown(
            EVENT_ESPRESSO_UPLOAD_DIR . 'logs/benchmarking-master.html',
            false
        );
    }


    /**
     * @return string
     * @since $VID:$
     */
    private function findWordpressVersion(): ?string
    {
        global $wp_version;
        if (! $wp_version) {
            $wp_dirs = [
                '/tmp/wordpress',
                __DIR__,
            ];
            echo "\n\nAttempting to find WP version.php";
            foreach ($wp_dirs as $wp_dir) {
                if (! $wp_dir) {
                    continue;
                }
                $wp_version_file = $this->findFolderWithFile($wp_dir, '/wp-includes/version.php');
                if ($wp_version_file) {
                    include $wp_version_file . '/wp-includes/version.php';
                    return $wp_version;
                }
            }
        }
        return null;
    }


    /**
     * @return string
     * @throw RuntimeException
     * @since $VID:$
     */
    private function findWordpressTestsFolder(): ?string
    {
        // potential base locations for WP tests folder
        $wp_test_dirs = [
            getenv('WP_TESTS_DIR'),
            '/tmp/wordpress-tests-lib',
            __DIR__,
        ];
        echo "\n\nAttempting to find WP tests directory";
        foreach ($wp_test_dirs as $wp_test_dir) {
            if (! $wp_test_dir) {
                continue;
            }
            if ($this->findFolderWithFile($wp_test_dir, '/includes/testcase.php')) {
                return $wp_test_dir;
            }
        }
        // if WordPress test suite isn't found then we can't do anything.
        die("The WordPress PHPUnit test suite could not be found.");
    }


    /**
     * @return string
     * @throw RuntimeException
     * @since $VID:$
     */
    private function findPhpUnitPolyfillsFolder(): ?string
    {
        // potential base locations for WP tests folder
        $wp_dirs = [
            getenv('WP_TESTS_DIR'),
            '/tmp/wordpress-tests-lib',
            '/tmp/wordpress',
            __DIR__,
        ];
        echo "\n\nAttempting to find PHPUnit Polyfills";
        foreach ($wp_dirs as $wp_dir) {
            if (! $wp_dir) {
                continue;
            }
            $wp_root = $this->findFolderWithFile($wp_dir, '/vendor/yoast/phpunit-polyfills');
            if ($wp_root) {
                return $wp_root;
            }
        }
        echo "\n\nThe PHPUnit Polyfills could not be found.";
        return null;
    }


    /**
     * @param string $folder
     * @param string $with_file
     * @return string|null
     * @since 4.10.7.p
     */
    private function findFolderWithFile(string $folder = '', string $with_file = ''): ?string
    {
        if (! $folder || $folder === '/') {
            return null;
        }
        static $depth = 10;
        $with_file = strpos($with_file, '/') !== 0 ? '/' . $with_file : $with_file;
        echo "\n => {$folder}{$with_file}";
        if (is_readable($folder . $with_file)) {
            return $folder;
        }
        if ($depth > 0) {
            $depth--;
            return $this->findFolderWithFile(dirname($folder), $with_file);
        }
        return null;
    }


    protected function setConstants()
    {
        if (! defined('EE_TESTS_DIR')) {
            $wp_version  = $this->findWordpressVersion();
            $wp_test_dir = $this->findWordpressTestsFolder();
            define('WP_TESTS_DIR', $wp_test_dir);

            // load polyfills
            if (! defined('WP_TESTS_PHPUNIT_POLYFILLS_PATH')) {
                $wp_root = $this->findPhpUnitPolyfillsFolder();
                if ($wp_root) {
                    define(
                        'WP_TESTS_PHPUNIT_POLYFILLS_PATH',
                        $wp_root . '/vendor/yoast/phpunit-polyfills'
                    );
                }
            }
            if (
                defined('WP_TESTS_PHPUNIT_POLYFILLS_PATH')
                && is_readable(WP_TESTS_PHPUNIT_POLYFILLS_PATH . '/phpunitpolyfills-autoload.php')
            ) {
                require_once WP_TESTS_PHPUNIT_POLYFILLS_PATH . '/phpunitpolyfills-autoload.php';
            }

            if (getenv('EE_TESTS_DIR')) {
                define('EE_TESTS_DIR', getenv('EE_TESTS_DIR'));
                define('EE_PLUGIN_DIR', dirname(EE_TESTS_DIR, 2) . '/');
            } else {
                define('EE_PLUGIN_DIR', dirname(__DIR__, 2) . '/');
                define('EE_TESTS_DIR', EE_PLUGIN_DIR . 'tests/');
            }

            define('EE_MOCKS_DIR', EE_TESTS_DIR . 'mocks/');

            echo "\n\nWP_VERSION: {$wp_version}";
            echo "\nWP_TESTS_DIR: " . WP_TESTS_DIR;
            echo "\nEE_TESTS_DIR: " . EE_TESTS_DIR . "\n\n";
            // define('EE_REST_API_DEBUG_MODE', true);
        }
    }


    protected function preLoadWPandEE()
    {
        require_once WP_TESTS_DIR . '/includes/functions.php';
        require_once EE_PLUGIN_DIR . 'core/Psr4Autoloader.php';
        //set filter for bootstrapping EE which needs to happen BEFORE loading WP.
        tests_add_filter('muplugins_loaded', [$this, 'setupAndLoadEE']);
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
            static function ($class_abbreviations = []) {
                $class_abbreviations['EE_Session_Mock'] = 'SSN';
                return $class_abbreviations;
            }
        );
        tests_add_filter(
            'FHEE__EE_Registry__load_core__core_paths',
            static function ($core_paths = []) {
                $core_paths[] = EE_TESTS_DIR . 'mocks/core/';
                return $core_paths;
            }
        );
        // and this stuff needs to happen just AFTER the Registry initializes
        tests_add_filter(
            'EE_Load_Espresso_Core__handle_request__initialize_core_loading',
            [$this, 'setupDependencyMap'],
            5
        );
        // Bootstrap EE
        require EE_PLUGIN_DIR . 'espresso.php';
        //save wpdb queries in case we want to know what queries ran during a test
        if (! defined('SAVEQUERIES')) {
            define('SAVEQUERIES', true);
        }
        add_action(
            'AHEE__EE_System__core_loaded_and_ready',
            static function () {
                LoaderFactory::getLoader()->getShared(
                    'EventEspresso\core\services\notifications\PersistentAdminNoticeManager'
                );
            }
        );
        add_action(
            'after_setup_theme',
            static function () {
                GQLRequestsMock::register();
                $GQLRequestsMock = LoaderFactory::getLoader()->getShared(
                    'EventEspresso\tests\mocks\core\domain\entities\routing\handlers\shared\GQLRequestsMock'
                );
                $GQLRequestsMock->registerDependencies();
                $GQLRequestsMock->requestHandler();
            },
            5
        );
    }


    /**
     * @throws DomainException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function setupDependencyMap()
    {
        /** @var RequestMock $mock */
        $mock = LoaderFactory::getLoader()->getShared(RequestMock::class);
        EE_Dependency_Map::register_class_loader(
            'EventEspresso\core\services\request\Request',
            function () use ($mock) {
                return $mock;
            },
            true
        );
        EE_Dependency_Map::register_class_loader('EE_Session_Mock');
        EE_Dependency_Map::register_dependencies(
            'EventEspresso\core\services\session\SessionStartHandler',
            ['EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache]
        );
        EE_Dependency_Map::register_dependencies(
            'EE_Session_Mock',
            [
                'EventEspresso\core\services\cache\TransientCacheStorage'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\values\session\SessionLifespan' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'              => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\session\SessionStartHandler'  => EE_Dependency_Map::load_from_cache,
                'EE_Encryption'                                            => EE_Dependency_Map::load_from_cache,
            ]
        );
        EE_Dependency_Map::register_dependencies(
            'EventEspresso\core\services\cache\BasicCacheManager',
            [
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
                'EE_Session_Mock'                                         => EE_Dependency_Map::load_from_cache,
            ],
            true
        );
        EE_Dependency_Map::register_dependencies(
            'EventEspresso\core\services\cache\PostRelatedCacheManager',
            [
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
                'EE_Session_Mock'                                         => EE_Dependency_Map::load_from_cache,
            ],
            true
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
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
            static function () {
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
