from django.contrib import admin
from .models import Question, Quiz, Result, currentResponse
# Register your models here.
admin.site.register(Question)
admin.site.register(Quiz)
admin.site.register(Result)
admin.site.register(currentResponse)
