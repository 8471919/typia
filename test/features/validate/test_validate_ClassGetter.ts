import typia from "../../../src";
import { _test_validate } from "../../internal/_test_validate";
import { ClassGetter } from "../../structures/ClassGetter";

export const test_validate_ClassGetter = _test_validate<ClassGetter>(
    ClassGetter,
)((input) => typia.validate<ClassGetter>(input));
