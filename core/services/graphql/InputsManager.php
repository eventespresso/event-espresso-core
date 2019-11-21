<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionLoaderException;
use EventEspresso\core\services\graphql\inputs\InputCollection;
use EventEspresso\core\services\graphql\inputs\InputInterface;

/**
 * Class InputsManager
 * Loads and registers custom GraphQL Inputs and Fields
 *
 * @package EventEspresso\core\services\graphql
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class InputsManager
{

    /**
     * @var InputCollection|InputInterface[] $inputs
     */
    private $inputs;


    /**
     * InputsManager constructor.
     *
     * @param InputCollection|InputInterface[] $inputs
     */
    public function __construct(InputCollection $inputs)
    {
        $this->inputs = $inputs;
    }


    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since $VID:$
     */
    public function init()
    {
        $this->inputs->loadInputs();
        add_action('graphql_register_types', [$this, 'configureInputs'], 9);
    }


    /**
     * @since $VID:$
     */
    public function configureInputs()
    {
        // loop through the collection of inputs and register their fields
        foreach ($this->inputs as $input) {
            $this->registerInput($input);
        }
    }


    /**
     * @param InputInterface $input
     * @since $VID:$
     */
    public function registerInput(InputInterface $input)
    {
        $inputFields = [];
        foreach ($input->fields() as $field) {
            $fieldName = $field->name();
            $inputFields[ $fieldName ] = $field->toArray();
        }
        // Register the input type.
        register_graphql_input_type(
            $input->name(),
            [
                'description' => $input->description(),
                'fields'      => $inputFields,
            ]
        );
    }
}
