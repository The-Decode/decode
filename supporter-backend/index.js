import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
let url_to_node = "http://localhost:5001"+"/api/v1/get";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getData(data){
    data.getReader();
}

app.post("/get",async(req,res)=>{
    //accessing the params  passed in the url itself
    if(url_to_node == ""){
        res.status(404).send("The url is not set yet for the node");
        return;
    }
    const btfsPath = req.query.arg;
    try{
        // const btfsPath = "QmcJWGrnS7TCNvKJiV2PD6crETK5eQyb2F6is48TjtywJh"
        const output = 'data.json';
        const queryParams = new URLSearchParams({
            arg: btfsPath,
            output: output
        });
        const respon = await fetch(`${url_to_node}?${queryParams}`, {
            method: 'POST'
        })
        const data = await respon.body.getReader().read();
        console.log(data)
        res.send("some");
        // .then(async response => {
        //     const decoder = new TextDecoder();
        //     const reader = response.body.getReader();
        
        //     return reader.read().then(({ value, done }) => {
        //         if (done) {
        //             console.log('Stream reading complete');
        //             return;
        //         }
        //         const decodedValue = decoder.decode(value, { stream: true });
        //         console.log(decodedValue)
        //         return JSON.parse(decodedValue.split("~json~")[1].split("\x00")[0]);
        //     });
        // }).then(data=>res.status(200).send(data))
        // .catch(error => {
        //     console.error('Error:', error);
        // });

    }
    catch(err){
        console.log("error:",err);
        res.status(404).send("error");
    }
})

app.post("/",async(req,res)=>{
    url_to_node = req.body.url;
    res.status(200).send("success");
})

app.listen(7938, ()=>{console.log("Server started at 7938")});
