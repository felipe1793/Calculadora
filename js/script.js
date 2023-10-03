const previusOperationText = document.querySelector("#previus-operation")
const correntOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor (previusOperationText, correntOperationText) {
        this.previusOperationText = previusOperationText
        this.correntOperationText = correntOperationText
        this.correntOperation = ""
    }

    // Adiciona digito na tela da calculadora
    addDigit(digit) {
        // Verifica se a operação está correta

        if(digit === "." && this.correntOperationText.innerText.includes(".")) {
            return
        }

        this.correntOperation = digit
        this.updateScreen()
    }

    // Processando todas as operações
    processOperation(operation) {
        // checando se o current está vazio
        if(this.correntOperationText.innerText === "" && operation !== "C") {
            // Mudar operação
            if(this.previusOperationText.innerText !== "" ){
                this.changeOperation(operation)
            }
            return
        }


        // Pegando o valor atual da calculadora e o anterior
        let operationValue
        const previus = +this.previusOperationText.innerText.split(" ")[0]
        const corrent = +this.correntOperationText.innerText

        switch(operation) {
            case "+":
                operationValue = previus + corrent
                this.updateScreen(operationValue, operation, corrent, previus)
                break
            case "-":
                operationValue = previus - corrent
                this.updateScreen(operationValue, operation, corrent, previus)
                break
            case "/":
                operationValue = previus / corrent
                this.updateScreen(operationValue, operation, corrent, previus)
                break
            case "*":
                operationValue = previus * corrent
                this.updateScreen(operationValue, operation, corrent, previus)
                break
            case "DEL":
                this.processDelOperator()
            case "CE":
                this.processClearOperation()
            case "C":
                this.processClearOperation()
            case "=":
                this.processEqualOperator()
            default:
                return
        }
    }

    // Muda o valor da tela da calculadora
    updateScreen(operationValue = null, operation = null, corrent = null, previus = null) {

        if(operationValue === null) {
            this.correntOperationText.innerText += this.correntOperation
        } else {
            // Checando se o valor é 0
            if(previus === 0) {
                operationValue = corrent
            }

            // Adicionando o valor de corrent para o previus
            this.previusOperationText.innerText = `${operationValue} ${operation}`
            this.correntOperationText.innerText = ""
        }

    }

    // Mudando a opereção matemática
    changeOperation(operation) {
        const mathOperations = ["+", "-", "*", "/"]

        if(!mathOperations.includes(operation)) {
            return
        }

        this.previusOperationText.innerText = this.previusOperationText.innerText.slice(0, -1) + operation
    }

    // Deleta o ultimo digito
    processDelOperator() {
        this.correntOperationText.innerText = 
        this.correntOperationText.innerText.slice(0, -1);
    }

    // Deleta os numeros da operação
    processClearCurrentOperation() {
        this.correntOperationText.innerText = ""
    }

    // Deleta todos os numeros da operação
    processClearOperation() {
        this.correntOperationText.innerText = ""
        this.previusOperationText.innerText = ""
    }

    processEqualOperator() {
        const operation = previusOperationText.innerText.split(" ")[1]
        console.log(operation)

        this.processOperation(operation)
    }
}

const calc = new Calculator(previusOperationText, correntOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText

        if(+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})