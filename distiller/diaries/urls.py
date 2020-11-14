from rest_framework import routers
from .api import DiaryViewSet

router = routers.DefaultRouter()
router.register('api/diaries', DiaryViewSet, 'leads')

urlpatterns = router.urls
