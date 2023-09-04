import { useState, useRef, useEffect } from "react";
import butterfly from "../Images/butterfly.png";
import dragon from "../Images/dragon.png";
import unicorn from "../Images/unicorn.png";
import pickachu from "../Images/pickachu.png";
import snake from "../Images/snake.png";
import Cardsdisplay from "./Cardsdisplay";
import owl from "../Images/owl.png";
import { Box, Button, Container, Typography } from "@mui/material";

function Maincopy() {
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [cards, setCards] = useState(
    [
      { id: 0, name: "id 0", status: "", img: butterfly },
      { id: 0, name: "id 0", status: "", img: butterfly },
      { id: 1, name: "id 1", status: "", img: dragon },
      { id: 1, name: "id 1", status: "", img: dragon },
      { id: 2, name: "id 2", status: "", img: unicorn },
      { id: 2, name: "id 2", status: "", img: unicorn },
      { id: 3, name: "id 3", status: "", img: pickachu },
      { id: 3, name: "id 3", status: "", img: pickachu },
      { id: 4, name: "id 4", status: "", img: snake },
      { id: 4, name: "id 4", status: "", img: snake },
      { id: 5, name: "id 5", status: "", img: owl },
      { id: 5, name: "id 5", status: "", img: owl },
    ].sort(() => Math.random() - 0.5)
  );

  const [previousCardState, setPreviousCardState] = useState(-1);
  const previousIndex = useRef(-1);

  // useEffect
  useEffect(() => {
    let interval;
    if (!gameOver) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          clearInterval(interval);
          setGameOver(true);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, gameOver]);

  //matchcheck

  const matchCheck = (currentCard) => {
    if (gameOver) {
      return;
    }
    if (cards[currentCard].id === cards[previousCardState].id) {
      cards[previousCardState].status = "active matched";
      cards[currentCard].status = "active matched";
      setPreviousCardState(-1);
      setScore(score + 1);
    } else {
      cards[currentCard].status = "active";
      setCards([...cards]);
      setTimeout(() => {
        setPreviousCardState(-1);
        cards[currentCard].status = "unmatch";
        cards[previousCardState].status = "unmatch";
        setCards([...cards]);
      }, 1000);
    }

    // Check if all cards are matched
    const allMatched = cards.every((card) => card.status === "active matched");
    if (allMatched) {
      setGameOver(true);
    }
  };

  //handle restart
  const handlerestart = () => {
    const initialCards = [
      { id: 0, name: "id 0", status: "", img: butterfly },
      { id: 0, name: "id 0", status: "", img: butterfly },
      { id: 1, name: "id 1", status: "", img: dragon },
      { id: 1, name: "id 1", status: "", img: dragon },
      { id: 2, name: "id 2", status: "", img: unicorn },
      { id: 2, name: "id 2", status: "", img: unicorn },
      { id: 3, name: "id 3", status: "", img: pickachu },
      { id: 3, name: "id 3", status: "", img: pickachu },
      { id: 4, name: "id 4", status: "", img: snake },
      { id: 4, name: "id 4", status: "", img: snake },
      { id: 5, name: "id 5", status: "", img: owl },
      { id: 5, name: "id 5", status: "", img: owl },
    ];
    setCards(initialCards.sort(() => Math.random() - 0.5));
    setGameOver(false);
    setTimer(60);
    setScore(0);
    setMoves(0);
  };

  // click handler

  const clickhandler = (index) => {
    if (index !== previousIndex.current) {
      if (cards[index].status === "active matched") {
        alert("Already matched");
      } else {
        if (previousCardState === -1) {
          previousIndex.current = index;
          cards[index].status = "active";
          setCards([...cards]);
          setPreviousCardState(index);
        } else {
          matchCheck(index);
          previousIndex.current = -1;
        }
        setMoves(moves + 1);
      }
    } else {
      alert("Card currently selected");
    }
  };

  return (
    <>
      <Container>
        <Box>
          <Typography fontSize={"20px"}>Timer: {timer} seconds</Typography>
          <Typography fontSize={"20px"}>Score: {score}</Typography>
          <Typography fontSize={"20px"}>Moves: {moves}</Typography>
        </Box>
        <div className="container">
          {cards.map((card, index) => {
            return (
              <Cardsdisplay
                key={index}
                card={card}
                index={index}
                clickhandler={clickhandler}
              />
            );
          })}
        </div>
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          {gameOver && (
            <Typography fontSize={"20px"} pb={"30px"}>
              {score === cards.length / 2 ? "You Won! 👏" : "You Lost! 😫"}
            </Typography>
          )}
          <Button
            sx={{ backgroundColor: "skyblue", color: "black", px: 3, py: 1 }}
            onClick={handlerestart}
          >
            restart
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Maincopy;
