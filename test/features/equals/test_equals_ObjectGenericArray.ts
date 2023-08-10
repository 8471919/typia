import typia from "../../../src";
import { _test_equals } from "../../internal/_test_equals";
import { ObjectGenericArray } from "../../structures/ObjectGenericArray";

export const test_equals_ObjectGenericArray = _test_equals<ObjectGenericArray>(
    ObjectGenericArray,
)((input) => typia.equals<ObjectGenericArray>(input));
