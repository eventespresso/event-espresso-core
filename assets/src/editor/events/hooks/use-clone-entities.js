/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';

const useCloneEntities = () => {
	const { createEntity } = useDispatch( 'eventespresso/core' );
	return useCallback( async ( entitiesToClone, modelName ) => {
		const newEntities = [];
		if ( entitiesToClone && modelName ) {
			for ( let i = 0; i < entitiesToClone.length; i++ ) {
				const newClone = await createEntity(
					modelName,
					entitiesToClone[ i ].forClone
				);
				newEntities.push( newClone );
			}
		}
		return newEntities;
	} );
};

export default useCloneEntities;
