import "./Content.css";
import "./List.css";
import "./Card.css";
import { useEffect, useState, useRef } from "react";
import { PlusIcon } from "@phosphor-icons/react";

const Card = ({ listId, cardId, title, setLists }) => {
  const cardInput = useRef(null);

  useEffect(() => {
    if (cardInput.current) cardInput.current.innerText = title;
  }, [title]);

  return (
    <div className="card_container">
      <div
        ref={cardInput}
        contentEditable={true}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        className="card_title"
        onBlur={(e) => {
          const newName = e.currentTarget.innerText.trim();
          if (newName) {
            setLists((prev) =>
              prev.map((list) =>
                list.listId == listId
                  ? {
                      ...list,
                      cards: list.cards.map((card) =>
                        card.cardId == cardId
                          ? { ...card, text: newName }
                          : card
                      ),
                    }
                  : list
              )
            );
          } else {
            // setLists((prev) =>
            //   prev.map((val) =>
            //     val.listId == cardId ? { ...val, title: "Untitled Card" } : val
            //   )
            // );
            // e.currentTarget.innerText = "Untitled Card";
          }
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
      ></div>
    </div>
  );
};

const List = ({ listId, title, cards, setLists }) => {
  const listInput = useRef(null);

  useEffect(() => {
    if (listInput.current) listInput.current.innerText = title;
  }, []);

  return (
    <div className="list_container">
      <div
        ref={listInput}
        contentEditable={true}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        className="list_title"
        onBlur={(e) => {
          const newName = e.currentTarget.innerText.trim();
          if (newName) {
            setLists((prev) =>
              prev.map((val) =>
                val.listId == listId ? { ...val, title: newName } : val
              )
            );
          } else {
            setLists((prev) =>
              prev.map((val) =>
                val.listId == listId ? { ...val, title: "Untitled List" } : val
              )
            );
            e.currentTarget.innerText = "Untitled List";
          }
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
      ></div>
      {cards
        .sort((a, b) => a.position - b.position)
        .map((val) => (
          <Card
            key={val.cardId}
            cardId={val.cardId}
            listId={listId}
            title={val.text}
            setLists={setLists}
          />
        ))}
      <div className="createCard_container">
        <PlusIcon />
        <div className="createCard_title">Add card</div>
      </div>
    </div>
  );
};

const Content = () => {
  const [lists, setLists] = useState([
    {
      listId: "l1",
      title: "Denis's List",
      position: 1,
      cards: [
        {
          cardId: "c1",
          text: "cardul meu",
          position: 2,
          completed: false,
        },
      ],
    },
    {
      listId: "l2",
      title: "Mihai's List",
      position: 2,
      cards: [
        {
          cardId: "c1",
          text: "pizda",
          position: 0,
          completed: false,
        },
        {
          cardId: "c2",
          text: "pula",
          position: 0,
          completed: true,
        },
        {
          cardId: "c3",
          text: "cacat",
          position: 0,
          completed: false,
        },
      ],
    },
  ]);

  useEffect(() => {
    // GET lists
  }, []);

  useEffect(() => {
    console.log(lists.map((val) => val.cards.map((val) => val.text)));
  }, [lists]);

  const handleAddList = () => {};

  return (
    <div className="content_container">
      {lists
        .sort((a, b) => a.position - b.position)
        .map((val) => (
          <List
            listId={val.listId}
            key={val.listId}
            title={val.title}
            cards={val.cards}
            setLists={setLists}
          />
        ))}
      <div className="createList_container">
        <PlusIcon />
        <div className="createList_title">Create new list</div>
      </div>
    </div>
  );
};

export default Content;
