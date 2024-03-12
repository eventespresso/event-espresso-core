<?php

use EventEspresso\core\domain\services\assets\CoreAssetManager;
use EventEspresso\core\domain\services\assets\EspressoLegacyAdminAssetManager;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\DataType;
use EventEspresso\core\libraries\batch\BatchRequestProcessor;
use EventEspresso\core\libraries\batch\Helpers\JobStepResponse;

define('BATCH_URL', plugin_dir_url(__FILE__));

/**
 * Class EED_Batch
 *
 * Module for running batch jobs, which uses the library files in event-espresso-core/core/libraries/batch.
 * So will respond on the frontend at "{site_url}?espresso_batch&batch={file|job}",
 * or in the admin at "{site_url}/wp-admin?page=espresso_batch&batch={file|job}" (use whichever will make your user
 * happier, note that the admin one requires the user to be able to access the admin, and the frontend one is disabled
 * until specifically enabled via a filter).
 *
 * @package     Event Espresso
 * @subpackage  /modules/batch/
 * @author      Mike Nelson
 * @since       4.8.30.rc.007
 * @method EED_Batch get_instance($module_name): EED_Batch
 */
class EED_Batch extends EED_Module
{
    public const PAGE_SLUG = 'espresso_batch';

    /**
     * Possibly value for $_REQUEST[ 'batch' ]. Indicates to run a job that
     * processes data only
     */
    const batch_job = 'job';

    /**
     * Possibly value for $_REQUEST[ 'batch' ]. Indicates to run a job that
     * produces a file for download
     */
    const batch_file_job = 'file';

    /**
     * Possibly value for $_REQUEST[ 'batch' ]. Indicates this request is NOT
     * for a batch job. It's the same as not providing the $_REQUEST[ 'batch' ]
     * at all
     */
    const batch_not_job = 'none';

    /**
     *
     * @var string 'file', or 'job', or false to indicate its not a batch request at all
     */
    protected $_batch_request_type = '';

    /**
     * Because we want to use the response in both the localized JS and in the body
     * we need to make this response available between method calls
     *
     * @var JobStepResponse|null
     */
    protected $_job_step_response = null;

    /**
     * @var LoaderInterface|null
     */
    protected $loader = null;


    /**
     * Gets the batch instance
     *
     * @return  EED_Module|EED_Batch
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function instance(): EED_Batch
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * Sets hooks to enable batch jobs on the frontend. Disabled by default
     * because it's an attack vector and there are currently no implementations
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function set_hooks()
    {
        // because this is a possible attack vector, let's have this disabled until
        // we at least have a real use for it on the frontend
        if (apply_filters('FHEE__EED_Batch__set_hooks__enable_frontend_batch', false)) {
            add_action('wp_enqueue_scripts', [self::instance(), 'enqueue_scripts']);
            add_filter('template_include', [self::instance(), 'override_template'], 99);
        }
    }


    /**
     * Initializes some hooks for the admin in order to run batch jobs
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function set_hooks_admin()
    {
        add_action('load-admin_page_espresso_batch', [self::instance(), 'setPageTitle']);
        add_action('admin_menu', [self::instance(), 'register_admin_pages']);
        add_action('admin_enqueue_scripts', [self::instance(), 'enqueue_scripts']);

        // ajax
        add_action('wp_ajax_espresso_batch_continue', [self::instance(), 'continueBatchJob']);
        add_action('wp_ajax_espresso_batch_advance', [self::instance(), 'advanceBatchJob']);
        add_action('wp_ajax_espresso_batch_cleanup', [self::instance(), 'cleanupBatchJob']);
        add_action('wp_ajax_nopriv_espresso_batch_continue', [self::instance(), 'continueBatchJob']);
        add_action('wp_ajax_nopriv_espresso_batch_advance', [self::instance(), 'advanceBatchJob']);
        add_action('wp_ajax_nopriv_espresso_batch_cleanup', [self::instance(), 'cleanupBatchJob']);
    }


    /**
     * @return LoaderInterface
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.9.80.p
     */
    protected function getLoader(): LoaderInterface
    {
        if (! $this->loader instanceof LoaderInterface) {
            $this->loader = LoaderFactory::getLoader();
        }
        return $this->loader;
    }


    /**
     * Enqueues batch scripts on the frontend or admin, and creates a job
     */
    public function enqueue_scripts()
    {
        $request = EED_Batch::getRequest();
        if (
            $request->getRequestParam(EED_Batch::PAGE_SLUG)
            || $request->getRequestParam('page') === EED_Batch::PAGE_SLUG
        ) {
            if (
                ! $request->requestParamIsSet('default_nonce')
                || ! wp_verify_nonce($request->getRequestParam('default_nonce'), 'default_nonce')
            ) {
                wp_die(
                    esc_html__(
                        'The link you clicked to start the batch job has expired. Please go back and refresh the previous page.',
                        'event_espresso'
                    )
                );
            }
            switch ($this->batch_request_type()) {
                case self::batch_job:
                    $this->enqueue_scripts_styles_batch_create();
                    break;
                case self::batch_file_job:
                    $this->enqueue_scripts_styles_batch_file_create();
                    break;
            }
        }
    }


