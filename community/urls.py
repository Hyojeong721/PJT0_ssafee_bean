from django.urls import path
from . import views

urlpatterns = [
    path('', views.review_list),
    path('<int:review_pk>/', views.review_detail),
    path('<int:review_pk>/likes', views.review_likes),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('<int:review_pk>/comments/', views.comment_create),
]