export const ENV = {
    develop:false,
    getUrlServe(){
        return this.develop?'http://localhost:3000/':'http://192.168.1.99:3000/'
    }
}