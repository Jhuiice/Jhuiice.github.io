from django.urls import path
from . import views

app_name = "autos"
urlpatterns = [
    path('', views.MainView.as_view(), name='all'),
    path('lookup/', views.MakeView.as_view(), name='make_view'),
    path('main/create/auto/', views.AutoCreate.as_view(), name='auto_create'),
    path('main/update/auto/<int:pk>/', views.AutoUpdate.as_view(), name='auto_update'),
    path('main/delete/auto/<int:pk>/', views.AutoDelete.as_view(), name='auto_delete'),
    path('lookup/create/', views.MakeCreate.as_view(), name='make_create'),
    path('lookup/update/make/<int:pk>/', views.MakeUpdate.as_view(), name='make_update'),
    path('lookup/delete/make/<int:pk>/', views.MakeDelete.as_view(), name='make_delete'),
    ]