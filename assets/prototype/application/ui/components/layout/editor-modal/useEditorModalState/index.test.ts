/**
 * External dependencies
 */
import { renderHook, act } from '@testing-library/react-hooks';

/**
 * Internal dependencies
 */
import useEditorModalState from './index';

describe('useEditorModalState', () => {
	it('should have empty stack by default', () => {
		const { result } = renderHook(() => useEditorModalState());
		const currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toBeUndefined();
	});

	describe('should stack multiple modal IDs', () => {
		const { result } = renderHook(() => useEditorModalState());
		let currentlyOpenEditor;
		const closeEditor = result.current.closeEditor;
		const openEditor = result.current.openEditor;

		describe('should add first modal ID', () => {
			const modalId = 'randomModalId';
			act(() => {
				openEditor(modalId);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(modalId);
		});

		describe('should add second modal ID', () => {
			const modalId = 'randomModalId2';
			act(() => {
				openEditor(modalId);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(modalId);
		});

		describe('should add third modal ID', () => {
			const modalId = 'randomModalId3';
			act(() => {
				openEditor(modalId);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(modalId);
		});

		describe('should not do anything if we try to close other than last opened modal', () => {
			act(() => {
				closeEditor('randomModalId2');
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe('randomModalId3');
			act(() => {
				closeEditor('randomModalId');
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe('randomModalId3');
		});

		describe('should allow closing last opened modal', () => {
			act(() => {
				closeEditor('randomModalId3');
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe('randomModalId2');
			act(() => {
				closeEditor('randomModalId2');
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe('randomModalId');
		});

		describe('when closing last modal', () => {
			act(() => {
				closeEditor('randomModalId');
			});
			it('should have empty stack', () => {
				currentlyOpenEditor = result.current.currentlyOpenEditor();
				expect(currentlyOpenEditor).toBeUndefined();
			});
		});

		describe('when closeAllEditors is executed', () => {
			const { result } = renderHook(() => useEditorModalState());
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
