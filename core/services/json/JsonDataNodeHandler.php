<?php

namespace EventEspresso\core\services\json;

use DomainException;
use EE_Registry;

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
        if ($data_node->isNotInitialized()) {
            $this->validatePrimaryDataNode($data_node);
            $this->primary_data_node->addDataNode($data_node);
        }
    }


    /**
     * @param PrimaryJsonDataNode $primary_data_node
     */
    public function setPrimaryDataNode(PrimaryJsonDataNode $primary_data_node)
    {
        $this->primary_data_node = $primary_data_node;
    }


    /**
     * @param JsonDataNode $data_node
     * @param int                $depth
     * @return mixed
     * @since $VID:$
     */
    private function initializeDataNodes(JsonDataNode $data_node, $depth = 0)
    {
        $depth++;
        $data = [];
        // initialize the data node if not done already
        if ($data_node->isNotInitialized()) {
            $data_node->initialize();
            // grab the data node's data array
            $data_node_data = $data_node->data();
            foreach ($data_node_data as $child_node_name => $child_node) {
                // don't parse node if it's the primary, OR if depth has exceeded wp_json_encode() limit
                if ($child_node instanceof PrimaryJsonDataNode || $depth > 512) {
                    continue;
                }
                if ($child_node instanceof JsonDataNode) {
                    // feed data node back into this function
                    $data[ $child_node_name ] = $this->initializeDataNodes($child_node, $depth);
                } else {
                    // or assign data directly
                    $data[ $child_node_name ] = $child_node;
                }
            }
        }
        return $data;
    }


    /**
     * @throws DomainException
     * @since $VID:$
     */
    public function printDataNode()
    {
        if (!$this->primary_data_node instanceof PrimaryJsonDataNode) {
            return;
        }
        // validate that the domain, node name, and target script are set
        $domain = $this->primary_data_node->domain();
        $node_name = $this->primary_data_node->nodeName();
        $target_script = $this->primary_data_node->targetScript();
        $data_valid =  $this->validator->validateCriticalProperty($domain, 'domain route', false)
                       && $this->validator->validateCriticalProperty($node_name, 'node name', false)
                       && $this->validator->validateCriticalProperty($target_script, 'target script', false);
        if (! $data_valid) {
            return;
        }
        // initialize and parse data from primary data node
        $data = $this->initializeDataNodes($this->primary_data_node);
        // this prepends the current domain "use case" to the front of the array
        $data = ['domain' => $domain] + $data;
        // add legacy i18n strings
        $data['eei18n'] = EE_Registry::$i18n_js_strings;
        // and finally JSON encode the data and attach to the target script
        $data = json_encode($data);
        wp_add_inline_script($target_script, "var {$node_name}={$data};", 'before');
    }


    /**
     * @param JsonDataNode $data_node
     * @throws DomainException
     */
    private function validatePrimaryDataNode(JsonDataNode $data_node)
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
    }
}
