from diaries.models import Diary
from rest_framework import viewsets, permissions
from .serializers import DiarySerializer

#Added by Kanishk, 11/29/20
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
  queryset = Diary.objects.all().order_by('-likes')

  def update(self, request, *args, **kwargs):
    kwargs['partial'] = True
    return super.update(request, *args, **kwargs)

#Added by Kanishk, 11/29/20
class DiaryTensorflowPreprocessing(viewsets.ModelViewSet):
  
  queryset = Diary.objects.all()
  intermediate = [item.entry for item in queryset]
  
  def preprocessing(input_string):
    tokenizer = preprocessing.text.tokenizer_from_json('tokenizer.json')
    tokenized_inputs = tokenizer.texts_to_sequences([input_string])
    padded_inputs = preprocessing.sequence.pad_sequences(tokenized_inputs, maxlen=1000)
    return padded_inputs #This will be sent in the POST request to serving
