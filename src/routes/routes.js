import {
    StaPage,
    StuPage,
    Home,
    StaLogin,
    StuLogin
   
} from '../views'


export const privateRoutes = [
    {
        id: 1,
        path: '/staff-page',
        component: StaPage
    },
    {
        id: 2,
        path: "/student-page",
        component: StuPage
    }
   
  
]

export const publicRoutes = [
    {
        id: 100,
        path: '/',
        component: Home
    },
    {
        id: 101,
        path: '/staff-login',
        component: StaLogin
    },
    {
        id: 102,
        path: '/student-login',
        component: StuLogin
    }

]

