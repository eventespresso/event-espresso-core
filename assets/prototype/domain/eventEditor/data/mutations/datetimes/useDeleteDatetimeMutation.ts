import { useMutation } from '@apollo/react-hooks';
import { DELETE_DATETIME } from './datetimes';
import { GET_DATETIMES } from '../../queries/datetimes/datetimes';
import { GET_TICKETS } from '../../queries/tickets/tickets';
import useInitToaster from '../../../../../application/services/toaster/useInitToaster';
import useRelations from '../../../../../application/services/apollo/relations/useRelations';

type useDeleteDatetimeMutationProps = {
    eventId: string;
    id: string;
};

const useDeleteDatetimeMutation = ({ eventId, id }: useDeleteDatetimeMutationProps) => {
    const { removeRelation, dropRelations } = useRelations();

    const { onCompleted, onError, initializationNotices } = useInitToaster({
        loadingMessage: `deleting date ${id}`,
        successMessage: `datetime ${id} successfully deleted`,
    });

    const [deleteDatetime, { loading, error }] = useMutation(DELETE_DATETIME, { onCompleted, onError });

    initializationNotices(loading, error);

    const update = (
        proxy,
        {
            data: {
                deleteDatetime: { datetime },
            },
        }
    ) => {
        const options = {
            query: GET_DATETIMES,
            variables: {
                where: {
                    eventId,
                },
            },
        };

        const { datetimes = {} } = proxy.readQuery(options);

        //TODO - improve readability.
        const nodes = datetimes.nodes.filter(({ id }) => id !== datetime.id);
        const data = {
            datetimes: {
                ...datetimes,
                nodes,
            },
        };

        if (datetime.id) {
            const ticketsData = proxy.readQuery({
                query: GET_TICKETS,
                variables: {
                    where: {
                        datetimeIn: datetimes.nodes.map(({ id }) => id),
                    },
                },
            });

            proxy.writeQuery({
                query: GET_TICKETS,
                data: ticketsData,
                variables: {
                    where: {
                        datetimeIn: nodes.map(({ id }) => id),
                    },
                },
            });
            // Remove the datetime from all ticket relations
            removeRelation({
                entity: 'datetimes',
                entityId: datetime.id,
                relation: 'tickets',
            });
            // Drop all the relations for the datetime
            dropRelations({
                entity: 'datetimes',
                entityId: datetime.id,
            });
        }

        proxy.writeQuery({
            ...options,
            data,
        });
    };

    const variables = { input: { clientMutationId: 'xyz', id } };
    return () => deleteDatetime({ variables, update });
};

export default useDeleteDatetimeMutation;
