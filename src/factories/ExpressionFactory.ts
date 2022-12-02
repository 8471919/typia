import ts from "typescript";

export namespace ExpressionFactory {
    export function isRequired(input: ts.Expression): ts.Expression {
        return ts.factory.createStrictInequality(
            ts.factory.createIdentifier("undefined"),
            input,
        );
    }

    export function isArray(input: ts.Expression): ts.Expression {
        return ts.factory.createCallExpression(
            ts.factory.createIdentifier("Array.isArray"),
            undefined,
            [input],
        );
    }

    export function isObject(
        input: ts.Expression,
        nullChecked: boolean,
    ): ts.Expression {
        const conditions: ts.Expression[] = [
            ts.factory.createStrictEquality(
                ts.factory.createStringLiteral("object"),
                ts.factory.createTypeOfExpression(input),
            ),
        ];
        if (nullChecked === true)
            conditions.push(
                ts.factory.createStrictInequality(
                    ts.factory.createNull(),
                    input,
                ),
            );

        return conditions.length === 1
            ? conditions[0]!
            : conditions.reduce((x, y) => ts.factory.createLogicalAnd(x, y));
    }

    export function isInstanceOf(
        input: ts.Expression,
        type: string,
    ): ts.Expression {
        return ts.factory.createBinaryExpression(
            input,
            ts.factory.createToken(ts.SyntaxKind.InstanceOfKeyword),
            ts.factory.createIdentifier(type),
        );
    }
}
