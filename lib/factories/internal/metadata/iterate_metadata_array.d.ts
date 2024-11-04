import ts from "typescript";
import { Metadata } from "../../../schemas/metadata/Metadata";
import { MetadataCollection } from "../../MetadataCollection";
import { MetadataFactory } from "../../MetadataFactory";
export declare const iterate_metadata_array: (checker: ts.TypeChecker) => (options: MetadataFactory.IOptions) => (collection: MetadataCollection) => (errors: MetadataFactory.IError[]) => (meta: Metadata, alias: ts.Type, explore: MetadataFactory.IExplore) => boolean;
