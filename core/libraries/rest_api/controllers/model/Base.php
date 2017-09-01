<?php
namespace EventEspresso\core\libraries\rest_api\controllers\model;

use EventEspresso\core\libraries\rest_api\controllers\Base as Controller_Base;
use EventEspresso\core\libraries\rest_api\ModelVersionInfo;
use EE_Error;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Base
 * Base controller which also has something to do with models
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class Base extends Controller_Base
{

    /**
     * Holds reference to the model version info, which knows the requested version
     *
     * @var ModelVersionInfo
     */
    protected $model_version_info;



    /**
     * Sets the version the user requested
     *
     * @param string $version eg '4.8'
     */
    public function setRequestedVersion($version)
    {
        parent::setRequestedVersion($version);
        $this->model_version_info = new ModelVersionInfo($version);
    }



    /**
     * Gets the object that should be used for getting any info from the models,
     * because it's takes the requested and current core version into account
     *
     * @return \EventEspresso\core\libraries\rest_api\ModelVersionInfo
     * @throws EE_Error
     */
    public function getModelVersionInfo()
    {
        if (! $this->model_version_info) {
            throw new EE_Error(
                sprintf(
                    __(
                        'Cannot use model version info before setting the requested version in the controller',
                        'event_espresso'
                    )
                )
            );
        }
        return $this->model_version_info;
    }



    /**
     * Determines if $object is of one of the classes of $classes. Similar to
     * in_array(), except this checks if $object is a subclass of the classnames provided
     * in $classnames
     *
     * @param object $object
     * @param array  $classnames
     * @return boolean
     */
    public function isSubclassOfOne($object, $classnames)
    {
        foreach ($classnames as $classname) {
            if (is_a($object, $classname)) {
                return true;
            }
        }
        return false;
    }
}
// End of file Base.php
