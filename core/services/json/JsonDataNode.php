<?php

namespace EventEspresso\core\services\json;

use DomainException;
use JsonSerializable;

/**
 * Class JsonDataNode
 * Description
 *
 * @package EventEspresso\core\services\json
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class JsonDataNode implements JsonSerializable
{

    /**
     * @var JsonDataNodeValidator $validator
     */
    protected $validator;

    /**
     * @var array $data
     */
    private $data;

    /**
     * @var string $node_name
     */
    private $node_name;


    /**
     * JsonDataNodeHandler constructor.
     *
     * @param JsonDataNodeValidator $validator
     * @throws DomainException
     */
    public function __construct(JsonDataNodeValidator $validator)
    {
        $this->validator = $validator;
    }


    /**
     * @since $VID:$
     */
    abstract public function initialize();


    /**
     * @param string $key
     * @param mixed  $data
     * @throws DomainException
     */
    public function addData($key, $data)
    {
        $is_set = isset($this->data[ $key ]);
        $this->validator->propertyOverwriteError($is_set, $key);
        $this->data[ $key ] = $data;
    }


    /**
     * @param JsonDataNode $data_node
     * @throws DomainException
     */
    public function addDataNode(JsonDataNode $data_node)
    {
        $key = $data_node->nodeName();
        $is_set = isset($this->data[ $key ]);
        $this->validator->propertyOverwriteError($is_set, $key);
        $this->data[ $key ] = $data_node;
    }


    /**
     * @param string $node_name
     * @throws DomainException
     */
    public function setNodeName($node_name)
    {
        $this->validator->validateCriticalProperty($node_name, 'node name');
        $this->node_name = $node_name;
    }


    /**
     * @return string
     */
    public function nodeName()
    {
        return $this->node_name;
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
}
