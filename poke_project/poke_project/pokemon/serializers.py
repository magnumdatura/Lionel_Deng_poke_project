from rest_framework import serializers
from .models import Pokemon

class PokemonSerializerNoStats(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ['id', 'name', 'type']

class PokemonSerializerWithStats(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ['id', 'name', 'hp', 'attack', 'defense', 'type', 'level', 'owner_id']