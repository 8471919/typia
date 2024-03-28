import typia from "typia";
import { TypeGuardError } from "typia";

import { _test_functional_assertFunctionAsync } from "../../../internal/_test_functional_assertFunctionAsync";
import { NativeAlias } from "../../../structures/NativeAlias";

export const test_functional_assertFunctionAsync_NativeAlias =
  _test_functional_assertFunctionAsync(TypeGuardError)("NativeAlias")(
    NativeAlias,
  )(
    (p: (input: NativeAlias) => Promise<NativeAlias>) =>
      async (input: NativeAlias): Promise<NativeAlias> => {
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
        ): NativeAlias => {
          const __is = (input: any): input is NativeAlias => {
            const $io0 = (input: any): boolean =>
              input.date instanceof Date &&
              input.uint8Array instanceof Uint8Array &&
              input.uint8ClampedArray instanceof Uint8ClampedArray &&
              input.uint16Array instanceof Uint16Array &&
              input.uint32Array instanceof Uint32Array &&
              input.bigUint64Array instanceof BigUint64Array &&
              input.int8Array instanceof Int8Array &&
              input.int16Array instanceof Int16Array &&
              input.int32Array instanceof Int32Array &&
              input.bigInt64Array instanceof BigInt64Array &&
              input.float32Array instanceof Float32Array &&
              input.float64Array instanceof Float64Array &&
              input.arrayBuffer instanceof ArrayBuffer &&
              input.sharedArrayBuffer instanceof SharedArrayBuffer &&
              input.dataView instanceof DataView;
            return "object" === typeof input && null !== input && $io0(input);
          };
          if (false === __is(input))
            ((
              input: any,
              _path: string,
              _exceptionable: boolean = true,
            ): input is NativeAlias => {
              const $guard = (typia.functional.assertFunction as any).guard;
              const $ao0 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                (input.date instanceof Date ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".date",
                      expected: "Date",
                      value: input.date,
                    },
                    errorFactory,
                  )) &&
                (input.uint8Array instanceof Uint8Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".uint8Array",
                      expected: "Uint8Array",
                      value: input.uint8Array,
                    },
                    errorFactory,
                  )) &&
                (input.uint8ClampedArray instanceof Uint8ClampedArray ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".uint8ClampedArray",
                      expected: "Uint8ClampedArray",
                      value: input.uint8ClampedArray,
                    },
                    errorFactory,
                  )) &&
                (input.uint16Array instanceof Uint16Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".uint16Array",
                      expected: "Uint16Array",
                      value: input.uint16Array,
                    },
                    errorFactory,
                  )) &&
                (input.uint32Array instanceof Uint32Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".uint32Array",
                      expected: "Uint32Array",
                      value: input.uint32Array,
                    },
                    errorFactory,
                  )) &&
                (input.bigUint64Array instanceof BigUint64Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".bigUint64Array",
                      expected: "BigUint64Array",
                      value: input.bigUint64Array,
                    },
                    errorFactory,
                  )) &&
                (input.int8Array instanceof Int8Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".int8Array",
                      expected: "Int8Array",
                      value: input.int8Array,
                    },
                    errorFactory,
                  )) &&
                (input.int16Array instanceof Int16Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".int16Array",
                      expected: "Int16Array",
                      value: input.int16Array,
                    },
                    errorFactory,
                  )) &&
                (input.int32Array instanceof Int32Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".int32Array",
                      expected: "Int32Array",
                      value: input.int32Array,
                    },
                    errorFactory,
                  )) &&
                (input.bigInt64Array instanceof BigInt64Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".bigInt64Array",
                      expected: "BigInt64Array",
                      value: input.bigInt64Array,
                    },
                    errorFactory,
                  )) &&
                (input.float32Array instanceof Float32Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".float32Array",
                      expected: "Float32Array",
                      value: input.float32Array,
                    },
                    errorFactory,
                  )) &&
                (input.float64Array instanceof Float64Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".float64Array",
                      expected: "Float64Array",
                      value: input.float64Array,
                    },
                    errorFactory,
                  )) &&
                (input.arrayBuffer instanceof ArrayBuffer ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".arrayBuffer",
                      expected: "ArrayBuffer",
                      value: input.arrayBuffer,
                    },
                    errorFactory,
                  )) &&
                (input.sharedArrayBuffer instanceof SharedArrayBuffer ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".sharedArrayBuffer",
                      expected: "SharedArrayBuffer",
                      value: input.sharedArrayBuffer,
                    },
                    errorFactory,
                  )) &&
                (input.dataView instanceof DataView ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".dataView",
                      expected: "DataView",
                      value: input.dataView,
                    },
                    errorFactory,
                  ));
              return (
                ((("object" === typeof input && null !== input) ||
                  $guard(
                    true,
                    {
                      path: _path + "",
                      expected: "NativeAlias",
                      value: input,
                    },
                    errorFactory,
                  )) &&
                  $ao0(input, _path + "", true)) ||
                $guard(
                  true,
                  {
                    path: _path + "",
                    expected: "NativeAlias",
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
        ): NativeAlias => {
          const __is = (input: any): input is NativeAlias => {
            const $io0 = (input: any): boolean =>
              input.date instanceof Date &&
              input.uint8Array instanceof Uint8Array &&
              input.uint8ClampedArray instanceof Uint8ClampedArray &&
              input.uint16Array instanceof Uint16Array &&
              input.uint32Array instanceof Uint32Array &&
              input.bigUint64Array instanceof BigUint64Array &&
              input.int8Array instanceof Int8Array &&
              input.int16Array instanceof Int16Array &&
              input.int32Array instanceof Int32Array &&
              input.bigInt64Array instanceof BigInt64Array &&
              input.float32Array instanceof Float32Array &&
              input.float64Array instanceof Float64Array &&
              input.arrayBuffer instanceof ArrayBuffer &&
              input.sharedArrayBuffer instanceof SharedArrayBuffer &&
              input.dataView instanceof DataView;
            return "object" === typeof input && null !== input && $io0(input);
          };
          if (false === __is(input))
            ((
              input: any,
              _path: string,
              _exceptionable: boolean = true,
            ): input is NativeAlias => {
              const $guard = (typia.functional.assertFunction as any).guard;
              const $ao0 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                (input.date instanceof Date ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".date",
                      expected: "Date",
                      value: input.date,
                    },
                    errorFactory,
                  )) &&
                (input.uint8Array instanceof Uint8Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".uint8Array",
                      expected: "Uint8Array",
                      value: input.uint8Array,
                    },
                    errorFactory,
                  )) &&
                (input.uint8ClampedArray instanceof Uint8ClampedArray ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".uint8ClampedArray",
                      expected: "Uint8ClampedArray",
                      value: input.uint8ClampedArray,
                    },
                    errorFactory,
                  )) &&
                (input.uint16Array instanceof Uint16Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".uint16Array",
                      expected: "Uint16Array",
                      value: input.uint16Array,
                    },
                    errorFactory,
                  )) &&
                (input.uint32Array instanceof Uint32Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".uint32Array",
                      expected: "Uint32Array",
                      value: input.uint32Array,
                    },
                    errorFactory,
                  )) &&
                (input.bigUint64Array instanceof BigUint64Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".bigUint64Array",
                      expected: "BigUint64Array",
                      value: input.bigUint64Array,
                    },
                    errorFactory,
                  )) &&
                (input.int8Array instanceof Int8Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".int8Array",
                      expected: "Int8Array",
                      value: input.int8Array,
                    },
                    errorFactory,
                  )) &&
                (input.int16Array instanceof Int16Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".int16Array",
                      expected: "Int16Array",
                      value: input.int16Array,
                    },
                    errorFactory,
                  )) &&
                (input.int32Array instanceof Int32Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".int32Array",
                      expected: "Int32Array",
                      value: input.int32Array,
                    },
                    errorFactory,
                  )) &&
                (input.bigInt64Array instanceof BigInt64Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".bigInt64Array",
                      expected: "BigInt64Array",
                      value: input.bigInt64Array,
                    },
                    errorFactory,
                  )) &&
                (input.float32Array instanceof Float32Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".float32Array",
                      expected: "Float32Array",
                      value: input.float32Array,
                    },
                    errorFactory,
                  )) &&
                (input.float64Array instanceof Float64Array ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".float64Array",
                      expected: "Float64Array",
                      value: input.float64Array,
                    },
                    errorFactory,
                  )) &&
                (input.arrayBuffer instanceof ArrayBuffer ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".arrayBuffer",
                      expected: "ArrayBuffer",
                      value: input.arrayBuffer,
                    },
                    errorFactory,
                  )) &&
                (input.sharedArrayBuffer instanceof SharedArrayBuffer ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".sharedArrayBuffer",
                      expected: "SharedArrayBuffer",
                      value: input.sharedArrayBuffer,
                    },
                    errorFactory,
                  )) &&
                (input.dataView instanceof DataView ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".dataView",
                      expected: "DataView",
                      value: input.dataView,
                    },
                    errorFactory,
                  ));
              return (
                ((("object" === typeof input && null !== input) ||
                  $guard(
                    true,
                    {
                      path: _path + "",
                      expected: "NativeAlias",
                      value: input,
                    },
                    errorFactory,
                  )) &&
                  $ao0(input, _path + "", true)) ||
                $guard(
                  true,
                  {
                    path: _path + "",
                    expected: "NativeAlias",
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
