import { $ProtobufReader } from "../$ProtobufReader";
import { $ProtobufSizer } from "../$ProtobufSizer";
import { $ProtobufWriter } from "../$ProtobufWriter";
export declare const decode: (method: string) => {
    Reader: typeof $ProtobufReader;
    throws: (props: Pick<import("../..").TypeGuardError.IProps, "expected" | "value">) => never;
    is_between: (value: number, minimum: number, maximum: number) => boolean;
    is_bigint_string: (str: string) => boolean;
};
export declare const encode: (method: string) => {
    Sizer: typeof $ProtobufSizer;
    Writer: typeof $ProtobufWriter;
    strlen: (str: string) => number;
    throws: (props: Pick<import("../..").TypeGuardError.IProps, "expected" | "value">) => never;
    is_between: (value: number, minimum: number, maximum: number) => boolean;
    is_bigint_string: (str: string) => boolean;
};
