const { expect } = require("chai");

const { memoize } = require("../src");

describe("kaphein-js-memoization", function ()
{
    describe("memoize", function ()
    {
        it("should memoize the result.", function ()
        {
            /**
             *  @param {number} l
             *  @param {number} r
             */
            function f(l, r)
            {
                return {
                    l,
                    r,
                };
            }

            const memoized = memoize(f);
            const first = memoized(3, 4);
            const second = memoized(3, 4);
            expect(first).to.equal(second);
        });
    });
});
