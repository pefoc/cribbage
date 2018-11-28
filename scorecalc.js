/* This script sourced from http://boulter.com/cribbage/ */

var scoreText = "";	
var scoreTotal = 0;
	
	
function score(theForm)
{
	var cards = new Array();
	var suits = new Array();
	var numbers = new Array();
	
	scoreText = "";
	scoreTotal = 0;
	
//	alert("scoring");
	
	cards[1] = parseInt(theForm.card1.value);
	cards[2] = parseInt(theForm.card2.value);
	cards[3] = parseInt(theForm.card3.value);
	cards[4] = parseInt(theForm.card4.value);
	cards[5] = parseInt(theForm.card5.value);

	suits[1] = theForm.suit1.value;
	suits[2] = theForm.suit2.value;
	suits[3] = theForm.suit3.value;
	suits[4] = theForm.suit4.value;
	suits[5] = theForm.suit5.value;

	for (var i = 1; i <= 13; i++)
	{
		numbers[i] = 0;
	}
	
	for (var i = 1; i <= 5; i++)
	{
		numbers[cards[i]]++;
	}
	
//	alert(suits[1]);
	
	// all the same suit
	
	if (suits[1] == suits[2] && suits[2] == suits[3] && suits[3] == suits[4])
	{
		if (suits[1] == suits[5])
		{
			scoreText += "+5 Flush\n";
			scoreTotal += 5;
		}
		else
		{
			scoreText += "+4 Flush\n";
			scoreTotal += 4;		
		}
		
	}
	
	
	// right jack
	
	for (var i = 1; i < 5; i++)
	{
		if (suits[i] == suits[5] && cards[i] == 11)
		{
			scoreText += "+1 Matching Jack\n";
			scoreTotal++;
		}
		
	}
	
	// pairs
	
	for (var i = 1; i <= 13; i++)
	{
	//  alert(i + " = " + numbers[i]);
	
	  if (numbers[i] == 2)
	  {
	  	scoreTotal += 2;
	  	scoreText  += "+2 Pair of " + card2Text(i) + "s\n";
	  }
	  
	  if (numbers[i] == 3)
	  {
	  	scoreTotal += 6;
	  	scoreText  += "+6 3 Pairs of " + card2Text(i) + "s\n";	  
	  }
	  
	  if (numbers[i] == 4)
	  {
	  	scoreTotal += 12;
	  	scoreText  += "+12 6 Pairs of " + card2Text(i) + "s\n";	  	  
	  }
	  
	}
	
	// 15s


	var cardList = new Array();
	var suitList = new Array();
	
//	scoreCards(cards, suits, cardList, suitList, 1);

	for (var i = 1; i < 5; i++)
	{
	
		cardList[cardList.length] = cards[i];
		suitList[suitList.length] = suits[i];
	
		for (var j = (i + 1); j <= 5; j++)
		{

			cardList[cardList.length] = cards[j];
			suitList[suitList.length] = suits[j];

			if (sumOfCards(cardList) == 15)
			{
				scoreTotal += 2;
				scoreText += "+2 15: " + displayCardList(cardList, suitList) + "\n";
			}

			for (var k = (j + 1); k <= 5; k++)
			{

				cardList[cardList.length] = cards[k];
				suitList[suitList.length] = suits[k];			


				if (sumOfCards(cardList) == 15)
				{
					scoreTotal += 2;
					scoreText += "+2 15: " + displayCardList(cardList, suitList) + "\n";
				}
			
				for (var l = (k + 1); l <= 5; l++)
				{

					cardList[cardList.length] = cards[l];
					suitList[suitList.length] = suits[l];			
			
					if (sumOfCards(cardList) == 15)
					{
						scoreTotal += 2;
						scoreText += "+2 15: " + displayCardList(cardList, suitList) + "\n";
					}
					
					for (var m = (l + 1); m <= 5; m++)
					{
	
						cardList[cardList.length] = cards[m];
						suitList[suitList.length] = suits[m];
					
						if (sumOfCards(cardList) == 15)
						{
							scoreTotal += 2;
							scoreText += "+2 15: " + displayCardList(cardList, suitList) + "\n";
						}

						cardList = cardList.slice(0, -1);
						suitList = suitList.slice(0, -1);						
												
					}
					
					cardList = cardList.slice(0, -1);
					suitList = suitList.slice(0, -1);
										
				}

				cardList = cardList.slice(0, -1);
				suitList = suitList.slice(0, -1);	
				
			}

			cardList = cardList.slice(0, -1);
			suitList = suitList.slice(0, -1);

		}
		
		cardList = cardList.slice(0, -1);
		suitList = suitList.slice(0, -1);
	}

	
	// runs
	
	for (var i = 1; i <= 11; i++)
	{
		if (numbers[i] > 0 && numbers[i + 1] > 0 && numbers[i + 2] > 0)
		{
			// we have at least a run of 3
			
			if (numbers[i + 3] > 0)
			{
				// run of 4

				if (numbers[i + 4] > 0)
				{		
					// run of 5		

					numbers[i + 4] = 0;
					scoreTotal += 5;
					scoreText += "+5 Run of 5\n";							
				}
				else
				{

					var sum = numbers[i] + numbers[i + 1] + numbers[i + 2] + numbers[i + 3];
	
					if (sum == 4)
					{
						scoreTotal += 4;
						scoreText += "+4 Run of 4\n";
					}
					else if (sum == 5)
					{
						scoreTotal += 8;
						scoreText += "+8 2 Runs of 4\n";
					}					
				
				}
				numbers[i + 3] = 0;									
			}
			else
			{
				var sum = numbers[i] + numbers[i + 1] + numbers[i + 2];
				if (sum == 3)
				{
					scoreTotal += 3;
					scoreText += "+3 Run of 3\n";
				}
				else if (sum == 4)
				{
					scoreTotal += 6;
					scoreText += "+6 Double Run of 3\n";
				}
				else if (sum == 5)
				{
					scoreTotal += 12;
					scoreText += "+12 Triple Run of 3\n";
				}
			}

			numbers[i] = 0;
			numbers[i + 1] = 0;
			numbers[i + 2] = 0;						
		}
	
	}
	
	
	if (scoreTotal == 0)
		scoreText = "Sorry, no points!";
	
	theForm.scores.value = scoreText;
	theForm.total.value = scoreTotal;

}

