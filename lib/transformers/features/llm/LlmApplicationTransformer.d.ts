import ts from "typescript";
import { IProject } from "../../IProject";
export declare namespace LlmApplicationTransformer {
    const transform: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (expression: ts.CallExpression) => ts.Expression;
}
