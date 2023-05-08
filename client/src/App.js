import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/index.jsx";
import { UserContext } from "./context/AuthContext.js";
import Loader from "rsuite/Loader";
const HomePage = lazy(() => import("./pages/home-page/index.jsx"));
const LoginPage = lazy(() => import("./pages/login-page/index.jsx"));
const RegisterPage = lazy(() => import("./pages/register-page/index.jsx"));
const WritePostPage = lazy(() => import("./pages/create-post/index.jsx"));
const SingleBlogPage = lazy(() => import("./pages/single-blog/index.jsx"));
const CategoryPage = lazy(() => import("./pages/category-page/index.jsx"));

function App() {
  return (
    <div className="app">
      <UserContext>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Suspense
                    fallback={<Loader backdrop vertical content="Loading..." />}
                  >
                    <HomePage />
                  </Suspense>
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loader content="Loading..." />}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<Loader content="Loading..." />}>
                  <RegisterPage />
                </Suspense>
              }
            />
            <Route
              path="/write-post"
              element={
                <Suspense fallback={<Loader content="Loading..." />}>
                  <WritePostPage />
                </Suspense>
              }
            />
            <Route
              path="/:id"
              element={
                <Layout>
                  <Suspense fallback={<Loader content="Loading..." />}>
                    <SingleBlogPage />
                  </Suspense>
                </Layout>
              }
            />
            <Route
              path="blogs/:category"
              element={
                <Layout>
                  <Suspense fallback={<Loader content="Loading..." />}>
                    <CategoryPage />
                  </Suspense>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserContext>
    </div>
  );
}

export default App;
