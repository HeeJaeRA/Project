// 유저화면
import UserLayout from "../views/UserTemplate.vue";
import UserMain from "../views/user/UserMain.vue";
import TestLogin from "../views/user/TestLogin.vue";

export default {
  path: "/",
  name: "user",
  component: UserLayout,
  children: [
    {
      path: "/home",
      name: "userHome",
      component: UserMain,
    },
    {
      path: "/login",
      name: "userLogin",
      component: TestLogin,
    },
  ],
};
