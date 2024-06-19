import axios from "axios";

const ncNewsApi = axios.create({
	baseURL: "https://be-nc-news-hv67.onrender.com/api",
});

/* general request for all the endpoints, they are passed as parameters
export const getRequest = (endpoint, params = {}) => {
	console.log("params :>> ", params);
	return ncNewsApi
		.get(endpoint, {params})
		.then((res) => {
			console.log("res :>> ", res);
			return res.data;
		})
		.catch((err) => {
			console.log("err :>> ", err);
			throw err;
		});
};*/

export const getArticles = () => {
	return ncNewsApi
		.get("/articles")
		.then(({data}) => {
			return data;
		})
		.catch((err) => {
			throw err;
		});
};

export const getArticleByID = (article_id) => {
	return ncNewsApi
		.get(`/articles/${article_id}`)
		.then(({data}) => {
			console.log("data in getArticleByID :>> ", data);
			return data.article;
		})
		.catch((err) => {
			throw err;
		});
};

export const getTopics = () => {
	return ncNewsApi
		.get("/topics")
		.then(({data}) => {
			return data;
		})
		.catch((err) => {
			throw err;
		});
};

export const getTopic = (params) => {
	return ncNewsApi
		.get("/topics", {params})
		.then(({topic}) => {
			return topic;
		})
		.catch((err) => {
			throw err;
		});
};
export const getCommentsForArticle = (article_id) => {
	return ncNewsApi
		.get(`/articles/${article_id}/comments`)
		.then(({comments}) => {
			return comments;
		})
		.catch((err) => {
			throw err;
		});
};
export const getUsers = () => {
	return ncNewsApi
		.get("/users")
		.then(({users}) => {
			return users;
		})
		.catch((err) => {
			throw err;
		});
};