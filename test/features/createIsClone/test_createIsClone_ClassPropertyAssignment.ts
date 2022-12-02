import TSON from "../../../src";
import { ClassPropertyAssignment } from "../../structures/ClassPropertyAssignment";
import { _test_isClone } from "../internal/_test_isClone";

export const test_createIsClone_ClassPropertyAssignment = _test_isClone(
    "ClassPropertyAssignment",
    ClassPropertyAssignment.generate,
    TSON.createIsClone<ClassPropertyAssignment>(),
    ClassPropertyAssignment.SPOILERS,
);
