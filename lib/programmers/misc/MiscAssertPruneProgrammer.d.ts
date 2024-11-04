import ts from "typescript";
import { IProject } from "../../transformers/IProject";
import { FeatureProgrammer } from "../FeatureProgrammer";
import { FunctionImporter } from "../helpers/FunctionImporter";
export declare namespace MiscAssertPruneProgrammer {
    const decompose: (props: {
        project: IProject;
        importer: FunctionImporter;
        type: ts.Type;
        name: string | undefined;
        init: ts.Expression | undefined;
    }) => FeatureProgrammer.IDecomposed;
    const write: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (type: ts.Type, name?: string, init?: ts.Expression) => ts.CallExpression;
}
