from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('get-questions', views.getQuestions, name='getQuestions'),
    path('quiz', views.availableQuiz, name='availableQuiz'),
    path('register', views.createUser, name='createUser'),
    path('result', views.getResult, name='getResult'),
    path('get-result', views.showResult, name='showResult'),
    path('check-answer', views.checkAnswer, name='checkAnswer'),
    path('save-response', views.saveResponse, name='saveResponse'),
    path('login', views.loginUser, name='loginUser'),
    path('logout', views.logout_view, name='logout_view'),
    path('resend', views.resendPassword, name='resendPassword'),
    path('add-quiz', views.createQuiz, name='createQuiz'),
    path('add-questions', views.addQuestions, name='addQuestions'),

]