import { Component, Input } from '@angular/core';
import { offset } from '@popperjs/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  cipherText: string = '';
  offset: number = 1;
  allChars = "abcdefghijklmnopqrstuvwxyz";

  constructor() {}

  private mod(a: number, b: number){
    let c = a % b
    if (c < 0)
    {
      c += b
    }
    return c;
  }

  private code(phrase: string, offset: number): string {
    
    const alph = this.allChars.split('')
    const caps = alph.map(letter => letter.toUpperCase())
    const phraseAsArray = phrase.split('')

    const newArr = phraseAsArray.map(char => { 
      debugger;
      if (char.match(/[a-z]/)) {
        const i = this.mod((alph.indexOf(char) + offset), 26)
        return alph[i]
      } else if (char.match(/[A-Z]/)) {
        const i =  this.mod((caps.indexOf(char) + offset), 26)
        return caps[i]
      } else {
        return char
      }
    })
    return newArr.join('')
  }
 
  setCipherText (text: string){
    this.cipherText = text;

  }

  setOffset(offset: string) {
    this.offset = Number(offset);
  }
  
  codeText(phrase: string) {
    phrase = this.code(phrase, this.offset)
    this.setCipherText(phrase);
  }

  decodeText(phrase: string) {
    phrase = this.code(phrase, -this.offset)
    this.setCipherText(phrase);
  }

}
