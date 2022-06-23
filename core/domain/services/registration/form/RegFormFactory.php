<?php

namespace EventEspresso\core\domain\services\registration\form;

use DomainException;
use EE_Checkout;
use EE_Error;
use EE_SPCO_Reg_Step;
use EventEspresso\core\domain\services\registration\form\v1\RegForm as RegFormV1;
use EventEspresso\core\domain\services\registration\form\v1\RegFormDependencyHandler as RegFormDepHandlerV1;
use EventEspresso\core\domain\services\registration\form\v1\RegFormHandler as RegFormHandlerV1;
use EventEspresso\core\domain\services\registration\form\v2\FormSubmissionHandler;
use EventEspresso\core\domain\services\registration\form\v2\RegForm as RegFormV2;
use EventEspresso\core\domain\services\registration\form\v2\RegFormDependencyHandler as RegFormDepHandlerV2;
use EventEspresso\core\domain\services\registration\form\v2\RegFormHandler as RegFormHandlerV2;
use EventEspresso\core\services\dependencies\DependencyHandler;
use EventEspresso\core\services\form\legacy\FormSectionProperInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class RegFormFactory
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\registration\form
 * @since   $VID:$
 */
class RegFormFactory
{

    /**
     * legacy SPCO reg form
     */
    const VERSION_1 = 'v1';

    /**
     * Form Sections and Form Elements generated using Barista Form Builder
     */
    const VERSION_2 = 'v2';

    /**
     * @var string
     */
    private $reg_form_version;

    /**
     * @var array
     */
    private static $valid_reg_form_versions = [
        RegFormFactory::VERSION_1,
        RegFormFactory::VERSION_2,
    ];


    /**
     * RegFormFactory constructor.
     *
     * @param string $reg_form_version
     */
    public function __construct(string $reg_form_version = RegFormFactory::VERSION_1)
    {
        $this->setRegFormVersion($reg_form_version);
    }


    /**
     * @param string $reg_form_version
     */
    public function setRegFormVersion(string $reg_form_version): void
    {
        if (! in_array($reg_form_version, RegFormFactory::$valid_reg_form_versions)) {
            throw new InvalidArgumentException(
                esc_html__(
                    'Invalid registration form version requested. Version number must match one of the RegFormFactory::VERSION_* constants.',
                    'event_espresso'
                )
            );
        }
        $this->reg_form_version = $reg_form_version;
    }




    /**
     * @param array $dependencies
     * @return FormSectionProperInterface
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getRegForm(array $dependencies): FormSectionProperInterface
    {
        $this->registerDependencies();
        switch ($this->reg_form_version) {
            case RegFormFactory::VERSION_2:
                $reg_step = $dependencies[0];
                if (! $reg_step instanceof EE_SPCO_Reg_Step) {
                    throw new DomainException(
                        esc_html__('Invalid or missing SPCO Registration Step', 'event_espresso')
                    );
                }
                /** @var FormSubmissionHandler $form_submission_handler */
                $form_submission_handler = LoaderFactory::getNew(
                    FormSubmissionHandler::class,
                    [$reg_step->checkout]
                );
                $form_data_api           = $form_submission_handler->getFormDataAPI();
                return LoaderFactory::getShared(RegFormV2::class, [$reg_step, $form_data_api]);
            case RegFormFactory::VERSION_1:
            default:
                return LoaderFactory::getShared(RegFormV1::class, $dependencies);
        }
    }


    /**
     * @return void
     * @throws InvalidArgumentException
     */
    private function registerDependencies()
    {
        $dependency_handler = null;
        switch ($this->reg_form_version) {
            case RegFormFactory::VERSION_1:
                /** @var RegFormDepHandlerV1 $dependency_handler */
                $dependency_handler = LoaderFactory::getShared(RegFormDepHandlerV1::class);
                break;
            case RegFormFactory::VERSION_2:
                /** @var RegFormDepHandlerV2 $dependency_handler */
                $dependency_handler = LoaderFactory::getShared(RegFormDepHandlerV2::class);
                break;
        }
        if (! $dependency_handler instanceof DependencyHandler) {
            throw new DomainException(
                esc_html__('Invalid Registration Form DependencyHandler.', 'event_espresso')
            );
        }
        $dependency_handler->registerDependencies();
    }


    /**
     * @param EE_Checkout $checkout
     * @return RegFormHandlerInterface
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getRegFormHandler(EE_Checkout $checkout): RegFormHandlerInterface
    {
        switch ($this->reg_form_version) {
            case RegFormFactory::VERSION_2:
                /** @var RegFormHandlerV2 $handler */
                $handler = LoaderFactory::getNew(RegFormHandlerV2::class, [$checkout]);
                $handler->getFormSubmission();
                $handler->initializeInputHandler();
                return $handler;
            case RegFormFactory::VERSION_1:
            default:
                /** @var RegFormHandlerV1 $handler */
                $handler = LoaderFactory::getNew(RegFormHandlerV1::class, [$checkout]);
                $handler->initializeInputHandler();
                return $handler;
        }
    }
}
