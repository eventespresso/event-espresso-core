<?php
namespace EventEspresso\core\services\progress_steps;

/**
 * Interface ProgressStepsConfigInterface
 * interface for persisting the state of a form's progress
 *
 * @package EventEspresso\core\services\progress_steps
 */
interface ProgressStepsConfigInterface
{

    public function get();

    public function update();
}
