from diaries.models import Diary
from rest_framework import viewsets, permissions
from .serializers import DiarySerializer

#Added by Kanishk, 11/29/20; revised by Boopala 12/3/20
#from keras import preprocessing
import requests
from keras_preprocessing import text, sequence
import json
import numpy as np
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

#Added by Kanishk, 11/29/20, revised by Boopala 12/3/20
class DiaryTensorflowPreprocessing(viewsets.ModelViewSet):
  
  queryset = Diary.objects.all()
  intermediate = [item.entry for item in queryset]
  
  #Takes in string of post, return 2-element array of floats from model
  def inferEmotion(self, input_string):
	  with open('tokenizer.json') as f:
		  data = json.load(f)
	  newdata = json.dumps(data)
	  tokenizer = text.tokenizer_from_json(newdata)
	  tokenized_inputs = tokenizer.texts_to_sequences([input_string])
	  padded_inputs = sequence.pad_sequences(tokenized_inputs, maxlen=1000)
	  formatted_input = padded_inputs.tolist()
	  data = json.dumps({"instances": formatted_input})
	  json_response = requests.post("http://diadist.herokuapp.com/v1/models/diarydistiller/versions/1:predict", data=data)
	  response = json.loads(json_response.text)
	  return response["predictions"][0]
