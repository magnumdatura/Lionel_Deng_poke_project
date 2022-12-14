# Generated by Django 4.1 on 2022-08-31 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pokemon',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('hp', models.IntegerField(verbose_name='health points')),
                ('attack', models.IntegerField(verbose_name='attack points')),
                ('defense', models.IntegerField(verbose_name='defense points')),
                ('type', models.CharField(max_length=255)),
            ],
        ),
    ]
