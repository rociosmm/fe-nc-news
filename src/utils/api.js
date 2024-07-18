import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-hv67.onrender.com/api",
});

export const getArticles = (params = {}) => {
  return ncNewsApi
    .get("/articles", { params })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getArticleByID = (article_id) => {
  return ncNewsApi
    .get(`/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      throw err;
    });
};

export const getTopics = () => {
  return ncNewsApi
    .get("/topics")
    .then(({ data }) => {
      return data.topics;
    })
    .catch((err) => {
      throw err;
    });
};

export const getTopic = (params) => {
  return ncNewsApi
    .get("/topics", { params })
    .then(({ topic }) => {
      return topic;
    })
    .catch((err) => {
      throw err;
    });
};
export const getCommentsForArticle = (article_id) => {
  return ncNewsApi
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
    .catch((err) => {
      throw err;
    });
};
export const getUsers = () => {
  return ncNewsApi
    .get("/users")
    .then(({ data }) => {
      return data.users;
    })
    .catch((err) => {
      throw err;
    });
};

export const getUser = (username) => {
	return ncNewsApi.get(`/users/${username}`).then(({ data }) => {
		const { user } = data;
		return user;
  });
};

export const editArticle = (article_id, body) => {
  return ncNewsApi
    .patch(`/articles/${article_id}`, body)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        throw new Error(res.msg);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const postComment = (article_id, body) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, body)
    .then((res) => {
      console.log("res post axios :>> ", res);
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        throw new Error(res.msg);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteCommentReq = (comment_id) => {
  return ncNewsApi
    .delete(`/comments/${comment_id}`)
    .then((res) => {
      if (res.status === 204) {
        return "Comment deleted";
      }
    })
    .catch((err) => {
      throw err;
    });
};
