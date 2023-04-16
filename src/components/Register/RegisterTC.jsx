import React, { useState } from "react";
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	updateProfile,
} from "firebase/auth";
import app from "../../../firebase.config";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const auth = getAuth(app);

const RegisterTC = () => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [showPassword, setAShowPassword] = useState(false);

	const handleRegister = (e) => {
		e.preventDefault();
		setSuccess("");
		setError("");
		const name = e.target.name.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		console.log(name, email, password);

		// validation
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

		// create user in firebase
		createUserWithEmailAndPassword(auth, email, password)
			.then((result) => {
				const loggedUser = result.user;
				console.log(loggedUser);
				setError("");
				e.target.reset();
				setSuccess("User has been created successfully");
				sendVerificationEmail(result.user);
				updateeUserData(result.user, name);
			})
			.catch((error) => {
				console.error(error.message);
				setError(error.message);
				setSuccess("");
			});
	};

	const sendVerificationEmail = (user) => {
		sendEmailVerification(user)
			.then((result) => {
				console.log(result);
				alert("Verification email sent successfully");
			})
			.catch((error) => console.log(error));
	};

	const updateeUserData = (user, name) => {
		updateProfile(user, {
			displayName: name,
		})
			.then(() => console.log("User name updated successfully"))
			.catch((error) => setError(error.message));
	};

	const passwordVisibility = () => {
		setAShowPassword(!showPassword);
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			console.log("Enter key pressed");
		}
	};

	return (
		<div className="mx-auto w-1/4 mt-10">
			<h4 className="my-title">Please Register</h4>
			<div className="box-area">
				<form onSubmit={handleRegister} className="" action="">
					<input
						required
						id="name"
						type="text"
						name="name"
						className="input-field"
						placeholder="Your Name"
					/>
					<br />
					<input
						required
						id="email"
						type="email"
						name="email"
						className="input-field"
						placeholder="Your Email"
					/>
					<br />
					<div className="relative">
						<input
							required
							id="password"
							type={showPassword ? "text" : "password"}
							name="password"
							className="input-field"
							placeholder="Your Password"
						/>
						<button
							type="button"
							className="absolute top-[35%] right-[4rem] transform -translate-y-1/2 text-gray-600"
							onClick={passwordVisibility} // Call the togglePasswordVisibility function on button click
						>
							{showPassword ? (
								<EyeIcon className="h-5 w-5 text-[#2b2b2b]" />
							) : (
								<EyeSlashIcon className="h-5 w-5 text-[#2b2b2b]" />
							)}
						</button>
					</div>
					<br />
					<input
						onKeyDown={handleKeyDown}
						className="btn-primary"
						type="submit"
						value="Register"
					/>
				</form>
				<p className="mt-3">
					Already have an account? Please{" "}
					<Link to="/login">
						<span className="btn-link">Login</span>
					</Link>
				</p>
				<br />
				<p className="text-red-700 -mt-5">{error}</p>
				<p className="text-green-700 -mt-5">{success}</p>
			</div>
		</div>
	);
};

export default RegisterTC;
