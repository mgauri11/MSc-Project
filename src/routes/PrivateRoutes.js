import {
    StaPage,
    StuPage
   
} from '../views'


export const privateRoutes = [
    {
        id: 1,
        path: '"/staff-page"',
        component: StaPage
    },
    {
        id: 2,
        path: "/student-page",
        component: StuPage
    }
   
  
]

/*export const publicRoutes = [
    {
        id: 100,
        path: '/',
        component: LoginView
    },
    {
        id: 100,
        path: '/login',
        component: LoginView
    },
    {
        id: 101,
        path: '/',
        component: NotFoundView
    }

]*/

