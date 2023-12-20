# app.py
#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource


# Local imports
from config import app, db, api
# Add your model imports
from models import User, Game, Time

class Users(Resource):
    def post(self):
        data = request.get_json()
        user = User(username=data['username'], email=data['email'], password_hash=data['password'], avatar=data['avatar'])
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id 
        return make_response({'user': user.to_dict()}, 201)

    def delete(self):
        try:
            user = User.query.filter_by(id=session.get('user_id')).first()
            if user:
                db.session.delete(user)
                db.session.commit()
                session['user_id'] = None
                return make_response('', 204)
            else:
                return make_response({"error": "User not found"}, 404)
        except:
            return make_response({"error": "Failed to delete account"}, 500)

api.add_resource(Users, '/api/v1/users')



@app.route('/api/v1/users/<int:user_id>/games', methods=['GET'])
def get_user_games(user_id):
    try:
        user_games = Game.query.filter_by(user_id=user_id).all()

        user_games_data = [{"time_taken": game.time_taken} for game in user_games]

        return jsonify(user_games_data), 200
    except Exception as e:
        print(e)
        return make_response({"error": "Failed to fetch user games"}, 500)


    # return jsonify(user_game_history)

@app.route('/api/v1/authorized')
def authorized():
    try:
        user = User.query.filter_by(id=session.get('user_id')).first()
        return make_response(user.to_dict(), 200)
    except:
        return make_response({"error": "User not found"}, 404) 
    
@app.route('/api/v1/logout', methods=['DELETE'])
def logout():
    session['user_id'] = None
    return make_response('', 204)

@app.route('/api/v1/delete/<id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.filter_by(id=id).first()
    db.session.delete(user)
    db.session.commit()
    return make_response('', 204)

@app.route('/api/v1/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(username=data['username']).first()
        if user.authenticate(data['password']):
            session['user_id'] = user.id
            return make_response({'user': user.to_dict()}, 200)
    except:
        return make_response({'error': 'username or password incorrect'}, 401)

@app.route('/api/v1/games', methods=['POST'])

def create_game():

    if request.method =='POST':

        data = request.get_json()
        user_id = data['user_id']
        time_id = data['time_id']
        first_integer = data['first_integer']
        second_integer = data['second_integer']
        time_taken = data['time_taken']

        game = Game(
            user_id=user_id,
            time_id=time_id,
            first_integer=first_integer,
            second_integer=second_integer,
            time_taken=time_taken
        )
        db.session.add(game)
        db.session.commit()

        return make_response({"message": "Game record created successfully", "id": game.id}, 201)

@app.route('/api/v1/times', methods=['POST'])


def create_time():

    if request.method == 'POST':

        data = request.get_json()
        time_value = data["time_value"]

        time_record = Time(time_value=time_value)
        db.session.add(time_record)
        db.session.commit()

        return make_response({"message": "Time record created successfully", "id": time_record.id}, 201)

@app.route('/api/v1/users/<int:user_id>/unique-integers-count', methods=['GET'])
def get_user_unique_integers_count(user_id):
    try:
        unique_integers = set()
        user_games = Game.query.filter_by(user_id=user_id).all()
        for game in user_games:
            unique_integers.add(game.first_integer)
            unique_integers.add(game.second_integer)

        unique_integers_11_to_99 = [num for num in unique_integers if 11 <= num <= 99]

        count = len(unique_integers_11_to_99)

        return jsonify({"count": count}), 200
    except Exception as e:
        print(e)
        return make_response({"error": "Failed to fetch unique integers count"}, 500)

@app.route('/api/v1/highscores', methods=['GET'])
def get_highscores():
    try:
        lowest_times = db.session.query(
            Game.time_taken,
            User.username,
            Game.first_integer,
            Game.second_integer
        ).join(User).order_by(Game.time_taken).limit(10).all()

        highscores_data = [{
            "time_taken": time,
            "username": username,
            "first_integer": first_integer,  
            "second_integer": second_integer  
        } for time, username, first_integer, second_integer in lowest_times]

        return jsonify(highscores_data), 200
    except Exception as e:
        print(e)
        return make_response({"error": "Failed to fetch highscores"}, 500)

@app.route('/api/v1/users/<int:user_id>/update-email', methods=['PATCH'])
def update_user_email(user_id):
    try:
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response({"error": "User not found"}, 404)

        data = request.get_json()
        new_email = data.get('email')

        if not new_email:
            return make_response({"error": "New email not provided"}, 400)

        user.email = new_email
        db.session.commit()

        return make_response({"message": "Email updated successfully"}, 200)

    except Exception as e:
        print(e)
        return make_response({"error": "Failed to update email"}, 500)
    
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)
