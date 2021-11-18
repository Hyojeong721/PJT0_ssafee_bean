import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/movies/Home.vue'
import MovieList from '../views/movies/MovieList.vue'
import ReviewList from '../views/reviews/ReviewList.vue'
import Recommendation from '../views/recommendation/Recommendation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies',
    name: 'MovieList',
    component: MovieList
  },
  {
    path: '/recommendation',
    name: 'Recommendation',
    component: Recommendation
  },
  {
    path: '/reviews',
    name: 'reviewList',
    component: ReviewList,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
