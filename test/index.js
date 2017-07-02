import chai from 'chai';
// import registry from '../src/index';
import * as tt from 'typescript-definition-tester';

describe('reducer registry', () => {

  it('todo test', () => {
    chai.assert(true);
  });

  describe('TypeScript definitions', function test() {
    this.timeout(0);

    it('should compile against index.d.ts', (done) => {
      tt.compileDirectory(
        __dirname,
        fileName => fileName.match(/\.ts$/),
        () => done()
      );
    });
  });
});
