Liste des étudiants:
Stanislas Henry
Jordan Kang
Noé Simmat

Explication des fonctionnalités de l'app:

La base de donnée s'appelle FindersKeepers_db, elle est crée directement dans le terminal à  l'aide de mongosh

-S'inscrire avec un username, un email (uniques dans la base) et un mot de passe. On vérifie que l'username a une longueur de 3 minimum, et que l'email a un format correct
-Se connecter. Dans tous les cas, on utilise JWT pour générer un token d'une durée de 24 heures

Une fois que l'utilisateur est connecté, il est redirigé sur la map qui a été implémentée grâce à leaflet.
Sur la page d'accueuil, l'utilisateur peut se déconnecter, auquel cas il est renvoyé sur la page d'inscription, depuis laquelle il peut se reconnecter. Alors, on supprime l'username qui était stocké localement et le token JWT.

L'utilisateur peut ajouter des caches, via le boutton "Add cache". il lui est alors proposé deux options: Enter coordinatess ou My current location. Les deux options ouvrent un popup permettant d'entrer la difficulté de la cache, mais la première demande aussi d'entrer les coordonnées GPS de la cache.

Les caches sont affichées dynamiquement: lorsque une cache est ajoutée, la page se recharge. Ainsi, on peut charger toutes les caches dans la portée définie par l'utilisateur. 
Quand on clique sur une cache, on peut:
-Laisser un commentaire, qui ouvre une page demandant si on a trouvé la cache ou non, et permet de laisser un commentaire.
-Voir les commentaires laissés par les gens ayant trouvé ou non la cache
-Supprimer la cache si on en est le propriétaire

Les caches sont de trois couleurs différentes:
-Vertes si on l'a trouvé
-Rouges si c'est nous qui l'avons ajouté à la carte
-Bleues sinon

L'utilisateur dispose également d'un pannel paramètres, grâce auquel il peut avoir accès à son profil, dans lequel il peut éditer son adresse e-mail et sa localisation, et voir autres diverses infos. L'option profil n'est pas aboutie.

Il a accès au Classement:
-Le top 10 des utilisateurs ayant trouvé le plus de caches, avec le nombre de caches trouvées
-Le top 10 des caches ayant le plus été trouvées, avec l'id de la cache et les coordonnées gps associées, ainsi que le nombre de fois où elles ont été trouvés
-Le top 10 des caches les moins trouvées

Il peut modifier sa portée:
-Un click sur "Range" ouvre un popup, dans lequel l'utilisateur peut sélectionner la portée dans laquelle il souhaite voir les caches

Il peut ajouter une cache en cliquant deux fois sur la map

Il semble qu'avec f7, il est très compliqué d'ajouter des photos pour les caches ou même pour l'avatar. La doc ne semble pas très fournie à ce sujet.

On a aussi crée un super logo qu'on a pas pu implémenter

Pour la partie portation mobile, il semblerait que l'utilisation de f7 a rendu la tâche plus compliquée également. En effet, sur Android Studio préalablement, il était nécessaire de placer les dossiers server et client dans le dossier www de manière à pouvoir build l'application. Cependant, les points d'entrée dans les fichiers index.html et index.js n'ont pas pu être réalisés de manière à accéder au client et au serveur. 

la plupart des groupes n'ayant pas utilisé f7, il est impossible de savoir si nous manquions de technique ou si l'implémentation était très difficile en absolu. Le manque de documentation à ce sujet n'a pas aidé à l'avancée du sujet
