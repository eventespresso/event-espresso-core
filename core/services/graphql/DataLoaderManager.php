<?php

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\graphql\loaders\GQLDataDomainInterface;
use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionLoaderException;
use EventEspresso\core\services\graphql\loaders\DataLoaderCollection;

/**
 * Class DataLoaderManager
 * Retrieves data loader classes for each domain and registers their data loaders with GQL
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DataLoaderManager implements GQLManagerInterface
{

    /**
     * @var DataLoaderCollection|GQLDataDomainInterface[] $data_loaders
     */
    private $data_loaders;


    /**
     * @param DataLoaderCollection|GQLDataDomainInterface[] $data_loaders
     */
    public function __construct(DataLoaderCollection $data_loaders)
    {
        $this->data_loaders = $data_loaders;
    }


    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since $VID:$
     */
    public function init()
    {
        $data_loaders = $this->data_loaders->getDataLoaders();
        foreach ($data_loaders as $data_loader) {
            add_filter('graphql_data_loaders', [$data_loader, 'registerLoaders'], 10, 2);
        }
    }
}
