import typia from "../../../src";

import { TemplateAtomic } from "../../structures/TemplateAtomic";
import { _test_prune } from "../../internal/_test_prune";

export const test_createPrune_TemplateAtomic = _test_prune(
    "TemplateAtomic",
    TemplateAtomic.generate,
    typia.createPrune<TemplateAtomic>(),
);
