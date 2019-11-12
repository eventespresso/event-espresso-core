<?php

namespace EventEspresso\core\services\graphql\inputs;

use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;

/**
 * Class InputBase
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Manzoor Wani
 * @since   $VID:$
 */
abstract class InputBase implements InputInterface
{

    /**
     * @var string $name
     */
    protected $name = '';

    /**
     * @var string $description
     */
    protected $description = '';

    /**
     * @var \EventEspresso\core\services\graphql\fields\GraphQLFieldInterface[] $fields
     */
    protected $fields = [];

    /**
     * InputBase constructor.
     */
    public function __construct()
    {
        $this->setFields($this->getFields());
    }


    /**
     * @return \EventEspresso\core\services\graphql\fields\GraphQLFieldInterface[]
     * @since $VID:$
     */
    abstract protected function getFields();


    /**
     * @return string
     */
    public function name()
    {
        return $this->name;
    }


    /**
     * @param string $name
     */
    protected function setName($name)
    {
        $this->name = $name;
    }


    /**
     * @return string
     */
    public function description()
    {
        return $this->description;
    }


    /**
     * @param string $description
     */
    protected function setDescription($description)
    {
        $this->description = $description;
    }


    /**
     * @return \EventEspresso\core\services\graphql\fields\GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function fields()
    {
        return (array) $this->fields;
    }


    /**
     * @param \EventEspresso\core\services\graphql\fields\GraphQLFieldInterface[] $fields
     */
    protected function setFields(array $fields)
    {
        foreach ($fields as $field) {
            if ($field instanceof GraphQLField) {
                $this->fields[] = $field;
            }
        }
    }
}