import { Union, Record } from "./fable_modules/fable-library.3.4.9/Types.js";
import { union_type, record_type, string_type, int32_type } from "./fable_modules/fable-library.3.4.9/Reflection.js";
import { LitHelpers_html } from "./fable_modules/Fable.Lit.1.3.0/Lit.fs.js";
import { fmt } from "./fable_modules/fable-library.3.4.9/String.js";
import { ProgramModule_mkSimple, ProgramModule_run } from "./fable_modules/Fable.Elmish.3.1.0/program.fs.js";
import { Program_withLit } from "./fable_modules/Fable.Lit.Elmish.1.3.0/Lit.Elmish.fs.js";
import "./styles.css";


export class State extends Record {
    constructor(counter, name) {
        super();
        this.counter = (counter | 0);
        this.name = name;
    }
}

export function State$reflection() {
    return record_type("Main.State", [], State, () => [["counter", int32_type], ["name", string_type]]);
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Increment", "Decrement", "Reset"];
    }
}

export function Msg$reflection() {
    return union_type("Main.Msg", [], Msg, () => [[], [], []]);
}

function init(_arg1) {
    return new State(0, "World");
}

function update(msg, state) {
    switch (msg.tag) {
        case 1: {
            return new State(state.counter - 1, state.name);
        }
        case 2: {
            return init(state);
        }
        default: {
            return new State(state.counter + 1, state.name);
        }
    }
}

function counter(props) {
    return LitHelpers_html(fmt`
    <button @click=${((_arg1) => {
        props.decrement();
    })}>-</button>
    <button @click=${((_arg2) => {
        props.reset();
    })}>Reset</button>
    <button @click=${((_arg3) => {
        props.increment();
    })}>+</button>
    <div>${props.counter}</div>
    `);
}

export function view(state, dispatch) {
    const counterEl = counter({
        counter: state.counter,
        decrement: () => {
            dispatch(new Msg(1));
        },
        increment: () => {
            dispatch(new Msg(0));
        },
        reset: () => {
            dispatch(new Msg(2));
        },
    });
    return LitHelpers_html(fmt`
    <div>Hello ${state.name}!</div>
    ${counterEl}
    `);
}

ProgramModule_run(Program_withLit("elmish-lit", ProgramModule_mkSimple(init, (msg, state) => update(msg, state), (state_1, dispatch) => view(state_1, dispatch))));

//# sourceMappingURL=Main.fs.js.map
