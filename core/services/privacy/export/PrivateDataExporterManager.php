<?php

namespace EventEspresso\core\services\privacy\policy;

use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;
use WP_Post;

/**
 * Class PrivateDataExporterManager
 * Manages setting up the hooks to add the EE core and add-ons' privacy policies
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class PrivateDataExporterManager
{

    public function __construct()
    {
        add_action('admin_init', array($this, 'addPrivateDataExporters'), 9);
    }


    /**
     * For all the registered `PrivateDataExporterInterface`s, add their privacy policy content
     *
     * @param WP_Post $post
     */
    public function addPrivateDataExporters($post)
    {
        $current_screen = get_current_screen();
        if ($current_screen->id !== 'user' && ! (defined('DOING_AJAX') && DOING_AJAX)) {
            return;
        }
        // load all the privacy policy stuff
        // add post policy text
        foreach ($this->loadPrivateDataExporterCollection() as $exporter) {
            add_filter(
                'wp_privacy_personal_data_exporters',
                array($exporter,'export')
            );
        }
    }


    /**
     * @return CollectionInterface|PrivateDataExporterInterface[]
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
                'privacy_policies',
                // collection interface
                'EventEspresso\core\services\privacy\policy\PrivacyErasureInterface',
                // FQCNs for classes to add (all classes within that namespace will be loaded)
                apply_filters(
                    'FHEE__EventEspresso_core_services_privacy_export_PrivateDataExporterManager__exporters',
                    array('EventEspresso\core\domain\services\admin\privacy\policy\PrivateDataExporter')
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
// End of file PrivateDataExporterManager.php
// Location: EventEspresso\core\domain\services\admin/PrivateDataExporterManager.php
