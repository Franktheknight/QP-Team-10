from rest_framework import routers
from .api import DiaryViewSet, DiaryViewPopularSet, DiaryTensorflowPreprocessing

router = routers.DefaultRouter()
router.register('api/diaries', DiaryViewSet, 'diaries')
router.register('api/trendings', DiaryViewPopularSet, 'trendings')
router.register('api/recommendations', DiaryTensorflowPreprocessing, "recommendations")
router.register('api/recommendations/update/(?P<pk>\d+)/$', DiaryTensorflowPreprocessing, "recommendations_update")


urlpatterns = router.urls
