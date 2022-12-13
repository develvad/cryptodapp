# cryptodapp
###
### 1. Generador de claves (pública y privada) mediante Criptografía de curva elíptica
### 2. Generador de clave simétrica (aes-256) Diffie-Hellman
### 3. Encriptador / Desencriptador de ficheros
####
## Pasos
###
## Generar claves (public .key - private .pb)
###
### node keysGenerate.js --keyname nombre_fichero
###
## Encriptar Fichero
### node CryptoFile.js --private nobre_clave_privada_sin_extension --public nobre_clave_publica_sin_extension --file nombre_fichero
###
## Desencriptar fichero:
### node DecryptFile.js --private nobre_clave_privada_sin_extension --public nobre_clave_publica_sin_extension --file nombre_fichero
