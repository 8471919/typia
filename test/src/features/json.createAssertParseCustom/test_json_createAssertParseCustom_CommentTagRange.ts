import typia from "typia";

import { _test_json_assertParse } from "../../internal/_test_json_assertParse";
import { CommentTagRange } from "../../structures/CommentTagRange";

import { CustomGuardError } from "../../internal/CustomGuardError";

export const test_json_createAssertParseCustom_CommentTagRange =
  _test_json_assertParse(CustomGuardError)("CommentTagRange")<CommentTagRange>(
    CommentTagRange,
  )(
    typia.json.createAssertParse<CommentTagRange>(
      (p) => new CustomGuardError(p),
    ),
  );
