import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import * as trigram from '../assets/data/trigrams.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  words = [];

  generate() {


    function randomArrayElement(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    function getNextWord( first, second ) {
      try {
        const words = trigram[first][second];
        return randomArrayElement(words);
      } catch (e) {
        console.log('Unresolved word pair.');
        return 'end';
      }
    }

    function isSentenceEnd(word) {
      if (word == 'begin2')
        return true;
      return ['.', '!', '?'].includes(word.slice(-1));
    }

    function isSign(word) {
      return ['.', '!', '?', ',', ':', ':'].includes(word.slice(-1));
    }

    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function* autoText(){

      yield '„ ...';

      let word1 = 'begin1';
      let word2 = 'begin2';
      while (true) {
        let word3 = getNextWord(word1, word2);
        console.log(word1, word2, word3);

        if (!isSign(word3)) {
          yield '\xa0';
        }

        if (word3 === 'end') {
          yield '... ”';
          break;
        }

        if (word3 === 'smiley') {
          yield ':)';
        }
        else if (isSentenceEnd(word2)) {
          yield capitalize(word3);
        }
        else {
          yield word3;
        }



        word1 = word2;
        word2 = word3;
      }
    }

    this.words = [];
    const autoTextGenerator = autoText();

    Observable.interval(50)
      .take(1000)
      .map(() => autoTextGenerator.next().value)
      .subscribe(word => this.words.push(word));
  }
}
