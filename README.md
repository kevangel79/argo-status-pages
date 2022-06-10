# Argo Status Pages

A ReactJS application that facilitates the presentation of the status of selected services.

## Configuration

The argo-status-pages application provides a simple way to configure connection and appearence parameters through the `config.json` file. For example:

```json
{
  "services": {
    "Service_A": {
      "fullname": "Service A",
      "category": "Category A"
    },
    "Service_B": {
      "fullname": "Service B",
      "category": "Category A"
    }
  },
  "service_categories": {
    "Category A": ["Service_A", "Service_B"]
  },
  "ngi_categories": {
    "Service_A": "Service_A",
    "Service_B": "Service_B"
  },
  "api": {
    "endpoint": "api.devel.example.com",
    "reportName": "CORE"
  },
  "title": "Test Status Page",
  "copyright": "Copyright 2022 - All rights reserved",
  "theme": {
    "header-gradient-color-start": "#05cae7",
    "header-gradient-color-end": "#000",
    "footer-gradient-color-start": "#05cae7",
    "footer-gradient-color-end": "#000",
    "footer-copyright-text-color": "#fff"
  }
}
```

The `public` directory of the project may host specific assets such as the `favicon.ico`, the `logo.svg` or the `footer_logo.svg`.
In addition to the image assets, a `.env` file may exist on the `public` directory that will define the `REACT_APP_TITLE`
variable for the argo-status-pages title.

## Installation

### Development mode

1. `git clone https://github.com/ARGOeu/argo-status-pages.git`
2. `cd argo-status-pages`
3. `npm install`
4. `npm start`

This will run the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### Production mode

1. `git clone https://github.com/ARGOeu/argo-status-pages.git`
2. `cd argo-status-pages`
3. `npm install`
4. `npm run build`

This will build the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