    /**
     * Create a batch job, enqueues a script to run it, and localizes some data for it
     */
    public function enqueue_scripts_styles_batch_create()
    {
        $job_response = $this->_enqueue_batch_job_scripts_and_styles_and_start_job();
        wp_enqueue_script(
            'batch_runner_init',
            BATCH_URL . 'assets/batch_runner_init.js',
            ['batch_runner'],
            date('Y-m-d-H:i', time()),
            true
        );
        wp_localize_script('batch_runner_init', 'ee_job_response', $job_response->to_array());
        wp_localize_script('batch_runner_init', 'eei18n', EE_Registry::$i18n_js_strings);

        $return_url = EED_Batch::getRequest()->getRequestParam('return_url', '', DataType::URL);
        if ($return_url) {
            wp_localize_script(
                'batch_runner_init',
                'ee_job_i18n',
                [
                    'return_url'                => $return_url,
                    'auto_redirect_on_complete' => EED_Batch::getRequest()->getRequestParam(
                        'auto_redirect_on_complete'
                    ),
                    'user_message'              => EED_Batch::getRequest()->getRequestParam('assessment_notice')
                        ?: EED_Batch::getRequest()->getRequestParam('job_start_notice'),
                ]
            );
        }
    }


    /**
     * Creates a batch job which will download a file, enqueues a script to run the job, and localizes some data for it
     */
    public function enqueue_scripts_styles_batch_file_create()
    {
        // creates a job based on the request variable
        $job_response = $this->_enqueue_batch_job_scripts_and_styles_and_start_job();
        wp_enqueue_script(
            'batch_file_runner_init',
            BATCH_URL . 'assets/batch_file_runner_init.js',
            ['batch_runner'],
            date('Y-m-d-H:i', time()),
            true
        );
        wp_localize_script('batch_file_runner_init', 'ee_job_response', $job_response->to_array());
        wp_localize_script('batch_file_runner_init', 'eei18n', EE_Registry::$i18n_js_strings);

        $return_url = EED_Batch::getRequest()->getRequestParam('return_url', '', DataType::URL);
        if ($return_url) {
            wp_localize_script(
                'batch_file_runner_init',
                'ee_job_i18n',
                ['return_url' => $return_url]
            );
        }
    }


