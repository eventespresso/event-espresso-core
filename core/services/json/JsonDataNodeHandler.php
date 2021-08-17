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
     * @return array
     */
    private function initializeDataNodes(JsonDataNode $data_node, int $depth = 0): array
    {
        $depth++;
        $data = [];
        // initialize the data node if not done already
        if ($data_node->isNotInitialized()) {
            $data_node->initialize();
            // loop thru the data node's data array
            foreach ($data_node->data(true) as $child_node_name => $child_node) {
                // don't parse node if it's the primary, OR if depth has exceeded wp_json_encode() limit
                if ($child_node instanceof PrimaryJsonDataNode || $depth > 512) {
                    continue;
                }
                $data[ $child_node_name ] = $child_node instanceof JsonDataNode
                    // feed data node back into this function
                    ? $this->initializeDataNodes($child_node, $depth)
                    // or assign data directly
                    : $child_node;
            }
        }
        return $data;
    }


    /**
     * @throws DomainException
     */
    public function printDataNode()
    {
        if (!$this->primary_data_node instanceof PrimaryJsonDataNode) {
            return;
        }
        // validate that the domain, node name, and target script are set
        $domain = $this->primary_data_node->domain();
        $node_name = $this->primary_data_node->nodeName();
        $data_valid =  $this->validator->validateCriticalProperty($domain, 'domain route', false)
                       && $this->validator->validateCriticalProperty($node_name, 'node name', false);
        if (! $data_valid) {
            return;
        }
        // initialize and parse data from primary data node
        $data = $this->initializeDataNodes($this->primary_data_node);
        // this prepends the current domain "use case" to the front of the array
        $data = ['domain' => $domain] + $data;
        // add legacy i18n strings
        $data['eei18n'] = EE_Registry::$i18n_js_strings;
        // and finally, print the JSON encoded data to the DOM
        printf(
            "<script type='text/javascript' id='%s'>\nvar %s = %s\n</script>\n",
            $node_name,
            $node_name,
            json_encode($data)
        );
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
