# Effects
A simple libraries for adding some dynamic effects to your web application programmed. All libraries are programmed in 
TypeScript but it's built to classic Javascript (`/stable`). Application doesn't need any external library (jquery...).

## Structure
#### ElementsEffects
- TypeWriterEffect
- CounterEffect

## How to use?
### ElementsEffects
#### TypeWriterEffect
```
<p class="js--example-typeWriter" data-typeWriter-timeout="50">
    Hello, my name is MilanTuryna!
</p>
```
```
let elements = document.getElementsByClassName("js--example--typeWriter");
let callback = function(el) {
    console.log("Typewriter effect is done, yeey!")
}
let typeWriterEffect = new ElementsEffects.TypeWriterEffect(elements, callback);
typeWriterEffect.start();
```