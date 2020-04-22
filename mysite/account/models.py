from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, team_name, team_location, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have an username")
        if not team_name:
            raise ValueError("Users must enter team name")
        if not team_location:
            raise ValueError("Users must enter team location")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            team_name=team_name,
            team_location=team_location,
        )

        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)
        return user


class Account(AbstractBaseUser):
    email           = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username        = models.CharField(max_length=30, unique=True)
    date_joined     = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login      = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)
    is_superuser    = models.BooleanField(default=False)

    # team information
    team_name       = models.CharField(max_length=100, unique=False, default='TEAM_NAME')
    team_location   = models.CharField(max_length=100, unique=False, default='TEAM_LOCATION')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'team_name', 'team_location']

    objects = MyAccountManager()


    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True





