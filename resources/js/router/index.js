import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      redirect: (to) => {
        const userToken = localStorage.getItem("userToken");
        // return userToken ? "/dashboard" : "/login";
        return "/login";
      },
    },
    {
      path: "/login",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/auth/login.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/[...all].vue"),
        },
      ],
    },
    {
      path: "/unauthorized",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/auth/unauthorized.vue"),
        },
      ],
    },


    // authenticated
    
    // admin
    {
      path: "/dashboard",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/dashboard.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },    
    {
      path: "/office",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/office/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },    
    {
      path: "/permission",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/permission/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },    
    {
      path: "/position",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/position/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },    
    {
      path: "/users",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/user/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },    
    {
      path: "/notifconf",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/notification/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },    
    {
      path: "/notifconf/:officeId",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/notification/detail.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },    
    {
      path: "/data-master",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/data/index.vue"),
          beforeEnter: (to, from, next) => {
            checkAdminLogin(next);
          },
        },
      ],
    },  
    {
      path: "/a-credit/:fileId",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/data/detail.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/a-pdfeditor/:idAttach",
      component: () => import("../layouts/admin/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/admin/data/components/compo/pdfeditor.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    

    // //user
    {
      path: "/user-dashboard",
      component: () => import("../layouts/user/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/user/dashboard.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/u-profile",
      component: () => import("../layouts/user/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/user/profile/profile.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/u-credit",
      component: () => import("../layouts/user/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/user/credit/index.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/u-credit/:fileId",
      component: () => import("../layouts/user/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/user/credit/detail.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    {
      path: "/u-pdfeditor/:idAttach",
      component: () => import("../layouts/user/default.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/user/credit/components/compo/pdfeditor.vue"),
          beforeEnter: (to, from, next) => {
            checkLogin(next);
          },
        },
      ],
    },
    
  ],
});

function checkLogin(next) {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    next();
  } else {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    
    alert("You need to login to access this page.");
    next("/login");
  }
}

function checkAdminLogin(next) {
  const userToken = localStorage.getItem("userToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userToken && userData && userData.position.name=="administrator") {
    next();
  } else {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    
    alert("You need to have admin permission to access this page.");
    next("/login"); 
  }
}

export default router;
