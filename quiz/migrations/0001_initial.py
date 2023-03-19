# Generated by Django 4.1.3 on 2022-11-29 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('questionId', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('questionType', models.CharField(max_length=50)),
                ('question', models.CharField(max_length=500)),
                ('option1', models.CharField(blank=True, max_length=500)),
                ('option2', models.CharField(blank=True, max_length=500)),
                ('option3', models.CharField(blank=True, max_length=500)),
                ('option4', models.CharField(blank=True, max_length=500)),
                ('quiz', models.CharField(blank=True, max_length=200)),
                ('time', models.IntegerField()),
                ('created_on', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['created_on'],
            },
        ),
        migrations.CreateModel(
            name='User_Allowed',
            fields=[
                ('userId', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('name', models.CharField(max_length=200)),
                ('mobile', models.IntegerField()),
                ('password', models.CharField(max_length=500)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['created_on'],
            },
        ),
    ]
