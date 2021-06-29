<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Form_Section;
use EEM_Form_Section;
use EE_Error;
use Exception;
use EventEspresso\core\services\form\meta\FormStatus;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

class FormSectionDelete extends EntityMutator
{

    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Form_Section $model
     * @return callable
     */
    public static function mutateAndGetPayload(EEM_Form_Section $model)
    {
        /**
         * Deletes an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array
         */
        return static function (array $input, AppContext $context, ResolveInfo $info) use ($model): array {
            try {
                /** @var EE_Form_Section $entity */
                $entity = EntityMutator::getEntityFromInputData($model, $input);

                $result = FormSectionDelete::deleteSectionAndRelations($entity);

                EntityMutator::validateResults($result);

                do_action(
                    'AHEE__EventEspresso_core_domain_services_graphql_mutators_form_section_delete',
                    $entity,
                    $input
                );
            } catch (Exception $exception) {
                EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The form section could not be deleted because of the following error(s)',
                        'event_espresso'
                    )
                );
            }

            return [
                'deleted' => $entity,
            ];
        };
    }

    /**
     * Deletes a form section along with its related form elements.
     *
     * @param EE_Form_Section $entity
     * @return bool | int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public static function deleteSectionAndRelations(EE_Form_Section $entity)
    {
        // Remove related non-default form elements
        $entity->delete_related('Form_Element', [
            [
                'FIN_status' => ['NOT IN', [ FormStatus::SHARED, FormStatus::DEFAULT] ]
            ]
        ]);

        // Now delete the form section
        return $entity->delete();
    }
}
