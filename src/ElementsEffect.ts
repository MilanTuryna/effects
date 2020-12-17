/**
 * @author Milan Turyna
 * @link https://github.com/MilanTuryna
 * Just a few effects for HTML elements without any JS library (jquery, etc.)
 */
export namespace ElementsEffects {
    export const VERSION = "1.0.1";
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
                let intervalTimeout: number = Number(element.dataset["typeWriter-timeout"]) || 50;
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
        private readonly counterGoal: number;
        private readonly startFrom: number;
        private readonly numberChar: string;

        /**
         * @param elements
         * @param callback
         * @param counterGoal
         * @param startFrom
         * @param numberChar
         */
        constructor(elements: HTMLElement[], callback: (element) => void, counterGoal: number = 100, startFrom:number = 0, numberChar: string = "%") {
            super(elements, callback);

            this.counterGoal = counterGoal;
            this.startFrom = startFrom;
            this.numberChar = numberChar;
        }

        start(): this {
            this.elements.forEach((element: HTMLElement) => {
                let counter: number = Number(element.dataset["counterEffect-startFrom"]) || this.startFrom;
                let counterGoal: number = Number(element.dataset["counterEffect-goal"]) || this.counterGoal;
                let intervalTimeout: number = Number(element.dataset["counterEffect-intervalTimeout"]) || 50;

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

        getCounterGoal(): number {
            return this.counterGoal;
        }

        getNumberChar(): string {
            return this.numberChar;
        }
    }
}