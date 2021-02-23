/*
 * @Description: 路由相关操作写于此文件
 * 路由名称大写
 * */

const HomePage = {
  path: '/',
  name: 'Home',
  component: () => import('@/views/HomePage'),
  children: [],
}
const OtherPage = {
  path: '/other',
  name: 'Other',
  component: () => import('@/views/OtherPage'),
  children: [],
}
const redirectPage = {
  path: '*',
  redirect: '/',
  component: () => import('@/views/HomePage'),
  children: [],
}
export default [
  HomePage,
  OtherPage,
  redirectPage,
]
