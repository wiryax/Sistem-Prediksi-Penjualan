// const getdata = document.getElementById('tambahRow')
console.log('git test')
const targerElment = document.getElementById('lahan')
const formSubmit = document.getElementById('submit')
const formData = document.getElementById('formInput')

// getdata.addEventListener("click",myfun)
function addRow(){
    const parent = document.createElement('div')
    targerElment.appendChild(parent)
    parent.appendChild(Object.assign(
        document.createElement('input'),
        { type:'number',name:'independentVariable[]',id:'variable',required:true}
    ))
    parent.appendChild(Object.assign(
        document.createElement('input'),
        { type:'number',name:'dependentVariable[]',id:'variable',required:true}
    ))
}
function deleteRow(){
    targerElment.removeChild(targerElment.lastElementChild)
}
function numberGenerate(x){
    let y = []
    for (let index = 1; index <= x; index++) {
        y.push(index)   
    }
return y
}
formSubmit.addEventListener('click',(event)=>{
    event.preventDefault()
    window.independentVariable = []
    window.dependentVariable = []
    for(let i = 0;i<formData.length-1;i+=2){
        independentVariable.push(parseInt(formData.elements[i].value))
        dependentVariable.push(parseInt(formData.elements[i+1].value))
    }
    // console.log(window.independentVariable,window.dependentVariable)
    var modul = new LinearRegration(independentVariable,dependentVariable)
    var numberG  = numberGenerate(window.independentVariable.length)
    var value = new LinearRegration(numberG, window.independentVariable)
    if(modul.dataValidation()==true){
        const classProperty = document.getElementsByClassName("input-calculate")
        var stat = estimateStatus(modul.StandartError(),modul.R_Squeared())
        classProperty[0].style.visibility = "visible"
        const B0 = document.getElementById("B0").innerText = modul.b0()
        const B1 = document.getElementById("B1").innerText = modul.b1()
        const Bulan = document.getElementById("Bulan").innerText = window.independentVariable.length + 1
        const prediksiX = document.getElementById("DataX").innerText = value.predictionResult(window.independentVariable.length + 1)
        const prediksiY = document.getElementById("DataY").innerText = modul.predictionResult(prediksiX)
        const Bulan2 = document.getElementById("Bulan2").innerText = window.independentVariable.length + 2
        const prediksiX2 = document.getElementById("DataX2").innerText = value.predictionResult(window.independentVariable.length + 2)
        const prediksiY2 = document.getElementById("DataY2").innerText = modul.predictionResult(prediksiX2)
        const R_Squeared = document.getElementById("R-squared")
        const R_SquearedClass = document.getElementsByClassName("R-squared")
        R_Squeared.innerText = modul.R_Squeared()+" "+stat['R_Squeared'][0]
        R_SquearedClass[0].style.color =stat['R_Squeared'][1]
        const StandartError = document.getElementById("Standart-Error")
        const StandartErrorClass = document.getElementsByClassName("Standart-Error")
        StandartError.innerText = modul.StandartError()+" "+stat['SEoE'][0]
        StandartErrorClass[0].style.color =stat['SEoE'][1]
    }else{
        const Elments = document.createElement("h3")
        const addText = document.createTextNode("Data Invalid !!!")
        addText.className = "statusValidation"
        Elments.appendChild(addText)
        const validationProperty = document.getElementsByClassName("statusValidation")
        const validationProperty2 = document.getElementById("statusValidation")
        validationProperty2.appendChild(Elments)
        validationProperty[0].style.visibility = "visible"
    }
})
function calculate(){
    var modul = new LinearRegration(window.independentVariable,window.dependentVariable)
    const value = document.getElementById("predictionVariable")
    // var nextValue = value.predictionResult(window.independentVariable.length + 1)
    document.getElementById("Yhats").innerText = modul.predictionResult(value.value)
    // console.log(modul.predictionResult(value.value))
    // console.log(modul.StandartError())
    // console.log(modul.R_Squeared())
}
function estimateStatus(SEoE,R_Squeared){
    let status = []
    if(R_Squeared >= 0.75 && R_Squeared <= 1){
        status["R_Squeared"] = ['Sangat Baik','green']
    }else if(R_Squeared >= 0.25 && R_Squeared < 0.75) {
        status["R_Squeared"] = ['Baik','#cfe012']
    }else{
        status["R_Squeared"] = ['Lemah','red']
    }

    if (SEoE >= 0 && SEoE <=1.5) {
        status["SEoE"] = ['Sangat Baik','green']
    }else if(SEoE > 1.5 && SEoE <=3){
        status["SEoE"] = ['Baik','#cfe012']
    }else{
        status["SEoE"] = ['Buruk','red']
    }
    return status
}