import json
import os

USERS_FILE = "app/storage/users.json"

def read_users():
    with open(USERS_FILE, "r") as f:
        return json.load(f)

def write_users(data):
    with open(USERS_FILE, "w") as f:
        json.dump(data, f, indent=4)
