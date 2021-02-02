import regeneratorRuntime from "regenerator-runtime";
console.log("connected to JS")


console.log("start")
const promise = function () {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log("process")
            resolve("done")
        }, 3000)
    })
}
const samplefunc = async function(){
    await promise()
}

samplefunc()