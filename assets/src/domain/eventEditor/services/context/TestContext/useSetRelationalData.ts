import { useEffect } from 'react';
import { useRelations } from '../../../../../application/services/apollo/relations';
import './data';

const useSetRelationalData = (): void => {
	const { initialize } = useRelations();
	useEffect(() => {
		initialize(window.eeEditorData.event.relations);
	}, []);
};

export default useSetRelationalData;
