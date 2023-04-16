import React, { useRef, useState } from "react";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from "./../../../firebase.config";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const auth = getAuth(app);

const Login = () => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const emailRef = useRef();

	const handleLogin = (e) => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		console.log(email, password);

		// validation
		setError("");
		setSuccess("");

		if (!/(?=.*[A-Z])/.test(password)) {
			setError("AT least one uppercase letters");
			return;
		} else if (!/(?=.*[#?!@$%^&*])/.test(password)) {
			setError("Please add a special character");
			return;
		} else if (password.length < 6) {
			setError("Minimum 6 character");
			return;
		}

		signInWithEmailAndPassword(auth, email, password)
			.then((result) => {
				const loggedUser = result.user;
				console.log(loggedUser);
				// if(!loggedUser.emailVerified){}
				setSuccess("Successfully Login in");
				setError("");
			})
			.catch((error) => setError(error.message));
	};

	const handleResetPassword = (e) => {
		const email = emailRef.current.value;

		if (!email) {
			alert("Please provide your email address to reset your password");
			return;
		}

		sendPasswordResetEmail(auth, email)
			.then(() => {
				alert("Please check your email");
			})
			.catch((error) => setError(error.message));
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			console.log("Enter key pressed");
		}
	};

	return (
		<div className="mx-auto w-1/4 mt-10">
			<h2 className="my-title">Please Login</h2>
			<div className="box-area">
				<form onSubmit={handleLogin} action="">
					<input
						required
						id="email"
						type="email"
						name="email"
						ref={emailRef}
						className="input-field"
						placeholder="Your Email"
					/>
					<br />
					<div className="relative">
						<input
							required
							id="password"
							type={showPassword ? "text" : "password"} // Toggle the input type based on the showPassword state variable
							name="password"
							className="input-field"
							placeholder="Your Password"
						/>
						<button
							type="button"
							className="absolute top-[35%] right-[4rem] transform -translate-y-1/2 text-gray-600"
							onClick={togglePasswordVisibility} // Call the togglePasswordVisibility function on button click
						>
							{showPassword ? (
								<EyeIcon className="h-5 w-5 text-[#2b2b2b]" />
							) : (
								<EyeSlashIcon className="h-5 w-5 text-[#2b2b2b]" />
							)}
						</button>
					</div>
					<label className="flex items-center">
						<input type="checkbox" className="form-checkbox" />
						<span className="ml-2 text-sm">Remember Me</span>
					</label>
					<br />
					<input onKeyDown={handleKeyDown} className="btn-primary" type="submit" value="Submit" />
				</form>
				<div className="flex justify-between mt-3">
					<button onClick={handleResetPassword} className="btn-link">
						Forget Password
					</button>
					<Link to="/registertc">
						<span className="btn-link">Register</span>
					</Link>
				</div>
				<p className="text-red-800 mt-5">{error}</p>
				<p className="text-green-800 mt-5">{success}</p>
			</div>
		</div>
	);
};

export default Login;
