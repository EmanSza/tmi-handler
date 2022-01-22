// Built-in ones: https://www.typescriptlang.org/docs/handbook/utility-types.html

export type UnknownArray = ReadonlyArray<unknown>;

export type VoidAsyncFunction = () => Promise<void>;

export type UnknownRecord = Readonly<Record<string | number | symbol, unknown>>;

export type RecordEntry = Readonly<[string, unknown]>;

export type RecordEntries = ReadonlyArray<RecordEntry>;

export type Primitive = boolean | string | number | bigint | symbol | undefined | null | void;

export type Override<A, B> = Omit<A, keyof B> & B;

export type JSON = string | number | boolean | null | JSON[] | {
  [key: string]: JSON | undefined,
};

export type Writable<T> = {
  -readonly [Key in keyof T]: T[Key];
}

/* Tuples, unions and intersections */

type Consumer<T> = (_: T) => void;

type UnionToOverloadedConsumer<Union> = UnionToIntersection<
  Union extends unknown
  ? Consumer<Union>
  : never
>;

export type UnionLast<Union> = (
  UnionToOverloadedConsumer<Union> extends Consumer<infer Last>
  ? Last
  : never
);

export type UnionExcludingLast<Union> = Exclude<
  Union,
  UnionLast<Union>
>;

export type UnionToIntersection<Union> = (
  (Union extends unknown ? Consumer<Union> : never) extends Consumer<infer Intersection>
  ? Intersection
  : never
);

export type UnionToTuple<
  Union,
  CurrentTuple extends UnknownArray = [],
> = (
  [Union] extends [never]
  ? CurrentTuple
  : UnionToTuple<
    UnionExcludingLast<Union>,
    TuplePrepend<
      CurrentTuple,
      UnionLast<Union>
    >
  >
);

export type TuplePrepend<
  Tuple extends UnknownArray,
  InsertedElement,
> = [InsertedElement, ...Tuple];

export type TupleAppend<
  Tuple extends UnknownArray,
  InsertedElement,
> = [...Tuple, InsertedElement];

export type TupleConcat<
  Tuple0 extends UnknownArray,
  Tuple1 extends UnknownArray,
> = [
  ...Tuple0,
  ...Tuple1,
];

export type TupleFirst<
  Tuple extends UnknownArray,
> = (
  Tuple extends Readonly<[infer Head, ...UnknownArray]>
  ? Head
  : never
);

export type TupleExcludingFirst<
  Tuple extends UnknownArray,
> = (
  Tuple extends Readonly<[unknown, ...infer Tail]>
  ? Tail
  : never
);

export type TupleLast<
  Tuple extends UnknownArray,
> = (
  Tuple extends Readonly<[...infer _, infer Last]>
  ? Last
  : never
);

export type TupleExcludingLast<
  Tuple extends UnknownArray
> = (
  Tuple extends Readonly<[...infer Rest, unknown]>
  ? Rest
  : never
);

export type TupleToIntersection<Tuple extends UnknownArray> = (
  Tuple extends []
  ? {}
  : (Tuple extends Readonly<[infer Head, ...infer Tail]>
    ? Head & TupleToIntersection<Tail>
    : never
  )
);

export type TupleToUnion<T extends UnknownArray> = T[number];

export type FindIndex<
  Tuple extends Array<unknown>,
  Entry extends Tuple[number],
> = TupleToUnion<{
  [Index in keyof Tuple]: Tuple[Index] extends Entry ? Index : never;
}>;

type OmitKeysThatDontMatchEntry<
  StringRecord extends Record<string, string>,
  Entry extends string,
> = {
  [Key in keyof StringRecord]: StringRecord[Key] extends Entry ? Key : never;
}

export type FindKey<
  StringRecord extends Record<string, string>,
  Entry extends string,
> = OmitKeysThatDontMatchEntry<StringRecord, Entry>[keyof OmitKeysThatDontMatchEntry<StringRecord, Entry>];

export type Indices<Tuple extends UnknownArray> = Exclude<keyof Tuple, keyof []>;
  
export type Filter<
  In extends UnknownArray,
  What,
  Out extends UnknownArray = [],
> = (
  In extends [never] ? Out :
  In extends [infer Head, ...infer Tail]
  ? Filter<
    Tail,
    What,
    Head extends What
    ? Out
    : [Head, ...Out]
  > : Out
);

