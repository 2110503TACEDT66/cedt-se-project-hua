[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/nj0X2aoJ)

## Template for Frontend .env.local
### create a file name .env.local in your src folder
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=SECRET

# Base URL
MONGO_URI = MONGO_URI

BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

## Backend config.env
### create a file name config.env in your Config folder
```
PORT = 5000
NODE_ENV = development

# Base URL
MONGO_URI = MONGO_URI

JWT_SECRET = SECRET
JWT_EXPIRE = 30d

JWT_COOKIE_EXPIRE = 7
AUTH_EMAIL = your@email.com
HOST=http://localhost
```