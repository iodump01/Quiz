from django.db import models
from django.contrib.auth.models import User

# Available quiz models


class Quiz(models.Model):
    quizId = models.BigAutoField(primary_key=True)
    quizName = models.CharField(max_length=500, unique=True)
    totalQuestions = models.IntegerField()
    totalMarks = models.IntegerField()
    active = models.BooleanField(default=False)
    totalTime = models.IntegerField()
    quizEndTime = models.DateTimeField(blank=True)
    created_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.quizName

    class Meta:
        ordering = ['created_on']

        def __unicode__(self):
            return "{0} {1} {2} {3} {4}".format(
                self, self.quizName, self.created_on)

# Quiz Models


class Question(models.Model):
    questionId = models.AutoField(primary_key=True, editable=False)
    questionType = models.CharField(max_length=50)
    question = models.TextField()
    option1 = models.CharField(max_length=500, blank=True)
    option2 = models.CharField(max_length=500, blank=True)
    option3 = models.CharField(max_length=500, blank=True)
    option4 = models.CharField(max_length=500, blank=True)
    correct = models.CharField(max_length=500, blank=True)
    marks = models.IntegerField(default=1)
    quiz = models.CharField(max_length=200, blank=True)
    quizId = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    quesLevel = models.CharField(max_length=255, blank=True)
    placeHolder = models.CharField(max_length=500, blank=True)
    time = models.IntegerField()
    instructions = models.CharField(max_length=500, blank=True)
    active = models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.quiz + ' - ' + self.quesLevel

    class Meta:
        ordering = ['created_on']

        def __unicode__(self):
            return "{0} {1} {2} {3} {4}".format(
                self, self.question, self.created_on)


# Quiz Models
class Result(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    quizId = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    answersMarked = models.JSONField()
    marksObtained = models.IntegerField()
    timeTaken = models.IntegerField()
    totalQuestion = models.IntegerField()
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.userId.first_name

    class Meta:
        ordering = ['created_on']

        def __unicode__(self):
            return "{0} {1} {2} {3} {4}".format(
                self, self.userId.first_name, self.created_on)

# Quiz Models


class currentResponse(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    quizId = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    answersMarked = models.JSONField()
    timeTaken = models.IntegerField()
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.userId.first_name

    class Meta:
        ordering = ['created_on']

        def __unicode__(self):
            return "{0} {1} {2} {3} {4}".format(
                self, self.userId.first_name, self.created_on)
