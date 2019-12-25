export default class BaseComponent {
    constructor(element) {
        this.componentRoot = element;
    }

    addEventListeners(definitions) {
        for (const scope in definitions) {
            const context = scope === ":self" ? this.componentRoot : 
            scope === "window" ? window :
            scope === "document" ? document :
            this.componentRoot.querySelector(scope);   
                     
            if (definitions.hasOwnProperty(scope)) {
                for (const event in definitions[scope]) {
                    if (definitions[scope].hasOwnProperty(event)) {
                        const listener = definitions[scope][event];
                        context.addEventListener(event, listener);
                    }
                }
            }
        }
    }
}