import ts from "typescript";
import { IProject } from "../../transformers/IProject";
import { FeatureProgrammer } from "../FeatureProgrammer";
import { FunctionImporter } from "../helpers/FunctionImporter";
export declare namespace JsonStringifyProgrammer {
    const decompose: (props: {
        validated: boolean;
        project: IProject;
        importer: FunctionImporter;
        type: ts.Type;
        name: string | undefined;
    }) => FeatureProgrammer.IDecomposed;
    const write: (project: IProject) => (modulo: ts.LeftHandSideExpression) => (type: ts.Type, name?: string) => ts.CallExpression;
}
