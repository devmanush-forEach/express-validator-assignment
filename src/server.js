const app = require("./index")

const connect = require("./configs/db");

app.listen(2234, ()=>{
    try {
        connect();
        console.log("server is running on port no. 2234")
    } catch (err) {

        console.log(err.message)
        
    }
})