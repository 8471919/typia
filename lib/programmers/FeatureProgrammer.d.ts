import ts from "typescript";
import { MetadataCollection } from "../factories/MetadataCollection";
import { Metadata } from "../schemas/metadata/Metadata";
import { MetadataArray } from "../schemas/metadata/MetadataArray";
import { MetadataObject } from "../schemas/metadata/MetadataObject";
import { IProject } from "../transformers/IProject";
import { CheckerProgrammer } from "./CheckerProgrammer";
import { FunctionImporter } from "./helpers/FunctionImporter";
import { IExpressionEntry } from "./helpers/IExpressionEntry";
export declare namespace FeatureProgrammer {
    interface IConfig<Output extends ts.ConciseBody = ts.ConciseBody> {
        types: IConfig.ITypes;
        /**
         * Prefix name of internal functions for specific types.
         */
        prefix: string;
        /**
         * Whether to archive access path or not.
         */
        path: boolean;
        /**
         * Whether to trace exception or not.
         */
        trace: boolean;
        addition?: undefined | ((collection: MetadataCollection) => ts.Statement[]);
        /**
         * Initializer of metadata.
         */
        initializer: (project: IProject) => (importer: FunctionImporter) => (type: ts.Type) => [MetadataCollection, Metadata];
        /**
         * Decoder, station of every types.
         */
        decoder: () => Decoder<Metadata, Output>;
        /**
         * Object configurator.
         */
        objector: IConfig.IObjector<Output>;
        /**
         * Generator of functions for object types.
         */
        generator: IConfig.IGenerator;
    }
    namespace IConfig {
        interface ITypes {
            input: (type: ts.Type, name?: undefined | string) => ts.TypeNode;
            output: (type: ts.Type, name?: undefined | string) => ts.TypeNode;
        }
        interface IObjector<Output extends ts.ConciseBody = ts.ConciseBody> {
            /**
             * Type checker when union object type comes.
             */
            checker: () => Decoder<Metadata, ts.Expression>;
            /**
             * Decoder, function call expression generator of specific typed objects.
             */
            decoder: () => Decoder<MetadataObject, ts.Expression>;
            /**
             * Joiner of expressions from properties.
             */
            joiner(input: ts.Expression, entries: IExpressionEntry<Output>[], parent: MetadataObject): ts.ConciseBody;
            /**
             * Union type specificator.
             *
             * Expression of an algorithm specifying object type and calling
             * the `decoder` function of the specified object type.
             */
            unionizer: Decoder<MetadataObject[], ts.Expression>;
            /**
             * Handler of union type specification failure.
             *
             * @param value Expression of input parameter
             * @param expected Expected type name
             * @param explore Exploration info
             * @returns Statement of failure
             */
            failure(value: ts.Expression, expected: string, explore?: undefined | IExplore): ts.Statement;
            /**
             * Transformer of type checking expression by discrimination.
             *
             * When an object type has been specified by a discrimination without full
             * iteration, the `unionizer` will decode the object instance after
             * the last type checking.
             *
             * In such circumtance, you can transform the last type checking function.
             *
             * @param exp Current expression about type checking
             * @returns Transformed expression
             * @deprecated
             */
            is?: undefined | ((exp: ts.Expression) => ts.Expression);
            /**
             * Transformer of non-undefined type checking by discrimination.
             *
             * When specifying an union type of objects, `typia` tries to find
             * descrimination way just by checking only one property type.
             * If succeeded to find the discrimination way, `typia` will check the target
             * property type and in the checking, non-undefined type checking would be
             * done.
             *
             * In such process, you can transform the non-undefined type checking.
             *
             * @param exp
             * @returns Transformed expression
             * @deprecated
             */
            required?: undefined | ((exp: ts.Expression) => ts.Expression);
            /**
             * Conditon wrapper when unable to specify any object type.
             *
             * When failed to specify an object type through discrimination, full
             * iteration type checking would be happend. In such circumstance, you
             * can wrap the condition with additional function.
             *
             * @param condition Current condition
             * @returns A function wrapped current condition
             */
            full?: undefined | ((condition: ts.Expression) => (input: ts.Expression, expected: string, explore: IExplore) => ts.Expression);
            /**
             * Return type.
             */
            type?: undefined | ts.TypeNode;
        }
        interface IGenerator {
            objects?: undefined | (() => (col: MetadataCollection) => ts.VariableStatement[]);
            unions?: undefined | (() => (col: MetadataCollection) => ts.VariableStatement[]);
            arrays(): (col: MetadataCollection) => ts.VariableStatement[];
            tuples(): (col: MetadataCollection) => ts.VariableStatement[];
        }
    }
    interface IExplore {
        tracable: boolean;
        source: "top" | "function";
        from: "top" | "array" | "object";
        postfix: string;
        start?: undefined | number;
    }
    interface Decoder<T, Output extends ts.ConciseBody = ts.ConciseBody> {
        (input: ts.Expression, target: T, explore: IExplore): Output;
    }
    interface IComposed {
        body: ts.ConciseBody;
        parameters: ts.ParameterDeclaration[];
        functions: Record<string, ts.VariableStatement>;
        statements: ts.Statement[];
        response: ts.TypeNode;
    }
    interface IDecomposed {
        functions: Record<string, ts.VariableStatement>;
        statements: ts.Statement[];
        arrow: ts.ArrowFunction;
    }
    const compose: (props: {
        project: IProject;
        config: IConfig;
        importer: FunctionImporter;
        type: ts.Type;
        name: string | undefined;
    }) => IComposed;
    const writeDecomposed: (props: {
        modulo: ts.LeftHandSideExpression;
        importer: FunctionImporter;
        result: IDecomposed;
    }) => ts.CallExpression;
    const write: (project: IProject) => (config: IConfig) => (importer: FunctionImporter) => (type: ts.Type, name?: string) => ts.ArrowFunction;
    const write_object_functions: (config: IConfig) => (importer: FunctionImporter) => (collection: MetadataCollection) => ts.VariableStatement[];
    const write_union_functions: (config: IConfig) => (collection: MetadataCollection) => ts.VariableStatement[];
    const decode_array: (config: Pick<IConfig, "trace" | "path" | "decoder" | "prefix">) => (importer: FunctionImporter) => (combiner: (input: ts.Expression, arrow: ts.ArrowFunction) => ts.Expression) => (input: ts.Expression, array: MetadataArray, explore: IExplore) => ts.Expression;
    const decode_object: (config: Pick<IConfig, "trace" | "path" | "prefix">) => (importer: FunctionImporter) => (input: ts.Expression, obj: MetadataObject, explore: IExplore) => ts.CallExpression;
    const index: (start: number | null) => (prev: string) => (rand: string) => string;
    const argumentsArray: (config: Pick<IConfig, "path" | "trace">) => (explore: FeatureProgrammer.IExplore) => (input: ts.Expression) => ts.Expression[];
    const parameterDeclarations: (props: Pick<CheckerProgrammer.IConfig, "path" | "trace">) => (type: ts.TypeNode) => (input: ts.Identifier) => ts.ParameterDeclaration[];
}
