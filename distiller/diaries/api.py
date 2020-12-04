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
THRESHOLD = 0.63

class DiaryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = DiarySerializer

    def get_queryset(self):
        personal_entries = self.request.user.diaries.all().order_by('-created_at')
        return_set = [entry for entry in personal_entries if not entry.private]
        return return_set[:10]

    def perform_create(self, serializer):
        emotion = self.inferEmotion(self.request.data.entry)
        serializer.save(owner=self.request.user, spectrum=emotion)

     #  Takes in string of post, return 2-element array of floats from model
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

class DiaryViewPopularSet(viewsets.ModelViewSet):

    serializer_class = DiarySerializer
    likes_set = Diary.objects.all().order_by('-likes')
    #likes_set = Diary.objects.order_by('-likes')
    if (likes_set.count() >= 10):
        likes_set = likes_set[:10]
    queryset = likes_set

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super.update(request, *args, **kwargs)

#Added by Kanishk, 11/29/20, revised by Boopala 12/3/20
class DiaryTensorflowPreprocessing(viewsets.ModelViewSet):

  permission_classes = [
        permissions.IsAuthenticated,
    ]
  # intermediate = [item.entry for item in queryset]
  # queryset = Diary.objects.all()

  def get_queryset(self):
        current_user = self.request.user.diaries.all().order_by('-created_at')
        #current_user = self.request.user.diaries.order_by('-created_at')
        if(current_user.count() < 1):
          current_user = [1,1]
        else:
          current_user = current_user[:1]
        recent_entries =  Diary.objects.all().order_by('-created_at')
        #recent_entries =  Diary.objects.order_by('-created_at')
        recent_entries = [entry for entry in recent_entries if entry.private == False ]
        recent_entries = [entry for entry in recent_entries if self.recommend(entry, current_user[0]) ]

        if(recent_entries.count() >= 10):
          recent_entries = recent_entries[:10]
        return recent_entries

  def recommend(self, db_entry, user_entry):

    currUserHappiness = user_entry.spectrum[0]
    currDatabaseHappiness = db_entry.spectrum[0]

    currUserSatisfaction = user_entry.spectrum[1]
    currDatabaseSatisfaction = db_entry.spectrum[1]

    HappinessMeasure = (currUserHappiness - currDatabaseHappiness) ^ 2
    SatisfactionMeasure = (currUserSatisfaction - currDatabaseSatisfaction) ^ 2

    totalMeasure = HappinessMeasure - SatisfactionMeasure

    return (totalMeasure / 2) < THRESHOLD







