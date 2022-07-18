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

</br>

## Credentials

### - Create Credential

```http
POST /credentials
```

#### Request:

| Body       | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `title`    | `string` | **Unique**/**Required**. Register title |
| `user`     | `string` | **Required**. Website Username          |
| `password` | `string` | **Required**. Website Password          |
| `url`      | `string` | **Required**. Website URL               |

`Website URL Schema: **"http(s)://www.website.com"**`

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

👀 You must save your credentials with different titles, otherwise credential will not be saved!!

### - Get all your credentials

```http
GET /credentials
```

### Request:

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

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
GET /credentials/credential/:id
```

### Request:

| Params | Type     | Description                 |
| :----- | :------- | :-------------------------- |
| `id`   | `string` | **Required**. credential Id |

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

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

👀 You must pass a valid(your userId must be equal to entity userId) and existing id, otherwise the API will throw an error.

### - Delete Credential

| Params | Type     | Description                 |
| :----- | :------- | :-------------------------- |
| `id`   | `string` | **Required**. credential Id |

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

👀 You must pass a valid(your userId must be equal to entity userId) and existing id, otherwise the API will throw an error.

</br>

## Safenotes

### - Create Safenote

### Request:

```http
POST /safenotes
```

| Body    | Type     | Description                             |
| :------ | :------- | :-------------------------------------- |
| `title` | `string` | **Unique**/**Required**. Register Title |
| `note`  | `string` | **Required**. Note                      |

`title schema: **Max 50 characters**`

`note schema: **Max 1000 characters**`

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

👀 You must save your safenotes with different titles, otherwise safenote will not be saved!

### - Get all your safenotes

```http
GET /safenotes
```

### Request:

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

### Response:

```json
[
  {
    "id": 3,
    "title": "Safenote test1",
    "note": "Random text test",
    "userId": 2
  },
  {
    "id": 4,
    "title": "Safenote test2",
    "note": "Random text test",
    "userId": 2
  }
]
```

### - Get One Safenote

```http
GET /safenotes/safenote/:id
```

### Request:

| Params | Type     | Description               |
| :----- | :------- | :------------------------ |
| `id`   | `string` | **Required**. Safenote Id |

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

### Response

```json
{
  "id": 3,
  "title": "Safenote test1",
  "note": "Random text test",
  "userId": 2
}
```

👀 You must pass a valid(your userId must be equal to entity userId) and existing id, otherwise the API will throw an error.

### - Delete Safenote

```http
DELETE /safenotes/safenote/:id
```

### Request:

| Params | Type     | Description               |
| :----- | :------- | :------------------------ |
| `id`   | `string` | **Required**. Safenote Id |

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

👀 You must pass a valid(your userId must be equal to entity userId) and existing id, otherwise the API will throw an error.

</br>

## Cards

### - Create Card

### Request:

```http
POST /cards
```

| Body             | Type      | Description                             |
| :--------------- | :-------- | :-------------------------------------- |
| `title`          | `string`  | **Unique**/**Required**. Register Title |
| `cardNumber`     | `string`  | **Required**. Card Number               |
| `securityCode`   | `string`  | **Required**. Security Code             |
| `password`       | `string`  | **Required**. Card Password             |
| `expirationDate` | `string`  | **Required**. Card Expiration Date      |
| `isVitual`       | `boolean` | **Required**. If Card is virtual        |
| `type`           | `string`  | **Required**. Card Type                 |

`Card Number Schema: **1234-1234-1234-1234 or 1234123412341234**`

`Card Security Code Schema: **3 numerical characters**`

`Card Password Schema: **4 numerical characters**`

`Card Expiration Date Schema: **MM/YY**`

`Card Type Schema: "credit" or "debit" or "credit/debit"**`

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

👀 You must save your cards with different titles, otherwise card will not be saved!

### - Get all your cards

```http
GET /cards
```

### Request:

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

### Response:

```json
[
  {
    "id": 4,
    "title": "card 4",
    "cardNumber": "0000 0000 0000 0001",
    "securityCode": "123",
    "password": "1234",
    "expirationDate": "07/27",
    "isVirtual": false,
    "type": "credit/debit",
    "userId": 3
  },
  {
    "id": 5,
    "title": "card 5",
    "cardNumber": "0000 0000 0000 0000",
    "securityCode": "123",
    "password": "1234",
    "expirationDate": "07/27",
    "isVirtual": false,
    "type": "debit",
    "userId": 3
  }
]
```

### - Get One Card

```http
GET /cards/card/:id
```

### Request:

| Params | Type     | Description           |
| :----- | :------- | :-------------------- |
| `id`   | `string` | **Required**. Card Id |

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

### Response:

```json
{
  "id": 4,
  "title": "card 4",
  "cardNumber": "0000 0000 0000 0001",
  "securityCode": "123",
  "password": "1234",
  "expirationDate": "07/27",
  "isVirtual": false,
  "type": "credit/debit",
  "userId": 3
}
```

👀 You must pass a valid(your userId must be equal to entity userId) and existing id, otherwise the API will throw an error.

### - Delete Card

```http
DELETE /cards/card/:id
```

### Request:

| Params | Type     | Description           |
| :----- | :------- | :-------------------- |
| `id`   | `string` | **Required**. Card Id |

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

👀 You must pass a valid(your userId must be equal to entity userId) and existing id, otherwise the API will throw an error.

</br>

## Wifis

### Create Wifi

```http
POST /wifis
```

### Request:

| Body       | Type     | Description                               |
| :--------- | :------- | :---------------------------------------- |
| `title`    | `string` | **Required**. Register Title              |
| `name`     | `string` | **Required**. Name of the Wifi connection |
| `password` | `string` | **Required**. Wifi Password               |

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

### - Get all your wifis

```http
GET /wifis
```

### Request:

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

### Response:

```json
[
  {
    "id": 1,
    "title": "wifi test",
    "name": "wifi",
    "password": "test",
    "userId": 1
  },
  {
    "id": 2,
    "title": "wifi test",
    "name": "wifi2",
    "password": "test2",
    "userId": 1
  }
]
```

### - Get one wifi

```http
GET /wifis/wifi/:id
```

### Request:

| Params | Type     | Description           |
| :----- | :------- | :-------------------- |
| `id`   | `string` | **Required**. Card Id |

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

### Response:

```json
{
  "id": 1,
  "title": "wifi test",
  "name": "wifi",
  "password": "test",
  "userId": 1
}
```

### - Delete Wifi

```http
DELETE /wifis/wifi/:id
```

### Request:

| Params | Type     | Description           |
| :----- | :------- | :-------------------- |
| `id`   | `string` | **Required**. Card Id |

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. JWT Access Token |

#

## Run Locally

Clone the project

```bash
  git clone https://github.com/Fvieira99/Drivenpass
```

Go to the project directory

```bash
  cd Drivenpass/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  npx prisma migrate dev
```

Create Models

```bash
  npx prisma generate
```

Start the server

```bash
  npm run start
```

## Credits

- Thanks [@LucasAlvsz](https://www.github.com/LucasAlvsz) for the README structure inspiration.

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)
