import { register } from "../../backend/auth.js";
import { navigate } from "../../router/router.js";
import { displayFormError } from "../../ui/errors.js";

/**
 * Handles the registration form by adding a submit event listener to it.
 */
export function handleRegisterForm() {
	const form = document.querySelector("#registerForm");
	if (!form) {
		return;
	}
	form.addEventListener("submit", submitRegisterForm);
}

/**
 *Submits the registration form by getting the email and password,
 *sending them to the register function, and handling the response.
 *@param {Event} event - The submit event of the form.
 *@async
 */
async function submitRegisterForm(event) {
	event.preventDefault();
	const form = event.target;
	const data = new FormData(form);
	const email = data.get("email");
	const password = data.get("password");

	// assumes the register function returns an object with a user and error property
	const { user, error } = await register(email, password);

	// the registration was successful, navigate elsewhere
	if (user) {
		return navigate("/admin");
	}

	// display an error
	displayFormError(form, error);
}
