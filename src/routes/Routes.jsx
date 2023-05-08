import Home from "../components/pages/Home/Home";
import Login from "../components/pages/Auth/Login";
import Register from "../components/pages/Auth/Register";
import ChangePassword from "../components/pages/Auth/ChangePassword";
import ForgotPassword from "../components/pages/Auth/ForgotPassword";
import PostDetail from "../components/pages/PostDetail/PostDetail";
import History from "../components/pages/History/History";
import AllPosts from "../components/pages/AllPosts/AllPosts";
import ConfirmEmail from "../components/pages/Auth/ConfirmEmail";
// public routes
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/PostDetail/:id", component: PostDetail },
  { path: "/allPosts", component: AllPosts },
];

// private routes
const privateRoutes = [
  { path: "/changePassword", component: ChangePassword, layout: null },
  { path: "/forgotPassword", component: ForgotPassword, layout: null },
  { path: "/confirmEmail/:token", component: ConfirmEmail, layout: null },
  { path: "/history", component: History },
];

export { publicRoutes, privateRoutes };
