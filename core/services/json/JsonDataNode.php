<?php

namespace EventEspresso\core\services\json;

use DomainException;
use EEH_Array;

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
     * @var JsonDataNodeValidator
     */
    protected $validator;

    /**
     * @var array
     */
    private $data = [];

    /**
     * @var string
     */
    private $domain = '';

    /**
     * @var boolean
     */
    private $initialized = false;

    /**
     * @var string
     */
    private $node_name = '';

    /**
     * @var int
     */
    private $order = 50;


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
    protected function setDataArray($data)
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
    public function addDataNode($data_node)
    {
        if ($data_node->isNotInitialized()) {
            // $data_node->initialize();
            $key = $data_node->nodeName();
            $this->addData($key, $data_node);
            // if the node being added specifies a domain (use case)
            // and this is the primary data node, then set the domain
            if ($this instanceof PrimaryJsonDataNode && $data_node->domain()) {
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
        if ($this->domain !== '') {
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
        // by default set the data node order property by the alphabetical position of the first letter of its name
        // we do this by passing the node name (in UPPERCASE) to ord() to get its ASCII position
        // then we subtract 64 (cuz A has a position of 65) then multiply by 10 just to space things out a bit.
        // this allows a data node to set its order upon construction to some other value
        // so that it can squeak into whatever position it needs to be in, like 55
        $this->setOrder((ord(strtoupper($this->node_name)) - 64) * 10);
    }


    /**
     * the actual data in key value array format
     *
     * @param bool $sort
     * @return array
     */
    public function data($sort = false)
    {
        if ($sort) {
            // check if data array has non-numerical keys and use a custom sort algorithm, else sort by keys
            EEH_Array::is_associative_array($this->data)
                ? uasort(
                    $this->data,
                    function ($a, $b) {
                        // check if each incoming argument is a node and if they have an order set
                        // if so, then use that for our sorting comparison. otherwise use the node's name...
                        // unless it's NOT a node, in which case use the arg value if it is scalar, or 0 if not.
                        if ($a instanceof JsonDataNode) {
                            $a_ord = $a->order() ?: $a->nodeName();
                        } else {
                            $a_ord = is_scalar($a) ?: 0;
                        }
                        if ($b instanceof JsonDataNode) {
                            $b_ord = $b->order() ?: $b->nodeName();
                        } else {
                            $b_ord = is_scalar($b) ?: 0;
                        }
                        $battleShipcompare = function ($left, $right) {
                            if ($left === $right) {
                                return 0;
                            }
                            return $left < $right ? -1 : 1;
                        };
                        return $battleShipcompare($a_ord, $b_ord);
                    }
                )
                // sort numerically indexed arrays by their keys
                : ksort($this->data);
        }
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
     * @return array data which can be serialized by json_encode
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


    /**
     * @return int
     */
    public function order()
    {
        return $this->order;
    }


    /**
     * @param int $order
     * @return void
     */
    protected function setOrder($order)
    {
        $this->order = absint($order);
    }
}
