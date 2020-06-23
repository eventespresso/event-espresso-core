<?php

namespace EventEspresso\core\services\json;


use DomainException;
use JsonSerializable;

/**
 * Class JsonDataNode
 * a DTO (Data Transfer Object) that:
 *  - allows other JsonDataNode objects to be embedded within it to create hierarchical data structures
 *  - correctly converts to JSON upon serialization
 *  - is intended to be written to the DOM for JavaScript use
 *
 * @package EventEspresso\core\services\json
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface JsonDataNodeInterface extends JsonSerializable
{

    /**
     * @param JsonDataNode $data_node
     * @throws DomainException
     */
    public function addDataNode(JsonDataNode $data_node);


    /**
     * the actual data in key value array format
     *
     * @return array
     */
    public function data();


    /**
     * specifies the domain (use case) that this route defines
     * ! IMPORTANT !
     * only one domain can be set pre request
     *
     * @return string
     */
    public function domain();


    /**
     * !!! IMPORTANT !!!
     * JsonDataNode::setInitialized(true) needs to be called once initialization is complete
     * else you're a bad person and bad things will happen to you !!!
     *
     * @since $VID:$
     */
    public function initialize();


    /**
     * true if the data node has been initialized,
     * which entails retrieving the required data and adding it to the data node data array
     *
     * @return bool
     */
    public function isInitialized();


    /**
     * true if the data node has NOT been initialized
     *
     * @return bool
     */
    public function isNotInitialized();


    /**
     * @return string
     * @since $VID:$
     */
    public function nodeName();
}