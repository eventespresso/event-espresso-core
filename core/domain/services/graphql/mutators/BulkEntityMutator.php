<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use Exception;
use OutOfBoundsException;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class BulkEntityMutator extends EntityMutator
{
    /**
     * @var callable $entity_mutator .
     */
    protected $entity_mutator;

    /**
     * BulkEntityMutator constructor.
     *
     * @param callable $entity_mutator The mutator for an entity.
     */
    public function __construct(callable $entity_mutator)
    {
        $this->entity_mutator = $entity_mutator;
    }
    /**
     * Bulk updates entities.
     *
     * @param array       $input   The input for the mutation
     * @param AppContext  $context The AppContext passed down to all resolvers
     * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
     * @return array
     */
    public function updateEntities(array $input, AppContext $context, ResolveInfo $info): array
    {

        $updated = [];
        $failed = [];
        // TODO Add meaningful error messages for every failure.
        // $errors = [];

        try {
            if (empty($input['uniqueInputs']) || !is_array($input['uniqueInputs'])) {
                throw new OutOfBoundsException(
                    esc_html__('A valid input was not provided.', 'event_espresso')
                );
            }

            $sharedInput = ! empty($input['sharedInput']) ? $input['sharedInput'] : [];

            foreach ($input['uniqueInputs'] as $uniqueInput) {
                try {
                    // values in $uniqueInput will override those in $sharedInput
                    $finalInput = array_merge($sharedInput, $uniqueInput);
                    // mutate the individual entity.
                    $mutator = $this->entity_mutator;
                    $mutator($finalInput, $context, $info);
                    // we are here it means the update was successful.
                    $updated[] = $uniqueInput['id'];
                } catch (Exception $e) {
                    // sorry mate, couldn't help you :(
                    $failed[] = $uniqueInput['id'];
                }
            }
        } catch (Exception $exception) {
            EntityMutator::handleExceptions(
                $exception,
                esc_html__(
                    'Could not perform the update because of the following error(s)',
                    'event_espresso'
                )
            );
        }

        return compact('updated', 'failed');
    }
}
