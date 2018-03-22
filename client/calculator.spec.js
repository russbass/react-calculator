import {expect} from 'chai';

import evaluateExpression from "./calculator";


describe('calculate', () =>  {
  describe('when doing simple addition', () => {
    it('adds 1+2', () => {
      const value = evaluateExpression('1+2')
      expect (value).to.eql(3)
    })
    it('adds 1+2+5', () => {
      const value = evaluateExpression('1+2+5')
      expect (value).to.eql(8)
    })
    it('multiply 4*4', () => {
      const value = evaluateExpression('4*4')
      expect (value).to.eql(16)
    })
    it('multiples and parends ', () => {
      const value = evaluateExpression('2+3*(2+9)')
      expect (value).to.eql(35)
    })
  })
})