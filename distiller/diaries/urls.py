from rest_framework import routers
from .api import DiaryViewSet, DiaryViewPopularSet

router = routers.DefaultRouter()
router.register('api/diaries', DiaryViewSet, 'diaries')
router.register('api/trending', DiaryViewPopularSet, 'trending')

urlpatterns = router.urls
