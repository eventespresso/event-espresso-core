import React from 'react';
import { Textarea as ChakraTextarea } from '@chakra-ui/core';
import type {
	ButtonProps as ChakraButtonProps,
	CheckboxProps as ChakraCheckboxProps,
	CheckboxGroupProps as ChakraCheckboxGroupProps,
	FlexProps as ChakraFlexProps,
	IconButtonProps as ChakraIconButtonProps,
	InputProps as ChakraInputProps,
	NumberInputProps as ChakraNumberInputProps,
	PseudoBoxProps as ChakraPseudoBoxProps,
	RadioProps as ChakraRadioProps,
	RadioGroupProps as ChakraRadioGroupProps,
	SelectProps as ChakraSelectProps,
	SwitchProps as ChakraSwitchProps,
} from '@chakra-ui/core';

export interface CommonInputProps<T = Element, V = React.ReactText> {
	onChangeValue?: (value: V, event?: React.ChangeEvent<T> | React.FormEvent<T>) => void;
}

export interface ButtonProps extends Partial<ChakraButtonProps> {
	buttonText?: React.ReactNode;
	icon?: React.ComponentType<any>;
}

export interface CheckboxProps extends ChakraCheckboxProps {}

export interface CheckboxGroupProps extends ChakraCheckboxGroupProps {}

export interface IconButtonProps extends ChakraIconButtonProps {
	icon: React.ComponentType<any>;
}

export interface NumberInputProps extends ChakraNumberInputProps {
	inputFieldProps?: ChakraInputProps;
	inputStepperProps?: ChakraFlexProps;
	incrementStepperProps?: ChakraPseudoBoxProps;
	decrementStepperProps?: ChakraPseudoBoxProps;
}

export interface RadioProps extends ChakraRadioProps {}

export interface RadioGroupProps extends ChakraRadioGroupProps {}

export interface OptionProps {
	value?: React.ReactText;
	label?: React.ReactNode;
	options?: Array<Omit<OptionProps, 'options'>>; // for optgroup
	[key: string]: any;
}

export type OptionsType = Array<OptionProps>;

export interface SelectProps extends ChakraSelectProps, CommonInputProps<HTMLSelectElement> {
	options?: OptionsType;
}

export interface SwitchProps extends ChakraSwitchProps, CommonInputProps<HTMLInputElement, boolean> {}

export interface TextareaProps extends React.ComponentProps<typeof ChakraTextarea> {}

export interface TextInputProps extends ChakraInputProps, CommonInputProps<HTMLInputElement> {}
