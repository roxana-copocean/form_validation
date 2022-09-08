import { useReducer } from 'react';

// reducer

// initial state
const initialInputState = {
	value: ' ',
	isTouched: false
};

// reducer function
const inputSateReducer = (state, action) => {
	if (action.type === 'INPUT') {
		return { value: action.value, isTouched: state.isTouched };
	}
	if (action.type === 'BLUR') {
		return { value: state.value, isTouched: false };
	}
	if (action.type === 'RESET') {
		return { isTouched: false, value: '' };
	}
	return initialInputState;
};

// the hook
const useInputWithReducer = (validateValue) => {
	const [ inputState, dispatch ] = useReducer(inputSateReducer, initialInputState);

	const valueIsValid = validateValue(inputState.value);
	const hasError = !valueIsValid && inputState.isTouched;

	const valueChangeHandler = (event) => {
		dispatch({ type: 'INPUT', value: event.target.value });
	};

	const inputBlurHandler = (event) => {
		dispatch({ type: 'BLUR' });
	};

	const reset = () => {
		dispatch({ type: 'RESET' });
	};

	return {
		value: inputState.value,
		isValid: valueIsValid,
		hasError: hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset
	};
};

export default useInputWithReducer;
