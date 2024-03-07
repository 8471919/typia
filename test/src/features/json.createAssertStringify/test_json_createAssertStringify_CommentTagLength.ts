import typia from "typia";

import { _test_json_assertStringify } from "../../internal/_test_json_assertStringify";
import { CommentTagLength } from "../../structures/CommentTagLength";

import { TypeGuardError } from "typia";

export const test_json_createAssertStringify_CommentTagLength =
  _test_json_assertStringify(TypeGuardError)(
    "CommentTagLength",
  )<CommentTagLength>(CommentTagLength)(
    typia.json.createAssertStringify<CommentTagLength>(),
  );
