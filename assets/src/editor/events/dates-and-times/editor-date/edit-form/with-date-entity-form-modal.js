/**
 * External imports
 */
import { useCallback, useState, Fragment } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/editor-hocs';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import DateEntityForm from './date-entity-form';
import { dateEntityFormSchema } from './date-entity-form-schema';

const DateEntityFormModal = withEditorModal( {
	title: __( 'Event Date Editor', 'event_espresso' ),
	customClass: 'ee-event-date-editor-modal',
	closeButtonLabel: __( 'close event date editor', 'event_espresso' ),
} )(
	( { dateEntity, ...otherProps } ) => {
		const loadHandler = useCallback(
			() => dateEntityFormSchema( dateEntity ),
			[ dateEntity ]
		);
		return <DateEntityForm
			loadHandler={ loadHandler }
			submitHandler={ null }
			resetHandler={ null }
			dateEntity={ dateEntity }
			{ ...otherProps }
		/>;
	}
);

export default createHigherOrderComponent(
	createHigherOrderComponent(
		( WrappedComponent ) => ( {
			dateEntity,
			doRefresh = () => null,
			onCloseDateEditor = () => null,
			onOpenDateEditor = () => null,
			...otherProps
		} ) => {
			const [ showEditor, setShowEditor ] = useState( false );
			const toggleDateEditor = useCallback( () => {
				setShowEditor( ( prevShowEditor ) => ! prevShowEditor );
			}, [ dateEntity ] );
			return <Fragment>
				<WrappedComponent
					{ ...otherProps }
					dateEntity={ dateEntity }
					toggleDateEditor={ toggleDateEditor }
					doRefresh={ doRefresh }
				/>
				<DateEntityFormModal
					{ ...otherProps }
					dateEntity={ dateEntity }
					editorOpen={ showEditor }
					onOpen={ onOpenDateEditor }
					onClose={ onCloseDateEditor }
					toggleEditor={ toggleDateEditor }
					doRefresh={ doRefresh }
				/>
			</Fragment>;
		},
		'withDateEntityFormModal'
	)
);
