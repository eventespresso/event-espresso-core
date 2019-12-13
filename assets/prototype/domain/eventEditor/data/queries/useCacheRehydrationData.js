const useCacheRehydrationData = () => {
	const { eeEditorGQLData = {} } = window;
	return eeEditorGQLData;
};

export default useCacheRehydrationData;
