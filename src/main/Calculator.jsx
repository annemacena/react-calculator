import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    lastOperation: null,
    values: [0, 0],
    current: 0,
    fullOperation: ""
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(operation, display) {
        this.setState({ 
                ...initialState, 
                displayValue: !!display ? display : '0',
                clearDisplay: !!display
            })
    }

    setOperation(operation) {

        const equals = operation === '=';
        let fullOperation = this.state.fullOperation;

        if (this.state.current === 0) {
            this.setState({ 
                operation, 
                lastOperation: operation,
                current: 1, 
                clearDisplay: true,
                fullOperation: !equals ? fullOperation += operation : ""
            })
        } else {            
            const currentOperation = this.state.operation
            const lastOperation = this.state.lastOperation

            // if isn't equals or isn't null
            if (!equals && !!currentOperation) {
                let fullExceptLastOperation = fullOperation;
                fullExceptLastOperation = fullExceptLastOperation.slice(0, -1);
                this.setState({
                    operation: operation,
                    lastOperation: equals ? null : operation,
                    fullOperation: fullExceptLastOperation += operation
                })
            }
            else {
                const values = [...this.state.values];
                try {
                    const result = eval(`${values[0]} ${lastOperation} ${values[1]}`);
                    values[0] = !!result ? 
                    (
                            Number.isInteger(result) ? result 
                            : Number(result.toFixed(2))
                    )                    
                    : 0;
                } catch (e) {
                    values[0] = this.state.values[0]
                }

                values[1] = 0

                if (!equals) {
                    this.setState({
                        displayValue: values[0],
                        operation: equals ? null : operation,
                        lastOperation: equals ? null : operation,
                        current: equals ? 0 : 1,
                        clearDisplay: !equals,
                        values,
                        fullOperation: fullOperation += operation
                    })
                }
                else {
                    this.clearMemory(null, values[0])
                }

            }
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n


        let fullOperation = this.state.fullOperation;
        const match = fullOperation.match(/[+*\/-]/g);
        if (match) {
            const lastIndex = fullOperation.lastIndexOf(match[match.length - 1]);
            if ((fullOperation.length - 1) !== lastIndex) {
                fullOperation = fullOperation.slice(0, lastIndex + 1) + displayValue;
            }
            else {
                fullOperation += n;
            }
        }
        else
            fullOperation += n;


        this.setState({ 
            displayValue, 
            clearDisplay: false, 
            fullOperation,
            operation: null
        })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} fullOperation={this.state.fullOperation} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
                
            </div>
        )
    }
}