from diaries.models import Diary
from rest_framework import viewsets, permissions
from .serializers import DiarySerializer

<<<<<<< HEAD
=======
#Added by Kanishk, 11/29/20
>>>>>>> a020477fa53375c5bd20ac3850b8e21f2f0e0214
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

<<<<<<< HEAD
class DiaryTensorFlowPreprocessing(viewsets.ModelViewSet):

  serializer_class = DiarySerializer
  queryset = Diary.objects.all()
  intermediate = [item.entry for item in queryset]

=======
#Added by Kanishk, 11/29/20
class DiaryTensorflowPreprocessing(viewsets.ModelViewSet):
  
  queryset = Diary.objects.all()
  intermediate = [item.entry for item in queryset]
  
  #Takes in string of post, return 2-element array of floats from model
  def inferEmotion(input_string):
    tokenizer = pre.text.tokenizer_from_json(uploaded['tokenizer.json'])
    tokenized_inputs = tokenizer.texts_to_sequences([input_string])
    padded_inputs = pre.sequence.pad_sequences(tokenized_inputs, maxlen=1000)
    formatted_input = model_input.tolist()
    data = json.dumps({"instances": formatted_input})
    json_response = requests.post("http://diadist.herokuapp.com/v1/models/diarydistiller/versions/1:predict", data=data)
    response = json.loads(json_response.text)
    return response["predictions"][0]
>>>>>>> a020477fa53375c5bd20ac3850b8e21f2f0e0214
