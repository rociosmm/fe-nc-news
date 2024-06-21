import React, {useState} from "react";

export const useForm = (firstObject = {}) => {
	const [form, setForm] = useState(firstObject);

	const serializeForm = (form) => {
		const formData = new FormData(form);

		const fullForm = firstObject;
		for (let [name, value] of formData) {
			fullForm[name] = value;
		}

		return fullForm;
	};

	const handleChange = ({target}) => {
		const {name, value} = target;
		setForm((currentData) => ({
			...currentData,
			[name]: value,
		}));
		document.querySelector("form>input[type=submit]").disabled = false;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formDataReceived = serializeForm(e.target);
		setForm(formDataReceived);
		document.querySelector("form>input[type=submit]").disabled = true;
	};
	console.log("form :>> ", form);
	return {
		form,
		handleChange,
		handleSubmit,
	};
};
