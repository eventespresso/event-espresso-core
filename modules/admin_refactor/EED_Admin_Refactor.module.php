<?php

use EventEspresso\core\domain\services\assets\AdminRefactorAssetManager;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;

/**
 * @package        Event Espresso
 * @subpackage     /modules/admin_refactor/
 * @author         Brent Christensen
 */
class EED_Admin_Refactor extends EED_Module
{


    /**
     * @var WP_Post $post
     */
    private $post;

    /**
     * @var EE_Event $event
     */
    private $event;


    /**
     * @return EED_Module|EED_Admin_Refactor
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks()
    {
    }


    /**
     * set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks_admin()
    {
        add_action('AHEE__EE_System__initialize', array('EED_Admin_Refactor', 'loadAdminRefactorComponents'));
        add_action('add_meta_boxes_espresso_events', array('EED_Admin_Refactor', 'add_meta_boxes'));
    }

    /**
     * run - initial module setup
     * this method is primarily used for activating resources in the EE_Front_Controller thru the use of filters
     *
     * @var WP $WP
     * @return void
     */
    public function run($WP)
    {
        // TODO: Implement run() method.
    }


    /**
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws Exception
     */
    public static function loadAdminRefactorComponents()
    {
        try {
            $request = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\request\RequestInterface');
            if ($request instanceof RequestInterface) {
                $page = $request->getRequestParam('page');
                $action = $request->getRequestParam('action');
                if ($page === 'espresso_events') {
                    if ($action === 'edit' || $action === 'create_new') {
                        add_action(
                            'AHEE__caffeinated_admin_new_pricing_templates__event_tickets_metabox_main__before_content',
                            array(EED_Admin_Refactor::instance(), 'adminRefactor'), 10
                        );
                        EED_Admin_Refactor::loadAdminRefactorAssetManager();
                    }
                }
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function loadAdminRefactorAssetManager()
    {
        EE_Dependency_Map::register_dependencies(
            'EventEspresso\core\domain\services\assets\AdminRefactorAssetManager',
            array(
                'EventEspresso\core\domain\Domain' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\Registry' => EE_Dependency_Map::load_from_cache,
            )
        );
        LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\services\assets\AdminRefactorAssetManager'
        );
        add_action('admin_enqueue_scripts', array('EED_Admin_Refactor', 'enqueueScripts'), 100 );
    }


    /**
     * enqueue_scripts - Load the scripts and css
     *
     * @return void
     * @throws DomainException
     */
    public static function enqueueScripts()
    {
        wp_enqueue_style(AdminRefactorAssetManager::CSS_HANDLE_ADMIN_REFACTOR);
        wp_enqueue_script(AdminRefactorAssetManager::JS_HANDLE_ADMIN_REFACTOR);
    }

    /**
     * @return void
     */
    public static function add_meta_boxes(WP_Post $post)
    {
        $admin_refactor = EED_Admin_Refactor::instance();
        $admin_refactor->post = $post;
    }

    /**
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function adminRefactor()
    {
        $this->event = EEM_Event::instance()->get_one_by_ID($this->post->ID);
        $datetimes = $this->event->datetimes_in_chronological_order();
        $venue = $this->getVenue();
        $venue_name = $venue->name();
        $edit_venue_link = $this->getEditVenueLink($venue);
        foreach ($datetimes as $datetime) {
            $arr[] = array(
                'id' => $datetime->ID(),
                'name' => $datetime->name(),
                'start' => $datetime->start_date('D M d Y H:i:s O'),
                'end' => $datetime->end_date('D M d Y H:i:s O'),
                'status' => $datetime->get_active_status(),
                'reg_list_url' => EE_Admin_Page::add_query_args_and_nonce(
                    array('event_id' => $datetime->event()->ID(), 'datetime_id' => $datetime->ID()),
                    REG_ADMIN_URL
                ),
                'sold' => $datetime->sold(),
                'reserved' => $datetime->reserved(),
                'reg_limit' => $datetime->reg_limit() === INF ? 'INF' : $datetime->reg_limit(),
                'venue' => $venue_name,
                'edit_venue_link' => $edit_venue_link,
                'recurrencePattern' => $datetime->ID() > 24 ? 'FREQ=DAILY;INTERVAL=1;COUNT=10' : '',
                'exclusionPattern' => '',
            );
        }
        echo '
        <script type="text/javascript">
            /* <![CDATA[ */
                var remEventDatesList = ' . json_encode($arr) . '
            /* ]]> */
        </script>
        <div id="ee-editor-admin-refactor"></div>';
    }

    /**
     * @since $VID:$
     * @return EE_Venue|mixed|null
     * @throws EE_Error
     */
    public function getVenue()
    {
        /** @var EE_Venue[] $venues */
        $venues = $this->event->venues();
        return is_array($venues) ? reset($venues) : null;
    }

    /**
     * @param EE_Venue $venue
     * @since $VID:$
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function getEditVenueLink(EE_Venue $venue)
    {
        if ($venue instanceof EE_Venue) {
            return EE_Admin_Page::add_query_args_and_nonce(
                array('action' => 'edit', 'post' => $venue->ID()),
                EE_VENUES_ADMIN_URL
            );
        }
        return EE_Admin_Page::add_query_args_and_nonce(
            array('action' => 'create_new', 'page' => 'espresso_venues'),
            EE_VENUES_ADMIN_URL
        );
    }
}
