from rest_framework import routers
from .api import DiaryViewSet, DiaryViewPopularSet, DiaryTensorflowPreprocessing

router = routers.DefaultRouter()
router.register('api/diaries', DiaryViewSet, 'diaries')
router.register('api/trending', DiaryViewPopularSet, 'trending')
router.register('api/recommendation', DiaryTensorflowPreprocessing, "recommendation")

urlpatterns = router.urls