export type FilterNever<
  Input extends UnknownArray,
> = Filter<Input, never>;

type Uints = readonly [
    0,   1,   2,   3,   4,   5,   6,   7,   8,   9,
   10,  11,  12,  13,  14,  15,  16,  17,  18,  19,
];
type LoopIndex = readonly [-1, ...Uints];

export type TupleOf<
  Value,
  Length extends LoopIndex[number],
> = (
  Length extends 0 | -1
  ? []
  : [Value, ...TupleOf<Value, LoopIndex[Length]>]
);
  
/* Records and entries */

export type InvertRecord<StringRecord extends Record<string, string>> = {
  [Entry in StringRecord[keyof StringRecord]]: FindKey<StringRecord, Entry>;
}
  
export type EntriesToKeys<Entries extends RecordEntries> = {
  [Key in keyof Entries]: (
    Entries[Key] extends RecordEntry
    ? Entries[Key][0]
    : never
  );
};

export type EntriesToValues<Entries extends RecordEntries> = {
  [Key in keyof Entries]: (
    Entries[Key] extends RecordEntry
    ? Entries[Key][1]
    : never
  );
};
  
export type EntriesToRecord<
  Entries extends RecordEntries,
> = {
  [Key in (EntriesToKeys<Entries>)[number]]: {
    [Index in keyof EntriesToKeys<Entries>]: (
      Entries[Index] extends [Key, unknown]
      ? Entries[Index][1]
      : never
    );
  } extends ReadonlyArray<infer Value> ? Value : never;
};

export type CollapseRecordIntersection<
  InputRecord extends Readonly<Record<string, unknown>>,
> = {
  [Key in keyof InputRecord]: InputRecord[Key]
};

//! Warning: This is not a bullet-proof type for Object.keys()! It only works on flat Records; not on objects that inherit from a prototype!
export type RecordToKeys<T extends UnknownRecord> = UnionToTuple<keyof T>;

//! Warning: This is not a bullet-proof type for Object.values()! It only works on flat Records; not on objects that inherit from a prototype!
export type RecordToValues<
  InputRecord extends UnknownRecord,
  Union = keyof InputRecord,
  CurrentTuple extends UnknownArray = [],
> = (
  [Union] extends [never]
  ? CurrentTuple
  : RecordToValues<
    InputRecord,
    UnionExcludingLast<Union>,
    TuplePrepend<
      CurrentTuple,
      InputRecord[Extract<UnionLast<Union>, keyof InputRecord>]
    >
  >
);

//! Warning: This is not a bullet-proof type for Object.entries()! It only works on flat Records; not on objects that inherit from a prototype!
export type RecordToEntries<InputRecord extends UnknownRecord> = RecordToValues<{
  [Key in Extract<
    Exclude<
      keyof RecordToValues<InputRecord>,
      keyof []
    >,
    keyof RecordToKeys<InputRecord>
  >]: [
    RecordToKeys<InputRecord>[Key],
    RecordToValues<InputRecord>[Key],
  ]
}>;

/* Strings */

export type Split<
  Input extends string,
  Separator extends string = "",
> = (
  Input extends "" ? [] :
  Input extends `${infer Start}${Separator}${infer End}`
  ? [Start, ...Split<End, Separator>]
  : [Input]
);

    

export type WhiteSpaceCharacter = " " | "\n";

export type TrimEnd<T extends string> = (
  T extends `${infer Rest}${WhiteSpaceCharacter}`
  ? TrimEnd<Rest>
  : T
);

export type TrimStart<T extends string> = (
  T extends `${WhiteSpaceCharacter}${infer Rest}`
  ? TrimStart<Rest>
  : T
);

export type Trim<T extends string> = TrimEnd<TrimStart<T>>;

export type Length<T extends string> = Split<T>["length"];

/* Logical */

type Counter = readonly [
  -30, -29, -28, -27, -26, -25, -24, -23, -22, -21,
  -20, -19, -18, -17, -16, -15, -14, -13, -12, -11,
  -10,  -9,  -8,  -7,  -6,  -5,  -4,  -3,  -2,  -1,
    0,   1,   2,   3,   4,   5,   6,   7,   8,   9,
   10,  11,  12,  13,  14,  15,  16,  17,  18,  19,
   20,  21,  22,  23,  24,  25,  26,  27,  28,  29,
];
