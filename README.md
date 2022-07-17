<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/2471/2471610.png" width="250px" height="250px">
</p>
<h1 align="center">
  Drivenpass
</h1>

</br>

<div align="center">
  <h2>Stack Used</h2>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
</div>

</br>

# About It

Drivenpass is a REST API that simulates a password manager. You can use it to save all your passwords and safenotes safely.

</br>

## Features

**You must create an account to use any feature.** 

- **Website Credentials:** Create/ List all or one specific/ Delete 
- **Safenotes:** Create/ List all or one specific/ Delete 
- **Cards:** Create/ List all or one specific/ Delete
- **Wifis** Create/ List all or one specific/ Delete

</br>

## API Reference

## Credentials

### - Create Credential

```http 
POST /credentials
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `title`           | `string` | **Unique**/**Required**. Register title      |
| `user`         | `string` | **Required**. Website Username          |
| `password` | `string` | **Required**. Website Password |
| `url` | `string` | **Required**. Website URL |

| Headers             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `Authorization`| `string`| **Required**. JWT Access Token | 

👀 Your credentials must have different titles otherwise it will not be created!


### - Get all your credentials

```http
GET /credentials
```

### Request: 

| Headers             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `Authorization`| `string`| **Required**. JWT Access Token |  

### Response: 

```json
  [
    {
      "id": 1,
      "title": "test",
      "url": "https://test.com",
      "user": "test",  
      "password": "teste", 
      "userId": 1  
    },
    {
      "id": 2,
      "title": "test2",
      "url": "https://test.com",
      "user": "test2",  
      "password": "teste2", 
      "userId": 1  
    }   
  ]

```

### - Get One Credential

```http
GET credentials/credential/:id
```

### Request:

| Params             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `id`| `string`| **Required**. credential Id |  

| Headers             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `Authorization`| `string`| **Required**. JWT Access Token |  

### Response 

```json
   {
      "id": 1,
      "title": "test",
      "url": "https://test.com",
      "user": "test",  
      "password": "teste", 
      "userId": 1  
    }
```
👀 You must pass a valid and existing id, otherwise the API will throw an error.

### - Delete Credential

| Params             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `id`| `string`| **Required**. credential Id |  

| Headers             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `Authorization`| `string`| **Required**. JWT Access Token |  

👀 You must pass a valid and existing id, otherwise the API will throw an error.

#

## Safenotes


