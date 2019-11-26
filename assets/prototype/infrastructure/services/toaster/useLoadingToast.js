import { Spinner } from "@blueprintjs/core";
import { useCallback } from '@wordpress/element';
import useDismissToast from './useDismissToast'

const useLoadingToast = ( toaster, hash ) => useCallback( (
	loading = true,
	message = 'loading',
	timeout = 0,
	action = {},
	onDismiss = null,
) => {
	const dismiss = useDismissToast( toaster, hash );

	const isToasting = ( msgHash ) => {
		const toasts = toaster.getToasts();
		return Array.isArray( toasts ) && find(
			toasts,
			( t ) => t.key && t.key === msgHash
		);
	};

	if ( message ) {
		const msgHash = hash( message );
		const isLoading = isToasting( msgHash );
		if ( loading && ! isLoading ) {
			toaster.show( {
				action,
				message: (
					<div
						style={ {
							display: 'flex',
							flexFlow: 'row nowrap',
							alignContent: 'flex-start',
							justifyContent: 'flex-start',
						} }
					>
						<Spinner size={ Spinner.SIZE_SMALL }/>
						<span
							style={ {
								marginLeft: '1rem',
							} }
						>
						{ message }
					</span>
					</div>
				),
				onDismiss,
				timeout,
			}, msgHash );
		} else if ( ! loading && isLoading ) {
			dismiss( message );
		}
	}
}, [ toaster, hash ] );

export default useLoadingToast;
