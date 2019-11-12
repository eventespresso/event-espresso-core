<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionLoaderException;
use EventEspresso\core\services\graphql\types\TypeCollection;
use EventEspresso\core\services\graphql\types\TypeInterface;

/**
 * Class TypesManager
 * Loads and registers custom GraphQL Types and Fields
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
class TypesManager
{

    /**
     * @var TypeCollection|TypeInterface[] $types
     */
    private $types;


    /**
     * TypesManager constructor.
     *
     * @param TypeCollection|TypeInterface[] $types
     */
    public function __construct(TypeCollection $types)
    {
        $this->types = $types;
    }


    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since $VID:$
     */
    public function init()
    {
        $this->types->loadTypes();
        add_action('graphql_register_types', [$this, 'configureTypes'], 10);
    }


    /**
     * @since $VID:$
     */
    public function configureTypes()
    {
        // loop through the collection of types and register their fields
        foreach ($this->types as $type) {
            if ($type->isCustomPostType()) {
                $this->extendCustomPostType($type);
            } else {
                $this->registerType($type);
            }
        }
    }


    /**
     * @param TypeInterface $type
     * @since $VID:$
     */
    public function extendCustomPostType(TypeInterface $type)
    {
        $typeName = $type->name();
        foreach ($type->fields() as $field) {
            $fieldName = $field->name();
            $config = $field->toArray();
            if ($field->useForInput()) {
                // Register input fields for existing mutations.
                register_graphql_field('Update' . $typeName . 'Input', $fieldName, $config);
                register_graphql_field('Create' . $typeName . 'Input', $fieldName, $config);
            }
            if ($field->useForOutput()) {
                $config['resolve'] = [$type, 'resolveField'];
                // Register fields for queries.
                register_graphql_field($typeName, $fieldName, $config);
            }
        }
        if (is_callable([$type, 'extendMutations'])) {
            $type->extendMutations();
        }
    }


    /**
     * @param TypeInterface $type
     * @since $VID:$
     */
    public function registerType(TypeInterface $type)
    {
        $outputFields = [];
        $inputFields = [];
        foreach ($type->fields() as $field) {
            $fieldName = $field->name();
            $config = $field->toArray();
            if ($field->useForInput()) {
                $inputFields[ $fieldName ] = $config;
            }
            if ($field->useForOutput()) {
                $config['resolve'] = [$type, 'resolveField'];
                $outputFields[ $fieldName ] = $config;
            }
        }
        $typeName = $type->name();
        if (! empty($outputFields)) {
            // Register the object type.
            register_graphql_object_type(
                $typeName,
                [
                    'description' => $type->description(),
                    'fields'      => $outputFields,
                ]
            );
        }
        if (is_callable([$type, 'registerMutations'])) {
            $type->registerMutations($inputFields);
        }
    }
}
