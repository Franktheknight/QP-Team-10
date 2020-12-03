from diaries.models import Diary
from rest_framework import viewsets, permissions
from .serializers import DiarySerializer

from keras import preprocessing

# Lead Viewset


class DiaryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = DiarySerializer

    def get_queryset(self):
        return self.request.user.diaries.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class DiaryViewPopularSet(viewsets.ModelViewSet):

  serializer_class = DiarySerializer
  queryset = Diary.objects.all().order_by('-likes')[:10]

  def update(self, request, *args, **kwargs):
    kwargs['partial'] = True
    return super.update(request, *args, **kwargs)

class DiaryTensorFlowPreprocessing(viewsets.ModelViewSet):

  serializer_class = DiarySerializer
  queryset = Diary.objects.all()
  intermediate = [item.entry for item in queryset]

