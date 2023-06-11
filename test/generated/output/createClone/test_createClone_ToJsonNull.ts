import typia from "../../../../src";
import { ToJsonNull } from "../../../structures/ToJsonNull";
import { _test_clone } from "../../../internal/_test_clone";
export const test_createClone_ToJsonNull = _test_clone("ToJsonNull", ToJsonNull.generate, (input: ToJsonNull): typia.Primitive<ToJsonNull> => {
    return "object" === typeof input && null !== input && "function" === typeof input.toJSON ? input.toJSON() as any : input as any;
});
