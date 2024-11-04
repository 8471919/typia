import ts from "typescript";
import { IProject } from "../../transformers/IProject";
import { FeatureProgrammer } from "../FeatureProgrammer";
import { FunctionImporter } from "../helpers/FunctionImporter";
export declare namespace NotationGeneralProgrammer {
    const returnType: (rename: (str: string) => string) => (type: string) => string;
    const decompose: (props: {
        rename: (str: string) => string;
        validated: boolean;
        project: IProject;
        importer: FunctionImporter;
        type: ts.Type;
        name: string | undefined;
    }) => FeatureProgrammer.IDecomposed;
    const write: (rename: (str: string) => string) => (project: IProject) => (modulo: ts.LeftHandSideExpression) => (type: ts.Type, name?: string) => ts.CallExpression;
}
