<?php

namespace EventEspresso\core\libraries\rest_api\controllers\model;

use EEM_Base;
use EventEspresso\core\libraries\rest_api\controllers\Base as Controller_Base;
use EventEspresso\core\libraries\rest_api\ModelVersionInfo;
use EE_Error;
use EventEspresso\core\libraries\rest_api\RestException;

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
                    esc_html__(
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

    /**
     * Verifies the model name provided was valid. If so, returns the model (as an object). Otherwise, throws an
     * exception. Must be called after `setRequestedVersion()`.
     * @since 4.9.76.p
     * @param $model_name
     * @return EEM_Base
     * @throws EE_Error
     * @throws RestException
     */
    protected function validateModel($model_name)
    {
        if (! $this->getModelVersionInfo()->isModelNameInThisVersion($model_name)) {
            throw new RestException(
                'endpoint_parsing_error',
                sprintf(
                    esc_html__(
                        'There is no model for endpoint %s. Please contact event espresso support',
                        'event_espresso'
                    ),
                    $model_name
                )
            );
        }
        return $this->getModelVersionInfo()->loadModel($model_name);
    }
}
// End of file Base.php