    /**
     * Enqueues scripts and styles common to any batch job, and creates
     * a job from the request data, and stores the response in the
     * $this->_job_step_response property
     *
     * @return JobStepResponse
     */
    protected function _enqueue_batch_job_scripts_and_styles_and_start_job(): JobStepResponse
    {
        // just copy the bits of EE admin's eei18n that we need in the JS
        EE_Registry::$i18n_js_strings['batchJobError'] = __(
            'An error occurred and the job has been stopped. Please refresh the page to try again.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['is_admin']      = is_admin();
        wp_enqueue_style(
            EspressoLegacyAdminAssetManager::CSS_HANDLE_EE_ADMIN,
            EE_ADMIN_URL . 'assets/ee-admin-page.css',
            ['espresso_admin_base'],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style(
            'batch_runner',
            BATCH_URL . 'assets/batch_runner.css',
            [EspressoLegacyAdminAssetManager::CSS_HANDLE_EE_ADMIN],
            date('Y-m-d-H:i', time())
        );
        wp_register_script(
            'progress_bar',
            EE_PLUGIN_DIR_URL . 'core/libraries/batch/Assets/progress_bar.js',
            ['jquery'],
            date('Y-m-d-H:i', time()),
            true
        );
        wp_enqueue_style(
            'progress_bar',
            EE_PLUGIN_DIR_URL . 'core/libraries/batch/Assets/progress_bar.css',
            [],
            date('Y-m-d-H:i', time())
        );
        wp_enqueue_script(
            'batch_runner',
            EE_PLUGIN_DIR_URL . 'core/libraries/batch/Assets/batch_runner.js',
            ['progress_bar', CoreAssetManager::JS_HANDLE_CORE],
            date('Y-m-d-H:i', time()),
            true
        );
        /** @var BatchRequestProcessor $batch_runner */
        $batch_runner = $this->getLoader()->getShared('EventEspresso\core\libraries\batch\BatchRequestProcessor');
        // eg 'EventEspresso\core\libraries\batch\JobHandlers\RegistrationsReport'
        // remember the response for later. We need it to display the page body
        $this->_job_step_response = $batch_runner->createJob();
        return $this->_job_step_response;
    }


    /**
     * If we are doing a frontend batch job, this makes it so WP shows our template's HTML
     *
     * @param string $template
     * @return string
     */
    public function override_template(string $template): string
    {
        $request = EED_Batch::getRequest();
        if ($request->requestParamIsSet('batch') && $request->requestParamIsSet(EED_Batch::PAGE_SLUG)) {
            return EE_MODULES . 'batch/templates/batch_frontend_wrapper.template.php';
        }
        return $template;
    }


    /**
     * Adds an admin page which doesn't appear in the admin menu
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function register_admin_pages()
    {
        add_submenu_page(
            // parent slug. we don't want this to actually appear in the menu
            '',
            // page title
            esc_html__('Batch Job', 'event_espresso'),
            // menu title
            'n/a',
            // we want this page to actually be accessible to anyone,
            'read',
            // menu slug
            EED_Batch::PAGE_SLUG,
            // callback
            [self::instance(), 'show_admin_page']
        );
    }


    /**
     * prevents the following notice from appearing in the error log:
     * PHP Deprecated:  strip_tags():
     * Passing null to parameter #1 ($string) of type string is deprecated
     * in /wp-admin/admin-header.php on line 36
     *
     * @return void
     * @since 5.0.18.p
     */
    public function setPageTitle()
    {
        global $title;
        $title = esc_html__('Batch Job', 'event_espresso');
    }


    /**
     * Renders the admin page, after most of the work was already done during enqueuing scripts
     * of creating the job and localizing some data
     */
    public function show_admin_page()
    {
        echo EEH_Template::locate_template(
            EE_MODULES . 'batch/templates/batch_wrapper.template.php',
            [
                'batch_request_type'        => $this->batch_request_type(),
                'auto_redirect_on_complete' => EED_Batch::getRequest()->getRequestParam('auto_redirect_on_complete'),
                'user_message'              => EED_Batch::getRequest()->getRequestParam('assessment_notice')
                    ?: EED_Batch::getRequest()->getRequestParam('job_start_notice'),
            ]
        );
    }


    private function runBatchRunnerJob(string $job)
    {
        $job_id = EED_Batch::getRequest()->getRequestParam('job_id');
        /** @var BatchRequestProcessor $batch_runner */
        $batch_runner = $this->getLoader()->getShared('EventEspresso\core\libraries\batch\BatchRequestProcessor');
        $job_response = $batch_runner->{$job}($job_id);
        $this->_return_json($job_response->to_array());
    }


    /**
     * Receives ajax calls for continuing a job
     */
    public function continueBatchJob()
    {
        $this->runBatchRunnerJob('continueJob');
    }


    /**
     * Receives ajax calls for continuing a job
     */
    public function advanceBatchJob()
    {
        $this->runBatchRunnerJob('advanceJob');
    }


    /**
     * Receives the ajax call to cleanup a job
     *
     * @return void
     */
    public function cleanupBatchJob()
    {
        $this->runBatchRunnerJob('cleanupJob');
    }


    /**
     * Returns a json response
     *
     * @param array $data The data we want to send echo via in the JSON response's "data" element
     *
     * The returned json object is created from an array in the following format:
     * array(
     *    'notices' => '', // - contains any EE_Error formatted notices
     *    'data' => array() //this can be any key/value pairs that a method returns for later json parsing by the js.
     *    We're also going to include the template args with every package (so js can pick out any specific template
     *    args that might be included in here)
     *    'isEEajax' => true,//indicates this is a response from EE
     * )
     */
    protected function _return_json(array $data)
    {
        $json = [
            'data'     => $data,
            'isEEajax' => true,
            // special flag so any ajax.Success methods in js can identify this return package as a EEajax package.
        ];

        // make sure there are no php errors or headers_sent.  Then we can set correct json header.
        if (error_get_last() === null || ! headers_sent()) {
            $notices = EE_Error::get_notices(false);
            header('Content-Type: application/json; charset=UTF-8');
            echo wp_json_encode($json + $notices);
            exit();
        }
    }


    /**
     * Gets the job step response which was done during the enqueuing of scripts
     *
     * @return JobStepResponse
     */
    public function job_step_response(): JobStepResponse
    {
        return $this->_job_step_response;
    }


    /**
     * Gets the batch request type indicated in the current request
     *
     * @return string: EED_Batch::batch_job, EED_Batch::batch_file_job, EED_Batch::batch_not_job
     */
    public function batch_request_type(): string
    {
        if (! $this->_batch_request_type) {
            $request = EED_Batch::getRequest();
            $batch   = $request->getRequestParam('batch');
            switch ($batch) {
                case self::batch_job:
                    $this->_batch_request_type = self::batch_job;
                    break;
                case self::batch_file_job:
                    $this->_batch_request_type = self::batch_file_job;
                    break;
                default:
                    // if we didn't find that it was a batch request, indicate it wasn't
                    $this->_batch_request_type = self::batch_not_job;
            }
        }
        return $this->_batch_request_type;
    }


    /**
     * Unnecessary
     *
     * @param WP $WP
     */
    public function run($WP)
    {
    }
}
