from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None): # if password not parsed in, cannot create user
        if not email:
            raise ValueError('Users must key in an email address')

        email = self.normalize_email(email) # normalizes email
        user = self.model(email=email, name=name) # creates user model

        user.set_password(password) # hashes password
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name

    def get_shorter_name(self):
        return self.name
    
    def __str__(self):
        return self.email