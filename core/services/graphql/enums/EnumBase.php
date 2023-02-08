<?php

namespace EventEspresso\core\services\graphql\enums;

/**
 * Class EnumBase
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Manzoor Wani
 * @since   $VID:$
 */
abstract class EnumBase implements EnumInterface
{
    /**
     * @var string $namespace The graphql namespace/prefix.
     */
    protected $namespace = 'Espresso';

    /**
     * @var string $name
     */
    protected $name = '';

    /**
     * @var string $description
     */
    protected $description = '';

    /**
     * @var array $values
     */
    protected $values = [];

    /**
     * EnumBase constructor.
     */
    public function __construct()
    {
        $this->setValues($this->getValues());
    }


    /**
     * @return array
     */
    abstract protected function getValues();


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
     * @return array
     */
    public function values()
    {
        return $this->values;
    }


    /**
     * @param array $values
     */
    protected function setValues($values)
    {
        $this->values = $values;
    }
}
