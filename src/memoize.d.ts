export declare function memoize<
    F extends (...args : any[]) => any
>(
    func : F,
    option? : MemoizationOption<F>
) : F;

export declare interface MemoizationOption<
    F extends (...args : any[]) => any
>
{
    thisArg? : any;

    equalComparer? : (
        lhs : any,
        rhs : any
    ) => boolean;

    argsEqualComparer? : (
        prevArgs : Parameters<F>,
        nextArgs : Parameters<F>
    ) => boolean;

    resultEqualComparer? : (
        lhs : ReturnType<F>,
        rhs : ReturnType<F>
    ) => boolean;

    alwaysEvaluate? : boolean;

    reuseResultReferenceIfPossible? : boolean;
}
