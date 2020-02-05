import { pathOr } from 'ramda';

const useI18nData = (): any => {
	return pathOr<any>({}, ['eeEditorData', 'i18n'], window);
};

export default useI18nData;
