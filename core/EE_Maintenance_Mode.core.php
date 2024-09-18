<?php

use EventEspresso\core\domain\services\database\DbStatus;
use EventEspresso\core\domain\services\database\MaintenanceStatus;
use EventEspresso\core\interfaces\ResettableInterface;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\CurrentPage;
use EventEspresso\core\services\request\DataType;
use EventEspresso\core\services\request\RequestInterface;

/**
 * EE_Maintenance_Mode Class
 *
 * Super Duper Class Description
 *
 * @package     Event Espresso
 * @subpackage  core
 * @author      Michael Nelson
 */
class EE_Maintenance_Mode implements ResettableInterface
{
    /**
     * constants available to client code for interpreting the values of EE_Maintenance_Mode::level().
     * STATUS_OFF means the site is NOT in maintenance mode (so everything's normal)
     */
    public const STATUS_OFF = 0;


    /**
     * STATUS_PUBLIC_ONLY means that the site's frontend EE code should be completely disabled
     * but the admin backend should be running as normal. Maybe an admin can view the frontend though
     */
    public const STATUS_PUBLIC_ONLY = 1;

    /**
     * STATUS_FULL_SITE means the frontend AND EE backend code are disabled. The only system running
     * is the maintenance mode stuff, which will require users to update all addons, and then finish running all
     * migration scripts before taking the site out of maintenance mode
     */
    public const STATUS_FULL_SITE = 2;

    /**
     * the name of the option which stores the current level of maintenance mode
     */
    private const OPTION_NAME = 'ee_maintenance_mode';


    protected LoaderInterface $loader;

    private RequestInterface $request;

    private static ?EE_Maintenance_Mode $_instance = null;

    /**
     * @var int
     * @since 5.0.12.p
     */
    private int $status;

    /**
     * @var int
     * @since 5.0.12.p
     */
    private int $admin_status;

    /**
     * true if current_user_can('administrator')
     *
     * @var bool
     * @since 5.0.12.p
     */
    private bool $current_user_is_admin;

    /**
     * used to control updates to the WP options setting in the database
     *
     * @var bool
     * @since 5.0.12.p
     */
    private bool $update_db;


    /**
     * @singleton method used to instantiate class object
     * @param LoaderInterface|null  $loader
     * @param RequestInterface|null $request
     * @return EE_Maintenance_Mode|null
     */
    public static function instance(
        ?LoaderInterface $loader = null,
        ?RequestInterface $request = null
    ): ?EE_Maintenance_Mode {
        // check if class object is instantiated
        if (! self::$_instance instanceof EE_Maintenance_Mode) {
            self::$_instance = new EE_Maintenance_Mode($loader, $request);
        }
        return self::$_instance;
    }


    /**
     * Resets maintenance mode (mostly just re-checks whether we should be in maintenance mode)
     *
     * @return EE_Maintenance_Mode|null
     * @throws EE_Error
     */
    public static function reset(): ?EE_Maintenance_Mode
    {
        self::instance()->set_maintenance_mode_if_db_old();
        self::instance()->initialize();
        return self::instance();
    }


    /**
     *private constructor to prevent direct creation
     */
    private function __construct(LoaderInterface $loader, RequestInterface $request)
    {
        $this->loader                = $loader;
        $this->request               = $request;
        $this->initialize();

        // if M-Mode level 2 is engaged, we still need basic assets loaded
        add_action('wp_enqueue_scripts', [$this, 'load_assets_required_for_m_mode']);
        // shut 'er down for maintenance ?
        add_filter('the_content', [$this, 'the_content'], 2);
        // redirect ee menus to maintenance page
        add_action('admin_page_access_denied', [$this, 'redirect_to_maintenance']);
        // add powered by EE msg
        add_action('shutdown', [$this, 'display_maintenance_mode_notice']);
    }


    private function initialize(): void
    {
        $this->current_user_is_admin = current_user_can('administrator');
        // now make sure the status is set correctly everywhere
        // (but don't update the db else we'll get into an infinite loop of updates)
        $this->update_db = false;
        $this->set_maintenance_level($this->loadStatusFromDatabase());
        $this->update_db = true;
    }


    private function loadStatusFromDatabase(): int
    {
        return (int) get_option(EE_Maintenance_Mode::OPTION_NAME, EE_Maintenance_Mode::STATUS_OFF);
    }


    /**
     * changes the maintenance mode level to reflect whether the current user is an admin or not.
     * Determines whether we're in maintenance mode and what level. However, while the site
     * is in level 1 maintenance, and an admin visits the frontend, this function makes it appear
     * to them as if the site isn't in maintenance mode.
     *      EE_Maintenance_Mode::STATUS_OFF => not in maintenance mode (in normal mode)
     *      EE_Maintenance_Mode::STATUS_PUBLIC_ONLY=> frontend-only maintenance mode
     *      EE_Maintenance_Mode::STATUS_FULL_SITE => frontend and backend maintenance mode
     *
     * @param int $status
     * @return void
     * @since 5.0.12.p
     */
    private function setAdminStatus(int $status)
    {
        if (
            $status === EE_Maintenance_Mode::STATUS_PUBLIC_ONLY
            && $this->current_user_is_admin
            && ($this->request->isAjax() || ! $this->request->isAdmin())
        ) {
            $status = EE_Maintenance_Mode::STATUS_OFF;
        }
        $this->admin_status = $status;
    }


