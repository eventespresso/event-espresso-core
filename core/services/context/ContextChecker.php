<?php

namespace EventEspresso\core\services\context;

use EventEspresso\core\domain\entities\contexts\ContextInterface;

/**
 * Class ContextChecker
 * Variation of the Specification pattern that compares an incoming Context class slug
 * against a preset list of acceptable values and returns true if a match is found.
 * A callback can be provided for performing this evaluation externally.
 *
 * @package EventEspresso\core\services
 * @author  Brent Christensen
 */
class ContextChecker
{
    /**
     * A unique string used to identify where this ContextChecker is being employed
     * Is currently only used within the hook name for the filterable return value of isAllowed().
     *
     * @var string $identifier
     */
    private $identifier;

    /**
     * A list of values to be compared against the slug of the Context class passed to isAllowed()
     *
     * @var array $acceptable_values
     */
    private $acceptable_values;

    /**
     * Closure (or callable) that will be called to perform the evaluation within isAllowed().
     * If none is provided, then a simple type sensitive in_array() check will be used
     * and return true if the incoming Context::slug() is found within the array of $acceptable_values.
     *
     * @var callable $evaluation_callback
     */
    private $evaluation_callback;


    /**
     * ContextChecker constructor.
     *
     * @param string       $identifier
     * @param array        $acceptable_values
     * @param callable|null $evaluation_callback [optional]
     */
    public function __construct($identifier, array $acceptable_values, callable $evaluation_callback = null)
    {
        $this->setIdentifier($identifier);
        $this->setAcceptableValues($acceptable_values);
        $this->setEvaluationCallback($evaluation_callback);
    }


    /**
     * @param string $identifier
     */
    private function setIdentifier($identifier)
    {
        $this->identifier = sanitize_key($identifier);
    }


    /**
     * @param array $acceptable_values
     */
    private function setAcceptableValues(array $acceptable_values)
    {
        $this->acceptable_values = $acceptable_values;
    }


    /**
     * @param callable $evaluation_callback
     */
    private function setEvaluationCallback(callable $evaluation_callback = null)
    {
        $this->evaluation_callback = is_callable($evaluation_callback)
            ? $evaluation_callback
            : [$this, 'evaluateContext'];
    }


    /**
     * default callback for evaluating whether the supplied context exists within the supplied values
     *
     * @param ContextInterface $context
     * @param array            $acceptable_values
     * @return bool
     * @since   4.10.14.p
     */
    public function evaluateContext(ContextInterface $context, array $acceptable_values = [])
    {
        return in_array($context->slug(), $acceptable_values, true);
    }


    /**
     * @return string
     */
    protected function identifier()
    {
        return $this->identifier;
    }


    /**
     * @return array
     */
    protected function acceptableValues()
    {
        return apply_filters(
            "FHEE__EventEspresso_core_domain_entities_context_ContextChecker__{$this->identifier}__acceptableValues",
            $this->acceptable_values
        );
    }


    /**
     * @return callable
     */
    protected function evaluationCallback()
    {
        return $this->evaluation_callback;
    }


    /**
     * Returns true if the incoming Context class slug matches one of the preset acceptable values.
     * The result is filterable using the identifier for this ContextChecker.
     * example:
     * If this ContextChecker's $identifier was set to "registration-checkout-type",
     * then the filter here would be named:
     *  "FHEE__EventEspresso_core_domain_entities_context_ContextChecker__registration-checkout-type__isAllowed".
     * Other code could hook into the filter in isAllowed() using the above name
     * and test for additional acceptable values.
     * So if the set of $acceptable_values was: [ "initial-visit",  "revisit" ]
     * then adding a filter to
     *  "FHEE__EventEspresso_core_domain_entities_context_ContextChecker__registration-checkout-type__isAllowed",
     * would allow you to perform your own conditional and allow "wait-list-checkout" as an acceptable value.
     *  example:
     *      add_filter(
     *          'FHEE__EventEspresso_core_domain_entities_context_ContextChecker__registration-checkout-type__isAllowed',
     *          function ($is_allowed, ContextInterface $context) { return $context->slug() === 'wait-list-checkout'
     *                  ? true
     *                  : $is_allowed;
     *          },
     *          10,
     *          2
     *      );
     *
     * @param ContextInterface $context
     * @return boolean
     */
    public function isAllowed(ContextInterface $context)
    {
        $evaluation_callback = $this->evaluationCallback();
        return filter_var(
            apply_filters(
                "FHEE__EventEspresso_core_domain_entities_context_ContextChecker__{$this->identifier}__isAllowed",
                $evaluation_callback($context, $this->acceptableValues()),
                $context,
                $this
            ),
            FILTER_VALIDATE_BOOLEAN
        );
    }
}
