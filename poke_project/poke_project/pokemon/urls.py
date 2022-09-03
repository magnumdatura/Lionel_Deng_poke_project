from django.urls import path

from . import views 

urlpatterns = [
    path('allpokemon/', views.all_pokemon.as_view(), name='all_pokemon'), #name, no stats
    path('unownedpokemon/', views.unowned_pokemon.as_view(), name='unowned_pokemon'), #name, no stats                   
    path('mypokemon/', views.my_pokemon.as_view(), name='my_pokemon'), #name and stats
    path('randompokemon/', views.random_pokemon.as_view(), name='random_pokemon'),
    path('addpokemon/', views.add_pokemon.as_view(), name='add_pokemon'), 
    path('releasepokemon/', views.release_pokemon.as_view(), name='release_pokemon')
]