    public function real_level(): int
    {
        return $this->status;
    }


    /**
     * @return int
     */
    public function level(): int
    {
        return $this->admin_status;
    }


    /**
     * Determines if we need to put EE in maintenance mode because the database needs updating
     *
     * @return boolean true if DB is old and maintenance mode was triggered; false otherwise
     * @throws EE_Error
     */
    public function set_maintenance_mode_if_db_old(): bool
    {
        /** @var EE_Data_Migration_Manager $data_migration_manager */
        $data_migration_manager = $this->loader->getShared(EE_Data_Migration_Manager::class);
        $scripts_that_should_run = $data_migration_manager->check_for_applicable_data_migration_scripts();
        if (! empty($scripts_that_should_run)) { //  && $this->status !== EE_Maintenance_Mode::STATUS_FULL_SITE
            $this->activateFullSiteMaintenanceMode();
            return true;
        }
        if ($this->status === EE_Maintenance_Mode::STATUS_FULL_SITE) {
            // we also want to handle the opposite: if the site is mm2, but there aren't any migrations to run
            // then we shouldn't be in mm2. (Maybe an addon got deactivated?)
            $this->deactivateMaintenanceMode();
        }
        return false;
    }


    /**
     * Updates the maintenance level on the site
     *
     * @param int $level
     * @return void
     */
    public function set_maintenance_level(int $level): void
    {
        switch ($level) {
            case EE_Maintenance_Mode::STATUS_OFF:
                $this->deactivateMaintenanceMode();
                return;
            case EE_Maintenance_Mode::STATUS_PUBLIC_ONLY:
                $this->activatePublicOnlyMaintenanceMode();
                return;
            case EE_Maintenance_Mode::STATUS_FULL_SITE:
                $this->activateFullSiteMaintenanceMode();
                return;
        }
        throw new DomainException(
            sprintf(
                esc_html__(
                    '"%1$s" is not valid a EE maintenance mode level. Please choose from one of the following: %2$s',
                    'event_espresso'
                ),
                $level,
                'EE_Maintenance_Mode::STATUS_OFF, EE_Maintenance_Mode::STATUS_PUBLIC_ONLY, EE_Maintenance_Mode::STATUS_FULL_SITE',
            )
        );
    }


    /**
     * sets database status to online
     * sets maintenance mode status to public only, unless current user is an admin, then maintenance mode is disabled
     *
     * @return void
     * @since 5.0.12.p
     */
    public function activatePublicOnlyMaintenanceMode()
    {
        DbStatus::setOnline();
        // disable maintenance mode for admins, otherwise enable public only maintenance mode
        if ($this->current_user_is_admin) {
            MaintenanceStatus::disableMaintenanceMode();
        } else {
            MaintenanceStatus::setPublicOnlyMaintenanceMode();
        }
        $this->updateMaintenaceModeStatus(EE_Maintenance_Mode::STATUS_PUBLIC_ONLY);
    }


    /**
     * sets database status to offline
     * sets maintenance mode status to full site
     *
     * @return void
     * @since 5.0.12.p
     */
    public function activateFullSiteMaintenanceMode()
    {
        DbStatus::setOffline();
        MaintenanceStatus::setFullSiteMaintenanceMode();
        $this->updateMaintenaceModeStatus(EE_Maintenance_Mode::STATUS_FULL_SITE);
    }


    /**
     * sets database status to online
     * turns maintenance mode off
     *
     * @return void
     * @since 5.0.12.p
     */
    public function deactivateMaintenanceMode()
    {
        DbStatus::setOnline();
        MaintenanceStatus::disableMaintenanceMode();
        $this->updateMaintenaceModeStatus(EE_Maintenance_Mode::STATUS_OFF);
    }


    private function updateMaintenaceModeStatus(int $status)
    {
        $this->status = $status;
        $this->setAdminStatus($status);
        if (! $this->update_db) {
            return;
        }
        do_action('AHEE__EE_Maintenance_Mode__set_maintenance_level', $status);
        update_option(EE_Maintenance_Mode::OPTION_NAME, $status);
    }


    /**
     * returns TRUE if M-Mode is engaged and the current request is not for the admin
     *
     * @return bool
     */
    public static function disable_frontend_for_maintenance(): bool
    {
        return ! is_admin() && MaintenanceStatus::isNotDisabled();
    }


