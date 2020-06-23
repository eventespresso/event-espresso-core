const useI18nData = (): any => {
	return window?.eventEspressoData?.i18n || {};
};

export default useI18nData;
