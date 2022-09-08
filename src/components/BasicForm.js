import useInput from '../hooks/use-input';

function BasicForm(props) {
	// First Name
	const {
		value: enteredFirstName,
		isValid: firstNameInputIsValid,
		hasError: firstNameHasError,
		valueChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: resetFirstName
	} = useInput((value) => value.trim() !== '');

	// Last Name
	const {
		value: enteredLastName,
		isValid: lastNameInputIsValid,
		hasError: lastNameHasError,
		valueChangeHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: resetLastName
	} = useInput((value) => value.trim() !== '');

	// email
	const {
		value: enteredEmail,
		isValid: emailInputIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail
	} = useInput((value) => value.includes('@'));

	// form validation
	let formIsValid = false;
	if (firstNameInputIsValid && lastNameInputIsValid && emailInputIsValid) {
		formIsValid = true;
	}

	// form handler
	const formSubmitHandler = (e) => {
		e.preventDefault();

		if (!firstNameInputIsValid && !lastNameInputIsValid && !emailInputIsValid) {
			return;
		}
		console.log(enteredFirstName);
		console.log(enteredLastName);
		console.log(enteredEmail);
		resetFirstName();
		resetLastName();
		resetEmail();
	};

	// conditinal classes
	const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
	const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
	const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

	return (
		<form onSubmit={formSubmitHandler}>
			<div className="control-group">
				{/* First Name */}
				<div className={firstNameClasses}>
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						id="firstName"
						onChange={firstNameChangeHandler}
						value={enteredFirstName}
						onBlur={firstNameBlurHandler}
					/>
					{firstNameHasError && <p className="error-text">Please add a valid name!</p>}
				</div>
				{/* last Name */}
				<div className={lastNameClasses}>
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						onChange={lastNameChangeHandler}
						onBlur={lastNameBlurHandler}
						value={enteredLastName}
					/>
					{lastNameHasError && <p className="error-text">Please add a valid name!</p>}
				</div>
			</div>
			{/* Email */}
			<div className={emailClasses}>
				<label htmlFor="email">E-Mail Address</label>
				<input
					type="email"
					id="email"
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					value={enteredEmail}
				/>
				{emailHasError && <p className="error-text">Please add a valid email!</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
}

export default BasicForm;
