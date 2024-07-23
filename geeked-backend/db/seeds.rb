# db/seeds.rb
User.create(email: 'user1@example.com', display_name: 'User One')
User.create(email: 'user2@example.com', display_name: 'User Two')

Anime.create(title: 'Attack on Titan', description: 'Description of Attack on Titan', cover_image: 'cover_image_url', average_score: 85, episodes: 25, genres: 'Action, Drama')
Anime.create(title: 'Naruto', description: 'Description of Naruto', cover_image: 'cover_image_url', average_score: 80, episodes: 220, genres: 'Action, Adventure')

Rating.create(user_id: 1, anime_id: 1, rating: 90)
Rating.create(user_id: 2, anime_id: 2, rating: 85)
