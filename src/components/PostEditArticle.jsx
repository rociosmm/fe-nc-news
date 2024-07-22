import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { capitalizeString } from "../utils/helpers";
import { getTopics, postNewArticle } from "../utils/api";
import { useForm } from "../hooks/useForm";

export const PostEditArticle = ({ setPostArticle, username }) => {
  const location = useLocation();
  const article = location.state ? location.state.article : null;
  console.log("article :>> ", article);
  const [topics, setTopics] = useState([]);
  const { form, handleChange, handleSubmit } = useForm({ author: username });

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  const handleSubmitArticle = (e) => {
    e.preventDefault();
    handleSubmit(e);
    console.log("form bf send to api:>> ", form);
    postNewArticle(form).then((data) => {
      console.log("data in component :>> ", data);
    });

    //setPostArticle(false)
  };

  return (
    <div className="container p-2 px-4">
      {!article ? (
        <h1 className="mb-5">Post a new article</h1>
      ) : (
        <h1 className="mb-5">Edit...</h1>
      )}

      <Form action="" onSubmit={handleSubmitArticle}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Article title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Add the title"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Select a topic</Form.Label>
          <Form.Select
            name="topic"
            aria-label="Add a topic to your article"
            required
            onChange={handleChange}
          >
            <option>Select a topic</option>
            {topics.map((topic) => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {capitalizeString(topic.slug)}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        {form.article_img_url ? (
          <img src={form.article_img_url} width="200" />
        ) : null}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Article featured image</Form.Label>
          <Form.Control
            name="article_img_url"
            type="url"
            placeholder="Add the url for your article"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <Form.Control
            name="body"
            as="textarea"
            rows={15}
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control type="submit" className="btn btn-success" />
        </Form.Group>
      </Form>
    </div>
  );
};
