import typia from "../../../../src";
import { ObjectGenericAlias } from "../../../structures/ObjectGenericAlias";
import { _test_stringify } from "../../../internal/_test_stringify";
export const test_createStringify_ObjectGenericAlias = _test_stringify("ObjectGenericAlias", ObjectGenericAlias.generate, (input: ObjectGenericAlias): string => {
    const $string = (typia.createStringify as any).string;
    return `{"value":${$string((input as any).value)}}`;
});
