/**
 * @author Milan Turyna
 * @link https://github.com/MilanTuryna
 * Just a few effects for HTML elements without any JS library (jquery, etc.)
 */
export namespace ElementsEffects {
    export abstract class Effect {
        public callback: (element) => void;
        protected readonly elements: HTMLElement[];

        /**
         * @param elements
         * @param callback
         */
        constructor(elements: HTMLElement[], callback: (element) => void) {
            this.elements = [...elements];
            this.callback = callback;
        }
        public getElements(): HTMLElement[] {
            return this.elements;
        }
        public abstract start(): this;
    }

    export class TypeWriterEffect extends Effect {
        start(): this {
            this.elements.forEach((element: HTMLElement) => {
                let splitText: string[] = element.innerText.split('');
                let intervalTimeout: number = Number(element.dataset["typewriterTimeout"]) || 50;
                let counter: number = 0;
                let interval: number;

                element.innerHTML = '';

                interval = setInterval(() => {
                    if(counter === splitText.length) {
                        clearInterval(interval);
                        this.callback(element);
                        return;
                    }

                    element.innerHTML += splitText[counter];
                    counter++;
                }, intervalTimeout);
            });
            return this;
        }
    }

    export class CounterEffect extends Effect {
        private readonly numberChar: string;

        constructor(elements: HTMLElement[], callback: (element) => void, numberChar: string = "%") {
            super(elements, callback);
            this.numberChar = numberChar;
        }

        start(): this {
            this.elements.forEach((element) => {
                let counter: number = 0;
                let counterGoal: number = 100;
                let intervalTimeout: number = Number(element.dataset["hundredPercents-timeout"]) || 50;

                let interval = setInterval(() => {
                    if (counter === counterGoal) {
                        clearInterval(interval);
                        this.callback(element);
                        return;
                    }
                    counter++;
                    element.innerHTML = counter + this.numberChar;
                }, intervalTimeout);
            });
            return this;
        }

        getNumberChar(): string {
            return this.numberChar;
        }
    }
}