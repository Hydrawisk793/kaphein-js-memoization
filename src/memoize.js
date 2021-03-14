var kapheinJsTypeTrait = require("kaphein-js-type-trait");
var isDefinedAndNotNull = kapheinJsTypeTrait.isDefinedAndNotNull;
var isFunction = kapheinJsTypeTrait.isFunction;
var kapheinJsObjectUtils = require("kaphein-js-object-utils");
var deepEquals = kapheinJsObjectUtils.deepEquals;

module.exports = (function ()
{
    var _slice = Array.prototype.slice;

    function memoize(func, option)
    {
        var ctx = {
            called : false,
            f : func,
            opt : option
        };

        return function ()
        {
            if(!ctx.called)
            {
                ctx.opt = (isDefinedAndNotNull(ctx.opt) ? ctx.opt : {});
                var opt = ctx.opt;
                var equalComparer = (isFunction(opt.equalComparer) ? opt.equalComparer : deepEquals);

                ctx.equalComparer = equalComparer;
                ctx.reuseResultReference = (!("reuseResultReferenceIfPossible" in opt) ? true : (!!opt.reuseResultReferenceIfPossible));
                ctx.argsEqualComparer = (isFunction(opt.argsEqualComparer) ? opt.argsEqualComparer : equalComparer);
                ctx.resultEqualComparer = (isFunction(opt.resultEqualComparer) ? opt.resultEqualComparer : equalComparer);
                ctx.lastArgs = null;
                ctx.lastResult = void 0;
                ctx.called = true;
            }

            /**  @type {any[]} */var args = _slice.call(arguments);
            var newResult = void 0;
            if(!!ctx.opt.alwaysEvaluate || !ctx.argsEqualComparer(ctx.lastArgs, args))
            {
                newResult = ctx.f.apply(ctx.thisArg, args);

                if(!ctx.reuseResultReference || !ctx.resultEqualComparer(ctx.lastResult, newResult))
                {
                    ctx.lastResult = newResult;
                }

                ctx.lastArgs = args;
            }

            return ctx.lastResult;
        };
    }

    return {
        memoize : memoize
    };
})();
