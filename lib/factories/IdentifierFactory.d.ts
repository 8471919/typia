import ts from "typescript";
export declare namespace IdentifierFactory {
    const identifier: (name: string) => ts.Identifier | ts.StringLiteral;
    const access: (target: ts.Expression) => (property: string) => ts.PropertyAccessExpression | ts.ElementAccessExpression;
    const getName: (input: ts.Expression) => string;
    const postfix: (str: string) => string;
    const parameter: (name: string | ts.BindingName, type?: ts.TypeNode, init?: ts.Expression | ts.PunctuationToken<ts.SyntaxKind.QuestionToken>) => ts.ParameterDeclaration;
}
