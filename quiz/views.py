from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Question, Quiz, Result, currentResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializer import QuestionSerializer, QuizSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login, logout
from .mail import send_mail
import random
import json
import secrets


@api_view(['GET'])
def home(request):
    return Response('Hello')

# Create new user


@api_view(['GET'])
def createUser(request):
    try:
        email = request.GET.get('email').lower()
        password = secrets.token_urlsafe(8)
        first_name = request.GET.get('name').capitalize()
        username = first_name.replace(" ", "")[0:6]+create_new_ref_number()
        if (User.objects.filter(email=email).exists()):
            return Response({
                "status": False,
                "error": 'Email is already registered.',
            }, status=status.HTTP_406_NOT_ACCEPTABLE)
        user = User(username=username, email=email, first_name=first_name)
        user.set_password(password)
        user.save()
        if (user):
            login(request, user)
            refresh = RefreshToken.for_user(user)
            msg = f'Hi {user.first_name}<br><br>Your Credentials for CyberTronic Capture The Flag are below:<br><br>username: {user.username}<br>password: {password}<br><br>You can play CTF on http://quantafile.com/<br><br>Regard\'s<br>IODump Teams'
            send_mail(user.email, 'Your Credentials For CyberTronic CTF', msg)
            return Response({
                "status": True,
                "user": {
                    "email": user.email,
                    "name": user.first_name,
                    "username": user.username
                },
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
    except:
        return Response({
            "status": False,
            "user": {},
            "error": "Something went wrong. Try agian later!"
        }, status=status.HTTP_400_BAD_REQUEST)

# Login user


@api_view(['POST'])
def loginUser(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        return Response({"status": True, "user": {
            "email": user.email,
            "name": user.first_name,
            "username": user.username,
        },
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    else:
        return Response({"status": False, "user": [], "error": "Username or password mismatched!"}, status=status.HTTP_403_FORBIDDEN)

# logout


@api_view(['GET', 'POST'])
def logout_view(request):
    logout(request)
    return Response({"status": True, "user": [], "data": "User logout successfully!"})


# Protected Routes------
# Get Questions
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getQuestions(request):
    try:
        id = request.GET.get("id")
        res = Question.objects.filter(quizId=id, active=True)
        if (res):
            serialized = QuestionSerializer(res, many=True).data
            return Response({"status": True, "data": serialized})
        else:
            raise Exception
    except:
        return Response({"status": False, "error": "Something went wrong."}, status=status.HTTP_400_BAD_REQUEST)


# Available quiz
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def availableQuiz(request):
    res = Quiz.objects.filter(active=True)
    serialized = QuizSerializer(res, many=True).data
    return Response({"status": True, "data": serialized})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getResult(request):
    try:
        answers = json.loads(request.POST.get('answered'))
        quizId = Quiz.objects.filter(quizId=request.POST.get('quizId')).first()
        timeTaken = request.POST.get('timeTaken')
        userId = User.objects.filter(id=request.user.id).first()
        already = Result.objects.filter(userId=userId, quizId=quizId).first()
        if (already):
            return Response({"status": True, "data": {"marks": already.marksObtained, "correct": already.answersMarked, "date": already.created_on, "totalQuestions": already.totalQuestion, "timeTaken": already.timeTaken}})
        correct = []
        totalQues = Question.objects.filter(quizId=quizId).count()
        x = 0
        for i in answers:
            question = Question.objects.filter(
                questionId=i['questionId']).first()
            if (question.correct.lower().replace(' ', '') == i['answer'].lower().replace(' ', '')):
                x = x + question.marks
                correct.append({
                    "questionId": i['questionId'],
                    "question": question.question,
                    "markedAnswer": i['answer'],
                    "correctAnswer": question.correct,
                    "result": "correct",
                    "marks": question.marks
                })
            else:
                correct.append({
                    "questionId": i['questionId'],
                    "question": question.question,
                    "markedAnswer": i['answer'],
                    "correctAnswer": question.correct,
                    "result": "wrong",
                    "marks": question.marks
                })
        res = Result.objects.create(
            userId=userId, quizId=quizId, answersMarked=correct, marksObtained=x, timeTaken=timeTaken, totalQuestion=totalQues)
        if (res):
            curResponse = currentResponse.objects.filter(
                quizId=request.POST.get('quizId'), userId=request.user.id)
            if(curResponse):
                curResponse.delete()
            return Response({"status": True, "data": {"marks": res.marksObtained, "correct": res.answersMarked, "date": res.created_on, "totalQuestions": res.totalQuestion, "timeTaken": res.timeTaken}})
        else:
            raise Exception
    except:
        return Response({"status": False, "error": "Something went wrong."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def showResult(request):
    try:
        quizId = request.GET.get('id')
        res = Result.objects.filter(
            userId=request.user.id, quizId=quizId).first()
        if (res):
            return Response({"status": True, "data": {"marks": res.marksObtained, "correct": res.answersMarked, "date": res.created_on, "totalQuestions": res.totalQuestion, "timeTaken": res.timeTaken}})
        else:
            raise Exception
    except:
        return Response({"status": False, "data": []})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkAnswer(request):
    try:
        answer = request.POST.get('answer')
        quesId = request.POST.get('quesId')
        quizId = request.POST.get('quizId')
        res = Question.objects.filter(questionId=quesId, quizId=quizId).first()
        if (res):
            if (res.correct.lower().replace(' ', '') == answer.lower().replace(' ', '')):
                return Response({"status": True, "message": "Correct answer!"})
            else:
                return Response({"status": True, "message": "Wrong answer!"})
        else:
            raise Exception
    except:
        return Response({"status": False, "error": "Something went wrong"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def resendPassword(request):
    try:
        email = request.POST.get('email')
        userRes = User.objects.filter(email=email).first()
        if (userRes):
            passwd = secrets.token_urlsafe(8)
            userRes.set_password(passwd)
            userRes.save()
            msg = f'Hi {userRes.first_name}<br><br>Your Credentials for CyberTronic Capture The Flag are below:<br><br>username: {userRes.username}<br>password: {passwd}<br><br>You can play CTF on http://quantafile.com/<br><br>Regard\'s<br>IODump Teams'
            send_mail(userRes.email, 'Your Credentials For CyberTronic CTF', msg)
            return Response({"status": True, "message": "Email send successfully"})
        else:
            return Response({"status": False, "error": "Email not registered"}, status=status.HTTP_404_NOT_FOUND)
    except:
        return Response({"status": False, "error": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def createQuiz(request):
    try:
        quizName = request.POST.get('quizName')
        totalQuestions = request.POST.get('totalQuestions')
        totalMarks = request.POST.get('totalMarks')
        active = request.POST.get('active')
        res = Quiz.objects.create(
            quizName=quizName, totalQuestions=totalQuestions, totalMarks=totalMarks, active=active)
        if (res):
            return Response({"status": True, "data": "Quiz created successfully", "quizId": res.quizId})
        else:
            raise Exception
    except:
        return Response({"status": False, "error": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def addQuestions(request):
    try:
        questions = json.loads(request.POST.get('questions'))
        qid = request.POST.get('quizId')
        quizRes = Quiz.objects.filter(quizId=qid).first()
        if (quizRes):
            quizId = quizRes
            quiz = quizRes.quizName
            for i in questions:
                questionType = i['quesType']
                question = i['question']
                if (questionType == "MCQ"):
                    option1 = i['option1']
                    option2 = i['option2']
                    option3 = i['option3']
                    option4 = i['option4']
                correct = i['correct']
                marks = i['marks']
                quesLevel = i['quesLevel']
                placeHolder = i['placeHolder']
                time = i['time']
                active = i['active']

                res = Question.objects.create(quizId=quizId, questionType=questionType, question=question, option1=option1, option2=option2, option3=option3,
                                            option4=option4, correct=correct, marks=marks, quesLevel=quesLevel, placeHolder=placeHolder, time=time, active=active, quiz=quiz)
            return Response({"status": True, "data": "Questions added successfully"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"status": False, "error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)
    except:
        return Response({"status": False, "data": []}, status=status.HTTP_400_BAD_REQUEST)


# save response
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def saveResponse(request):
    try:
        if request.method == 'GET':
            quizId = Quiz.objects.filter(quizId=request.GET.get('quizid')).first()
            userId = User.objects.filter(id=request.user.id).first()
            res = currentResponse.objects.filter(
                userId=userId, quizId=quizId).first()
            if (res):
                return Response({"status": True, "data": {"answered": res.answersMarked, "quizId": quizId.quizId, "timeTaken": res.timeTaken}})
            else:
                return Response({"status": False, "data": []}, status=status.HTTP_404_NOT_FOUND)
        if request.method == 'POST':
            answered = request.POST.get('answered')
            qid = request.POST.get('quizId')
            if (answered != ''):
                answered = json.loads(answered)
            else:
                answered = []
            quizId = Quiz.objects.filter(quizId=qid).first()
            timeTaken = request.POST.get('time')
            userId = User.objects.filter(id=request.user.id).first()
            already = currentResponse.objects.filter(
                userId=userId, quizId=quizId).first()
            if(already):
                if(already.timeTaken < int(timeTaken)):
                    already.answersMarked = answered
                    already.timeTaken = timeTaken
                else:
                    already.answersMarked = answered
                already.save(update_fields=['answersMarked', 'timeTaken'])
            else:
                res = currentResponse.objects.create(
                    userId=userId, quizId=quizId, answersMarked=answered, timeTaken=timeTaken
                )

            return Response({"status": True, "data": {"answered": answered, "quizId": qid, "timeTaken": timeTaken}})
    except:
        return Response({"status": False, "data": []}, status=status.HTTP_400_BAD_REQUEST)


def create_new_ref_number():
    return str(random.randint(100000, 999999))
