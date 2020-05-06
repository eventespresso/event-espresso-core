<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use DomainException;
use EE_Admin_Config;
use EE_Error;
use EE_Event;
use EventEspresso\core\domain\entities\admin\GraphQLData\CurrentUser;
use EventEspresso\core\domain\entities\admin\GraphQLData\GeneralSettings;
use EventEspresso\core\domain\services\assets\EspressoEditorAssetManager;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\ModelConfigurationException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\assets\JedLocaleData;
use InvalidArgumentException;
use ReflectionException;
use WP_Post;
use WPGraphQL\Router;

/**
 * Class EventEditor
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Manzoor Wani,  Brent Christensen
 * @since   $VID:$
 */
class EventEditor
{

    /**
     * @var EE_Admin_Config
     */
    protected $admin_config;

    /**
     * @var CurrentUser $current_user
     */
    protected $current_user;

    /**
     * @var EE_Event
     */
    protected $event;

    /**
     * @var EventEditorGraphQLData
     */
    protected $event_editor_gql_data;

    /**
     * @var GeneralSettings $general_settings
     */
    protected $general_settings;

    /**
     * @var JedLocaleData $jed_locale
     */
    private $jed_locale;


    /**
     * EventEditor constructor.
     *
     * @param EE_Admin_Config $admin_config
     * @param CurrentUser $current_user
     * @param EE_Event        $event
     * @param EventEditorGraphQLData $event_editor_gql_data
     * @param GeneralSettings $general_settings
     * @param JedLocaleData   $jed_locale
     */
    public function __construct(
        EE_Admin_Config $admin_config,
        CurrentUser $current_user,
        EE_Event $event,
        EventEditorGraphQLData $event_editor_gql_data,
        GeneralSettings $general_settings,
        JedLocaleData $jed_locale
    ) {
        $this->admin_config = $admin_config;
        $this->current_user = $current_user;
        $this->event = $event;
        $this->event_editor_gql_data = $event_editor_gql_data;
        $this->general_settings = $general_settings;
        $this->jed_locale = $jed_locale;
        add_action('admin_enqueue_scripts', [$this, 'loadScriptsStyles']);
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ModelConfigurationException
     * @throws ReflectionException
     * @throws UnexpectedEntityException
     * @throws DomainException
     * @since $VID:$
     */
    public function loadScriptsStyles()
    {
        if ($this->admin_config->useAdvancedEditor()) {
            $eventId = $this->event instanceof EE_Event ? $this->event->ID() : 0;
            if (! $eventId) {
                global $post;
                $eventId = isset($_REQUEST['post']) ? absint($_REQUEST['post']) : 0;
                // if there's no event ID but there IS a WP Post... then use the Post ID
                $use_post_id = $eventId === 0 && $post instanceof WP_Post && $post->post_type === 'espresso_events';
                $eventId = $use_post_id ? $post->ID : $eventId;
            }
            if ($eventId) {
                $data = $this->getEditorData($eventId);
                $data = wp_json_encode($data);
                add_action(
                    'admin_footer',
                    static function () use ($data) {
                        wp_add_inline_script(
                            EspressoEditorAssetManager::JS_HANDLE_EDITOR,
                            "
var eeEditorData={$data};
",
                            'before'
                        );
                    }
                );
            }
        }
    }


    /**
     * @param int $eventId
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    protected function getEditorData($eventId)
    {
        $event = $this->event_editor_gql_data->getData($eventId);
        $event['dbId'] = $eventId;

        $graphqlEndpoint = class_exists('WPGraphQL') ? trailingslashit(site_url()) . Router::$route : '';
        $graphqlEndpoint = esc_url($graphqlEndpoint);

        $currentUser = $this->current_user->getData();

        $generalSettings = $this->general_settings->getData();

        $i18n = $this->jed_locale->getData('event_espresso');

        $assetsUrl = EE_PLUGIN_DIR_URL . 'assets/dist/';

        return compact('event', 'graphqlEndpoint', 'currentUser', 'generalSettings', 'i18n', 'assetsUrl');
    }
}
