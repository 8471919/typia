import typia from "typia";

import { CustomGuardError } from "../../internal/CustomGuardError";
import { _test_misc_assertPrune } from "../../internal/_test_misc_assertPrune";
import { CommentTagNaN } from "../../structures/CommentTagNaN";

export const test_misc_assertPruneCustom_CommentTagNaN = _test_misc_assertPrune(
  CustomGuardError,
)("CommentTagNaN")<CommentTagNaN>(CommentTagNaN)((input) =>
  typia.misc.assertPrune<CommentTagNaN>(input, (p) => new CustomGuardError(p)),
);
