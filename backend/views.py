
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
    # Get all users
    @app.route('/users', methods=['GET'])
    def get_users():
        users = User.query.all()
        return jsonify([user.serialize for user in users]), 200
    # Add new users
    @app.route('/users', methods=['POST'])
    def add_user():
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
    # Get user by Id
    @app.route('/users/<int:user_id>', methods=['GET'])
    def get_user(user_id):
        user = User.query.get_or_404(user_id)
        return jsonify(user.serialize), 200
    # Delete user by Id
    @app.route('/users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 204
    #Update user by Id
    @app.route('/users/<int:user_id>', methods=['PUT'])
    def update_user(user_id):
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