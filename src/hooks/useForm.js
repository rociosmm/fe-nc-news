import React, {useState} from "react";

export const useForm = (firstObject = {}) => {
	const [form, setForm] = useState(firstObject);

	const serializeForm = (form) => {
		const formData = new FormData(form);

		// const fullForm = {article_id: article_id, author: userLogged};
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
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formDataReceived = serializeForm(e.target);
		setForm(formDataReceived);
	};
	console.log("form :>> ", form);
	return {
		form,
		handleChange,
		handleSubmit,
	};
};
