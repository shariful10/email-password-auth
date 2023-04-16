import React, { useState } from "react";

const Register = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		console.log(email, password);
	};

	const handleEmailChange = (event) => {
		// console.log(event.target.value);
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		// console.log(event.target.value);
	};

	return (
		<div className="mt-5">
			<h2 className="text-3xl font-semibold">Please Register</h2>
			<form onSubmit={handleSubmit} className="my-5" action="">
				<input
					onChange={handleEmailChange}
					className="input-field"
					type="email"
					name="email"
					id="email"
					placeholder="Your Email"
				/>
				<br />
				<input
					onBlur={handlePasswordChange}
					className="input-field"
					type="password"
					name="password"
					id="password"
					placeholder="Your Password"
				/>
				<br />
				<input className="btn-primary" type="submit" value="Register" />
			</form>
		</div>
	);
};

export default Register;