    /**
     * @return void
     */
    public function load_assets_required_for_m_mode(): void
    {
        if (
            $this->status === EE_Maintenance_Mode::STATUS_FULL_SITE
            && ! wp_script_is('espresso_core')
        ) {
            wp_register_style(
                'espresso_default',
                EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css',
                ['dashicons'],
                EVENT_ESPRESSO_VERSION
            );
            wp_enqueue_style('espresso_default');
            wp_register_script(
                'espresso_core',
                EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js',
                ['jquery'],
                EVENT_ESPRESSO_VERSION,
                true
            );
            wp_enqueue_script('espresso_core');
        }
    }


    /**
     * replacement EE CPT template that displays message notifying site visitors
     * that EE has been temporarily placed into maintenance mode
     * does NOT get called on non-EE-CPT requests
     *
     * @return    string
     */
    public static function template_include(): string
    {
        // shut 'er down for maintenance ? then don't use any of our templates for our endpoints
        return get_template_directory() . '/index.php';
    }


    /**
     * displays message notifying site visitors that EE has been temporarily
     * placed into maintenance mode when post_type != EE CPT
     *
     * @param string $the_content
     * @return string
     */
    public function the_content(string $the_content): string
    {
        // check if M-mode is engaged and for EE shortcode
        if ($this->admin_status && strpos($the_content, '[ESPRESSO_') !== false) {
            // this can eventually be moved to a template, or edited via admin. But for now...
            $the_content = sprintf(
                esc_html__(
                    '%sMaintenance Mode%sEvent Registration has been temporarily closed while system maintenance is being performed. We\'re sorry for any inconveniences this may have caused. Please try back again later.%s',
                    'event_espresso'
                ),
                '<h3>',
                '</h3><p>',
                '</p>'
            );
        }
        return $the_content;
    }


    /**
     * displays message on frontend of site notifying admin that EE has been temporarily placed into maintenance mode
     */
    public function display_maintenance_mode_notice()
    {
        if (
            ! $this->current_user_is_admin
            || $this->status === EE_Maintenance_Mode::STATUS_OFF
            || $this->request->isAdmin()
            || $this->request->isAjax()
            || ! did_action('AHEE__EE_System__load_core_configuration__complete')
        ) {
            return;
        }
        /** @var CurrentPage $current_page */
        $current_page = $this->loader->getShared(CurrentPage::class);
        if ($current_page->isEspressoPage()) {
            printf(
                esc_html__(
                    '%sclose%sEvent Registration is currently disabled because Event Espresso has been placed into Maintenance Mode. To change Maintenance Mode settings, click here %sEE Maintenance Mode Admin Page%s',
                    'event_espresso'
                ),
                '<div id="ee-m-mode-admin-notice-dv" class="ee-really-important-notice-dv"><a class="close-espresso-notice" title="',
                '"><span class="dashicons dashicons-no"></span></a><p>',
                ' &raquo; <a href="' . add_query_arg(
                    ['page' => 'espresso_maintenance_settings'],
                    admin_url('admin.php')
                ) . '">',
                '</a></p></div>'
            );
        }
    }
    // espresso-notices important-notice ee-attention


    /**
     * Redirects EE admin menu requests to the maintenance page
     */
    public function redirect_to_maintenance()
    {
        global $pagenow;
        $page = $this->request->getRequestParam('page', '', DataType::STRING);
        if (
            $pagenow == 'admin.php'
            && $page !== 'espresso_maintenance_settings'
            && strpos($page, 'espresso_') !== false
            && $this->status == EE_Maintenance_Mode::STATUS_FULL_SITE
        ) {
            EEH_URL::safeRedirectAndExit('admin.php?page=espresso_maintenance_settings');
        }
    }


    /**
     * override magic methods
     */
    final public function __destruct()
    {
    }


    final public function __call($a, $b)
    {
    }


    final public function __get($a)
    {
    }


    final public function __set($a, $b)
    {
    }


    final public function __isset($a)
    {
    }


    final public function __unset($a)
    {
    }


    final public function __sleep()
    {
        return [];
    }


    final public function __wakeup()
    {
    }


    final public function __invoke()
    {
    }


    final public static function __set_state($a = null)
    {
        return EE_Maintenance_Mode::instance();
    }


    final public function __clone()
    {
    }


    final public static function __callStatic($a, $b)
    {
    }


    /************************ @DEPRECATED ********************** */

    /**
     * @depecated 5.0.12.p
     */
    const level_0_not_in_maintenance = 0;

    /**
     * @depecated 5.0.12.p
     */
    const level_1_frontend_only_maintenance = 1;

    /**
     * @depecated 5.0.12.p
     */
    const level_2_complete_maintenance = 2;

    /**
     * @depecated 5.0.12.p
     */
    const option_name_maintenance_mode = 'ee_maintenance_mode';


    /**
     * Returns whether the models reportedly are able to run queries or not
     * (ie, if the system thinks their tables are present and up-to-date).
     *
     * @return boolean
     * @depecated 5.0.12.p
     */
    public function models_can_query(): bool
    {
        return DbStatus::isOnline();
    }
}
