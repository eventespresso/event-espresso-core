<?php

namespace EventEspresso\core\services\json;

use DomainException;
use EventEspresso\core\services\json\PrimaryJsonDataNode;

/**
 * Class JsonDataNodeHandler
 * registers JsonDataNode objects,
 * compiles data from them into a single JSON encoded string,
 * and prints that to the DOM as an inline script for the specified script handle
 *
 * @package EventEspresso\core\services\json
 * @author  Brent Christensen
 * @since   $VID:$
 */
class JsonDataNodeHandler
{

    /**
     * @var PrimaryJsonDataNode $primary_data_node
     */
    private $primary_data_node;

    /**
     * @var JsonDataNodeValidator $validator
     */
    private $validator;


    /**
     * JsonDataNodeHandler constructor.
     *
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(JsonDataNodeValidator $validator)
    {
        $this->validator = $validator;
    }


    /**
     * @param JsonDataNode $data_node
     * @throws DomainException
     */
    public function addDataNode(JsonDataNode $data_node)
    {
        // set primary data node if that's what the incoming node is
        if ($data_node instanceof PrimaryJsonDataNode) {
            $this->setPrimaryDataNode($data_node);
        }
        // and don't allow other nodes to be set until a primary is set
        if (! $this->primary_data_node instanceof PrimaryJsonDataNode) {
            throw new DomainException(
                esc_html__(
                    'A PrimaryJsonDataNode needs to be set before data nodes can be added.',
                    'event_espresso'
                )
            );
        }
        $this->primary_data_node->addDataNode($data_node);
    }


    /**
     * @since $VID:$
     */
    public function initialize()
    {
        add_action('admin_footer', [$this, 'printDataNode']);
        add_action('wp_footer', [$this, 'printDataNode']);
    }


    /**
     * @param PrimaryJsonDataNode $primary_data_node
     */
    public function setPrimaryDataNode(PrimaryJsonDataNode $primary_data_node)
    {
        $this->primary_data_node = $primary_data_node;
    }


    /**
     * @throws DomainException
     * @since $VID:$
     */
    public function printDataNode()
    {
        $domain = $this->primary_data_node->domain();
        $this->validator->validateCriticalProperty($domain, 'domain route');
        $node_name = $this->primary_data_node->nodeName();
        $this->validator->validateCriticalProperty($node_name, 'node name');
        $target_script = $this->primary_data_node->targetScript();
        $this->validator->validateCriticalProperty($target_script, 'target script');
        $data = wp_json_encode($this->primary_data_node);
        wp_add_inline_script($target_script, "var {$node_name}={$data};", 'before');
    }
}
