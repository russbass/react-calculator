import React from 'react'; // Imports the react module.
import Screen from './screen'; // imports the Screen Component.
import Button from './button'; // Imports the Button Component.
import evaluateExpression from '../calculator'; 

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
        return (
            <div className="row">
                <div className=" frame col-xs-8 col-xs-offset-2">
                    <div className="calculator-title row">
                        React Calculator
          </div>
                    <Screen question={this.state.question} answer={this.state.answer} />
                    <div className="btn-row row">
                        <Button className='col-xs-3 btn-warning' label={'C'} handleClick={this.handleClick} type='action' />
                        <Button className='col-xs-3 btn-info' label={'('} handleClick={this.handleClick} type='action' />
                        <Button className='col-xs-3 btn-info' label={')'} handleClick={this.handleClick} type='action' />
                        <Button className='col-xs-3 btn-info' label={'/'} handleClick={this.handleClick} type='action' />
                    </div>
                    <div className="btn-row row">
                        <Button className='col-xs-3 btn-primary' label={'7'} handleClick={this.handleClick} type='input' />
                        <Button className='col-xs-3 btn-primary' label={'8'} handleClick={this.handleClick} type='input' />
                        <Button className='col-xs-3 btn-primary' label={'9'} handleClick={this.handleClick} type='input' />
                        <Button className='col-xs-3 btn-info' label={'*'} handleClick={this.handleClick} type='action' />
                    </div>
                    <div className="btn-row row">
                        <Button className='col-xs-3 btn-primary' label={'4'} handleClick={this.handleClick} type='input' />
                        <Button className='col-xs-3 btn-primary' label={'5'} handleClick={this.handleClick} type='input' />
                        <Button className='col-xs-3 btn-primary' label={'6'} handleClick={this.handleClick} type='input' />
                        <Button className='col-xs-3 btn-info' label={'-'} handleClick={this.handleClick} type='action' />
                    </div>
                    <div className="btn-row row">
                        <Button className='col-xs-3 btn-primary' label={'1'} handleClick={this.handleClick} type='input' />
                        <Button className='col-xs-3 btn-primary' label={'2'} handleClick={this.handleClick} type='input' />
                        <Button className='col-xs-3 btn-primary' label={'3'} handleClick={this.handleClick} type='input' />
                        <Button className='col-xs-3 btn-info' label={'+'} handleClick={this.handleClick} type='action' />
                    </div>
                    <div className="btn-row row">
                        <Button className='col-xs-6 btn-primary' label={'0'} handleClick={this.handleClick} type='input' />
                        <Button className='col-xs-3 btn-primary' label={'.'} handleClick={this.handleClick} type='input' />
                        <Button className='col-xs-3 btn-success' label={'='} handleClick={this.handleClick} type='action' />
                    </div>
                    <div>
                        <p>Blue Mode<input type="checkbox"/></p>
                    </div>
                </div>
            </div>
        );
    }

    // our method to handle all click events from our buttons
  handleClick(event){
    const value = event.target.value; // get the value from the target element (button)
    switch (value) {
      case '=': { // if it's an equal sign, use the eval module to evaluate the question
        // convert the answer (in number) to String
        const answer = evaluateExpression(this.state.question).toString();
        // update answer in our state.
        this.setState({ answer });
        break;
      }
      case 'C': {
        // if it's the Cls sign, just clean our question and answer in the state
        this.setState({ question: '', answer: '' });
        break;
      }
      default: {
        // for every other commmand, update the answer in the state
        this.setState({ question: this.state.question += value})
        break;
      }
    }
  }
}

// exports our frame component. which is used in the client/Index.js file
export default Frame;