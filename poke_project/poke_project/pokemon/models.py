from django.db import models
from django.conf import settings # this imports the root settings.py from poke_project, which includes the AUTH_USER_MODEL template (derived from the user model from accounts(app)/models.py)

class Pokemon (models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    hp = models.IntegerField(verbose_name="health points")
    attack = models.IntegerField(verbose_name="attack points")
    defense = models.IntegerField(verbose_name="defense points")
    type = models.CharField(max_length=255)
    level = models.IntegerField(default=1)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, null=True) # this now links to user account from auth_user_model. Django's foreignKey enforces oneToMany relationship

    def __str__(self): # this returns the name of the pokemon in the query response, otherwise we would get the memory address
        return self.name