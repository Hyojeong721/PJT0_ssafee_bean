import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/movies/Home.vue'
import MovieList from '../views/movies/MovieList.vue'
import LikeMovieList from '../views/movies/LikeMovieList.vue'
import MovieDetail from '../views/movies/MovieDetail.vue'

import ReviewList from '../views/reviews/ReviewList.vue'
import ReviewForm from '../views/reviews/ReviewForm.vue'
import ReviewDetail from '../views/reviews/ReviewDetail.vue'

import Recommendation from '../views/recommendation/Recommendation.vue'
import GenreReco from '../views/recommendation/GenreReco.vue'
import GenreRecoDetail from '../views/recommendation/GenreRecoDetail.vue'

import Login from '../views/accounts/Login.vue'
import Signup from '../views/accounts/Signup.vue'
import Profile from '../views/accounts/Profile.vue'


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
    path: '/movies/:movie_id',
    name: 'MovieDetail',
    component: MovieDetail
  },
  {
    path: '/profile/likes',
    name: 'LikeMovieList',
    component: LikeMovieList
  },
  {
    path: '/recommendation',
    name: 'Recommendation',
    component: Recommendation
  },
  {
    path: '/recommendation/genre/home/',
    name: 'GenreReco',
    component: GenreReco
  },
  { 
    path: '/recommendation/genre/:genre_id/',
    name: 'GenreRecoDetail',
    component: GenreRecoDetail
  },
  {
    path: '/reviews',
    name: 'ReviewList',
    component: ReviewList,
  },
  {
    path: '/reviews/create',
    name: 'ReviewForm',
    component: ReviewForm,
  },
  {
    path: '/reviews/:review_id',
    name: 'ReviewDetail',
    component: ReviewDetail,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
