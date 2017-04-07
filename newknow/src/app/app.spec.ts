import { async } from '@angular/core/testing';
 
describe('Test des tests', () => {
 
    beforeEach(async(() => {
       console.log("in before :)");
    }));
 
 
    afterEach(() => {
       console.log("in after :)");
    });
 
    it('dummy test', () => {
        expect(1).toBe(1);
    });

 
});