export default function evaluateExpression(inputStr) {
    //check if input length is empty
    if ((inputStr.length === 0)) {
        alert("Please enter an expression.")
    }
    let newCalculation = new ParseAndCalculate();
    newCalculation.assignToken(inputStr.replace(/ /g, ''));
    newCalculation.convertPolish();
    return newCalculation.pullAndCalculate();
}

class ParseAndCalculate {
    constructor() {
        this.polish = []; //array that holds reaarranged characters.
        this.stack = []; //stack/array for holding operators during conversion and operands during pull and calculate.
        this.inputTokens = []; //array of inputStr as tokens
        this.operators = ["*", "/", "+", "-"];
        this.parend = ["(", ")"];
        this.temp = "";
        this.orderOfOps = {
            "*": 2,
            "/": 2,
            "+": 1,
            "-": 1,
            "(": 0,
            ")": 0
        }; //operation precedence
    }

        //Is it a number?
    isNumber(char) {
        return !isNaN(char);
    };

    //is it an operator?
    isOperator(char) {
        if (this.operators.indexOf(char) != -1) {
            return true;
        }
        return false;
    };

    //is it a parend?
    isparend(char) {
        if (this.parend.indexOf(char) != -1) {
            return true;
        }
        return false;
    };
    
    assignToken(inputStr) {
        //check if the first character is + or - only works for first character in string, need to improve this.
        if ((inputStr.charAt(0) == "+") || (inputStr.charAt(0) == "-")) {
            inputStr = "0" + inputStr;
        }
        //loop through all the values
        for (let i = 0; i < inputStr.length; i++) {
            // check if its an operator or a parend Also checks if the temp is empty.
            // If its not, it pushes it on the stack and emptys the temp
            if (this.isOperator(inputStr.charAt(i)) || this.isparend(inputStr.charAt(i))) {
                if (this.temp.length !== 0) {
                    this
                        .inputTokens
                        .push(this.temp);
                    this.temp = "";
                }
                this
                    .inputTokens
                    .push(inputStr.charAt(i));
                continue;
            }
            //floating point
            if (inputStr.charAt(i) == ".") {
                this.temp = this.temp + ".";
                continue;
            }
            //if the character is a number add it to temp
            if (!isNaN(inputStr.charAt(i))) {
                this.temp = this.temp + inputStr.charAt(i);
                continue;
            }
        }
        //check if there are still values in the temp after running through the array
        if (this.temp.length !== 0) {
            this
                .inputTokens
                .push(this.temp);
            this.temp = "";
        }
    };

    convertPolish() {
        //loop through all the infixtokens
        for (let i = 0; i < this.inputTokens.length; i++) {
            if (this.isNumber(this.inputTokens[i])) {
                //if its a no, push to the output stack
                this
                    .polish
                    .push(this.inputTokens[i]);

            } else if (this.isOperator(this.inputTokens[i])) { //if its an operator
                if (this.stack.length === 0) {
                    //if the stack is empty, push the new operator to the stack
                    this
                        .stack
                        .push(this.inputTokens[i]); //push to stack
                } else {
                    // while whats at the top of the stack has greater precedence, pop it off to the
                    // output
                    while (this.orderOfOps[this.stack[this.stack.length - 1]] >= this.orderOfOps[this.inputTokens[i]]) {
                        // if both the new entry and previous entry top of the stack are ^. Just push to
                        // output
                        if ((this.inputTokens[i] === "*" || "/") && (this.orderOfOps[this.stack[this.stack.length - 1]] === this.orderOfOps[this.inputTokens[i]])) {
                            break;
                        }
                        this
                            .polish
                            .push(this.stack.pop());
                        if (this.stack.length === 0) { //if the stack is now empty exit loop
                            break;
                        }
                    }
                    this
                        .stack
                        .push(this.inputTokens[i]);
                }
                console.log(this.stack + this.polish);
            } else if (this.isparend(this.inputTokens[i])) { //if its a parend
                if (this.inputTokens[i] === "(") {
                    //if its a left brace, push into the stack
                    this
                        .stack
                        .push("(");
                } else {
                    while (this.stack[this.stack.length - 1] != "(") {
                        //if its a right, pop off
                        this
                            .polish
                            .push(this.stack.pop());
                    }
                    this
                        .stack
                        .pop(); //get the ( out of the stack
                }
            }
        }

        if (this.stack.length !== 0) {
            while (this.stack.length !== 0) {
                this
                    .polish
                    .push(this.stack.pop());
            }
        }

        return this.polish; //return the answer in postfix
    };

    pullAndCalculate() {
        let numOper = 0;
        let temp = 0;

        //count the number of operators and store it
        for (let i = 0; i < this.polish.length; i++) {
            if (this.isOperator(this.polish[i])) {
                ++numOper;
            }
        }

        //first loop for the number of operators found
        for (let i = 0; i < numOper; i++) {
            //run through the available values left
            for (let j = 0; j < this.polish.length; j++) {
                if (this.isOperator(this.polish[j])) {
                    temp = this.doMath(this.polish[j - 2], this.polish[j - 1], this.polish[j]);
                    this.polish[j - 2] = temp;
                    this
                        .polish
                        .splice((j - 1), 2);
                    break;
                }
            }
        }
        if (this.polish.length > 1) {
            alert("this is not a complete function, please try again")
            return "This is not right..."
        }

        return this.polish[0];
    };
    //Do the Math
    doMath(n1, n2, op) {
        n1 = parseFloat(n1);
        n2 = parseFloat(n2);
        let answer = 0;
        switch (op) {
            case "*":
                answer = n1 * n2;
                break;
            case "/":
                answer = n1 / n2;
                break;
            case "+":
                answer = n1 + n2;
                break;
            case "-":
                answer = n1 - n2;
                break;
        }

        return answer;
    };

};