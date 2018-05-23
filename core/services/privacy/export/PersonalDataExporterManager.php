<?php

namespace EventEspresso\core\services\privacy\export;

use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;

/**
 * Class PersonalDataExporterManager
 * Manages setting up the hooks to add the EE core and add-ons' privacy policies
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class PersonalDataExporterManager
{

    public function __construct()
    {
        add_filter(
            'wp_privacy_personal_data_exporters',
            array($this, 'hookInExporters')
        );
    }


    /**
     * Adds EE's exporters to the list of WP exporters
     *
     * @param array $exporters
     * @return array
     */
    public function hookInExporters($exporters)
    {
        // load all the privacy policy stuff
        // add post policy text
        foreach ($this->loadPrivateDataExporterCollection() as $exporter) {
            $exporters[ get_class($exporter) ] = array(
                'exporter_friendly_name' => $exporter->name(),
                'callback'               => array($exporter, 'export'),
            );
        }
        return $exporters;
    }


    /**
     * @return CollectionInterface|PersonalDataExporterInterface[]
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     * @throws InvalidFilePathException
     * @throws InvalidEntityException
     * @throws InvalidDataTypeException
     * @throws InvalidClassException
     */
    protected function loadPrivateDataExporterCollection()
    {
        $loader = new CollectionLoader(
            new CollectionDetails(
                // collection name
                'personal_data_exporters',
                // collection interface
                'EventEspresso\core\services\privacy\export\PersonalDataExporterInterface',
                // FQCNs for classes to add (all classes within that namespace will be loaded)
                apply_filters(
                    'FHEE__EventEspresso_core_services_privacy_export_PersonalDataExporterManager__exporters',
                    array('EventEspresso\core\domain\services\admin\privacy\export')
                ),
                // filepaths to classes to add
                array(),
                // file mask to use if parsing folder for files to add
                '',
                // what to use as identifier for collection entities
                // using CLASS NAME prevents duplicates (works like a singleton)
                CollectionDetails::ID_CLASS_NAME
            )
        );
        return $loader->getCollection();
    }
}

// End of file PersonalDataExporterManager.php
// Location: EventEspresso\core\domain\services\admin/PersonalDataExporterManager.php
