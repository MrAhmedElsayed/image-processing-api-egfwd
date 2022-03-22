# Image Processing API Egfwd

API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters (and additional stylization if you choose) for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API you create will handle resizing and serving stored images for you.

## Installation

Clone project 
```bash
git clone git@github.com:MrAhmedElsayed/image-processing-api-egfwd.git

cd image-processing-api-egfwd
```
Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install packages.json.

 ```bash
npm i
```
## Usage

- start development server
    
    ```bash
    npm run start
    ```
- format code with prettier
    ```bash
    npm run format
    ```
- format and fix with eslint
    ```bash
    npm run lint 
    ```
    or (to fix errors) 
    ```bash
    npm run lint:fix  
    ```
- build project (output folder "build")
    ```bash
    npm run build
    ```
- run production version
    ```bash
    node build/index.js
    ```
## package.json details

| package     | Description                                                                                                                 | npmjs                                                    |
|-------------|-----------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| express     | Fast, unopinionated, minimalist web framework for node                                                                      | [express](https://www.npmjs.com/package/express)         |
| morgan      | HTTP request logger middleware for node.js                                                                                  | [morgan](https://www.npmjs.com/package/morgan)           |
| sharp       | convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions. | [sharp](https://www.npmjs.com/package/sharp)             |
| body-parser | Node.js body parsing middleware.                                                                                            | [body-parser](https://www.npmjs.com/package/body-parser) |


## project complitation
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
