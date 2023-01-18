import messages from "../constants/messages.js";

/**
 * This function displays an error message on a form, inside an element with an id of error
 * @param {HTMLElement} form - The form element where the error message will be displayed
 * @param {Object} error - The error object containing the error code and message
 * @param {string} error.code - The error code, may not exist depending on the provider
 * @param {string} error.message - The error message, may not exist depending on the provider
 */
export function displayFormError(form, error) {
	// Destructuring the error object properties code and message
	// Assumes the error object contains a code and message property
	const { code, message } = error;
	// Lookup the error message from messages.error object and if not found use the error message
	const errorMessage = messages.error[code] ?? message;
	// Creating the html for the error message
	const html = `<div class="p-4 mb-4 text-sm text-red-700 bg-red-100" role="alert">
								${errorMessage}
							</div>`;
	// Setting the innerHTML of the form #error element to the created html
	form.querySelector("#error").innerHTML = html;
}
