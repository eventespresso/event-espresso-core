<?php
namespace EventEspresso\Tests\mocks\core\libraries\batch\JobHandlers;

use EventEspressoBatchRequest\JobHandlers\DatetimeOffsetFix;

/**
 * DatetimeOffsetFixMock
 * Mocks DatetimeOffsetFix for tests.
 *
 * @package EventEspresso\Tests\mocks\core\libraries\batch\JobHandlers
 * @author  Darren Ethier
 * @since   1.0.0
 */
class DatetimeOffsetFixMock extends DatetimeOffsetFix
{

    /**
     * Wrapper for parent protected method.
     * @param string $model_class_name
     * @throws \EE_Error
     */
    public function processModel($model_class_name)
    {
        parent::processModel($model_class_name);
    }
}
