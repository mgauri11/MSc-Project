import { Position, Toaster } from "@blueprintjs/core";

//Example reference is taken from: https://blueprintjs.com/docs/#core/components/toast
/** Singleton toaster instance. Create separate instances for different options. */
const AppToaster = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP,
});

export default AppToaster;