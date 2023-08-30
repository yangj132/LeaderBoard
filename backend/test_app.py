import unittest
from app import app, db
from models import User

class APITestCase(unittest.TestCase):
    
    def setUp(self):
        app.config.from_object('test_config')
        self.app = app.test_client()
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.drop_all()



    def test_create_user(self):
        
        # Test creating a new user
        response = self.app.post('/users', json={
            "name": "Test User",
            "age": 30,
            "points": 10,
            "address": "123 Test Street"
        })
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data['name'], "Test User")
        self.assertEqual(data['age'], 30)
        self.assertEqual(data['points'], 10)
        self.assertEqual(data['address'], "123 Test Street")

        # Test creating a user with missing data
        response = self.app.post('/users', json={
            "name": "Test User 2",
            "age": 30
        })
        self.assertEqual(response.status_code, 400)



    def test_get_users(self):
        # Test getting all users
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 200)
        
        # Add a user and test getting a single user
        response = self.app.post('/users', json={
            "name": "Test User for Get",
            "age": 25,
            "points": 15,
            "address": "123 Test Get Street"
        })
        user_id = response.get_json()['id']
        response = self.app.get(f'/users/{user_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()['name'], "Test User for Get")

    def test_update_user(self):
        # Add a user and test updating that user
        response = self.app.post('/users', json={
            "name": "Test User for Update",
            "age": 26,
            "points": 16,
            "address": "123 Test Update Street"
        })
        user_id = response.get_json()['id']
        response = self.app.put(f'/users/{user_id}', json={
            "name": "Updated Test User",
            "age": 27
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()['name'], "Updated Test User")

    def test_delete_user(self):
        # Add a user and test deleting that user
        response = self.app.post('/users', json={
            "name": "Test User for Delete",
            "age": 28,
            "points": 17,
            "address": "123 Test Delete Street"
        })
        user_id = response.get_json()['id']
        response = self.app.delete(f'/users/{user_id}')
        self.assertEqual(response.status_code, 204)
        response = self.app.get(f'/users/{user_id}')
        self.assertEqual(response.status_code, 404)
        
if __name__ == '__main__':
    unittest.main()

