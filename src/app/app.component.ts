import {Component} from '@angular/core';
import {Card} from './card';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pexeso';

  ngOnInit() {
    this.createCards();
    this.shuffleCards();
  }

  cards = [];


  foundCards = [];
  selectedCards = [];


  public createCards() {
    //RED GREEN BLUE YELLOW CARDS USE LEFT.
    let rgby = [2, 2, 2, 2];


    for (let i = 0; i < 8; i++) {
      if (rgby[0] > 0) {
        this.cards.push(new Card('red', 1));
        rgby[0] = rgby[0] - 1;
      }

      else if (rgby[1] > 0) {
        this.cards.push(new Card('green', 2));
        rgby[1] = rgby[1] - 1;
      }

      else if (rgby[2] > 0) {
        this.cards.push(new Card('blue', 3));
        rgby[2] = rgby[2] - 1;
      }

      else if (rgby[3] > 0) {
        this.cards.push(new Card('yellow', 4));
        console.log('assigning yellow cards');
        rgby[3] = rgby[3] - 1;
      }
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  addCard(divId, color) {

    if (this.selectedCards.length < 4) {
      console.log(document.getElementById(divId));
      document.getElementById(divId).style.background = color;

      this.selectedCards.push(divId);
      this.selectedCards.push(color);
      this.check();
    }
  }

  check() {
    if (this.selectedCards.length == 4) {


      if (this.foundCards.includes(this.selectedCards[1])) {
        console.log('You already found this one!');
        this.selectedCards = [];
      } else {

        if (this.selectedCards[0] != this.selectedCards[2] && this.selectedCards[1] == this.selectedCards[3]) {
          this.foundCards.push(this.selectedCards[1]);
          this.foundCards.push(this.selectedCards[3]);
          setTimeout(() => {

            document.getElementById(this.selectedCards[0]).style.display = 'none';
            document.getElementById(this.selectedCards[2]).style.display = 'none';
            this.selectedCards = [];
          }, 300);
          console.log('Its a match!');
          this.checkWin();
        } else {
          setTimeout(() => {

            document.getElementById(this.selectedCards[0]).style.backgroundImage = 'url("https://pbs.twimg.com/profile_images/1052681279412424704/yhthTEz6_400x400.jpg")';
            document.getElementById(this.selectedCards[2]).style.backgroundImage = 'url("https://pbs.twimg.com/profile_images/1052681279412424704/yhthTEz6_400x400.jpg")';
            document.getElementById(this.selectedCards[2]).style.backgroundPositionX = '-150px';
            document.getElementById(this.selectedCards[0]).style.backgroundPositionX = '-150px';

            this.selectedCards = [];
          }, 300);


          console.log('Better luck next time');
        }
      }

    }
  }

  checkWin() {
    if (this.foundCards.length == 8) {
      setTimeout(() => {

        alert('GOOD JOB IDIOT! YOU WASTED YOUR PRECIOUS TIME ON PLAYING THIS STUPID GAME!');
        this.refreshPage();
      }, 300);
    }
  }

  public shuffleCards() {
    let temp;
    for (let i = 0; i < this.cards.length; i++) {
      let randomNumb = this.getRandomInt(7);
      temp = this.cards[i];
      this.cards[i] = this.cards[randomNumb];
      this.cards[randomNumb] = temp;
    }
  }

  refreshPage() {
    location.reload();
  }


}



