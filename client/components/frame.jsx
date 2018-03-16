import React from 'react'; // Imports the react module.
import Screen from './screen'; // imports the Screen Component.
import Button from './button'; // Imports the Button Component. 

// create a class that extends the react component.
class Frame extends React.Component {
    constructor() {
        super();
        // set our default state
        this.state = {
            question:'',
            answer: ''
        }
        // Bind the handleClick method (sets 'this' explicitly for this component)
        // We did this because 'this' would refer to the source of the click event
        this.handleClick = this.handleClick.bind(this); 
    }
    // Render function to create component to be rendered on the DOM.
    // This method must return a single parent element as you can see here.
    // the component is wrapped around () to make it a single expression. 
    render() {
        return(
            <div className="frame">
                <div className="calculator-title">
                  R_N Calculator
                </div>
                <Screen question={this.state.question} answer={this.state.answer} />
                <div className="button-row">
                    <Button label={'1'} handleClick={this.handleClick} type='input' />
                    <Button label={'2'} handleClick={this.handleClick} type='input' />
                    <Button label={'3'} handleClick={this.handleClick} type='input' />
                    <Button label={'4'} handleClick={this.handleClick} type='input' />
                    <Button label={'-'} handleClick={this.handleClick} type='action' />
                    <Button label={'+'} handleClick={this.handleClick} type='action' />
                </div>
                <div className="button-row">
                    <Button label={'5'} handleClick={this.handleClick} type='input' />
                    <Button label={'6'} handleClick={this.handleClick} type='input' />
                    <Button label={'7'} handleClick={this.handleClick} type='input' />
                    <Button label={'8'} handleClick={this.handleClick} type='input' />
                    <Button label={'*'} handleClick={this.handleClick} type='action' />
                    <Button label={'/'} handleClick={this.handleClick} type='action' />
                </div>
                <div className="button-row">
                    <Button label={'9'} handleClick={this.handleClick} type='input' />
                    <Button label={'.'} handleClick={this.handleClick} type='input' />
                    <Button label={'0'} handleClick={this.handleClick} type='input' />
                    <Button label={'Cls'} handleClick={this.handleClick} type='action' />
                    <Button label={'='} handleClick={this.handleClick} type='action' />
                </div> 
            </div>
        );
    }
    // our method to handle all click events from the buttons. 
    handleClick(event){
        const value= event.target.value; // get the value from the target element in this case the (button).
        switch (value) {
            case '=': { // if it's an equal sign, use the eval module to evaluate the question
            // convert the number into a string
            //Rewrite the eval function and replace

            const answer = eval(this.state.question).toString();
            
            
            // then update the answer in the state.
            this.setState({ answer });
            break;
            }
            case 'Cls' :{
                // if its the Cls sign, clean the question and answer the state. 
                this.setState({ question: '', answer: ''});
                break;
            }
            default: {
                // for every other command, update the answer in the state.
                this.setState({ question: this.state.question += value});
                break;
            }
        }
    }
}

// exports our frame component. which is used in the client/Index.js file
export default Frame;