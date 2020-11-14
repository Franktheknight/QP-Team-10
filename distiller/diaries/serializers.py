from rest_framework import serializers
from diaries.models import Diary

# Lead Serializer
class DiarySerializer(serializers.ModelSerializer):
  class Meta:
    model = Diary
    fields = '__all__'
