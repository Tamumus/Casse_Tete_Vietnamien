# Casse-Tête Vietnamien — Take-Home Technical Test

Ce projet est une application web interactive développée dans le cadre d’un exercice technique.  
Elle simule un probléme de maths où l’utilisateur doit résoudre une combinaison mathématique en plaçant correctement des stickers numériques sur une grille.

##Stack technique

- **Frontend** : Angular 20 (standalone components, RxJS, services injectables, drag & drop)
- **Backend** : Spring Boot 3 (Java 17), JPA/Hibernate, base H2 embarquée
- **Autres** : 
  - HTML/CSS responsive (grilles dynamiques, overlays, animations)
  - Système de zones de collision HTML avec gestion fine des offsets et scalabilité
  - Mode triche après un temps limite (suggestion automatique)

## Fonctionnalités

- Placement de stickers sur une grille 7x6
- API REST + CRUD
- Algorythmie, optimisation par early pruning
- Vérification côté backend d’une équation
- Gestion des cas de victoire / défaite / backend indisponible (fallback local)
- Gestion du gamestate et affichage d’overlays d’état (victoire, défaite, erreur)

## Démarrage local

### Back-end ### 

```bash```
cd backend
./mvnw spring-boot:run
L'API est disponible sur http://localhost:8080/api/combinations

### Front-end ### 
```bash```
cd frontend
npm install
ng serve
Accès à l’application sur http://localhost:4200/

💡 Remarques
Le projet est volontairement surdimensionné par rapport aux exigences habituelles d’un test technique.

Il suit une architecture modulaire avec séparation stricte des responsabilités : chaque composant Angular (zones, stickers, grille, overlay) est découplé et maintenable.

L’algorithme de résolution locale de l’équation est intégré en fallback si l’API est indisponible.

🤖 Contribution de l'IA
Certaines portions de ce projet (notamment les optimisations d’architecture Angular, la gestion des erreurs, ou le code CSS des overlays) ont été réalisées en collaboration avec ChatGPT-4 (OpenAI).
Ce travail inclut un usage responsable et justifié de l’IA pour accélérer le développement sans compromettre la compréhension ou la maintenabilité.
Savoir interagir efficacement avec une IA est aujourd’hui une compétence technique à part entière.

