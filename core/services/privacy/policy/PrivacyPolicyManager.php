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
 * Class PrivacyPolicyManager
 * Manages setting up the hooks to add the EE core and add-ons' privacy policies
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
class PrivacyPolicyManager
{

    public function __construct()
    {
        add_action('admin_init', array($this, 'addPrivacyPolicy'), 9);
    }


    /**
     * For all the registered `PrivacyPolicyInterface`s, add their privacy policy content
     *
     * @param WP_Post $post
     */
    public function addPrivacyPolicy()
    {
        $policy_page_id = (int) get_option('wp_page_for_privacy_policy');
        if (! $policy_page_id) {
            return;
        }
        // load all the privacy policy stuff
        // add post policy text
        foreach ($this->loadPrivacyPolicyCollection() as $privacy_policy) {
            wp_add_privacy_policy_content($privacy_policy->getName(), $privacy_policy->getContent());
        }
    }


    /**
     * @return CollectionInterface|PrivacyPolicyInterface[]
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     * @throws InvalidFilePathException
     * @throws InvalidEntityException
     * @throws InvalidDataTypeException
     * @throws InvalidClassException
     */
    protected function loadPrivacyPolicyCollection()
    {
        $loader = new CollectionLoader(
            new CollectionDetails(
                // collection name
                'privacy_policies',
                // collection interface
                'EventEspresso\core\services\privacy\policy\PrivacyPolicyInterface',
                // FQCNs for classes to add (all classes within that namespace will be loaded)
                apply_filters(
                    'FHEE__EventEspresso_core_services_privacy_policy_PrivacyPolicyManager__privacy_policies',
                    array('EventEspresso\core\domain\services\admin\privacy\policy\PrivacyPolicy')
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
// End of file PrivacyPolicyManager.php
// Location: EventEspresso\core\domain\services\admin/PrivacyPolicyManager.php
