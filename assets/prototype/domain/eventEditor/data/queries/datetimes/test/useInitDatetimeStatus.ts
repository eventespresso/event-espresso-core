import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';


const useInitDatetimeStatus = (): void => {
	const { setIsLoaded, isLoaded } = useStatus();
	if (!isLoaded(TypeName.datetimes)) {
		setIsLoaded(TypeName.datetimes, true);
	}
};
export default useInitDatetimeStatus;
