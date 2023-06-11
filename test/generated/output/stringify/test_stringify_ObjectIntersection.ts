import typia from "../../../../src";
import { ObjectIntersection } from "../../../structures/ObjectIntersection";
import { _test_stringify } from "../../../internal/_test_stringify";
export const test_stringify_ObjectIntersection = _test_stringify("ObjectIntersection", ObjectIntersection.generate, (input) => ((input: ObjectIntersection.IEmail & ObjectIntersection.IName): string => {
    const $string = (typia.stringify as any).string;
    return `{"email":${$string((input as any).email)},"name":${$string((input as any).name)},"vulnerable":${(input as any).vulnerable}}`;
})(input));
