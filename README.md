
# Mobile React Native Zarego

Se construye una app en React Native, con un diseño predeterminado y escalabilidad para android e iOS.

A continuación se explicará el proceso de construcción del proyecto:




## Environment Variables

Para levantar el proyecto, se tendrá que agregar las siguientes variables de entorno al archivo .env

`REACT_MOBILE_BACKEND_ZAREGO`

## Run Locally

Clone the project

```bash
  git clone https://github.com/renzozuniga/mobile-zarego.git
```

Go to the project directory

```bash
  cd mobile-zarego
```

Install dependencies

```bash
  npm install
```

Start the app

```bash
  npm run ios
  npm run android
```


Generate the apk

```bash
  eas build -p android --profile preview
```
## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Authors

- [@renzozuniga](https://www.github.com/renzozuniga)

