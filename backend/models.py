from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    points = db.Column(db.Integer, default=0)
    address = db.Column(db.String(120), nullable=False)
    
    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'points': self.points,
            'address': self.address
        }