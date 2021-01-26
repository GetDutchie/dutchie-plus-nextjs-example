# Dutchie Plus Next.js Example

This Next.js app demonstrates how to use Dutchie Plus in a fully-functional website.

## Prerequisites

- Node.js >=12.16.3
- Yarn

## Installation

Copy the `.env.example` file to a `.env.local` file and adjust the values to match your environment.

In this project's directory run:

```shell
yarn install
```

### SSL Certificates for localhost

SSL certificates are required for development. Using [mkcert](https://github.com/FiloSottile/mkcert) simplifies the setup. In this project's directory run:

```shell
brew install mkcert
brew install nss # if you use Firefox
mkcert -install
mkcert localhost
```

This will install a root CA cert in an OS library directory, and a cert/key for localhost in this project's directory. If you're using MacOS, you're done. If you're using another OS, set the `ROOT_CA_PATH` environment variable in `.env.local` to the path where mkcert installed the Root CA Certificate.

## Start Application

To start the development server, in this project's directory run:

```shell
yarn dev
```

Go to [https://localhost:9999](https://localhost:9999) in a web browser. Replace 9999 with the `PORT` value in your `.env.local` file if you are using a different value.
