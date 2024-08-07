import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { Blog } from "../components/Blog";
import { SingleArticle } from "../components/SingleArticle";
import { PostEditArticle } from "../components/PostEditArticle";
import { Users } from "../components/Users";
import { SingleUser } from "../components/SingleUser";
import { Error404 } from "../components/Error404";

export const NcRoutes = ({ articles, isLoading }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/blog"
        element={<Blog articles={articles} isLoading={isLoading} />}
      />
      <Route path="/blog/:article_id" element={<SingleArticle />} />
      <Route path="/blog/:article_id/edit" element={<PostEditArticle />} />
      <Route path="/blog/new-article" element={<PostEditArticle />} />
      <Route path="/blog/topics/:topic" element={<Blog />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:username" element={<SingleUser />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
