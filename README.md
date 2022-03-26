
# Resize Image Api

You can change the image size through a link that includes the name of an image in the demo image folder and the required width and height

## API Reference

#### Resize an Image

```http
  GET /resize?file_name=fjord.jpg&width=300&height=200
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file_name` | `string` | **Required**. Image File Name from demo-image Directory |
| `width` | `number` | **Required**. Integer Number that represents the target image width |
| `height` | `number` | **Required**. Integer Number that represents the target image height |



## Installation

Clone the project

```bash
git clone git@github.com:MrAhmedElsayed/image-processing-api-egfwd.git
```
Go to the project directory

```bash
cd image-processing-api-egfwd
```

Install dependencies

```bash
npm i
```
    
## Demo

first run:
```bash
npm run dev
```
link to demo   
http://127.0.0.1:3000/resize?file_name=encenadaport.jpg&width=1000&height=400

explanation:   
**file_name** is encenadaport.jpg    
**width** is 1000 in pixel   
**height** is 400 in pixel  

what are you expecting ?? A new folder called Thumbnails has been created inside the Public folder with the resized image   
`public/thumbnails/encenadaport_1000_X_400.jpg`



## Screenshots

![App Screenshot](https://github.com/MrAhmedElsayed/image-processing-api-egfwd/blob/main/public/images/backend-screenshoot.png)


## Run Locally

Start development server

```bash
  npm run dev
```

Format code using **Prettier**

```bash
  npm run format
```

Lint code using **Eslint**

```bash
  npm run lint
```

lint and fix errors

```bash
  npm run lint:fix
```

Build Project (format, lint, and Transpile TypeScript into JavaScript) 

```bash
  npm run lint:fix
```

run server with Transpiled JavaScript

```bash
  npm run start 
```

start server with final eddition (it's build project and then run server)

```bash
  npm run start:prod 
```
## Running Tests

To run tests, run the following command   
it's build project and then run test

```bash
  npm run test
```
## Ready For Production

To run the final edition after organizing code, building, and testing

```bash
  npm run production
```
## Appendix

There is more than that !!

I create a front-end for this App  
Please Visit:

http://127.0.0.1:3000/

you will see Awesome UI with the same functionality



## UI screenshots

![App Screenshot](https://github.com/MrAhmedElsayed/image-processing-api-egfwd/blob/main/public/images/Screenshot1.png)

![App Screenshot2](https://github.com/MrAhmedElsayed/image-processing-api-egfwd/blob/main/public/images/Screenshot2.png)
## Optimizations

The project has been divided into two parts:
- A section for the backend (which is to change the size through the URL).
- Front End section (and a user interface was used to implement this, which is characterized by ease of use).

The entire project has also been isolated with a relatively good structure.
# Hi, I'm Ahmed Elsayed! 👋


## Author

[@MrAhmedElsayed](https://github.com/MrAhmedElsayed)


## 🚀 About Me
I'm a full stack developer working with Python (Django) and Vue js


## License

[MIT](https://choosealicense.com/licenses/mit/)

