import pokemon
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
import random

from django.http import HttpResponse
from .models import Pokemon
from .serializers import PokemonSerializerNoStats, PokemonSerializerWithStats

#  GET request here should return a serialised list of all pokemon in the dataset
class all_pokemon(APIView):
    permision_classes = [IsAuthenticated]

    def get(self, request, format=None):
        allPokemon = Pokemon.objects.all()

        serializedPokemon = PokemonSerializerNoStats(allPokemon, many=True)

        return Response(serializedPokemon.data)


#  GET request here should return a serialised list of all the pokemon that the user does not currently own
class unowned_pokemon(APIView):
    def get(self, request):
        print(f"    USER ID: {request.user.id}")
        # because each pokemon can only be owned by 1 user, here .filter for owner_id = null instead of just .exclude(request.user.id)
        unownedPokemon = Pokemon.objects.filter(owner_id__isnull=True) 

        serializedUnownedPokemon = PokemonSerializerNoStats(unownedPokemon, many=True)
        
        return Response(serializedUnownedPokemon.data)


# GET request here should return a serialised list of the pokemon owned by the user
class my_pokemon(APIView):
    def get(self, request):
        print(f"    USER ID: {request.user.id}")
        myPokemon = Pokemon.objects.filter(owner_id=request.user.id)

        serializedMyPokemon = PokemonSerializerWithStats(myPokemon, many=True)

        return Response(serializedMyPokemon.data)


# GET request here generates random pokemon
class random_pokemon(APIView):
    def get(self, request):
        print(f"    USER ID: {request.user.id}")
        unownedPokemon = Pokemon.objects.filter(owner_id__isnull=True)
        randomPokemon = random.choice(unownedPokemon)
        randomPokemon.level = random.randint(1, 100)
        serializedRandomPokemon = PokemonSerializerWithStats(randomPokemon)
        
        return Response(serializedRandomPokemon.data)

# POST request here should add a pokemon to the user’s collection
class add_pokemon(APIView):
    def post(self, request):
        print(f"    USER ID: {request.user.id} POKEMON ID: {request.data.get('pokemonID')} POKEMON LEVEL: {request.data.get('pokemonLevel')}")
        userID = request.user.id
        pokemonID = request.data.get('pokemonID')
        pokemonLevel = request.data.get('pokemonLevel')

        pokemonToAdd = Pokemon.objects.filter(id=pokemonID)
        pokemonToAdd.update(level=pokemonLevel, owner_id=userID)
        for pokemon in pokemonToAdd:
            pokemon.save()
        
        serializedPokemonAdded = PokemonSerializerWithStats(pokemonToAdd, many=True)

        return Response(serializedPokemonAdded.data)

# POST request here should allow a user to discard one of his pokemons in his collection
class release_pokemon(APIView):
    def post(self, request):
        print(f"    USER ID: {request.user.id} RELEASE POKEMON ID: {request.data.get('releasePokemonID')}")
        releasePokemonID = request.data.get('releasePokemonID')

        pokemonToRelease = Pokemon.objects.filter(id=releasePokemonID)
        pokemonToRelease.update(owner_id=None)
        pokemonToRelease.update(level=None)
        
        for pokemon in pokemonToRelease:
            pokemon.save()
        
        serializedPokemonReleased = PokemonSerializerWithStats(pokemonToRelease, many=True)

        return Response(serializedPokemonReleased.data)