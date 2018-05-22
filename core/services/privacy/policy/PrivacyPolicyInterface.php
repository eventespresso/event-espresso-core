<?php

namespace EventEspresso\core\services\privacy\policy;

/**
 * Class PrivacyPolicyInterface
 * Interfacing for classes that define a suggested privacy policy section for WordPress'
 * special privacy policy editing page (see https://core.trac.wordpress.org/ticket/43620).
 * The results of `getName()` will be inserted into the privacy policy postbox' title,
 * and the results of `getContent()` will be the body of the suggested privacy policy section.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
interface PrivacyPolicyInterface
{

    /**
     * Returns the translated name to display in this privacy policy's section's title
     *
     * @return string
     */
    public function getName();


    /**
     * Returns the suggested privacy policy content for this plugin. May contain HTML
     *
     * @return string
     */
    public function getContent();
}
// End of file PrivacyPolicyInterface.php
// Location: EventEspresso\core\domain\services\admin/PrivacyPolicyInterface.php
