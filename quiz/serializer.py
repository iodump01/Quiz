from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Question, Quiz, Result, currentResponse


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('questionId', 'questionType', 'question',
              'option1', 'option2', 'option3', 'option4', 'marks', 'quizId', 'time', 'quesLevel', 'instructions')

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name']

# User Serializer
class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'


# User Serializer
class CurrentResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = currentResponse
        fields = '__all__'