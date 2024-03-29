# Generated by Django 4.2.3 on 2023-07-27 08:59

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_remove_customuser_name_alter_customuser_first_name'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='customuser',
            managers=[
                ('objects', accounts.models.UserManager()),
            ],
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='username',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(max_length=254, unique=True, verbose_name='email address'),
        ),
    ]
