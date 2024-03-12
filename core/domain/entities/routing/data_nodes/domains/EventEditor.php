<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\domains;

use EE_Error;
use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;
use EventEspresso\core\domain\services\admin\events\editor\EventEditorGraphQLData;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;
use ReflectionException;
use WP_Post;

/**
 * Class EventEditor
 * Description
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes\domains
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class EventEditor extends JsonDataNode
{
    const NODE_NAME = 'eventEditor';


    /**
     * @var EventEditorGraphQLData
     */
    protected $event_editor_gql_data;


    /**
     * EventEditor JsonDataNode constructor.
     *
     * @param EventEditorGraphQLData $event_editor_gql_data
     * @param JsonDataNodeValidator  $validator
     */
    public function __construct(
        EventEditorGraphQLData $event_editor_gql_data,
        JsonDataNodeValidator $validator
    ) {
        parent::__construct($validator);
        $this->event_editor_gql_data = $event_editor_gql_data;
        $this->setDomain(EventEditor::NODE_NAME);
        $this->setNodeName(EventEditor::NODE_NAME);
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.0.p
     */
    public function initialize()
    {
        global $post;
        $eventId = isset($_REQUEST['post']) ? absint($_REQUEST['post']) : 0;
        // if there's no event ID but there IS a WP Post... then use the Post ID
        $use_post_id = $eventId === 0 && $post instanceof WP_Post && $post->post_type === EspressoPostType::EVENTS;
        $eventId = $use_post_id ? $post->ID : $eventId;
        $related_data = apply_filters(
            'FHEE__EventEspresso_core_domain_entities_routing_data_nodes_domains_EventEditor__initialize__related_data',
            $this->event_editor_gql_data->getData($eventId),
            $eventId
        );
        foreach ($related_data as $key => $value) {
            $this->addData($key, $value);
        }
    }
}
