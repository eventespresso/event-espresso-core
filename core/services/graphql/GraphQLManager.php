<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionLoaderException;

/**
 * Class GraphQLManager
 * Loads and initializes all of the components required for integrating EE with GraphQL
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
class GraphQLManager implements GQLManagerInterface
{

    /**
     * @var ConnectionsManager $connections_manager
     */
    protected $connections_manager;

    /**
     * @var DataLoaderManager $data_loader_manager
     */
    protected $data_loader_manager;

    /**
     * @var EnumsManager $enums_manager
     */
    protected $enums_manager;

    /**
     * @var InputsManager $inputs_manager
     */
    protected $inputs_manager;

    /**
     * @var TypesManager $types_manager
     */
    protected $types_manager;


    /**
     * GraphQLManager constructor.
     *
     * @param ConnectionsManager $connections_manager
     * @param DataLoaderManager $data_loader_manager
     * @param EnumsManager $enums_manager
     * @param InputsManager $inputs_manager
     * @param TypesManager $types_manager
     */
    public function __construct(
        ConnectionsManager $connections_manager,
        DataLoaderManager $data_loader_manager,
        EnumsManager $enums_manager,
        InputsManager $inputs_manager,
        TypesManager $types_manager
    ) {
        $this->connections_manager = $connections_manager;
        $this->data_loader_manager = $data_loader_manager;
        $this->enums_manager = $enums_manager;
        $this->inputs_manager = $inputs_manager;
        $this->types_manager = $types_manager;
    }


    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since $VID:$
     */
    public function init()
    {
        $this->connections_manager->init();
        $this->data_loader_manager->init();
        $this->enums_manager->init();
        $this->inputs_manager->init();
        $this->types_manager->init();
    }
}
