import typia from "../../../../src";
import { TupleRestArray } from "../../../structures/TupleRestArray";
import { _test_equals } from "../../../internal/_test_equals";
export const test_equals_TupleRestArray = _test_equals("TupleRestArray", TupleRestArray.generate, (input) => ((input: any, _exceptionable: boolean = true): input is [boolean, number, ...Array<string>[]] => {
    return Array.isArray(input) && ("boolean" === typeof input[0] && ("number" === typeof input[1] && Number.isFinite(input[1])) && (Array.isArray(input.slice(2)) && input.slice(2).every((elem: any, _index1: number) => Array.isArray(elem) && elem.every((elem: any, _index2: number) => "string" === typeof elem))));
})(input));
