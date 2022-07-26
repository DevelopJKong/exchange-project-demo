function required(key,defaultValue = "") {
    const value = process.env[key] || defaultValue;
    if(value === null) {
        throw new Error(`Key ${key} 가 undefined 입니다`);
    } 
    return value;
}

export const config = {
    jwt: {
        secretKey:required('JWT_SECRET',""),
        expiresInSec:required('JWT_EXPIRES_SEC',"86400")
    },
    host: {
        port:required('HOST_PORT','5000')
    },
    db: {
        host: required('DB_HOST'),
        user: required('DB_USER'),
        database: required('DB_DATABASE'),
        password: required('DB_PASSWORD'),
        port: required('DB_PORT')
    },
    bcrypt: {
        saltRounds:required('BCRYPT_SALT_ROUNDS',10)
    }

}