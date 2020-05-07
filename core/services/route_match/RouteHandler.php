<?php

namespace EventEspresso\core\services\route_match;

use EE_Config;
use EE_Dependency_Map;
use EE_Maintenance_Mode;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;
use Exception;

/**
 * Class RouteHandler
 * Description
 *
 * @package EventEspresso\core\domain\services\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RouteHandler
{

    /**
     * @var LoaderInterface
     */
    private $loader;

    /**
     * @var EE_Maintenance_Mode $maintenance_mode
     */
    private $maintenance_mode;

    /**
     * @var RequestInterface $request
     */
    private $request;

    /**
     * @var RouteMatchSpecificationManager $route_manager
     */
    private $route_manager;

    /**
     * AdminRouter constructor.
     *
     * @param LoaderInterface  $loader
     * @param EE_Maintenance_Mode $maintenance_mode
     * @param RequestInterface $request
     * @param RouteMatchSpecificationManager $route_manager
     */
    public function __construct(
        LoaderInterface $loader,
        EE_Maintenance_Mode $maintenance_mode,
        RequestInterface $request,
        RouteMatchSpecificationManager $route_manager)
    {
        $this->loader = $loader;
        $this->maintenance_mode = $maintenance_mode;
        $this->request = $request;
        $this->route_manager = $route_manager;
    }


    /**
     * @throws Exception
     * @since $VID:$
     */
    public function handleAssetManagerRequest()
    {
        try {
            if (! $this->request->isAdmin()
                && ! $this->request->isFrontend()
                && ! $this->request->isIframe()
                && ! $this->request->isWordPressApi()
            ) {
                return;
            }
            $this->loader->getShared('EventEspresso\core\services\assets\Registry');
            $this->loader->getShared('EventEspresso\core\domain\services\assets\CoreAssetManager');
            if ($this->canLoadBlocks()) {
                $this->loader->getShared(
                    'EventEspresso\core\services\editor\BlockRegistrationManager'
                );
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * Return whether blocks can be registered/loaded or not.
     *
     * @return bool
     * @since $VID:$
     */
    private function canLoadBlocks()
    {
        return apply_filters('FHEE__EE_System__canLoadBlocks', true)
               && function_exists('register_block_type')
               // don't load blocks if in the Divi page builder editor context
               // @see https://github.com/eventespresso/event-espresso-core/issues/814
               && ! $this->request->getRequestParam('et_fb', false);
    }


    /**
     * @throws Exception
     * @since $VID:$
     */
    public function handleControllerRequest()
    {
        try {
            $this->handleAdminRequest();
            $this->handleFrontendRequest();
            $this->handleWordPressHeartbeatRequest();
            $this->handleWordPressPluginsPage();
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @throws Exception
     * @since $VID:$
     */
    private function handleAdminRequest()
    {
        try {
            if (! $this->request->isAdmin() || $this->request->isAdminAjax()) {
                return;
            }
            do_action('AHEE__EE_System__load_controllers__load_admin_controllers');
            $this->loader->getShared('EE_Admin');

            EE_Dependency_Map::register_dependencies(
                'EventEspresso\core\domain\services\assets\EspressoAdminAssetManager',
                [
                    'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                    'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                    'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
                ]
            );
            $this->loader->getShared('EventEspresso\core\domain\services\assets\EspressoAdminAssetManager');
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @throws Exception
     * @since $VID:$
     */
    private function handleFrontendRequest()
    {
        try {
            // don't load frontend if M-Mode is active or request is not browser HTTP
            if ($this->maintenance_mode->level() || ! $this->request->isFrontend() || ! $this->request->isFrontAjax()) {
                return;
            }
            do_action('AHEE__EE_System__load_controllers__load_front_controllers');
            $this->loader->getShared('EE_Front_Controller');
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @return bool
     * @since $VID:$
     */
    private function isGQLRequest()
    {
        return PHP_VERSION_ID < 70000
               && ! $this->request->isUnitTest()
               && (
                   $this->request->isGQL()
                   || $this->route_manager->routeMatchesCurrentRequest(
                       'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditor'
                   )
               );
    }


    /**
     * @throws Exception
     * @since $VID:$
     */
    public function handleGQLRequest()
    {
        try {
            if (! $this->isGQLRequest()) {
                return;
            }
            if (! class_exists('WPGraphQL')) {
                require_once EE_THIRD_PARTY . 'wp-graphql/wp-graphql.php';
            }
            // load handler for EE GraphQL requests
            $graphQL_manager = $this->loader->getShared(
                'EventEspresso\core\services\graphql\GraphQLManager'
            );
            $graphQL_manager->init();
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @throws Exception
     * @since $VID:$
     */
    public function handlePersonalDataRequest()
    {
        try {
            // don't load frontend if M-Mode is active or request is not browser HTTP
            if (! $this->request->isAdmin()
                || ! $this->request->isAjax()
                || ! $this->maintenance_mode->models_can_query()
            ) {
                return;
            }
            $this->loader->getShared('EventEspresso\core\services\privacy\erasure\PersonalDataEraserManager');
            $this->loader->getShared('EventEspresso\core\services\privacy\export\PersonalDataExporterManager');
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @throws Exception
     * @since $VID:$
     */
    public function handlePueRequest()
    {
        try {
            if (is_admin() && apply_filters('FHEE__EE_System__brew_espresso__load_pue', true)) {
                // pew pew pew
                $this->loader->getShared('EventEspresso\core\services\licensing\LicenseService');
                do_action('AHEE__EE_System__brew_espresso__after_pue_init');
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @throws Exception
     * @since $VID:$
     */
    public function handleSessionRequest()
    {
        try {
            if (! $this->request->isAdmin() && ! $this->request->isEeAjax() && ! $this->request->isFrontend()) {
                return;
            }
            $this->loader->getShared('EE_Session');
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @throws Exception
     * @since $VID:$
     */
    public function handleShortcodesRequest()
    {
        try {
            if (! $this->request->isFrontend() && ! $this->request->isIframe() && ! $this->request->isAjax()) {
                return;
            }
            // load, register, and add shortcodes the new way
            $this->loader->getShared(
                'EventEspresso\core\services\shortcodes\ShortcodesManager',
                [
                    // and the old way, but we'll put it under control of the new system
                    EE_Config::getLegacyShortcodesManager(),
                ]
            );
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @throws Exception
     * @since $VID:$
     */
    public function handleWordPressHeartbeatRequest()
    {
        try {
            if (! $this->request->isWordPressHeartbeat()) {
                return;
            }
            $this->loader->getShared('EventEspresso\core\domain\services\admin\ajax\WordpressHeartbeat');
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @throws Exception
     * @since $VID:$
     */
    public function handleWordPressPluginsPage()
    {
        try {
            if (! $this->request->isAdmin() || ! $this->route_manager->routeMatchesCurrentRequest(
                    'EventEspresso\core\domain\entities\route_match\specifications\admin\WordPressPluginsPage'
                )) {
                return;
            }
            EE_Dependency_Map::register_dependencies(
                'EventEspresso\core\domain\services\assets\WordpressPluginsPageAssetManager',
                [
                    'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                    'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                    'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
                ]
            );
            $this->loader->getShared('EventEspresso\core\domain\services\assets\WordpressPluginsPageAssetManager');
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }
}
