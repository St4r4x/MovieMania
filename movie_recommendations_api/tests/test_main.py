from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_recommendations():
    response = client.get("/recommendations/1")
    assert response.status_code == 200
    assert "trending_carousel" in response.json()
