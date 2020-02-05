import { useEffect } from 'react';
import { useRelations } from '../../../../application/services/apollo/relations';
import './data';

const useSetRelationalData = (): void => {
	const { setData } = useRelations();
	useEffect(() => {
		setData(window.eeEditorData.event.relations);
	}, []);
};

export default useSetRelationalData;
