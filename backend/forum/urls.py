from django.urls import path
from .views import ForumView, PostDetailView, RepliesView

urlpatterns = [
    path('', ForumView.as_view(), name='forum'),
    path('<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('<int:post_id>/replies/', RepliesView.as_view(), name='replies'),
]
