<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionLoaderException;
use EventEspresso\core\services\graphql\enums\EnumCollection;
use EventEspresso\core\services\graphql\enums\EnumInterface;

/**
 * Class EnumsManager
 * Loads and registers custom GraphQL Enums and Fields
 *
 * @package EventEspresso\core\services\graphql
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class EnumsManager
{

    /**
     * @var EnumCollection|EnumInterface[] $enums
     */
    private $enums;


    /**
     * EnumsManager constructor.
     *
     * @param EnumCollection|EnumInterface[] $enums
     */
    public function __construct(EnumCollection $enums)
    {
        $this->enums = $enums;
    }


    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since $VID:$
     */
    public function init()
    {
        $this->enums->loadEnums();
        add_action('graphql_register_types', [$this, 'configureEnums'], 8);
    }


    /**
     * @since $VID:$
     */
    public function configureEnums()
    {
        // loop through the collection of enums and register their fields
        foreach ($this->enums as $enum) {
            $this->registerEnum($enum);
        }
    }


    /**
     * @param EnumInterface $enum
     * @since $VID:$
     */
    public function registerEnum(EnumInterface $enum)
    {
        // Register the enum type.
        register_graphql_enum_type(
            $enum->name(),
            [
                'description' => $enum->description(),
                'values'      => $enum->values(),
            ]
        );
    }
}
