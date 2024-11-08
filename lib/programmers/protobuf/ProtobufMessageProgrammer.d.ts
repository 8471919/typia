import ts from "typescript";
import { IProject } from "../../transformers/IProject";
export declare namespace ProtobufMessageProgrammer {
    const write: (project: IProject) => (type: ts.Type) => ts.StringLiteral;
}
