<?php

namespace EventEspresso\core\services\json;

use DomainException;

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
abstract class JsonDataNode implements JsonDataNodeInterface
{

    /**
     * @var JsonDataNodeValidator $validator
     */
    protected $validator;

    /**
     * @var array $data
     */
    private $data = [];

    /**
     * @var string $domain
     */
    private $domain;

    /**
     * @var boolean $initialized
     */
    private $initialized = false;

    /**
     * @var string $node_name
     */
    private $node_name;


    /**
     * @param JsonDataNodeValidator $validator
     * @throws DomainException
     */
    public function __construct(JsonDataNodeValidator $validator)
    {
        $this->validator = $validator;
    }


    /**
     * for adding primitive data like arrays, integers, or strings
     *
     * @param string $key
     * @param mixed  $data
     * @throws DomainException
     */
    protected function addData($key, $data)
    {
        if ($this->validator->propertyNotSet($this->data, $key)) {
            $this->data[ $key ] = $data;
        }
    }


    /**
     * for setting value of the entire data array for the node
     *
     * @param array $data
     * @throws DomainException
     */
    protected function setDataArray(array $data)
    {
        if ($this->validator->dataArrayEmpty($this)) {
            $this->data = $data;
        }
    }


    /**
     * for embedding other JsonDataNode objects within this one
     *
     * @param JsonDataNode $data_node
     * @throws DomainException
     */
    public function addDataNode(JsonDataNode $data_node)
    {
        if ($data_node->isNotInitialized()) {
            // $data_node->initialize();
            $key = $data_node->nodeName();
            $this->addData($key, $data_node);
            // if the node being added specifies a domain (use case)
            // and this is the primary data node, then set the domain
            if ($this instanceof PrimaryJsonDataNode && $data_node->domain() !== null) {
                $this->setDomain($data_node->domain());
            }
        }
    }


    /**
     * sets the domain (use case) that this data node provides data for
     *
     * @param string $domain
     * @throws DomainException
     */
    protected function setDomain($domain)
    {
        if ($this->domain !== null) {
            $this->validator->overwriteError($domain, 'domain route');
        }
        $this->domain = $domain;
    }


    /**
     * used to mark the data node as having been processed
     *
     * @param bool $initialized
     */
    protected function setInitialized($initialized)
    {
        $this->initialized = filter_var($initialized, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * self explanatory (i hope)
     *
     * @param string $node_name
     * @throws DomainException
     */
    protected function setNodeName($node_name)
    {
        $this->validator->validateCriticalProperty($node_name, 'node name');
        $this->node_name = $node_name;
    }


    /**
     * the actual data in key value array format
     *
     * @return array
     */
    public function data()
    {
        return $this->data;
    }


    /**
     * the domain (use case) that this data node provides data for
     *
     * @return string
     */
    public function domain()
    {
        return $this->domain;
    }


    /**
     * true if the data node has been initialized,
     * which entails retrieving the required data and adding it to the data node data array
     *
     * @return bool
     */
    public function isInitialized()
    {
        return $this->initialized;
    }


    /**
     * true if the data node has NOT been initialized
     *
     * @return bool
     */
    public function isNotInitialized()
    {
        return ! $this->initialized;
    }


    /**
     * Specify data which should be serialized to JSON
     *
     * @link  https://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by json_encode
     */
    public function jsonSerialize()
    {
        return $this->data;
    }


    /**
     * self explanatory (i hope)
     *
     * @return string
     */
    public function nodeName()
    {
        return $this->node_name;
    }
}
