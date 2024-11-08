"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscCloneTransformer = void 0;
var MiscCloneProgrammer_1 = require("../../../programmers/misc/MiscCloneProgrammer");
var GenericTransformer_1 = require("../../internal/GenericTransformer");
var MiscCloneTransformer;
(function (MiscCloneTransformer) {
    MiscCloneTransformer.transform = GenericTransformer_1.GenericTransformer.scalar("misc.clone")(function (project) { return function (modulo) { return MiscCloneProgrammer_1.MiscCloneProgrammer.write(project)(modulo); }; });
})(MiscCloneTransformer || (exports.MiscCloneTransformer = MiscCloneTransformer = {}));
//# sourceMappingURL=MiscCloneTransformer.js.map