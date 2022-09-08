import { useState } from 'react';

// validation without custom hook
const SimpleInputExample = (props) => {
	const [ enteredName, setEnteredName ] = useState('');
	const [ enteredNameTouched, setEnteredNameTouched ] = useState(false);

	const [ enteredEmail, setEnteredEmail ] = useState('');
	const [ enteredEmailTouched, setEnteredEmailTouched ] = useState(false);

	const enteredNameIsValid = enteredName.trim() !== '';
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	const enteredEmailIsValid = enteredEmail.includes('@');
	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

	let formIsValid = false;
	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const emailInputChangeHandler = (e) => {
		setEnteredEmail(e.target.value);
	};

	const nameInputBlurHandler = (e) => {
		setEnteredNameTouched(true);
	};

	const emailInputBlurHandler = (e) => {
		setEnteredEmailTouched(true);
	};

	const formSubmissionHandler = (e) => {
		e.preventDefault();
		setEnteredNameTouched(true);
		if (!enteredNameIsValid && enteredEmailIsValid) {
			return;
		}

		console.log(enteredName, enteredEmail);
		setEnteredName('');
		setEnteredEmail(' ');
		setEnteredNameTouched(false);
		setEnteredEmailTouched(false);
	};

	const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';
	const emailInputClasses = !emailInputIsInvalid ? 'form-control' : 'form-control invalid';
	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onChange={nameInputChangeHandler}
					value={enteredName}
					onBlur={nameInputBlurHandler}
				/>
				{nameInputIsInvalid && <p className="error-text">Name must not be empty</p>}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="email">Your Email</label>
				<input
					type="email"
					id="email"
					onChange={emailInputChangeHandler}
					value={enteredEmail}
					onBlur={emailInputBlurHandler}
				/>
				{emailInputIsInvalid && <p className="error-text">Please eneter a valid email</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInputExample;
