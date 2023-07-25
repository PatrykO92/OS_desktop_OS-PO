from django.db import models


class Wallpaper(models.Model):
    name = models.CharField(max_length=15)
    image = models.ImageField(null=True, blank=True, upload_to="avatars/")

    def __str__(self) -> str:
        return self.name
