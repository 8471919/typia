import typia from "typia";
import { TypeGuardError } from "typia";

import { _test_functional_assertFunctionAsync } from "../../../internal/_test_functional_assertFunctionAsync";
import { CommentTagAtomicUnion } from "../../../structures/CommentTagAtomicUnion";

export const test_functional_assertFunctionAsync_CommentTagAtomicUnion =
  _test_functional_assertFunctionAsync(TypeGuardError)("CommentTagAtomicUnion")(
    CommentTagAtomicUnion,
  )(
    (p: (input: CommentTagAtomicUnion) => Promise<CommentTagAtomicUnion>) =>
      async (input: CommentTagAtomicUnion): Promise<CommentTagAtomicUnion> => {
        const errorFactoryWrapper: (
          p: import("typia").TypeGuardError.IProps,
        ) => Error = (typia.functional.assertFunction as any).errorFactory;
        ((
          input: any,
          errorFactory: (p: import("typia").TypeGuardError.IProps) => Error = (
            p: any,
          ) =>
            errorFactoryWrapper({
              ...p,
              path: p.path
                ? p.path.replace("$input", "$input.parameters[0]")
                : undefined,
            }),
        ): CommentTagAtomicUnion => {
          const __is = (input: any): input is CommentTagAtomicUnion => {
            const $io0 = (input: any): boolean =>
              Array.isArray(input.value) &&
              input.value.every(
                (elem: any) =>
                  "object" === typeof elem && null !== elem && $io1(elem),
              );
            const $io1 = (input: any): boolean =>
              ("string" === typeof input.value &&
                3 <= input.value.length &&
                input.value.length <= 7) ||
              ("number" === typeof input.value &&
                Number.isFinite(input.value) &&
                3 <= input.value);
            return "object" === typeof input && null !== input && $io0(input);
          };
          if (false === __is(input))
            ((
              input: any,
              _path: string,
              _exceptionable: boolean = true,
            ): input is CommentTagAtomicUnion => {
              const $guard = (typia.functional.assertFunction as any).guard;
              const $ao0 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                ((Array.isArray(input.value) ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".value",
                      expected: "Array<CommentTagAtomicUnion.Type>",
                      value: input.value,
                    },
                    errorFactory,
                  )) &&
                  input.value.every(
                    (elem: any, _index1: number) =>
                      ((("object" === typeof elem && null !== elem) ||
                        $guard(
                          _exceptionable,
                          {
                            path: _path + ".value[" + _index1 + "]",
                            expected: "CommentTagAtomicUnion.Type",
                            value: elem,
                          },
                          errorFactory,
                        )) &&
                        $ao1(
                          elem,
                          _path + ".value[" + _index1 + "]",
                          true && _exceptionable,
                        )) ||
                      $guard(
                        _exceptionable,
                        {
                          path: _path + ".value[" + _index1 + "]",
                          expected: "CommentTagAtomicUnion.Type",
                          value: elem,
                        },
                        errorFactory,
                      ),
                  )) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".value",
                    expected: "Array<CommentTagAtomicUnion.Type>",
                    value: input.value,
                  },
                  errorFactory,
                );
              const $ao1 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                ("string" === typeof input.value &&
                  (3 <= input.value.length ||
                    $guard(
                      _exceptionable,
                      {
                        path: _path + ".value",
                        expected: "string & MinLength<3>",
                        value: input.value,
                      },
                      errorFactory,
                    )) &&
                  (input.value.length <= 7 ||
                    $guard(
                      _exceptionable,
                      {
                        path: _path + ".value",
                        expected: "string & MaxLength<7>",
                        value: input.value,
                      },
                      errorFactory,
                    ))) ||
                ("number" === typeof input.value &&
                  (Number.isFinite(input.value) ||
                    $guard(
                      _exceptionable,
                      {
                        path: _path + ".value",
                        expected: "number",
                        value: input.value,
                      },
                      errorFactory,
                    )) &&
                  (3 <= input.value ||
                    $guard(
                      _exceptionable,
                      {
                        path: _path + ".value",
                        expected: "number & Minimum<3>",
                        value: input.value,
                      },
                      errorFactory,
                    ))) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".value",
                    expected:
                      "((number & Minimum<3>) | (string & MinLength<3> & MaxLength<7>))",
                    value: input.value,
                  },
                  errorFactory,
                );
              return (
                ((("object" === typeof input && null !== input) ||
                  $guard(
                    true,
                    {
                      path: _path + "",
                      expected: "CommentTagAtomicUnion",
                      value: input,
                    },
                    errorFactory,
                  )) &&
                  $ao0(input, _path + "", true)) ||
                $guard(
                  true,
                  {
                    path: _path + "",
                    expected: "CommentTagAtomicUnion",
                    value: input,
                  },
                  errorFactory,
                )
              );
            })(input, "$input", true);
          return input;
        })(input);
        return ((
          input: any,
          errorFactory: (p: import("typia").TypeGuardError.IProps) => Error = (
            p: any,
          ) =>
            errorFactoryWrapper({
              ...p,
              path: p.path
                ? p.path.replace("$input", "$input.return")
                : undefined,
            }),
        ): CommentTagAtomicUnion => {
          const __is = (input: any): input is CommentTagAtomicUnion => {
            const $io0 = (input: any): boolean =>
              Array.isArray(input.value) &&
              input.value.every(
                (elem: any) =>
                  "object" === typeof elem && null !== elem && $io1(elem),
              );
            const $io1 = (input: any): boolean =>
              ("string" === typeof input.value &&
                3 <= input.value.length &&
                input.value.length <= 7) ||
              ("number" === typeof input.value &&
                Number.isFinite(input.value) &&
                3 <= input.value);
            return "object" === typeof input && null !== input && $io0(input);
          };
          if (false === __is(input))
            ((
              input: any,
              _path: string,
              _exceptionable: boolean = true,
            ): input is CommentTagAtomicUnion => {
              const $guard = (typia.functional.assertFunction as any).guard;
              const $ao0 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                ((Array.isArray(input.value) ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".value",
                      expected: "Array<CommentTagAtomicUnion.Type>",
                      value: input.value,
                    },
                    errorFactory,
                  )) &&
                  input.value.every(
                    (elem: any, _index1: number) =>
                      ((("object" === typeof elem && null !== elem) ||
                        $guard(
                          _exceptionable,
                          {
                            path: _path + ".value[" + _index1 + "]",
                            expected: "CommentTagAtomicUnion.Type",
                            value: elem,
                          },
                          errorFactory,
                        )) &&
                        $ao1(
                          elem,
                          _path + ".value[" + _index1 + "]",
                          true && _exceptionable,
                        )) ||
                      $guard(
                        _exceptionable,
                        {
                          path: _path + ".value[" + _index1 + "]",
                          expected: "CommentTagAtomicUnion.Type",
                          value: elem,
                        },
                        errorFactory,
                      ),
                  )) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".value",
                    expected: "Array<CommentTagAtomicUnion.Type>",
                    value: input.value,
                  },
                  errorFactory,
                );
              const $ao1 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                ("string" === typeof input.value &&
                  (3 <= input.value.length ||
                    $guard(
                      _exceptionable,
                      {
                        path: _path + ".value",
                        expected: "string & MinLength<3>",
                        value: input.value,
                      },
                      errorFactory,
                    )) &&
                  (input.value.length <= 7 ||
                    $guard(
                      _exceptionable,
                      {
                        path: _path + ".value",
                        expected: "string & MaxLength<7>",
                        value: input.value,
                      },
                      errorFactory,
                    ))) ||
                ("number" === typeof input.value &&
                  (Number.isFinite(input.value) ||
                    $guard(
                      _exceptionable,
                      {
                        path: _path + ".value",
                        expected: "number",
                        value: input.value,
                      },
                      errorFactory,
                    )) &&
                  (3 <= input.value ||
                    $guard(
                      _exceptionable,
                      {
                        path: _path + ".value",
                        expected: "number & Minimum<3>",
                        value: input.value,
                      },
                      errorFactory,
                    ))) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".value",
                    expected:
                      "((number & Minimum<3>) | (string & MinLength<3> & MaxLength<7>))",
                    value: input.value,
                  },
                  errorFactory,
                );
              return (
                ((("object" === typeof input && null !== input) ||
                  $guard(
                    true,
                    {
                      path: _path + "",
                      expected: "CommentTagAtomicUnion",
                      value: input,
                    },
                    errorFactory,
                  )) &&
                  $ao0(input, _path + "", true)) ||
                $guard(
                  true,
                  {
                    path: _path + "",
                    expected: "CommentTagAtomicUnion",
                    value: input,
                  },
                  errorFactory,
                )
              );
            })(input, "$input", true);
          return input;
        })(await p(input));
      },
  );
