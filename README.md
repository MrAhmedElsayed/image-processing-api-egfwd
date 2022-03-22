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
    npm run dev
    ```
- build project (output folder "build")
    ```bash
    npm run build
    ```
- start production server (build then runserver)
    
    ```bash
    npm run start:prod
    ```
- production ready (format, lint fix, build, run server)
    ```bash
    npm run production
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

## package.json details

| package     | Description                                                                                                                 | package in npmjs.com                                     |
|-------------|-----------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| express     | Fast, unopinionated, minimalist web framework for node                                                                      | [express](https://www.npmjs.com/package/express)         |
| morgan      | HTTP request logger middleware for node.js                                                                                  | [morgan](https://www.npmjs.com/package/morgan)           |
| sharp       | convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions. | [sharp](https://www.npmjs.com/package/sharp)             |
| body-parser | Node.js body parsing middleware.                                                                                            | [body-parser](https://www.npmjs.com/package/body-parser) |


## Submission Checklist

- [ ] All tests pass (end point and functionality tests)
- [x] Formatting scripts run without issues
- [x] Build script runs without issue
- [x] Dev and build server run without issue
- [x] Image is resized when endpoint is reached for the first time
- [x] Stored image is loaded when endpoint is reached subsequent times
- [x] README is complete
- [ ] Project Rubric has been checked to verify that all requirements have been met
