import "./Content.css";
import "./List.css";
import "./Card.css";
import { useEffect, useState, useRef } from "react";
import { PlusIcon, TrashIcon, XIcon } from "@phosphor-icons/react";

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
      <div
        className="card_buttons"
        onClick={() => {
          setLists((prev) =>
            prev.map((list) =>
              list.listId == listId
                ? {
                    ...list,
                    cards: list.cards.filter((card) => card.cardId != cardId),
                  }
                : list
            )
          );
        }}
      >
        <TrashIcon size={15} />
      </div>
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
      <div className="list_header">
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
                  val.listId == listId
                    ? { ...val, title: "Untitled List" }
                    : val
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
        <div
          className="list_header_buttons"
          onClick={() => {
            setLists((prev) => prev.filter((list) => list.listId != listId));
          }}
        >
          <XIcon size={16} />
        </div>
      </div>

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
      <div
        className="createCard_container"
        onClick={() => {
          setLists((prev) =>
            prev.map((list) =>
              list.listId == listId
                ? {
                    ...list,
                    cards: [
                      ...cards,
                      {
                        cardId: "c" + Date.now(),
                        text: "Default Card",
                        position: cards.length,
                        completed: false,
                      },
                    ],
                  }
                : list
            )
          );
        }}
      >
        <PlusIcon />
        <div className="createCard_title">Add card</div>
      </div>
    </div>
  );
};

const Content = () => {
  const [lists, setLists] = useState(null);

  useEffect(() => {
    // GET lists
    const fetchLists = async () => {
      try {
        const res = await fetch(
          "https://api.jsonbin.io/v3/b/6963422443b1c97be9282fc0",
          {
            headers: {
              "X-Master-Key":
                "$2a$10$78y7ZQr33DNSO7Mycug1reYn4Utz7J2Fh4mCCQpGv2bF8w6acJ1G6",
            },
          }
        );
        if (res.ok) {
          console.log("/GET LISTS: ", res.status);
        }
        const data = await res.json();
        setLists(data.record);
      } catch (err) {
        console.error("/GET LISTS ERROR ", err);
      }
    };

    fetchLists();
  }, []);

  useEffect(() => {
    if (lists == null) return;

    const saveListsToCloud = async () => {
      try {
        const res = await fetch(
          "https://api.jsonbin.io/v3/b/6963422443b1c97be9282fc0",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key":
                "$2a$10$78y7ZQr33DNSO7Mycug1reYn4Utz7J2Fh4mCCQpGv2bF8w6acJ1G6",
            },
            body: JSON.stringify(lists),
          }
        );

        if (res.ok) {
          console.log("/PUT LISTS: ", res.status);
        }
      } catch (err) {
        console.error("Eroare la salvare:", err);
      }
    };
    const timeout = setTimeout(() => {
      saveListsToCloud();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [lists]);

  const handleAddList = () => {};

  return (
    <div className="content_container">
      {Array.isArray(lists) &&
        lists
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
      <div
        className="createList_container"
        onClick={() => {
          setLists((prev) => [
            ...prev,
            {
              listId: "l" + Date.now(),
              title: "Default List",
              position: prev.length + 1,
              cards: [],
            },
          ]);
        }}
      >
        <PlusIcon />
        <div className="createList_title">Create new list</div>
      </div>
    </div>
  );
};

export default Content;
