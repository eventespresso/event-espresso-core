<?php

namespace EventEspresso\core\services\privacy\erasure;

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
 * Class PersonalDataEraserManager
 * Manages setting up the hooks to add the EE core and add-ons' privacy erasers
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class PersonalDataEraserManager
{

    public function __construct()
    {
        add_filter(
            'wp_privacy_personal_data_erasers',
            array($this, 'hookInErasers')
        );
    }


    /**
     * For all the registered `PrivateDataEraserInterface`s, add them as erasers
     */
    public function hookInErasers($erasers)
    {
        // load all the privacy policy stuff
        // add post policy text
        foreach ($this->loadPrivateDataEraserCollection() as $eraser) {
            $erasers[ get_class($eraser) ] = array(
                'eraser_friendly_name' => $eraser->name(),
                'callback'             => array($eraser, 'erase'),
            );
        }
        return $erasers;
    }


    /**
     * @return CollectionInterface|PersonalDataEraserInterface[]
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     * @throws InvalidFilePathException
     * @throws InvalidEntityException
     * @throws InvalidDataTypeException
     * @throws InvalidClassException
     */
    protected function loadPrivateDataEraserCollection()
    {
        $loader = new CollectionLoader(
            new CollectionDetails(
                // collection name
                'privacy_erasers',
                // collection interface
                'EventEspresso\core\services\privacy\erasure\PersonalDataEraserInterface',
                // FQCNs for classes to add (all classes within that namespace will be loaded)
                apply_filters(
                    'FHEE__EventEspresso_core_services_privacy_erasure_PersonalDataEraserManager__erasers',
                    array('EventEspresso\core\domain\services\admin\privacy\erasure')
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
// End of file PersonalDataEraserManager.php
// Location: EventEspresso\core\domain\services\admin/PersonalDataEraserManager.php
