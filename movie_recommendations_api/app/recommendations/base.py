from abc import ABC, abstractmethod
from typing import Dict, List
from sqlalchemy.orm import Session

class RecommendationFetcher(ABC):
    """Abstract base class for fetching recommendations."""

    @abstractmethod
    def fetch(self, db: Session, user_id: int) -> Dict[str, List[dict]]:
        """Fetch recommendations.

        Args:
            db (Session): Database session.
            user_id (int): User ID.

        Returns:
            Dict[str, List[dict]]: Recommendations.
        """
        pass