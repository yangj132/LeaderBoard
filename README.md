# LeaderBoard


## Introduction

LeaderBoard is an application designed for displaying and managing user rankings. Users can effortlessly add, remove, and update scores via the interface, as well as view detailed information about users.

## Features

- All users start with 0 points.
- Update user scores with the click of +/- buttons.
- Real-time leaderboard update, re-ordering users based on their scores.
- Add and delete users.
- Click on a user's name to view detailed information.
- Input box for searching and filtering user names.
- Ability to sort list by Name alphabetically.
- Ability to sort list by Points.

## Technology Stack

- Frontend: (JacaScript Vue)
- Backend: (Python Flask)
- Database: (SQLite)

## How to Run

### Running Locally

First, clone the repository to your local machine:

```bash
git clone https://github.com/yangj132/LeaderBoard.git
```
- Backend

```bash
cd backend                       #Navigate to the backend directory
pip install -r requirements.txt  #Install dependencies
python test_app.py               #Run frontend unit test
python app.py                    #Run frontend serve port port:http://localhost:5000/

```

- Frontend

```bash
cd frontend                    #Navigate to the frontend directory
npm install                    #Install dependencies
npm test                       #Run frontend unit test
npm run serve                  #Run frontend serve  port:http://localhost:8080/

```

### Access Online

You can access the online version via the following link: https://leaderboardweb-937a523119d5.herokuapp.com/