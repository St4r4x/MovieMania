```mermaid
classDiagram
    class Database {
        +connect()
        +disconnect()
    }

    class User {
        +int id
        +string name
    }

    class Movie {
        +int id
        +string title
        +string genre
        +date release_date
    }

    class RecommendationFetcher {
        +fetch(db: Session, user_id: int): dict
    }

    class GenreBasedRecommendationFetcher {
        +fetch(db: Session, user_id: int): dict
    }

    class TrendingRecommendationFetcher {
        +fetch(db: Session, user_id: int): dict
    }

    class MovieBasedRecommendationFetcher {
        +fetch(db: Session, user_id: int): dict
    }

    class Schema {
        +model_validate(data: dict): Movie
    }

    Database <|-- User
    Database <|-- Movie
    RecommendationFetcher <|-- GenreBasedRecommendationFetcher
    RecommendationFetcher <|-- TrendingRecommendationFetcher
    RecommendationFetcher <|-- MovieBasedRecommendationFetcher
    Schema *-- Movie
    RecommendationFetcher *-- Schema

```
