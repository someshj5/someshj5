import pytest
import requests


def test_login():
    url = ' http://127.0.0.1:8000/fundooapp/user_login/'
    data = {'email': 'someshj5@gmail.com', 'password': 'my123456'}

    response = requests.post(url=url, data=data)

    assert response.status_code == 200, 'successfully login'