function scoreCardList(cardList, suitList)
{
	if (sumOfCards(cardList) == 15)
	{
		scoreTotal += 2;
		scoreText += "+2 15: " + displayCardList(cardList, suitList) + "\n";
	}

	sortedCards = cardList.sort();

}

function scoreCards(cards, suits, cardList, suitList, level)
{

	debug("level " + level + ", " + displayCardList(cardList, suitList));

	cardList[cardList.length] = cards[level];
	suitList[suitList.length] = suits[level];
	
	debug("level " + level + " card list is now " + displayCardList(cardList, suitList));

	if (sumOfCards(cardList) == 15)
	{
		scoreTotal += 2;
		scoreText += "+2 15: " + displayCardList(cardList, suitList) + "\n";
	}

	for (var i = (level + 1); i <= 5; i++)
	{
		scoreCards(cards, suits, cardList, suitList, (level + 1));
	}

	cardList = cardList.slice(0, -1);
	suitList = suitList.slice(0, -1);

	debug("level " + level + " after removal " + displayCardList(cardList, suitList));

}

function displayCardList(cards, suits)
{
	var result = "";

	for (var i = 0; i < cards.length; i++)
	{
		if (i > 0)
			result += ", ";
			
		result += cardText(cards[i], suits[i]);
	}

	return result;
}

function debug(sometext)
{
	document.cribbage.debugText.value = document.cribbage.debugText.value + sometext + "\n";
}

function sumOfCards(cardList)
{
	var result = 0;

	for (var i = 0; i < cardList.length; i++)
	{
		result += cardValue(cardList[i]);	
	}

	return result;
}

function cardText(card, suit)
{
	return card2Text(card) + " of " + suit;
}

function cardValue(card)
{
	card = parseInt(card);
//	alert("card is " + card);

	if (card > 10)
		return 10;

	return card;
}

function card2Text(val)
{

	if (val == 1)
		return "Ace";
	if (val < 11)
		return val + "";
	if (val == 11)
		return "Jack";
	if (val == 12)
		return "Queen";
	if (val == 13)
		return "King";

	return "";

}

function card2ShortText(val)
{

	if (val == 1)
		return "A";
	if (val < 11)
		return val + "";
	if (val == 11)
		return "J";
	if (val == 12)
		return "Q";
	if (val == 13)
		return "K";

	return "";

}

