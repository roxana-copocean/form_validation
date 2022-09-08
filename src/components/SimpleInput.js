import useInput from '../hooks/use-input';

// Validation using custom hook
const SimpleInput = (props) => {
	// using the hook for the name
	const {
		value: enteredName,
		hasError: nameInputHasError,
		isValid: nameInputIsValid,
		inputBlurHandler: nameBlurHandler,
		valueChangeHandler: nameChangeHandler,
		reset: resetNameInput
	} = useInput((value) => value.trim() !== '');

	// using the hook for the email
	const {
		value: enteredEmail,
		hasError: emailInputHasError,
		inValid: emailInputIsValid,
		inputBlurHandler: emailBlurHandler,
		valueChangeHandler: emailChangeHandler,
		reset: resetEmailInput
	} = useInput((value) => value.includes('@'));

	// Is the form valid
	let formIsValid = false;
	if (nameInputIsValid && emailInputIsValid) {
		formIsValid = true;
	}

	// form submit
	const formSubmissionHandler = (e) => {
		e.preventDefault();

		if (!nameInputIsValid && !emailInputIsValid) {
			return;
		}
		console.log(enteredName, enteredEmail);
		resetNameInput();
		resetEmailInput();
	};

	// conditionally classes
	const nameInputClasses = !nameInputHasError ? 'form-control' : 'form-control invalid';
	const emailInputClasses = !emailInputHasError ? 'form-control' : 'form-control invalid';
	return (
		<form onSubmit={formSubmissionHandler}>
			{/* name */}
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onChange={nameChangeHandler}
					value={enteredName}
					onBlur={nameBlurHandler}
				/>
				{nameInputHasError && <p className="error-text">Name must not be empty</p>}
			</div>
			{/* email */}
			<div className={emailInputClasses}>
				<label htmlFor="email">Your Email</label>
				<input
					type="email"
					id="email"
					onChange={emailChangeHandler}
					value={enteredEmail}
					onBlur={emailBlurHandler}
				/>
				{emailInputHasError && <p className="error-text">Please eneter a valid email</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
