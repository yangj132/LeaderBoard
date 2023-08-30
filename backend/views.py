
from flask import jsonify, request, abort
from sqlalchemy.exc import IntegrityError
from models import db, User

def register_routes(app):

    def validate_user_data(data):
        if not data:
            abort(400, description="No data provided.")
        
        if not isinstance(data.get('name', ''), str) or not data['name'].strip():
            abort(400, description="Invalid or missing name.")
        
        if not isinstance(data.get('age'), int):
            abort(400, description="Invalid or missing age.")
            
        if not isinstance(data.get('points'), int):
            abort(400, description="Invalid or missing points.")
            
        if not isinstance(data.get('address', ''), str) or not data['address'].strip():
            abort(400, description="Invalid or missing address.")

    @app.route('/users', methods=['GET'])
    def get_users():
        """
        Get All Users
        ---
        Retrieves a list of all users in the system.
        
        Returns:
            List of users (JSON), HTTP status code 200
        """
        users = User.query.all()
        return jsonify([user.serialize for user in users]), 200

    @app.route('/users', methods=['POST'])
    def add_user():
        """
        Add New User
        ---
        Adds a new user to the system.

        Parameters:
            - name: Name of the user (str)
            - age: Age of the user (int)
            - points: Points of the user (int)
            - address: Address of the user (str)
        
        Returns:
            New user data (JSON), HTTP status code 201
        """
        data = request.get_json()
        print(data)
        validate_user_data(data)

        try:
            new_user = User(name=data['name'], age=data['age'], points=data['points'], address=data['address'])
            db.session.add(new_user)
            db.session.commit()
            return jsonify(new_user.serialize), 201
        except IntegrityError:
            db.session.rollback()
            abort(400, description="User with this name already exists.")
        except Exception as e:
            db.session.rollback()
            abort(500, description="Server error.")

    @app.route('/users/<int:user_id>', methods=['GET'])
    def get_user(user_id):
        """
        Get User by ID
        ---
        Retrieves a user by their ID.
        
        Parameters:
            - user_id: ID of the user (int)

        Returns:
            User data (JSON), HTTP status code 200
        """
        user = User.query.get_or_404(user_id)
        return jsonify(user.serialize), 200
    
    @app.route('/users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        """
        Delete User by ID
        ---
        Deletes a user by their ID.
        
        Parameters:
            - user_id: ID of the user (int)

        Returns:
            Success message (JSON), HTTP status code 204
        """
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 204
    
    @app.route('/users/<int:user_id>', methods=['PUT'])
    def update_user(user_id):
        """
        Update User by ID
        ---
        Updates a user's information by their ID.

        Parameters:
            - user_id: ID of the user (int)
            - name: Updated name of the user (Optional, str)
            - age: Updated age of the user (Optional, int)
            - points: Updated points of the user (Optional, int)
            - address: Updated address of the user (Optional, str)
        
        Returns:
            Updated user data (JSON), HTTP status code 200
        """
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        try:

            if 'name' in data:
                user.name = data['name']
            if 'age' in data:
                user.age = data['age']
            if 'points' in data:
                user.points = data['points']
            if 'address' in data:
                user.address = data['address']
            db.session.commit()
            return jsonify(user.serialize), 200
        except IntegrityError:
            db.session.rollback()
            abort(400, description="User with this name already exists.")
        except Exception as e:
            db.session.rollback()
            abort(500, description="Server error.")

    @app.errorhandler(400)
    def bad_request(e):
        return jsonify({"error": str(e)}), 400

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Server error"}), 500


    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'points': self.points,
            'address': self.address
        }

    User.serialize = serialize