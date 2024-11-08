import ts from "typescript";
import { MetadataCollection } from "../factories/MetadataCollection";
import { Metadata } from "../schemas/metadata/Metadata";
import { MetadataObject } from "../schemas/metadata/MetadataObject";
import { IProject } from "../transformers/IProject";
import { FeatureProgrammer } from "./FeatureProgrammer";
import { FunctionImporter } from "./helpers/FunctionImporter";
import { ICheckEntry } from "./helpers/ICheckEntry";
import { IExpressionEntry } from "./helpers/IExpressionEntry";
export declare namespace CheckerProgrammer {
    interface IConfig {
        prefix: string;
        path: boolean;
        trace: boolean;
        equals: boolean;
        numeric: boolean;
        addition?: () => ts.Statement[];
        decoder?: () => FeatureProgrammer.Decoder<Metadata, ts.Expression>;
        combiner: IConfig.Combiner;
        atomist: (explore: IExplore) => (check: ICheckEntry) => (input: ts.Expression) => ts.Expression;
        joiner: IConfig.IJoiner;
        success: ts.Expression;
    }
    namespace IConfig {
        interface Combiner {
            (explorer: IExplore): {
                (logic: "and" | "or"): {
                    (input: ts.Expression, binaries: IBinary[], expected: string): ts.Expression;
                };
            };
        }
        interface IJoiner {
            object(input: ts.Expression, entries: IExpressionEntry[]): ts.Expression;
            array(input: ts.Expression, arrow: ts.ArrowFunction): ts.Expression;
            tuple?: undefined | ((exprs: ts.Expression[]) => ts.Expression);
            failure(value: ts.Expression, expected: string, explore?: undefined | FeatureProgrammer.IExplore): ts.Expression;
            is?(expression: ts.Expression): ts.Expression;
            required?(exp: ts.Expression): ts.Expression;
            full?: undefined | ((condition: ts.Expression) => (input: ts.Expression, expected: string, explore: IExplore) => ts.Expression);
        }
    }
    type IExplore = FeatureProgrammer.IExplore;
    interface IBinary {
        expression: ts.Expression;
        combined: boolean;
    }
    const compose: (props: {
        project: IProject;
        config: IConfig;
        importer: FunctionImporter;
        type: ts.Type;
        name: string | undefined;
    }) => FeatureProgrammer.IComposed;
    const write: (project: IProject) => (config: IConfig) => (importer: FunctionImporter) => (type: ts.Type, name?: string) => ts.ArrowFunction;
    const write_object_functions: (project: IProject) => (config: IConfig) => (importer: FunctionImporter) => (collection: MetadataCollection) => ts.VariableStatement[];
    const write_union_functions: (project: IProject) => (config: IConfig) => (importer: FunctionImporter) => (collection: MetadataCollection) => ts.VariableStatement[];
    const write_array_functions: (project: IProject) => (config: IConfig) => (importer: FunctionImporter) => (collection: MetadataCollection) => ts.VariableStatement[];
    const write_tuple_functions: (project: IProject) => (config: IConfig) => (importer: FunctionImporter) => (collection: MetadataCollection) => ts.VariableStatement[];
    const decode_object: (config: IConfig) => (importer: FunctionImporter) => (input: ts.Expression, obj: MetadataObject, explore: IExplore) => ts.CallExpression;
}
