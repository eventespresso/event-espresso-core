/**
 * External dependencies
 */
import { renderHook, act } from '@testing-library/react-hooks';

/**
 * Internal dependencies
 */
import useEditorModalState from './index';

describe('useEditorModalState', () => {
	const ticketId = 'xyz';
	const modalId1 = 'randomModalId1';
	const modalId2 = 'randomModalId2';
	const modalId3 = 'randomModalId3';

	it('should have empty stack by default', () => {
		const { result } = renderHook(() => useEditorModalState(ticketId));
		const currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toBeUndefined();
	});

	describe('should stack multiple modal IDs', () => {
		const { result } = renderHook(() => useEditorModalState(ticketId));
		let currentlyOpenEditor;
		const onClose = result.current.onClose;
		const setIsOpen = result.current.setIsOpen;

		describe('should add first modal ID', () => {
			act(() => {
				setIsOpen(modalId1);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(ticketId + modalId1);
		});

		describe('should add second modal ID', () => {
			const modalId = 'randomModalId2';
			act(() => {
				setIsOpen(modalId);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(ticketId + modalId);
		});

		describe('should add third modal ID', () => {
			const modalId = 'randomModalId3';
			act(() => {
				setIsOpen(modalId);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(ticketId + modalId);
		});

		describe('should not do anything if we try to close other than last opened modal', () => {
			act(() => {
				onClose(modalId2);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(ticketId + modalId3);
			act(() => {
				onClose('randomModalId');
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(ticketId + modalId3);
		});

		describe('should allow closing last opened modal', () => {
			act(() => {
				onClose(modalId3);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(ticketId + modalId2);

			act(() => {
				onClose(modalId2);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(ticketId + modalId1);
		});

		describe('when closing last modal', () => {
			act(() => {
				onClose(modalId1);
			});
			it('should have empty stack', () => {
				currentlyOpenEditor = result.current.currentlyOpenEditor();
				expect(currentlyOpenEditor).toBeUndefined();
			});
		});

		describe('when closeAllEditors is executed', () => {
			const { result } = renderHook(() => useEditorModalState(ticketId));
			const closeAllEditors = result.current.closeAllEditors;
			const openEditor = result.current.openEditor;

			act(() => {
				openEditor('randomModalId11');
				openEditor('randomModalId22');
				openEditor('randomModalId33');
				openEditor('randomModalId44');
				closeAllEditors();
			});
		});

		it('should have empty stack', () => {
			const currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBeUndefined();
		});
	});
});
