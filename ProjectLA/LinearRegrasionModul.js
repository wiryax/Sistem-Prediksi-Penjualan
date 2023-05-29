class LinearRegration {
    constructor(X,Y){
        this.X = X
        this.Y = Y
    }
    dataValidation(){
        let status = true
        for(let i= 0;i<(this.X.length+this.Y.length)/2;i++){
            if(isNaN(this.X[i])===true||isNaN(this.Y[i])===true||this.X[i].length===0||this.Y[i].length===0){
                return false
                break
            }else{
                continue
            }
        }
        return status
    }
    sumFunc(data){
        var dataLenght = data.length
        let total = 0
        for(var i = 0; i<dataLenght;i++){
            total+= data[i]
        }
        return total
    }
    MeanFunc(){
        var dataLenght = this.X.length
        let totalX =0
        let totalY =0
        let result = []
        for(var i = 0; i<dataLenght;i++){
            totalX += this.X[i]
            totalY += this.Y[i]
        }
        result ["x"] = totalX/dataLenght
        result ["y"] = totalY/dataLenght
        return result
    }
    meanResult(){
        let ArrayX = []
        let ArrayY = []
        let newArray = []
        for(let i=0;i<this.X.length;i++){
            ArrayX.push(this.X[i]-this.MeanFunc().x)
            ArrayY.push(this.Y[i]-this.MeanFunc().y)
        }
        newArray['x'] = ArrayX
        newArray['y'] = ArrayY
        return newArray
    }
    dataSqueared(){
        let newArray = []
        for(let i=0;i<this.meanResult().x.length;i++){
            newArray.push(Math.pow(this.meanResult().x[i],2))
        }
        return newArray
    }
    multipleXY(){
        let newArray = []
        for(let i=0;i<this.meanResult().x.length;i++){
            newArray.push(this.meanResult().x[i]*this.meanResult().y[i])
        }
        return newArray
    }
    b1(){
        let result = (this.sumFunc(this.multipleXY())/this.sumFunc(this.dataSqueared()))
        return result
    }
    b0(){
        let result = this.MeanFunc().y + -(this.b1()*this.MeanFunc().x)
        return result
    }
    predictionResult(prams){
            var prediction = this.b0() + (this.b1() * prams);
            return prediction
    }
    StandartError(){
        var result = [];
        for (let i = 0; i < this.X.length; i++) {
            result.push(Math.pow(this.Y[i] - this.predictionResult(this.X[i]), 2));
        }
        var newResult = this.sumFunc(result);
        return Math.sqrt(newResult / (this.X.length - 2));
    }
    R_Squeared(){
        let Ymean = []
        let Yhats = []
        for (let i = 0; i < this.Y.length; i++) {
             Ymean.push(Math.pow(this.Y[i]-this.MeanFunc().y,2))
             Yhats.push(Math.pow(this.predictionResult(this.X[i])-this.MeanFunc().y,2))
        }
        let result = 1 - (this.sumFunc(Yhats)/this.sumFunc(Ymean))
        if (isNaN(result) === true) {
            return 0
          } else {
            return result
          }
    }
}