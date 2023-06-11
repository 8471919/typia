import typia from "../../../../src";
import { ToJsonAtomicSimple } from "../../../structures/ToJsonAtomicSimple";
import { _test_stringify } from "../../../internal/_test_stringify";
export const test_createStringify_ToJsonAtomicSimple = _test_stringify("ToJsonAtomicSimple", ToJsonAtomicSimple.generate, (input: ToJsonAtomicSimple): string => {
    const $number = (typia.createStringify as any).number;
    const $string = (typia.createStringify as any).string;
    return `[${input[0].toJSON()},${$number(input[1].toJSON())},${$string(input[2].toJSON())}]`;
});
